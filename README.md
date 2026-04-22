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
