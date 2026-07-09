"""Tests du flow OTP (FastAPI TestClient).

Lancer :  cd backend && pip install -r requirements-dev.txt && pytest -q
"""

import time

from fastapi.testclient import TestClient

import main
from main import app

client = TestClient(app)

PHONE = "221771234567"


def _send_and_get_code(phone=PHONE):
    r = client.post("/auth/otp-send", json={"phone": phone})
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["ok"] is True
    # En mode démo (aucun SMS configuré), le code est renvoyé.
    return data["dev_code"]


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_otp_send_ok():
    code = _send_and_get_code()
    assert code and len(code) == 6 and code.isdigit()


def test_otp_verify_success():
    code = _send_and_get_code()
    r = client.post("/auth/otp-verify", json={"phone": PHONE, "code": code})
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["ok"] is True
    assert body["token"]


def test_otp_verify_wrong_code():
    _send_and_get_code()
    r = client.post("/auth/otp-verify", json={"phone": PHONE, "code": "000000"})
    assert r.status_code == 400


def test_otp_verify_without_send():
    r = client.post("/auth/otp-verify", json={"phone": "221770000000", "code": "123456"})
    assert r.status_code == 400


def test_otp_single_use():
    code = _send_and_get_code()
    ok = client.post("/auth/otp-verify", json={"phone": PHONE, "code": code})
    assert ok.status_code == 200
    # deuxième tentative avec le même code -> refusée (usage unique)
    again = client.post("/auth/otp-verify", json={"phone": PHONE, "code": code})
    assert again.status_code == 400


def test_otp_expired():
    _send_and_get_code()
    # force l'expiration
    main._otp_store[PHONE]["expires"] = time.time() - 1
    r = client.post("/auth/otp-verify", json={"phone": PHONE, "code": "123456"})
    assert r.status_code == 400
    assert "expir" in r.json()["detail"].lower()


def test_invalid_phone():
    r = client.post("/auth/otp-send", json={"phone": "abc"})
    assert r.status_code == 422


def test_sms_balance_demo_mode():
    # sans identifiants Orange -> 503
    r = client.get("/admin/sms-balance")
    assert r.status_code == 503
