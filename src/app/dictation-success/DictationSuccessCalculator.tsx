'use client';

import { useState } from 'react';

type Calculation =
  | { status: 'empty' }
  | { status: 'error'; message: string }
  | { status: 'success'; correctWords: number; successPercentage: number };

function computeResult(totalWords: string, errors: string): Calculation {
  // Tant que les deux champs ne sont pas remplis, on n'affiche ni résultat ni erreur.
  if (totalWords.trim() === '' || errors.trim() === '') {
    return { status: 'empty' };
  }

  const total = parseInt(totalWords, 10);
  const errs = parseInt(errors, 10);

  if (isNaN(total) || isNaN(errs)) {
    return { status: 'error', message: 'Veuillez entrer des nombres valides.' };
  }

  if (total <= 0) {
    return { status: 'error', message: 'Le nombre total de mots doit être supérieur à zéro.' };
  }

  if (errs < 0 || errs > total) {
    return {
      status: 'error',
      message: "Le nombre d'erreurs doit être compris entre 0 et le nombre total de mots.",
    };
  }

  const correctWords = total - errs;
  const successPercentage = (correctWords / total) * 100;

  return { status: 'success', correctWords, successPercentage };
}

export default function DictationSuccessCalculator() {
  const [totalWords, setTotalWords] = useState<string>('');
  const [errors, setErrors] = useState<string>('');

  // Le résultat est dérivé des champs : il se met à jour automatiquement à chaque saisie.
  const result = computeResult(totalWords, errors);

  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow-md">
      <p className="mb-6 text-sm text-gray-600">
        Saisissez le nombre total de mots dans la dictée et le nombre d&apos;erreurs : le pourcentage de réussite se calcule automatiquement.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nombre total de mots dans la dictée
        </label>
        <input
          type="number"
          value={totalWords}
          onChange={(e) => setTotalWords(e.target.value)}
          placeholder="Exemple : 50"
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Nombre d&apos;erreurs
        </label>
        <input
          type="number"
          value={errors}
          onChange={(e) => setErrors(e.target.value)}
          placeholder="Exemple : 5"
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div aria-live="polite">
        {result.status === 'error' && (
          <div className="rounded-md bg-red-50 p-4 text-sm font-medium text-red-700 shadow-sm" role="alert">
            {result.message}
          </div>
        )}

        {result.status === 'success' && (
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Résultats</h3>

            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Nombre de mots justes : </span>
                <span className="font-bold text-green-600">{result.correctWords}</span>
              </div>

              <div>
                <span className="text-gray-600">Pourcentage de réussite : </span>
                <span className="font-bold text-green-600">
                  {result.successPercentage.toFixed(2)} %
                </span>
              </div>

              <div className="text-sm text-gray-500">
                <p>
                  <strong>Calcul :</strong> ({totalWords} mots total - {errors} erreurs = {result.correctWords} mots justes) →
                  ({result.correctWords} / {totalWords}) × 100 = {result.successPercentage.toFixed(2)} %
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
