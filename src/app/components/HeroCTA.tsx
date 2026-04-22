"use client";

import Link from "next/link";
import { useState } from "react";

const CalcIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" />
    <line x1="12" y1="10" x2="14" y2="10" />
    <line x1="16" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" />
    <line x1="12" y1="14" x2="14" y2="14" />
    <line x1="16" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="16" y2="18" />
  </svg>
);

export default function HeroCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/calculator"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "#E07B72",
        color: "white",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "14px",
        fontWeight: 600,
        padding: "11px 22px",
        borderRadius: "8px",
        textDecoration: "none",
        boxShadow: hovered
          ? "0 6px 20px rgba(180,80,60,0.32)"
          : "0 3px 12px rgba(180,80,60,0.25)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "transform 150ms, box-shadow 150ms",
      }}
    >
      <CalcIcon />
      Ouvrir la calculatrice
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M3 7h8M7 3l4 4-4 4" />
      </svg>
    </Link>
  );
}
