# Formulaire de contact — Guide de configuration

## Variables d'environnement requises

Fichier `.env` (local) ou **Vercel → Settings → Environment Variables** (production) :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=giusmili67@gmail.com
CONTACT_EMAIL_FROM=TechnoSchool LGC <onboarding@resend.dev>
```

---

## Test en local

### 1. Créer un compte Resend

- Aller sur [resend.com](https://resend.com)
- Créer un compte avec l'adresse **giusmili67@gmail.com**

> En mode gratuit sans domaine vérifié, Resend impose `onboarding@resend.dev` comme adresse `FROM` et n'accepte d'envoyer qu'à l'adresse avec laquelle vous vous êtes inscrit. En vous inscrivant avec `giusmili67@gmail.com`, vous recevrez bien les mails dans votre boîte.

### 2. Récupérer la clé API

Dashboard Resend → **API Keys** → **Create API Key** → copier la clé `re_xxxx...`

Mettre à jour le `.env` :

```env
RESEND_API_KEY=re_votre_vraie_cle_ici
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir le formulaire dans le navigateur, soumettre → le mail arrive sur `giusmili67@gmail.com`.

---

## Déploiement sur Vercel

Dans **Vercel → Settings → Environment Variables**, ajouter les 3 variables :

| Variable | Valeur |
|---|---|
| `RESEND_API_KEY` | Clé `re_xxxx` depuis resend.com |
| `CONTACT_EMAIL_TO` | `giusmili67@gmail.com` |
| `CONTACT_EMAIL_FROM` | `TechnoSchool LGC <onboarding@resend.dev>` |

Redéployer après avoir ajouté les variables.

---

## Passer à un domaine vérifié (production)

Une fois votre domaine vérifié dans le dashboard Resend :

1. Mettre à jour `CONTACT_EMAIL_FROM` :
   ```
   TechnoSchool LGC <noreply@votre-domaine.fr>
   ```
2. Mettre à jour la variable sur Vercel et redéployer.

Cela rend les mails plus professionnels et améliore la délivrabilité (moins de risque de tomber en spam).

---

## Architecture de sécurité

| Mesure | Implémentation |
|---|---|
| Données jamais envoyées côté client | `fetch("/api/contact")` → route API Next.js serveur |
| Validation des champs | Zod côté serveur (types, longueurs, regex) |
| Anti-spam honeypot | Champ `website` invisible — si rempli, requête ignorée silencieusement |
| Limites de taille | nom 100 · email 254 · téléphone 20 · message 2000 caractères |
| Échappement HTML | Toutes les données passent par `esc()` avant insertion dans le template mail |
| Clés sensibles | Jamais exposées au navigateur — lues uniquement depuis `process.env` côté serveur |
| `Reply-To` | Email du client → répondre au mail contacte directement le demandeur |
