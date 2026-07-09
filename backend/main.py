"""Codéna v3 — backend FastAPI minimal avec flow OTP.

Endpoints :
  GET  /            -> statut
  GET  /health      -> healthcheck
  POST /auth/otp-send   -> génère et "envoie" un code OTP
  POST /auth/otp-verify -> vérifie le code OTP
  GET  /admin/sms-balance -> solde SMS Orange (si SMS configuré)
  GET  /docs        -> Swagger UI (fourni par FastAPI)

Le stockage OTP est en mémoire (suffisant pour la démo/test).
Pour la production, remplacer par Redis ou une base + un vrai fournisseur SMS.
"""

import os
import random
import time

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator

from sms import send_otp_sms, sms_enabled, get_sms_balance

app = FastAPI(title="Codéna API", version="3.0.0")

# --- CORS ---------------------------------------------------------------
# Autorise le frontend (codena.sn) et le dev local.
# CORS_ORIGINS peut surcharger la liste via une variable d'env (séparée par des virgules).
_default_origins = [
    "https://codena.sn",
    "https://www.codena.sn",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
_origins_env = os.getenv("CORS_ORIGINS", "")
ALLOWED_ORIGINS = (
    [o.strip() for o in _origins_env.split(",") if o.strip()]
    if _origins_env
    else _default_origins
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Config -------------------------------------------------------------
OTP_TTL_SECONDS = int(os.getenv("OTP_TTL_SECONDS", "300"))  # 5 minutes
# Par défaut, on n'expose le code dans la réponse (mode démo) que si aucun
# envoi SMS réel n'est configuré. On peut forcer via EXPOSE_OTP=0 ou 1.
_expose_env = os.getenv("EXPOSE_OTP")
if _expose_env is None:
    EXPOSE_OTP = not sms_enabled()
else:
    EXPOSE_OTP = _expose_env == "1"

# Store en mémoire : { phone: {"code": str, "expires": float} }
_otp_store: dict[str, dict] = {}


# --- Schémas Pydantic ---------------------------------------------------
class OtpSendRequest(BaseModel):
    phone: str

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        v = v.strip().replace(" ", "")
        digits = v.lstrip("+")
        if not digits.isdigit() or not (8 <= len(digits) <= 15):
            raise ValueError("Numéro de téléphone invalide")
        return v


class OtpSendResponse(BaseModel):
    ok: bool
    phone: str
    message: str
    dev_code: str | None = None


class OtpVerifyRequest(BaseModel):
    phone: str
    code: str


class OtpVerifyResponse(BaseModel):
    ok: bool
    message: str
    token: str | None = None


# --- Routes -------------------------------------------------------------
@app.get("/")
def root():
    return {"service": "Codéna API", "version": "3.0.0", "status": "live"}


@app.get("/health")
def health():
    return {"status": "ok", "sms_enabled": sms_enabled()}


@app.get("/admin/sms-balance")
def sms_balance():
    """Solde SMS Orange (unités restantes). Nécessite les identifiants Orange."""
    if not sms_enabled():
        raise HTTPException(
            status_code=503,
            detail="Orange SMS API non configurée (mode démo).",
        )
    try:
        return {"ok": True, "contracts": get_sms_balance()}
    except Exception:
        raise HTTPException(
            status_code=502, detail="Impossible de récupérer le solde SMS Orange."
        )


@app.post("/auth/otp-send", response_model=OtpSendResponse)
def otp_send(req: OtpSendRequest):
    code = f"{random.randint(0, 999999):06d}"
    _otp_store[req.phone] = {"code": code, "expires": time.time() + OTP_TTL_SECONDS}
    # Envoi SMS réel si configuré (Orange SMS API), sinon mode démo (aucun envoi).
    try:
        send_otp_sms(req.phone, code)
    except Exception:
        raise HTTPException(
            status_code=502, detail="Échec de l'envoi du SMS. Réessayez."
        )
    return OtpSendResponse(
        ok=True,
        phone=req.phone,
        message="Code OTP envoyé.",
        dev_code=code if EXPOSE_OTP else None,
    )


@app.post("/auth/otp-verify", response_model=OtpVerifyResponse)
def otp_verify(req: OtpVerifyRequest):
    entry = _otp_store.get(req.phone)
    if not entry:
        raise HTTPException(status_code=400, detail="Aucun OTP demandé pour ce numéro.")
    if time.time() > entry["expires"]:
        _otp_store.pop(req.phone, None)
        raise HTTPException(status_code=400, detail="Code OTP expiré.")
    if req.code.strip() != entry["code"]:
        raise HTTPException(status_code=400, detail="Code OTP incorrect.")

    _otp_store.pop(req.phone, None)  # usage unique
    token = f"demo-token-{req.phone}-{int(time.time())}"
    return OtpVerifyResponse(ok=True, message="Connexion réussie.", token=token)
"""Codéna v3 — backend FastAPI minimal avec flow OTP.

Endpoints :
  GET  /            -> statut
  GET  /health      -> healthcheck
  POST /auth/otp-send   -> génère et "envoie" un code OTP
  POST /auth/otp-verify -> vérifie le code OTP
  GET  /docs        -> Swagger UI (fourni par FastAPI)

Le stockage OTP est en mémoire (suffisant pour la démo/test).
Pour la production, remplacer par Redis ou une base + un vrai fournisseur SMS.
"""

import os
import random
import time

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator

from sms import send_otp_sms, sms_enabled, get_sms_balance

app = FastAPI(title="Codéna API", version="3.0.0")

# --- CORS ---------------------------------------------------------------
# Autorise le frontend (codena.sn) et le dev local.
# CORS_ORIGINS peut surcharger la liste via une variable d'env (séparée par des virgules).
_default_origins = [
    "https://codena.sn",
    "https://www.codena.sn",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
_origins_env = os.getenv("CORS_ORIGINS", "")
ALLOWED_ORIGINS = (
    [o.strip() for o in _origins_env.split(",") if o.strip()]
    if _origins_env
    else _default_origins
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Config -------------------------------------------------------------
OTP_TTL_SECONDS = int(os.getenv("OTP_TTL_SECONDS", "300"))  # 5 minutes
# Par défaut, on n'expose le code dans la réponse (mode démo) que si aucun
# envoi SMS réel n'est configuré. On peut forcer via EXPOSE_OTP=0 ou 1.
_expose_env = os.getenv("EXPOSE_OTP")
if _expose_env is None:
    EXPOSE_OTP = not sms_enabled()
else:
    EXPOSE_OTP = _expose_env == "1"

# Store en mémoire : { phone: {"code": str, "expires": float} }
_otp_store: dict[str, dict] = {}


# --- Schémas Pydantic ---------------------------------------------------
class OtpSendRequest(BaseModel):
    phone: str

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        v = v.strip().replace(" ", "")
        digits = v.lstrip("+")
        if not digits.isdigit() or not (8 <= len(digits) <= 15):
            raise ValueError("Numéro de téléphone invalide")
        return v


class OtpSendResponse(BaseModel):
    ok: bool
    phone: str
    message: str
    dev_code: str | None = None


class OtpVerifyRequest(BaseModel):
    phone: str
    code: str


class OtpVerifyResponse(BaseModel):
    ok: bool
    message: str
    token: str | None = None


# --- Routes -------------------------------------------------------------
@app.get("/")
def root():
    return {"service": "Codéna API", "version": "3.0.0", "status": "live"}


@app.get("/health")
def health():
    return {"status": "ok", "sms_enabled": sms_enabled()}


@app.get("/admin/sms-balance")
def sms_balance():
    """Solde SMS Orange (unités restantes). Nécessite les identifiants Orange."""
    if not sms_enabled():
        raise HTTPException(
            status_code=503,
            detail="Orange SMS API non configurée (mode démo).",
        )
    try:
        return {"ok": True, "contracts": get_sms_balance()}
    except Exception:
        raise HTTPException(
            status_code=502, detail="Impossible de récupérer le solde SMS Orange."
        )


@app.post("/auth/otp-send", response_model=OtpSendResponse)
def otp_send(req: OtpSendRequest):
    code = f"{random.randint(0, 999999):06d}"
    _otp_store[req.phone] = {"code": code, "expires": time.time() + OTP_TTL_SECONDS}
    # Envoi SMS réel si configuré (Twilio), sinon mode démo (aucun envoi).
    try:
        send_otp_sms(req.phone, code)
    except Exception:
        raise HTTPException(
            status_code=502, detail="Échec de l'envoi du SMS. Réessayez."
        )
    return OtpSendResponse(
        ok=True,
        phone=req.phone,
        message="Code OTP envoyé.",
        dev_code=code if EXPOSE_OTP else None,
    )


@app.post("/auth/otp-verify", response_model=OtpVerifyResponse)
def otp_verify(req: OtpVerifyRequest):
    entry = _otp_store.get(req.phone)
    if not entry:
        raise HTTPException(status_code=400, detail="Aucun OTP demandé pour ce numéro.")
    if time.time() > entry["expires"]:
        _otp_store.pop(req.phone, None)
        raise HTTPException(status_code=400, detail="Code OTP expiré.")
    if req.code.strip() != entry["code"]:
        raise HTTPException(status_code=400, detail="Code OTP incorrect.")

    _otp_store.pop(req.phone, None)  # usage unique
    token = f"demo-token-{req.phone}-{int(time.time())}"
    return OtpVerifyResponse(ok=True, message="Connexion réussie.", token=token)
