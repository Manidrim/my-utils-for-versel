import type { Metadata } from "next";
import MultiplicationGame from "./MultiplicationGame";

export const metadata: Metadata = {
  title: "Tables de multiplication",
  description:
    "Jeu d'apprentissage : révise tes tables de multiplication avec des multiplications à un chiffre.",
};

export default function MultiplicationPage() {
  return (
    <main style={{ flex: 1 }}>
      <MultiplicationGame />
    </main>
  );
}
