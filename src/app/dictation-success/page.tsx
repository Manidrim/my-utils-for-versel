import DictationSuccessCalculator from "./DictationSuccessCalculator";

export default function DictationSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Calculateur de pourcentage de réussite pour dictée</h1>
      <DictationSuccessCalculator />
    </div>
  );
}
