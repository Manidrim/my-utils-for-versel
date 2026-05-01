'use client';

import { useState } from 'react';

export default function DictationSuccessCalculator() {
  const [totalWords, setTotalWords] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [correctWords, setCorrectWords] = useState<number | null>(null);
  const [successPercentage, setSuccessPercentage] = useState<number | null>(null);

  const calculate = () => {
    const total = parseInt(totalWords, 10);
    const errs = parseInt(errors, 10);

    if (isNaN(total) || isNaN(errs) || total <= 0) {
      setCorrectWords(null);
      setSuccessPercentage(null);
      return;
    }

    if (errs < 0 || errs > total) {
      setCorrectWords(null);
      setSuccessPercentage(null);
      return;
    }

    const correct = total - errs;
    const percentage = (correct / total) * 100;

    setCorrectWords(correct);
    setSuccessPercentage(percentage);
  };

  return (
    <div className="rounded-lg bg-gray-100 p-4 md:p-6 shadow-md w-full max-w-full">
      <p className="mb-4 md:mb-6 text-sm text-gray-600">
        Saisissez le nombre total de mots dans la dictée et le nombre d&apos;erreurs pour calculer votre pourcentage de réussite.
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
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm md:text-base"
        />
      </div>

      <div className="mb-4 md:mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Nombre d&apos;erreurs
        </label>
        <input
          type="number"
          value={errors}
          onChange={(e) => setErrors(e.target.value)}
          placeholder="Exemple : 5"
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm md:text-base"
        />
      </div>

      <button
        onClick={calculate}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm md:text-base"
      >
        Calculer le pourcentage de réussite
      </button>

      {(correctWords !== null || successPercentage !== null) && (
        <div className="mt-4 md:mt-6 rounded-md bg-white p-4 shadow-sm">
          <h3 className="mb-2 md:mb-3 text-base md:text-lg font-semibold text-gray-800">Résultats</h3>
          
          <div className="space-y-2 md:space-y-3">
            <div>
              <span className="text-gray-600">Nombre de mots justes : </span>
              <span className="font-bold text-green-600">{correctWords}</span>
            </div>

            <div>
              <span className="text-gray-600">Pourcentage de réussite : </span>
              <span className="font-bold text-green-600">
                {successPercentage !== null ? successPercentage.toFixed(2) : '0'}%
              </span>
            </div>

            <div className="text-xs md:text-sm text-gray-500">
              <p>
                <strong>Calcul :</strong> ({totalWords} mots total - {errors} erreurs = {correctWords} mots justes) → 
                ({correctWords} / {totalWords}) × 100 = {successPercentage !== null ? successPercentage.toFixed(2) : '0'}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
