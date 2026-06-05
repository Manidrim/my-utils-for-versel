# **PO Brief - my-utils-for-versel**
*Document de référence pour les propositions d'amélioration - Version 1.0 - 2026-05-06*

---

## 📌 **Sommaire**
1. [Contexte Projet](#-contexte-projet)
2. [État Actuel](#-état-actuel)
3. [Stack Technique](#-stack-technique)
4. [Architecture & Structure](#-architecture--structure)
5. [Fonctionnalités Existantes](#-fonctionnalités-existantes)
6. [Points d'Amélioration Identifiés](#-points-damélioration-identifiés)
7. [Template de Proposition](#-template-de-proposition)
8. [Critères de Priorisation](#-critères-de-priorisation)
9. [Ressources & Contacts](#-ressources--contacts)

---

## 🎯 **Contexte Projet**

### **Objectif Principal**
Créer une collection d'outils front-end simples, accessibles et déployés sur Vercel, répondant à des besoins quotidiens (calculs, conversions, productivité).

### **Valeurs Clés**
- **Simplicité** : Interface intuitive, sans friction
- **Performance** : Temps de chargement rapides, code optimisé
- **Accessibilité** : Respect des standards WCAG, design inclusif
- **Maintenabilité** : Code propre, documenté, facile à étendre
- **Privacy-first** : Aucune collecte de données personnelles (mentionné dans le footer)

### **Public Cible**
- Utilisateurs grand public cherchant des outils rapides
- Étudiants (outils éducatifs comme le calcul de pourcentage de réussite)
- Professionnels ayant besoin de calculs ponctuels

### **URL de Production**
🔗 [https://my-utils-for-versel.vercel.app](https://my-utils-for-versel.vercel.app)

---

## 📊 **État Actuel**

### **Statistiques Projet**
| Métrique | Valeur |
|----------|--------|
| **Étoiles GitHub** | 1 |
| **Forks** | 0 |
| **Issues Ouvertes** | 3 |
| **Pull Requests** | 1 |
| **Langages** | TypeScript (97.5%), JavaScript (1.4%), CSS (1.1%) |
| **Dernier Commit** | 2026-05-06 |
| **Taille Bundle** | À mesurer (Next.js 16) |

### **Statut des Fonctionnalités**
| Outil | Statut | URL | Complexité |
|-------|--------|-----|------------|
| Calculatrice | ✅ **Disponible** | `/calculator` | Élevée (historique, clavier) |
| Pourcentages | ✅ **Disponible** | `/percentage` | Moyenne |
| Pourcentage de réussite (dictée) | ✅ **Disponible** | `/dictation-success` | Moyenne |
| Conversions | ✅ **Disponible** | `/converter` | Moyenne (4 catégories, taux statiques) |
| Chronomètre | ⏳ **Planifié** | `/timer` | À définir |

### **Traffic & Analytics**
- **À configurer** : Aucun outil d'analytics intégré (respect de la privacy)
- **Suggestion** : Utiliser [Vercel Analytics](https://vercel.com/docs/analytics) (anonyme) ou [Plausible](https://plausible.io/) (open-source, privacy-friendly)

---

## 🛠 **Stack Technique**

### **Frontend**
| Technologie | Version | Rôle |
|-------------|---------|------|
| **Next.js** | 16.2.4 | Framework React (App Router) |
| **React** | 19.2.4 | Bibliothèque UI |
| **TypeScript** | ^5 | Typage statique |
| **Tailwind CSS** | v4 | Styling utility-first |
| **PostCSS** | - | Préprocesseur CSS |

### **Outils de Développement**
| Outil | Version | Usage |
|-------|---------|-------|
| **ESLint** | ^9 | Linting (config Next.js) |
| **eslint-config-next** | 16.2.4 | Règles spécifiques Next.js |

### **Infrastructure**
- **Hébergement** : Vercel (déploiement automatique depuis GitHub)
- **CI/CD** : GitHub Actions (workflows existants pour Mistral AI)
- **Nom de domaine** : Sous-domaine Vercel par défaut (`*.vercel.app`)

### **Polices Utilisées**
- **DM Sans** (Google Fonts) : Texte principal
- **DM Serif Display** (Google Fonts) : Titres
- **JetBrains Mono** (Google Fonts) : Affichage numérique (calculatrice)

### **Palettes de Couleurs**
| Couleur | Code Hex | Usage |
|---------|----------|-------|
| Blanc cassé | `#FDF6F4` | Background principal |
| Rose clair | `#FEF0ED` | Background cartes/accents |
| Rose | `#E07B72` | Couleur primaire |
| Rose foncé | `#C9524A` | Hover/accents |
| Marron clair | `#EDD9D5` | Bordures |
| Marron | `#7A5550` | Texte secondaire |
| Marron foncé | `#2C1A17` | Texte principal |

---

## 🗂 **Architecture & Structure**

### **Arborescence Projet**
```
my-utils-for-versel/
├── public/                  # Assets statiques
│   └── favicon.ico
├── src/
│   └── app/
│       ├── calculator/      # Outil : Calculatrice
│       │   ├── page.tsx     # Page principale
│       │   └── Calculator.tsx # Composant métier
│       ├── dictation-success/ # Outil : Pourcentage de réussite
│       │   ├── page.tsx
│       │   └── DictationSuccessCalculator.tsx
│       ├── percentage/      # Outil : Pourcentages
│       │   ├── page.tsx
│       │   └── PercentageCalculator.tsx
│       ├── components/      # Composants partagés
│       │   ├── Footer.tsx
│       │   ├── HeroCTA.tsx
│       │   ├── NavBar.tsx
│       │   └── ToolCard.tsx
│       ├── globals.css      # Styles globaux
│       ├── layout.tsx       # Layout racine
│       └── page.tsx         # Page d'accueil (liste outils)
├── .github/
│   └── workflows/           # GitHub Actions
├── .gitignore
├── AGENTS.md               # Règles pour les agents IA
├── CLAUDE.md               # Référence à AGENTS.md
├── LICENSE                 # MIT License
├── README.md               # Documentation
├── eslint.config.mjs       # Config ESLint
├── next.config.ts          # Config Next.js
├── package.json
├── postcss.config.mjs      # Config PostCSS
└── tsconfig.json           # Config TypeScript
```

### **Conventions de Code**
- **Nommage** : PascalCase pour les composants, camelCase pour les variables/fonctions
- **Styling** : Inline styles (pour les composants critiques) + Tailwind CSS (pour les outils secondaires)
- **Typage** : TypeScript strict, interfaces pour les props
- **Internationalisation** : Format français (virgule comme séparateur décimal)
- **Responsive** : Grid/Flexbox, pas de media queries explicites (design mobile-first)

### **Flux de Données**
```
User → Next.js App Router → Composant Outil → État Local (useState) → Affichage
```
- **Pas de backend** : Tous les calculs sont effectués côté client
- **Pas de base de données** : État persistant uniquement via `localStorage` (à implémenter)

---

## ✨ **Fonctionnalités Existantes**

### **1. Calculatrice (`/calculator`)**
**Fonctionnalités** :
- Opérations de base (+, -, *, /)
- Support des décimales (virgule)
- Historique des 6 derniers calculs (cliquables pour réutilisation)
- Support clavier (chiffres, opérateurs, Entrée, Effacer)
- Gestion des erreurs (affichage "Erreur")
- Formatage français (espaces comme séparateurs de milliers)

**Points Forts** :
- Design soigné avec sidebar d'historique
- Animations fluides (boutons, hover)
- Accessibilité (aria-live pour l'affichage)

**Code Clé** :
- `Calculator.tsx` : Logique métier + UI
- Utilisation de `Function()` pour l'évaluation (à remplacer par un parser mathématique pour la sécurité)

---

### **2. Pourcentages (`/percentage`)**
**Fonctionnalités** :
- Calcul de pourcentage (nombre * pourcentage / 100)
- Inputs pour le nombre et le pourcentage
- Affichage du résultat

**Points à Améliorer** :
- **Design incohérent** : Utilise Tailwind CSS (`bg-gray-100`, `p-6`) vs le style custom des autres outils
- **Fonctionnalité limitée** : Un seul type de calcul (manque : calcul de remises, taxes, variations)
- **Pas de gestion d'erreur** : Message basique "Veuillez entrer des nombres valides"
- **Pas d'historique**

---

### **3. Pourcentage de Réussite (`/dictation-success`)**
**Fonctionnalités** :
- Calcul **automatique** du nombre de mots justes (total - erreurs) dès la saisie (sans bouton)
- Calcul **réactif** du pourcentage de réussite dès que les deux champs sont valides
- **Tableau des 30 premières erreurs** : dès qu'un nombre total de mots valide est saisi, un tableau affiche pour 1 à 30 erreurs (plafonné au total) le nombre de mots justes, le pourcentage d'erreur et le pourcentage de réussite (issue #33)
- Affichage détaillé du calcul (format `X.XX %`)
- Messages d'erreur contextuels (champ invalide, total ≤ 0, erreurs hors plage)
- Accessibilité : résultat/erreur annoncés via `aria-live` (+ `role="alert"`)

**Points à Améliorer** :
- **Design incohérent** : Même problème que l'outil Pourcentages (Tailwind vs custom)

---

### **4. Conversions (`/converter`)**
**Fonctionnalités** :
- 4 catégories : Longueurs (8 unités), Masse (5 unités), Températures (C/F/K), Devises (EUR/USD/GBP)
- Calcul **réactif** à la saisie (sans bouton Calculer)
- Bouton d'inversion rapide des unités (source ↔ cible)
- Formatage français des nombres (locale `fr-FR`)
- Taux de change statiques pour la V1 (EUR/USD : 1,08 · EUR/GBP : 0,86)
- Accessibilité : `aria-live="polite"` sur le résultat, labels explicites

**Points Forts** :
- Style inline cohérent avec la Calculatrice
- Sélecteurs d'unités lisibles (labels complets)
- Disclaimer taux statiques visible dans la catégorie Devises

---

### **5. Page d'Accueil**
**Fonctionnalités** :
- Liste des outils sous forme de cartes (`ToolCard`)
- Section héro avec CTA
- Navigation via `NavBar` et `Footer`

**Points Forts** :
- Design cohérent et esthétique
- Animations de hover sur les cartes
- Structure responsive (3 colonnes)

---

## 🚀 **Points d'Amélioration Identifiés**

### **🔴 Priorité Élevée (Critiques)**

| ID | Problème | Impact | Solution Proposée | Effort | Valeur |
|----|----------|--------|-------------------|--------|--------|
| **P001** | **Sécurité : Utilisation de `Function()` dans la calculatrice** | ⚠️ **Risque XSS** | Remplacer par un parser mathématique (ex: [math.js](https://mathjs.org/)) | Moyen | ⭐⭐⭐⭐⭐ |
| **P002** | **Incohérence de design entre outils** | 🎨 **Expérience utilisateur fragmentée** | Unifier le styling (Tailwind ou custom) | Élevé | ⭐⭐⭐⭐ |
| **P003** | **Pas de tests** | 🐛 **Maintenabilité réduite** | Ajouter Jest/React Testing Library + tests E2E (Cypress) | Élevé | ⭐⭐⭐⭐ |
| **P004** | **Accessibilité : Manque de labels ARIA** | ♿ **Non conforme WCAG** | Ajouter `aria-label`, `aria-live`, rôles sémantiques | Faible | ⭐⭐⭐ |

---

### **🟡 Priorité Moyenne (Améliorations)**

| ID | Problème | Impact | Solution Proposée | Effort | Valeur |
|----|----------|--------|-------------------|--------|--------|
| **P005** | **Pas de persistance de l'historique** | 💾 **Données perdues au rafraîchissement** | Utiliser `localStorage` pour sauvegarder l'historique | Faible | ⭐⭐⭐ |
| **P006** | **Fonctionnalités manquantes dans l'outil Pourcentages** | 📊 **Utilité limitée** | Ajouter : calcul de remises, taxes, variations | Moyen | ⭐⭐⭐⭐ |
| **P007** | **Pas de mode sombre** | 🌙 **Confort visuel** | Implémenter un toggle thème clair/sombre | Moyen | ⭐⭐⭐ |
| **P008** | **SEO basique** | 🔍 **Visibilité limitée** | Ajouter balises meta dynamiques, sitemap, robots.txt | Faible | ⭐⭐⭐ |
| **P009** | **Pas de favicon personnalisé** | 🎨 **Identité visuelle** | Créer une favicon unique (ex: icône Toolbox) | Faible | ⭐⭐ |
| **P010** | **Outils "Bientôt" non fonctionnels** | 🚧 **Attentes utilisateurs** | Implémenter Conversions et Chronomètre OU les masquer | Moyen | ⭐⭐⭐ |

---

### **🟢 Priorité Faible (Nice-to-Have)**

| ID | Problème | Impact | Solution Proposée | Effort | Valeur |
|----|----------|--------|-------------------|--------|--------|
| **P011** | **Pas d'internationalisation (i18n)** | 🌍 **Public international** | Ajouter Next.js i18n (FR/EN) | Élevé | ⭐⭐ |
| **P012** | **Pas de PWA** | 📱 **Expérience mobile** | Configurer Next.js PWA (manifest, service worker) | Moyen | ⭐⭐ |
| **P013** | **Pas de partage social** | 📤 **Viralité** | Ajouter boutons de partage (Twitter, LinkedIn) | Faible | ⭐⭐ |
| **P014** | **Design system incomplet** | 🎨 **Cohérence future** | Créer un design system (Storybook) | Élevé | ⭐⭐ |
| **P015** | **Pas de documentation utilisateur** | 📖 **Adoption** | Ajouter une page `/docs` ou `/help` | Moyen | ⭐⭐ |

---

## 📝 **Template de Proposition**

*À utiliser pour toute nouvelle proposition d'amélioration ou de fonctionnalité.*

```markdown
### Proposition : [Titre Court et Clair]

**ID** : [PXXX] (ex: P001)
**Auteur** : [Nom/Équipe]
**Date** : [YYYY-MM-DD]
**Priorité** : [🔴 Élevée / 🟡 Moyenne / 🟢 Faible]

---

#### 🎯 **Contexte**
- **Problème** : [Décrivez le problème actuel]
- **Impact** : [Impact sur les utilisateurs/métriques]
- **Lien avec les objectifs projet** : [Comment cela aligne avec les valeurs clés]

#### 📋 **Objectif**
- **Résultat attendu** : [Ce que l'on veut atteindre]
- **Critères d'acceptation** :
  - [ ] [Critère 1]
  - [ ] [Critère 2]
  - [ ] [Critère 3]

#### 🛠 **Solution Proposée**
- **Approche technique** : [Détails de l'implémentation]
- **Alternatives envisagées** : [Autres options et pourquoi rejetées]
- **Dépendances** : [Nouvelles libs/outils nécessaires]

#### 📊 **Analyse**
| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| Performance | [Valeur] | [Valeur] | [%] |
| Satisfaction Utilisateur | [Valeur] | [Valeur] | [%] |
| Maintenance | [Valeur] | [Valeur] | [%] |

#### ⏱ **Estimation**
- **Effort** : [Faible / Moyen / Élevé]
- **Temps estimé** : [X jours/semaines]
- **Ressources nécessaires** : [Développeurs, Designers, etc.]

#### 🔗 **Liens Utiles**
- [Lien vers l'issue GitHub]
- [Lien vers la documentation]
- [Lien vers des exemples]

#### ✅ **Validation**
- [ ] Approuvé par le PO
- [ ] Revu par l'équipe technique
- [ ] Priorisé dans le backlog
```

---

## ⚖️ **Critères de Priorisation**

### **Matrice de Priorisation**
Utilisez ce tableau pour évaluer chaque proposition :

| Critère | Poids | Échelle (1-5) | Description |
|---------|-------|---------------|-------------|
| **Impact Utilisateur** | 30% | 1 (Faible) → 5 (Élevé) | Combien d'utilisateurs sont affectés ? |
| **Valeur Métier** | 25% | 1 (Faible) → 5 (Élevé) | Alignement avec les objectifs projet |
| **Effort Technique** | 20% | 1 (Faible) → 5 (Élevé) | Complexité de l'implémentation |
| **Urgence** | 15% | 1 (Basse) → 5 (Critique) | Risque ou opportunité temporelle |
| **Maintenabilité** | 10% | 1 (Difficile) → 5 (Facile) | Facilité à maintenir à long terme |

**Score Total** = (Impact × 0.3) + (Valeur × 0.25) + (1/Effort × 0.2) + (Urgence × 0.15) + (Maintenabilité × 0.1)

### **Exemple de Calcul**
| Proposition | Impact | Valeur | Effort | Urgence | Maintenabilité | **Score** |
|-------------|--------|--------|--------|---------|---------------|-----------|
| P001 (Sécurité) | 5 | 5 | 3 | 5 | 4 | **4.45** |
| P002 (Design) | 4 | 4 | 4 | 3 | 3 | **3.55** |
| P011 (i18n) | 3 | 2 | 5 | 2 | 2 | **2.15** |

---

## 📚 **Ressources & Contacts**

### **Documentation**
- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

### **Outils Recommandés**
| Besoin | Outil | Lien |
|--------|-------|------|
| **Parser Mathématique** | math.js | [https://mathjs.org/](https://mathjs.org/) |
| **Tests Unitaires** | Jest + React Testing Library | [https://jestjs.io/](https://jestjs.io/) |
| **Tests E2E** | Cypress | [https://www.cypress.io/](https://www.cypress.io/) |
| **Accessibilité** | axe-core | [https://github.com/dequelabs/axe-core](https://github.com/dequelabs/axe-core) |
| **SEO** | next-sitemap | [https://github.com/iamvishnusankar/next-sitemap](https://github.com/iamvishnusankar/next-sitemap) |
| **Analytics** | Plausible | [https://plausible.io/](https://plausible.io/) |

### **Contacts**
| Rôle | Nom | GitHub | Email |
|------|-----|-------|-------|
| **Mainteneur** | Manidrim | [@Manidrim](https://github.com/Manidrim) | [À compléter] |
| **PO** | [À désigner] | [@PO] | [À compléter] |
| **Tech Lead** | [À désigner] | [@TechLead] | [À compléter] |

---

## 📅 **Feuille de Route (Roadmap)**

### **Q2 2026 (Mai - Juin)**
- [ ] **P001** : Remplacer `Function()` par math.js (Sécurité)
- [ ] **P004** : Audit accessibilité complet
- [ ] **P002** : Unification du design (Tailwind vs Custom)

### **Q3 2026 (Juillet - Septembre)**
- [ ] **P003** : Mise en place des tests (Jest + Cypress)
- [ ] **P005** : Persistance de l'historique (localStorage)
- [ ] **P006** : Amélioration de l'outil Pourcentages

### **Q4 2026 (Octobre - Décembre)**
- [ ] **P007** : Mode sombre
- [ ] **P008** : Optimisation SEO
- [ ] **P010** : Implémentation des outils "Bientôt"

---

## 🔍 **Checklist pour le PO**

### **Avant de Proposer une Amélioration**
- [ ] J'ai vérifié que la proposition n'existe pas déjà dans ce document
- [ ] J'ai consulté les [issues GitHub](https://github.com/Manidrim/my-utils-for-versel/issues)
- [ ] J'ai évalué l'impact et l'effort avec l'équipe technique
- [ ] J'ai priorisé la proposition selon la matrice de priorisation
- [ ] J'ai rempli le template de proposition

### **Avant de Valider une Proposition**
- [ ] La proposition est alignée avec les valeurs du projet
- [ ] Les critères d'acceptation sont clairs et mesurables
- [ ] L'effort estimé est réaliste
- [ ] Les dépendances sont identifiées et approuvées
- [ ] La proposition a été revue par l'équipe technique

---

## 📌 **Notes & Décisions**

### **Décisions Prises**
| Date | Décision | Contexte | Responsable |
|------|----------|----------|-------------|
| 2026-05-06 | **Utilisation de math.js pour la calculatrice** | Remplacement de `Function()` pour la sécurité | PO |
| 2026-05-06 | **Unification sur Tailwind CSS** | Cohérence du design, maintenance simplifiée | PO |
| 2026-05-18 | **Refactor des workflows en reusable workflows** | Réutilisabilité de l'automatisation Mistral/PO sur tout projet (export V1 ultérieur) | PO |
| 2026-05-18 | **Plafond de 2 issues PO ouvertes + chaîne auto + anti-doublon** | Limiter la file de validation ; label dédié `po-generated` | PO |
| 2026-05-18 | **Convention de nommage `po-*` / `reusable-po-*`** | Nommage clair et cohérent des workflows (fin des suffixes `_handler`/`-v2`) | PO |
| 2026-05-18 | **Correction du prompt de réécriture (`reusable-po-rewrite.yml`)** | Le prompt ignorait titre/description/réponses de l'issue : injection du contexte complet (issue + échanges de clarification) pour une réécriture pertinente | Coding Agent |
| 2026-05-18 | **Rebuild en 2 workflows (`po-autocreate.yml`, `po-clarify.yml`)** | Simplification : `MISTRAL_API_KEY` seul secret, prompts externalisés dans `.github/prompts/`, suppression de tous les `reusable-po-*.yml`, de `PO_TRIGGER_TOKEN` et `MISTRAL_MODEL_ID` | Coding Agent |

### **Questions Ouvertes**
1. **Faut-il ajouter un backend ?**
   - *Pour* : Persistance des données, fonctionnalités avancées
   - *Contre* : Complexité accrue, coût d'hébergement
   - **Décision** : Non pour l'instant (focus sur le front-end)

2. **Faut-il monétiser le projet ?**
   - *Options* : Publicité (non intrusive), donations, modèle freemium
   - **Décision** : À discuter (priorité à la croissance utilisateur)

3. ~~**Secret `PO_TRIGGER_TOKEN` (PAT) requis pour la chaîne auto du PO Agent**~~
   - **Résolu (2026-05-18)** : le rebuild en 2 workflows supprime ce besoin.
     `po-autocreate.yml` boucle dans un seul run jusqu'au seuil de 2 issues,
     et se relance sur `issues: [closed]` (action humaine). Plus de PAT requis :
     seul `MISTRAL_API_KEY` est nécessaire.

---

## 🔄 **Historique des Versions**

| Version | Date | Auteur | Changements |
|---------|------|--------|-------------|
| 1.0 | 2026-05-06 | [Votre Nom] | Création initiale du document |
| 1.1 | 2026-05-18 | Coding Agent | Refactor workflows en reusable workflows ; nouvelle politique PO Agent (max 2 issues `po-generated`, chaîne auto, anti-doublon) |
| 1.2 | 2026-05-18 | Coding Agent | Convention de nommage `po-*` / `reusable-po-*` pour tous les workflows |
| 1.3 | 2026-05-18 | Coding Agent | Fix : `reusable-po-rewrite.yml` injecte désormais le titre, la description et les commentaires (questions/réponses) dans le prompt Mistral |
| 1.4 | 2026-05-18 | Coding Agent | Rebuild en 2 workflows (`po-autocreate.yml`, `po-clarify.yml`) ; `MISTRAL_API_KEY` seul secret ; prompts externalisés (`autocreate.js`, `questions.js`, `rewrite.js`) ; suppression des `reusable-po-*.yml`, `PO_TRIGGER_TOKEN`, `MISTRAL_MODEL_ID`, `po-prompt.js`, labels `needs-mistral`/`needs-clarification` |
| 1.5 | 2026-05-29 | Coding Agent | Calcul dynamique du pourcentage de réussite (`/dictation-success`) : suppression du bouton « Calculer », calcul réactif dérivé des champs, messages d'erreur contextuels et `aria-live` (issue #11) |
| 1.6 | 2026-05-29 | Coding Agent | Ajout d'un tableau des 30 premières erreurs sur `/dictation-success` : affiché dès la saisie d'un total de mots valide, avec mots justes, pourcentage d'erreur et pourcentage de réussite par ligne (issue #33) |
| 1.7 | 2026-06-05 | Coding Agent | Implémentation de l'outil Conversions (`/converter`) : 4 catégories (longueurs, masse, températures, devises), calcul réactif, styles inline cohérents, `aria-live` (issue #35) |

---

*Document généré automatiquement à partir de l'analyse du dépôt [Manidrim/my-utils-for-versel](https://github.com/Manidrim/my-utils-for-versel).*
*Dernière mise à jour : 2026-05-29.*
