import DictationSuccessCalculator from "./DictationSuccessCalculator";

export default function DictationSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl p-4 md:p-8">
      <h1 className="mb-4 md:mb-6 text-lg md:text-2xl font-bold">Calculateur de pourcentage de réussite pour dictée</h1>
      <DictationSuccessCalculator />
    </div>
  );
}
