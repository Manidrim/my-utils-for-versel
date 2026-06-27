# my-utils-for-versel

> Collection d'outils front-end simples et accessibles, déployés sur Vercel.

## 🛠 Outils Disponibles

| Outil | Description | Lien |
|-------|-------------|------|
| **Calculatrice** | Calculs de base (+, -, *, /) avec historique et support clavier | [/calculator](https://my-utils-for-versel.vercel.app/calculator) |
| **Pourcentages** | Calcul de pourcentages simples | [/percentage](https://my-utils-for-versel.vercel.app/percentage) |
| **Réussite à la dictée** | Calcul automatique du pourcentage de réussite | [/dictation-success](https://my-utils-for-versel.vercel.app/dictation-success) |
| **Conversions** | Conversion d'unités (longueurs, masse, températures, devises) | [/converter](https://my-utils-for-versel.vercel.app/converter) |
| **Tables de multiplication** | Jeu éducatif pour apprendre les tables | [/multiplication](https://my-utils-for-versel.vercel.app/multiplication) |
| **Tables d'addition** | Jeu éducatif pour apprendre les additions | [/addition](https://my-utils-for-versel.vercel.app/addition) |

*Plus d'outils à venir ! Voir [PO_BRIEF.md](./PO_BRIEF.md) pour la feuille de route.*

## 🎯 Objectifs du Projet

- **Simplicité** : Interface intuitive et sans friction
- **Performance** : Temps de chargement rapides, code optimisé
- **Accessibilité** : Respect des standards WCAG, design inclusif
- **Maintenabilité** : Code propre, documenté et facile à étendre
- **Privacy-first** : Aucune collecte de données personnelles

## 📦 Stack Technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| **Next.js** | 16.2.4 | Framework React (App Router) |
| **React** | 19.2.4 | Bibliothèque UI |
| **TypeScript** | ^5 | Typage statique |
| **Tailwind CSS** | v4 | Styling utility-first |

## 🚀 Développement

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
npm install
```

### Lancer le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## 🏗 Build & Lint

```bash
npm run build
npm run lint
```

## ✨ Ajouter un nouvel outil

1. Créez un dossier `src/app/<nom-outil>/` avec un fichier `page.tsx`
2. Ajoutez une entrée dans le tableau `tools` de `src/app/page.tsx`
3. Suivez les conventions de style et d'accessibilité du projet
4. Mettez à jour `PO_BRIEF.md` avec les nouvelles informations

*Voir [AGENTS.md](./AGENTS.md) pour les règles spécifiques aux agents IA.*

## 🌐 Déploiement sur Vercel

Le projet est un projet Next.js standard : Vercel l'auto-détecte, aucun `vercel.json` n'est nécessaire.

### Option 1 — Import depuis GitHub (recommandé)

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Sélectionnez le dépôt `Manidrim/my-utils-for-versel`
3. Laissez les paramètres par défaut (Framework: **Next.js**, Build: `next build`, Output: `.next`)
4. Cliquez **Deploy**

Chaque push sur `main` déclenchera un déploiement de production ; chaque autre branche ou PR aura un *Preview Deployment* automatique.

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel            # premier déploiement (preview)
vercel --prod     # déploiement production
```

### Variables d'environnement

Aucune variable n'est requise pour l'instant. Ajoutez-les dans **Project Settings → Environment Variables** si besoin plus tard.

## 📚 Documentation

- [PO_BRIEF.md](./PO_BRIEF.md) — Document de référence complet avec feuille de route et points d'amélioration
- [AGENTS.md](./AGENTS.md) — Règles pour les agents IA contribuant au projet

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Forker le dépôt
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commiter vos changements (`git commit -m 'feat: add amazing feature'`)
4. Pousser vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

*Assurez-vous de mettre à jour `PO_BRIEF.md` avec vos changements !*

## 📄 Licence

Ce projet est sous licence MIT — voir [LICENSE](./LICENSE) pour plus de détails.
