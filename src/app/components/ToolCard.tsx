"use client";

import { useState } from "react";
import Link from "next/link";

type ToolCardProps = {
  icon: React.ReactNode;
  name: string;
  description: string;
  tag: string;
  available?: boolean;
  href?: string;
};

export default function ToolCard({
  icon,
  name,
  description,
  tag,
  available = true,
  href,
}: ToolCardProps) {
  const [hovered, setHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    background: "white",
    border: "1px solid #EDD9D5",
    borderRadius: "12px",
    padding: "24px",
    cursor: available && href ? "pointer" : "default",
    opacity: available ? 1 : 0.65,
    transform: hovered && available ? "translateY(-2px)" : "translateY(0)",
    boxShadow:
      hovered && available
        ? "0 8px 24px rgba(180,80,60,0.10), 0 2px 6px rgba(180,80,60,0.06)"
        : "0 2px 8px rgba(180,80,60,0.06), 0 1px 2px rgba(180,80,60,0.04)",
    transition:
      "transform 200ms cubic-bezier(0.25,0,0,1), box-shadow 200ms cubic-bezier(0.25,0,0,1)",
    textDecoration: "none",
    display: "block",
    color: "inherit",
  };

  const inner = (
    <>
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "11px",
          background: available ? "#FEF0ED" : "#F5EAE8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "14px",
          color: available ? "#E07B72" : "#B89490",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "15px",
          fontWeight: 600,
          color: "#2C1A17",
          marginBottom: "5px",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "13px",
          color: "#7A5550",
          lineHeight: 1.45,
          marginBottom: "14px",
        }}
      >
        {description}
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          background: available ? "#FEF0ED" : "#F5EAE8",
          color: available ? "#C9524A" : "#9A7672",
          borderRadius: "4px",
          padding: "2px 7px",
        }}
      >
        {tag}
      </span>
    </>
  );

  if (available && href) {
    return (
      <Link
        href={href}
        style={cardStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => available && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </div>
  );
}
