import type { Metadata } from "next";
import AdditionGame from "./AdditionGame";

export const metadata: Metadata = {
  title: "Tables d'addition",
  description:
    "Jeu d'apprentissage : révise tes tables d'addition avec des additions à un chiffre.",
};

export default function AdditionPage() {
  return (
    <main style={{ flex: 1 }}>
      <AdditionGame />
    </main>
  );
}
