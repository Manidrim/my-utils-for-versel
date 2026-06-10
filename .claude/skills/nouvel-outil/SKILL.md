---
name: nouvel-outil
description: >-
  Guide pas-à-pas pour ajouter un nouvel outil (page) à my-utils-for-versel en
  respectant les conventions du projet (App Router Next.js 16, styles inline,
  palette, accessibilité, locale fr-FR). À utiliser quand on demande de créer,
  scaffolder ou ajouter un nouvel outil / une nouvelle page / un nouvel
  utilitaire, ou d'enregistrer un outil sur la page d'accueil.
---

# Ajouter un nouvel outil

Ce projet est une collection d'outils front-end (Next.js 16 App Router,
TypeScript, pas de backend). Chaque outil = un dossier sous `src/app/<slug>/`
contenant une `page.tsx` (server component, exporte les `metadata`) et un
composant métier `Outil.tsx` (`"use client"`).

⚠️ **Avant de coder** : ce Next.js a des breaking changes vs ton training.
Lis le guide pertinent dans `node_modules/next/dist/docs/` et respecte les
avis de dépréciation (voir `AGENTS.md`).

## Étapes

### 1. Créer le dossier et la page serveur
`src/app/<slug>/page.tsx` :

```tsx
import type { Metadata } from "next";
import MonOutil from "./MonOutil";

export const metadata: Metadata = {
  title: "Nom de l'outil",                 // devient "Nom de l'outil · Toolbox"
  description: "Phrase courte décrivant l'outil.",
};

export default function MonOutilPage() {
  return (
    <main style={{ flex: 1 }}>
      <MonOutil />
    </main>
  );
}
```

### 2. Créer le composant métier
`src/app/<slug>/MonOutil.tsx` — commence par `"use client";`, état local via
`useState`, tous les calculs côté client. Structure de référence :
`src/app/converter/Converter.tsx`.

Trame minimale (lien retour + titre + carte) :

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const palette = {
  bg: "#FDF6F4",
  primary: "#E07B72",
  primaryHover: "#C9524A",
  dark: "#2C1A17",
  border: "#EDD9D5",
  secondary: "#7A5550",
  cardBg: "#FFFFFF",
  tabBg: "#FEF0ED",
};

export default function MonOutil() {
  const [input, setInput] = useState("");

  return (
    <div style={{ minHeight: "100%", background: palette.bg, padding: "40px 16px 80px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <div style={{ maxWidth: "540px", margin: "0 auto" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: palette.secondary, textDecoration: "none", fontSize: "14px", marginBottom: "28px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Retour
        </Link>
        <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "32px", fontWeight: 400, color: palette.dark, marginBottom: "8px" }}>
          Nom de l'outil
        </h1>
        {/* … carte + champs … */}
      </div>
    </div>
  );
}
```

### 3. Enregistrer l'outil sur la page d'accueil
Dans `src/app/page.tsx` :
- Crée un petit composant icône SVG (24×24, `stroke="currentColor"`,
  `strokeWidth="1.5"`) sur le modèle de `CalcIcon`, `ConvertIcon`, etc.
- Ajoute une entrée dans le tableau `tools` :

```tsx
{
  id: "<slug>",
  icon: <MonIcon />,
  name: "Nom de l'outil",
  description: "Phrase courte (≤ ~60 caractères).",
  tag: "Maths",            // tags existants : Maths, Éducation, Sciences, Jeu, Bientôt
  available: true,
  href: "/<slug>",
},
```

> Pour un outil pas encore prêt : `available: false`, `tag: "Bientôt"`, et
> **pas** de `href` (voir l'entrée `timer`).

### 4. Mettre à jour la documentation
- `README.md` : ajoute une ligne dans la liste **Outils**.
- `PO_BRIEF.md` : **obligatoire** (voir `AGENTS.md`). Mets à jour le tableau
  *Statut des Fonctionnalités*, la section *Fonctionnalités Existantes*,
  ajoute une ligne à *Historique des Versions* et à *Notes & Décisions* si
  une décision a été prise.

### 5. Vérifier
```bash
npm run lint
npm run build
```

## Conventions à respecter (voir aussi la skill `regles-metier`)

- **Styles inline** (objets `style={{…}}`), pas de Tailwind pour les nouveaux
  outils : c'est le style retenu (cf. Calculatrice/Conversions/Multiplication).
  Les anciens outils en Tailwind (`percentage`) sont une dette à résorber
  (P002), ne pas l'imiter.
- **Palette** : utiliser exactement les couleurs ci-dessus.
- **Polices** (variables CSS définies dans `layout.tsx`) :
  `--font-dm-serif` (titres), `--font-dm-sans` (texte),
  `--font-jetbrains-mono` (chiffres/résultats).
- **Locale fr-FR** : séparateur décimal = virgule. Parser une saisie avec
  `parseFloat(input.replace(",", "."))` ; afficher avec
  `value.toLocaleString("fr-FR", { … })`.
- **Calcul réactif** : pas de bouton « Calculer » — le résultat se dérive de
  l'état à chaque frappe (cf. Conversions, dictation-success).
- **Accessibilité** : `aria-live="polite"` (ou `role="alert"` pour les
  erreurs) sur le résultat, `aria-label`/`<label htmlFor>` sur les champs,
  rôles sémantiques (`role="tablist"`/`"tab"` pour des onglets).
- **Hydratation** : la valeur initiale rendue serveur et client doit être
  identique (pas de `Math.random()`/`Date.now()` au premier rendu — cf. la
  première question déterministe du jeu de multiplication).
