// Prompt de réécriture d'issue à partir de l'issue + des échanges de clarification.
// Externalisé pour éviter les conflits de syntaxe YAML.
module.exports = function (title, description, discussion) {
  return [
    "Tu es un assistant technique qui réécrit des issues GitHub.",
    "",
    "**Issue actuelle :**",
    "- Titre: " + (title || ""),
    "- Description: " + (description || ""),
    "",
    "**Échanges de clarification (questions posées et réponses de l'utilisateur) :**",
    discussion || "(aucun)",
    "",
    "**Ta tâche :**",
    "En t'appuyant sur la description ET sur les réponses fournies dans les échanges",
    "ci-dessus, génère une proposition de réécriture au format suivant :",
    "",
    "### Proposition de réécriture :",
    "**Titre amélioré :** [Nouveau titre clair et concis]",
    "",
    "**Description améliorée :**",
    "---",
    "[Description structurée]",
    "---",
    "",
    "**Règles :**",
    "- Réponds UNIQUEMENT avec le bloc ci-dessus, sans autre texte.",
    "- Utilise des sections claires (Contexte, Objectif, Critères d'acceptation).",
    "- Intègre les informations issues des réponses de l'utilisateur.",
    "- Conserve les informations importantes de l'issue d'origine.",
  ].join("\n");
};
