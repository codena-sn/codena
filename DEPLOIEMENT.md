# Mise en ligne de Codéna v3 — guide en 3 étapes

L'application est **prête et testée** (build Vite OK, backend OTP OK).
Il reste 3 étapes à faire depuis ta machine, car elles nécessitent tes comptes
GitHub et Render.

---

## Étape 1 — Pousser le code sur GitHub

Ouvre un terminal dans le dossier `CODENA`.

> ⚠️ Un dépôt git a été initialisé automatiquement mais peut être verrouillé
> (limitation technique). Le plus simple : repartir propre.

```bash
cd ~/Documents/Claude/Projects/CODENA

# repartir d'un dépôt git propre
rm -rf .git
git init
git add -A
git commit -m "Codéna v3"

# crée un dépôt vide sur github.com (bouton "New repository"), puis :
git remote add origin https://github.com/TON-COMPTE/codena.git
git branch -M main
git push -u origin main
```

---

## Étape 2 — Configurer les 2 services sur Render

Sur https://dashboard.render.com → **New** → connecte ton dépôt GitHub.

### Service 1 — Backend (`codena-backend`)
- **Type** : Web Service
- **Root Directory** : `backend`
- **Build Command** : `pip install -r requirements.txt`
- **Start Command** : `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Variables d'environnement** :
  - `CORS_ORIGINS` = `https://codena.sn,https://www.codena.sn`

### Service 2 — Frontend (`codena-web`)
- **Type** : Static Site
- **Root Directory** : `web`
- **Build Command** : `npm install && npm run build`
- **Publish Directory** : `dist`
- **Variables d'environnement** :
  - `VITE_API_URL` = `https://codena-backend.onrender.com`
- **Redirects/Rewrites** : `Source /*` → `Destination /index.html` (type **Rewrite**)

> Ton domaine `codena.sn` reste attaché au service frontend, **ne change rien** à sa config DNS.

> Astuce : le fichier `render.yaml` à la racine permet de tout créer d'un coup
> via **New → Blueprint** au lieu de configurer à la main.

---

## Étape 3 — Vérifier

Une fois les deux services déployés :

```bash
# le backend répond
curl https://codena-backend.onrender.com/health
# -> {"status":"ok","sms_enabled":false}

# l'OTP fonctionne
curl -X POST https://codena-backend.onrender.com/auth/otp-send \
  -H "Content-Type: application/json" -d '{"phone":"221771234567"}'
```

Puis ouvre https://codena.sn → **Connexion OTP** → saisis un numéro → **Envoyer l'OTP**.
En mode démo, le code s'affiche à l'écran pour que tu puisses le saisir et valider
le parcours jusqu'au dashboard.

---

## (Optionnel) Activer le vrai envoi de SMS — Orange SMS API (Sénégal)

Le mode démo affiche le code à l'écran. Pour envoyer un **vrai SMS** via Orange :

1. Crée un compte sur https://developer.orange.com → crée une application →
   souscris à l'API **SMS** pour le **Sénégal** → achète un bundle (starter à bas prix).
2. Récupère `Client ID` et `Client secret` dans la section **MyApps**.
3. Sur le service backend Render, ajoute les variables d'environnement :
   - `ORANGE_CLIENT_ID`
   - `ORANGE_CLIENT_SECRET`
   - (optionnel) `ORANGE_SENDER_ADDRESS` = `tel:+2210000` (déjà la valeur par défaut pour le Sénégal)
   - (optionnel) `ORANGE_SENDER_NAME` = un nom d'expéditeur ≤ 11 caractères, **préalablement
     white-listé par Orange** (sinon l'envoi échoue avec une erreur 400).
4. Redéploie. L'app passe automatiquement en envoi SMS réel et cesse d'exposer le code
   dans la réponse API.

> Note : le compte Orange doit avoir un **bundle actif avec un solde positif**,
> sinon l'API renvoie une erreur. Le débit est limité à 5 SMS/seconde.
> L'implémentation (OAuth2 + envoi) est dans `backend/sms.py`.
