'use client';

import { useState } from 'react';

export default function PercentageCalculator() {
  const [number, setNumber] = useState<string>('');
  const [percent, setPercent] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const num = parseFloat(number);
    const perc = parseFloat(percent);

    if (isNaN(num) || isNaN(perc)) {
      setResult('Veuillez entrer des nombres valides.');
      return;
    }

    const res = (num * perc) / 100;
    setResult(`Résultat : ${res}`);
  };

  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Votre nombre"
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Pourcentage (%)</label>
        <input
          type="number"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder="Votre pourcentage"
          className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={calculate}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Calculer
      </button>

      {result && (
        <div className="mt-4 text-lg font-semibold text-gray-800">{result}</div>
      )}
    </div>
  );
}