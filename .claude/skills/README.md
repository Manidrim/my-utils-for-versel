# Skills du projet

Skills Claude Code spécifiques à `my-utils-for-versel`, pour accélérer le
développement et la recherche de règles métier. Chaque sous-dossier contient un
`SKILL.md` (frontmatter `name` + `description`) chargé automatiquement par
Claude Code quand la tâche correspond à sa description.

| Skill | Usage |
|-------|-------|
| [`nouvel-outil`](./nouvel-outil/SKILL.md) | Scaffolder un nouvel outil/page en respectant les conventions (App Router, styles inline, palette, accessibilité, fr-FR) et l'enregistrer sur la page d'accueil. |
| [`regles-metier`](./regles-metier/SKILL.md) | Localiser et comprendre les règles métier : formules, taux de change, formatage fr-FR, validations, accessibilité. |

## Ajouter une skill

Crée `.claude/skills/<nom>/SKILL.md` avec un frontmatter :

```markdown
---
name: nom-de-la-skill
description: >-
  Quand et pourquoi utiliser cette skill (déclencheurs explicites).
---

# Contenu de la skill
```

Garde les descriptions orientées « déclencheur » (quand l'invoquer) pour que la
sélection automatique soit pertinente.
