import type { Metadata } from "next";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Calculatrice",
  description: "Calculs simples et rapides avec historique intégré.",
};

export default function CalculatorPage() {
  return (
    <main style={{ flex: 1 }}>
      <Calculator />
    </main>
  );
}
