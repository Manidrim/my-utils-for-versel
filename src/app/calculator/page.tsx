import Link from "next/link";
import type { Metadata } from "next";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Calculatrice",
  description: "Calculatrice simple avec les 4 opérateurs.",
};

export default function CalculatorPage() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-10 gap-6">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
        >
          ← Retour aux outils
        </Link>
      </div>
      <h1 className="text-2xl font-semibold">Calculatrice</h1>
      <Calculator />
    </main>
  );
}
