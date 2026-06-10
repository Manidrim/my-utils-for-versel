---
name: regles-metier
description: >-
  Catalogue et localisation des règles métier de my-utils-for-versel (formules
  de calcul, taux de change, conventions de formatage fr-FR, contraintes de
  validation, accessibilité). À utiliser quand on cherche où vit une règle de
  calcul, comment un résultat est obtenu, quelles unités/taux sont utilisés, ou
  pour comprendre/modifier la logique d'un outil existant.
---

# Règles métier du projet

Référence pour retrouver et comprendre la logique métier. **Pas de backend ni
de base de données** : toute la logique est côté client dans le composant de
chaque outil (`src/app/<slug>/<Composant>.tsx`).

## Où chercher

| Domaine | Fichier |
|---------|---------|
| Calculatrice (opérations, historique, clavier) | `src/app/calculator/Calculator.tsx` |
| Pourcentages | `src/app/percentage/PercentageCalculator.tsx` |
| Réussite de dictée | `src/app/dictation-success/DictationSuccessCalculator.tsx` |
| Conversions (unités, taux) | `src/app/converter/Converter.tsx` |
| Jeu des tables de multiplication | `src/app/multiplication/MultiplicationGame.tsx` |
| Liste des outils + tags | `src/app/page.tsx` (tableau `tools`) |
| Polices, palette racine, métadonnées globales | `src/app/layout.tsx` |

> Pour une recherche : `grep`/Grep sur le terme métier (ex. `toLocaleString`,
> `replace(",", ".")`, `CURRENCY_TO_EUR`, `aria-live`). La vue produit /
> roadmap / décisions est dans `PO_BRIEF.md`.

## Conventions transverses (s'appliquent à tous les outils)

- **Locale fr-FR** : virgule = séparateur décimal.
  - Lecture d'une saisie : `parseFloat(input.replace(",", "."))`.
  - Affichage : `value.toLocaleString("fr-FR", { maximumFractionDigits: … })`.
- **Calcul réactif** : le résultat se dérive de l'état à chaque frappe, sans
  bouton « Calculer » (Conversions, dictation-success). La Calculatrice reste
  l'exception (saisie d'expression puis `=`).
- **Validation / erreurs** : entrée vide ou `NaN` ⇒ aucun résultat affiché
  (état neutre, ex. `"0"` ou `"—"`), pas de crash. Messages d'erreur
  contextuels annoncés via `aria-live`/`role="alert"`.
- **Accessibilité** : résultats en `aria-live="polite"`, champs étiquetés.

## Règles spécifiques par outil

### Conversions (`Converter.tsx`)
- 4 catégories : `longueurs`, `masse`, `temperatures`, `devises`.
- Longueurs : tout passe par une **base mètre** (`LENGTH_TO_M`) ;
  `résultat = value * LENGTH_TO_M[from] / LENGTH_TO_M[to]`.
- Masse : **base kilogramme** (`MASS_TO_KG`), même formule.
- Températures : conversion via le **Celsius** comme pivot
  (F→C : `(v-32)*5/9` ; K→C : `v-273.15` ; et inverses).
- Devises : **base EUR** (`CURRENCY_TO_EUR`). Taux **statiques V1** :
  EUR/USD = 1,08 · EUR/GBP = 0,86 (disclaimer affiché dans la catégorie
  Devises). ⚠️ Toute modif de taux se fait ici **et** dans le disclaimer.
- `formatResult` adapte le nombre de décimales selon l'ordre de grandeur ;
  une valeur non finie s'affiche `—`.

### Réussite de dictée (`DictationSuccessCalculator.tsx`)
- `mots justes = total - erreurs` (calculé automatiquement à la saisie).
- `% réussite` calculé dès que les deux champs sont valides, format `X.XX %`.
- Contraintes : `total > 0`, `0 ≤ erreurs ≤ total` (sinon message contextuel).
- Tableau des **30 premières erreurs** (plafonné au total) : pour 1..min(30,
  total), affiche mots justes, % d'erreur et % de réussite (issue #33).

### Jeu des tables de multiplication (`MultiplicationGame.tsx`)
- Multiplications à un chiffre, **facteurs 1 à 9**.
- Sélecteur : *Mélange* (aléatoire) ou une table précise (×1 à ×9).
- Score = bonnes/total ; suivi de la **série** en cours et du **record** ;
  encouragement tous les 5 d'affilée.
- **Première question déterministe** : identique côté serveur et client pour
  éviter tout écart d'hydratation (pas d'aléatoire au premier rendu).
- Record **non persisté** entre sessions (amélioration P005/P016).

### Calculatrice (`Calculator.tsx`)
- Opérations +, −, ×, ÷ ; décimales à la virgule ; historique des **6**
  derniers calculs (cliquables) ; support clavier ; format français (espaces
  comme séparateurs de milliers) ; affiche `Erreur` sur calcul invalide.
- ⚠️ **Dette de sécurité (P001)** : l'évaluation utilise `Function()` (risque
  XSS). À remplacer par un parser mathématique — ne pas étendre ce pattern.

## Tags d'outils (page d'accueil)
`Maths`, `Éducation`, `Sciences`, `Jeu`, `Bientôt`. Un outil `available:false`
n'a pas de `href` et porte le tag `Bientôt`.

## Rappel
Après toute modification de règle métier, mets à jour `PO_BRIEF.md`
(Fonctionnalités Existantes, Historique des Versions, Notes & Décisions) —
c'est imposé par `AGENTS.md`.
