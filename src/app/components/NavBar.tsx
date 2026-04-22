"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(253,246,244,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #EDD9D5",
        padding: "0 32px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "7px",
            background: "#E07B72",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
            <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.7" />
            <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "17px",
            color: "#2C1A17",
            letterSpacing: "-0.01em",
          }}
        >
          Toolbox
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <NavLink href="/" active={pathname === "/"}>
          Outils
        </NavLink>
        <NavLink href="#" active={false}>
          À propos
        </NavLink>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        background: active ? "#FEF0ED" : "transparent",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "13px",
        fontWeight: active ? 600 : 400,
        color: active ? "#C9524A" : "#7A5550",
        padding: "5px 12px",
        borderRadius: "6px",
        textDecoration: "none",
        transition: "all 150ms",
      }}
    >
      {children}
    </Link>
  );
}
