# Codéna v3

Application de démonstration avec un parcours utilisateur testable de bout en bout :
accueil → connexion par code OTP → dashboard.

```
CODENA/
├── web/         Frontend React + Vite
├── backend/     API FastAPI (flow OTP)
└── render.yaml  Blueprint de déploiement Render (optionnel)
```

## Lancer en local

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# Swagger : http://localhost:8000/docs
```

### Frontend (Vite)

```bash
cd web
npm install
echo "VITE_API_URL=http://localhost:8000" > .env   # pointe vers le backend local
npm run dev        # http://localhost:5173
```

## Endpoints backend

| Méthode | Chemin                | Description                              |
| ------- | --------------------- | ---------------------------------------- |
| GET     | `/health`             | Healthcheck (+ `sms_enabled`)            |
| GET     | `/docs`               | Swagger UI                               |
| POST    | `/auth/otp-send`      | `{"phone": "221771234567"}`              |
| POST    | `/auth/otp-verify`    | `{"phone": "...", "code": "123456"}`     |
| GET     | `/admin/sms-balance`  | Solde SMS Orange (si SMS configuré)      |

En mode démo, `/auth/otp-send` renvoie le code dans `dev_code` pour faciliter les tests.
Mettre la variable d'environnement `EXPOSE_OTP=0` pour désactiver ce comportement en production.

## Tests

```bash
cd backend
pip install -r requirements-dev.txt
pytest -q        # 9 tests couvrant le flow OTP
```

## Déploiement Render

Deux services web depuis ce dépôt Git :

**Backend** (`codena-backend`)
- Root Directory : `backend`
- Build : `pip install -r requirements.txt`
- Start : `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Env : `CORS_ORIGINS=https://codena.sn,https://www.codena.sn`

**Frontend** (`codena-web`, site statique)
- Root Directory : `web`
- Build : `npm install && npm run build`
- Publish Directory : `dist`
- Env : `VITE_API_URL=https://codena-backend.onrender.com`
- Rewrite rule (SPA) : `/*` → `/index.html`

Le fichier `render.yaml` automatise cette configuration si tu utilises un Blueprint Render.
Le domaine custom `codena.sn` reste inchangé côté frontend.
