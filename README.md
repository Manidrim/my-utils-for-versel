# my-utils-for-versel

Collection de petits outils front-end déployés sur Vercel.

## Outils

- **Calculatrice** (`/calculator`) — addition, soustraction, multiplication, division, avec support clavier.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- ESLint

## Développement

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Build & lint

```bash
npm run build
npm run lint
```

## Ajouter un outil

1. Crée un dossier `src/app/<nom-outil>/` avec un `page.tsx`.
2. Ajoute une entrée dans le tableau `tools` de `src/app/page.tsx`.

## Déploiement sur Vercel

Le projet est un Next.js standard : Vercel l'auto-détecte, aucun `vercel.json` n'est nécessaire.

### Option 1 — Import depuis GitHub (recommandé)

1. Va sur [vercel.com/new](https://vercel.com/new).
2. Sélectionne le dépôt `Manidrim/my-utils-for-versel`.
3. Laisse les paramètres par défaut (Framework: **Next.js**, Build: `next build`, Output: `.next`).
4. Clique **Deploy**.

Chaque push sur `main` déclenchera un déploiement de production ; chaque autre branche ou PR aura un *Preview Deployment* automatique.

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel            # premier déploiement (preview)
vercel --prod     # déploiement production
```

### Variables d'environnement

Aucune variable n'est requise pour l'instant. Ajoute-les dans **Project Settings → Environment Variables** si besoin plus tard.
