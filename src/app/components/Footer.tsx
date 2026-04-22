"use client";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #EDD9D5",
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#FDF6F4",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "12px",
          color: "#B89490",
        }}
      >
        © 2026 Toolbox — Outils simples, résultats clairs.
      </span>
      <div style={{ display: "flex", gap: "16px" }}>
        {["Confidentialité", "Conditions"].map((label) => (
          <button
            key={label}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: "#B89490",
              padding: 0,
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.color = "#7A5550";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.color = "#B89490";
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </footer>
  );
}
