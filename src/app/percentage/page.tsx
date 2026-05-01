import PercentageCalculator from "./PercentageCalculator";

export default function PercentagePage() {
  return (
    <div className="mx-auto max-w-2xl p-4 md:p-8">
      <h1 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold">Calculatrice de pourcentage</h1>
      <PercentageCalculator />
    </div>
  );
}
