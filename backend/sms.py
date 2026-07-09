"""Envoi de SMS OTP via l'Orange SMS API (Afrique / Sénégal).

Doc : https://developer.orange.com/apis/sms/getting-started

Flux :
  1. OAuth2 : POST https://api.orange.com/oauth/v3/token (Basic auth) -> access_token (1h)
  2. Envoi  : POST https://api.orange.com/smsmessaging/v1/outbound/{senderAddress}/requests

Comportement :
  - Si ORANGE_CLIENT_ID et ORANGE_CLIENT_SECRET sont présents -> envoi réel.
  - Sinon -> mode démo (aucun SMS envoyé, le code est exposé côté API).

Aucune dépendance externe : bibliothèque standard uniquement.
"""

import base64
import json
import os
import threading
import time
import urllib.parse
import urllib.request

TOKEN_URL = "https://api.orange.com/oauth/v3/token"
SMS_BASE_URL = "https://api.orange.com/smsmessaging/v1/outbound"
ADMIN_BASE_URL = "https://api.orange.com/sms/admin/v1"
# Code pays ISO-3166 alpha-3 pour filtrer le solde (Sénégal).
COUNTRY_CODE = os.getenv("ORANGE_COUNTRY_CODE", "SEN")

CLIENT_ID = os.getenv("ORANGE_CLIENT_ID", "")
CLIENT_SECRET = os.getenv("ORANGE_CLIENT_SECRET", "")
# senderAddress au format "tel:+<indicatif>0000". Sénégal par défaut : tel:+2210000
SENDER_ADDRESS = os.getenv("ORANGE_SENDER_ADDRESS", "tel:+2210000")
# sender name personnalisé (≤ 11 caractères, doit être white-listé par Orange). Optionnel.
SENDER_NAME = os.getenv("ORANGE_SENDER_NAME", "")

# Cache du token (partagé, thread-safe).
_token_lock = threading.Lock()
_token_cache = {"value": "", "expires": 0.0}


def sms_enabled() -> bool:
    """Vrai si les identifiants Orange nécessaires à un envoi réel sont configurés."""
    return bool(CLIENT_ID and CLIENT_SECRET)


def _e164(phone: str) -> str:
    """Normalise en format international E.164 (+221...)."""
    p = phone.strip().replace(" ", "")
    return p if p.startswith("+") else "+" + p


def _get_token() -> str:
    """Récupère un access_token valide, en réutilisant le cache tant qu'il n'a pas expiré."""
    with _token_lock:
        now = time.time()
        if _token_cache["value"] and now < _token_cache["expires"]:
            return _token_cache["value"]

        auth = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
        data = urllib.parse.urlencode({"grant_type": "client_credentials"}).encode()
        req = urllib.request.Request(TOKEN_URL, data=data, method="POST")
        req.add_header("Authorization", f"Basic {auth}")
        req.add_header("Content-Type", "application/x-www-form-urlencoded")
        req.add_header("Accept", "application/json")

        with urllib.request.urlopen(req, timeout=15) as resp:
            payload = json.loads(resp.read().decode())

        token = payload["access_token"]
        # expires_in est en secondes (≈ 3600). On garde une marge de 60 s.
        expires_in = int(payload.get("expires_in", 3600))
        _token_cache["value"] = token
        _token_cache["expires"] = now + max(expires_in - 60, 0)
        return token


def send_otp_sms(phone: str, code: str) -> None:
    """Envoie le code OTP par SMS via Orange. Lève une exception en cas d'échec."""
    if not sms_enabled():
        # Mode démo : rien à envoyer.
        return

    token = _get_token()
    message = f"Votre code de connexion Codena est : {code}"

    body = {
        "outboundSMSMessageRequest": {
            "address": f"tel:{_e164(phone)}",
            "senderAddress": SENDER_ADDRESS,
            "outboundSMSTextMessage": {"message": message},
        }
    }
    if SENDER_NAME:
        body["outboundSMSMessageRequest"]["senderName"] = SENDER_NAME

    # senderAddress url-encodé dans le chemin : "tel:+2210000" -> "tel%3A%2B2210000"
    path = urllib.parse.quote(SENDER_ADDRESS, safe="")
    url = f"{SMS_BASE_URL}/{path}/requests"

    req = urllib.request.Request(
        url, data=json.dumps(body).encode(), method="POST"
    )
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/json")

    with urllib.request.urlopen(req, timeout=15) as resp:
        # 201 Created attendu en cas de succès.
        resp.read()


def get_sms_balance() -> list[dict]:
    """Retourne le solde SMS (unités restantes + expiration) via l'API admin Orange.

    Renvoie une liste (un élément par pays/contrat). Lève une exception si non configuré
    ou en cas d'erreur réseau.
    """
    if not sms_enabled():
        raise RuntimeError("Orange SMS API non configurée.")

    token = _get_token()
    url = f"{ADMIN_BASE_URL}/contracts"
    if COUNTRY_CODE:
        url += f"?country={urllib.parse.quote(COUNTRY_CODE)}"

    req = urllib.request.Request(url, method="GET")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Accept", "application/json")

    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode())
