import type { Metadata } from "next";
import Converter from "./Converter";

export const metadata: Metadata = {
  title: "Conversions",
  description: "Convertissez facilement des unités de mesure, températures et devises.",
};

export default function ConverterPage() {
  return (
    <main style={{ flex: 1 }}>
      <Converter />
    </main>
  );
}
