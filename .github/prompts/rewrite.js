// PO Clarify - rewrite prompt. Asks Mistral to rewrite the issue, integrating
// the clarification discussion. The workflow enforces a JSON response
// ({ "title": string, "body": string }) via the system prompt.
module.exports = function (title, description, discussion) {
  return [
    'Tu es un assistant technique qui réécrit des issues GitHub.',
    '',
    '**Issue actuelle :**',
    '- Titre: ' + title,
    '- Description: ' + description,
    '',
    "**Échanges de clarification (questions posées et réponses de l'utilisateur) :**",
    discussion || '(aucun)',
    '',
    '**Ta tâche :**',
    "En t'appuyant sur la description ET sur les réponses fournies dans les",
    "échanges ci-dessus, réécris l'issue de façon claire et actionnable.",
    'La description réécrite doit contenir des sections claires : Contexte,',
    "Objectif, Critères d'acceptation (et Notes techniques si pertinent).",
    '',
    '**Règles :**',
    "- Intègre les informations issues des réponses de l'utilisateur.",
    "- Conserve les informations importantes de l'issue d'origine.",
    '- Le titre doit être clair et concis (max 70 caractères).',
  ].join('\n');
};
