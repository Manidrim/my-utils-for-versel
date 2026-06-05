"use client";

import { useState } from "react";
import Link from "next/link";

type Category = "longueurs" | "masse" | "temperatures" | "devises";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "longueurs", label: "Longueurs" },
  { id: "masse", label: "Masse" },
  { id: "temperatures", label: "Températures" },
  { id: "devises", label: "Devises" },
];

const UNITS: Record<Category, string[]> = {
  longueurs: ["m", "cm", "mm", "km", "miles", "yards", "pieds", "pouces"],
  masse: ["kg", "g", "mg", "lb", "oz"],
  temperatures: ["Celsius", "Fahrenheit", "Kelvin"],
  devises: ["EUR", "USD", "GBP"],
};

const UNIT_LABELS: Record<string, string> = {
  m: "Mètres (m)",
  cm: "Centimètres (cm)",
  mm: "Millimètres (mm)",
  km: "Kilomètres (km)",
  miles: "Miles",
  yards: "Yards",
  pieds: "Pieds",
  pouces: "Pouces",
  kg: "Kilogrammes (kg)",
  g: "Grammes (g)",
  mg: "Milligrammes (mg)",
  lb: "Livres (lb)",
  oz: "Onces (oz)",
  Celsius: "Celsius (°C)",
  Fahrenheit: "Fahrenheit (°F)",
  Kelvin: "Kelvin (K)",
  EUR: "Euro (EUR)",
  USD: "Dollar US (USD)",
  GBP: "Livre Sterling (GBP)",
};

// Base: mètres
const LENGTH_TO_M: Record<string, number> = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  km: 1000,
  miles: 1609.344,
  yards: 0.9144,
  pieds: 0.3048,
  pouces: 0.0254,
};

// Base: kilogrammes
const MASS_TO_KG: Record<string, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
};

// Base: EUR
const CURRENCY_TO_EUR: Record<string, number> = {
  EUR: 1,
  USD: 1 / 1.08,
  GBP: 1 / 0.86,
};

function convertLength(value: number, from: string, to: string): number {
  return (value * LENGTH_TO_M[from]) / LENGTH_TO_M[to];
}

function convertMass(value: number, from: string, to: string): number {
  return (value * MASS_TO_KG[from]) / MASS_TO_KG[to];
}

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;
  if (from === "Celsius") celsius = value;
  else if (from === "Fahrenheit") celsius = (value - 32) * (5 / 9);
  else celsius = value - 273.15;

  if (to === "Celsius") return celsius;
  if (to === "Fahrenheit") return celsius * (9 / 5) + 32;
  return celsius + 273.15;
}

function convertCurrency(value: number, from: string, to: string): number {
  const inEur = value * CURRENCY_TO_EUR[from];
  return inEur / CURRENCY_TO_EUR[to];
}

function convert(category: Category, value: number, from: string, to: string): number {
  if (category === "longueurs") return convertLength(value, from, to);
  if (category === "masse") return convertMass(value, from, to);
  if (category === "temperatures") return convertTemperature(value, from, to);
  return convertCurrency(value, from, to);
}

function formatResult(value: number): string {
  if (!isFinite(value)) return "—";
  const abs = Math.abs(value);
  const maximumFractionDigits = abs === 0 ? 0 : abs < 0.001 ? 10 : abs < 1 ? 6 : abs < 1000 ? 4 : 2;
  return value.toLocaleString("fr-FR", { maximumFractionDigits });
}

const palette = {
  bg: "#FDF6F4",
  primary: "#E07B72",
  primaryHover: "#C9524A",
  dark: "#2C1A17",
  border: "#EDD9D5",
  secondary: "#7A5550",
  cardBg: "#FFFFFF",
  tabBg: "#FEF0ED",
};

export default function Converter() {
  const [category, setCategory] = useState<Category>("longueurs");
  const [input, setInput] = useState("");
  const [fromUnit, setFromUnit] = useState(UNITS.longueurs[0]);
  const [toUnit, setToUnit] = useState(UNITS.longueurs[1]);
  const [tabHover, setTabHover] = useState<Category | null>(null);

  const units = UNITS[category];
  const numericValue = parseFloat(input.replace(",", "."));
  const hasResult = input !== "" && !isNaN(numericValue);
  const result = hasResult ? formatResult(convert(category, numericValue, fromUnit, toUnit)) : "";

  function handleCategoryChange(cat: Category) {
    setCategory(cat);
    setInput("");
    setFromUnit(UNITS[cat][0]);
    setToUnit(UNITS[cat][1]);
  }

  function handleSwap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <div
      style={{
        minHeight: "100%",
        background: palette.bg,
        padding: "40px 16px 80px",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      <div style={{ maxWidth: "540px", margin: "0 auto" }}>
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: palette.secondary,
            textDecoration: "none",
            fontSize: "14px",
            marginBottom: "28px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Retour
        </Link>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "32px",
            fontWeight: 400,
            color: palette.dark,
            marginBottom: "8px",
          }}
        >
          Conversions
        </h1>
        <p style={{ color: palette.secondary, fontSize: "15px", marginBottom: "32px" }}>
          Unités de mesure, températures, devises
        </p>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Catégorie de conversion"
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          {CATEGORIES.map((cat) => {
            const active = category === cat.id;
            const hovered = tabHover === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active}
                onClick={() => handleCategoryChange(cat.id)}
                onMouseEnter={() => setTabHover(cat.id)}
                onMouseLeave={() => setTabHover(null)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: `1.5px solid ${active ? palette.primary : palette.border}`,
                  background: active ? palette.primary : hovered ? palette.tabBg : "#fff",
                  color: active ? "#fff" : palette.dark,
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Converter card */}
        <div
          style={{
            background: palette.cardBg,
            border: `1.5px solid ${palette.border}`,
            borderRadius: "16px",
            padding: "28px",
          }}
        >
          {/* From field */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="input-value"
              style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.secondary, marginBottom: "8px" }}
            >
              De
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                id="input-value"
                type="text"
                inputMode="decimal"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="0"
                aria-label="Valeur à convertir"
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  border: `1.5px solid ${palette.border}`,
                  borderRadius: "10px",
                  fontSize: "20px",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  color: palette.dark,
                  background: palette.bg,
                  outline: "none",
                  minWidth: 0,
                }}
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                aria-label="Unité source"
                style={{
                  padding: "12px 14px",
                  border: `1.5px solid ${palette.border}`,
                  borderRadius: "10px",
                  fontSize: "14px",
                  color: palette.dark,
                  background: "#fff",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  outline: "none",
                  flexShrink: 0,
                }}
              >
                {units.map((u) => (
                  <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap button */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <button
              onClick={handleSwap}
              aria-label="Inverser les unités"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: `1.5px solid ${palette.border}`,
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: palette.secondary,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 16V4m0 0L3 8m4-4l4 4" />
                <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To field */}
          <div>
            <label
              htmlFor="result-display"
              style={{ display: "block", fontSize: "13px", fontWeight: 600, color: palette.secondary, marginBottom: "8px" }}
            >
              Vers
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                id="result-display"
                aria-live="polite"
                aria-label="Résultat de la conversion"
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  border: `1.5px solid ${palette.border}`,
                  borderRadius: "10px",
                  fontSize: "20px",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  color: hasResult ? palette.primary : palette.border,
                  background: palette.bg,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {hasResult ? result : "0"}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                aria-label="Unité cible"
                style={{
                  padding: "12px 14px",
                  border: `1.5px solid ${palette.border}`,
                  borderRadius: "10px",
                  fontSize: "14px",
                  color: palette.dark,
                  background: "#fff",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  outline: "none",
                  flexShrink: 0,
                }}
              >
                {units.map((u) => (
                  <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Devises disclaimer */}
          {category === "devises" && (
            <p
              style={{
                marginTop: "16px",
                fontSize: "12px",
                color: palette.secondary,
                textAlign: "center",
              }}
            >
              Taux indicatifs statiques — EUR/USD : 1,08 · EUR/GBP : 0,86
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
