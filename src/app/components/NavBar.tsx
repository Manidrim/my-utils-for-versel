"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(253,246,244,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #EDD9D5",
        padding: "0 var(--nav-padding, 32px)",
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

      {isMobile ? (
        <>
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              marginLeft: "8px",
            }}
            aria-label="Menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2C1A17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
          
          {mobileMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: "56px",
                left: 0,
                right: 0,
                background: "rgba(253,246,244,0.95)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid #EDD9D5",
                padding: "16px var(--nav-padding, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                zIndex: 99,
              }}
            >
              <NavLink href="/" active={pathname === "/"} onClick={() => setMobileMenuOpen(false)}>
                Outils
              </NavLink>
              <NavLink href="#" active={false} onClick={() => setMobileMenuOpen(false)}>
                À propos
              </NavLink>
              <a
                href="https://github.com/Manidrim/my-utils-for-versel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Voir le projet sur GitHub"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#7A5550",
                  transition: "color 150ms",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C9524A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#7A5550";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </a>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <NavLink href="/" active={pathname === "/"}>
            Outils
          </NavLink>
          <NavLink href="#" active={false}>
            À propos
          </NavLink>
          <a
            href="https://github.com/Manidrim/my-utils-for-versel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir le projet sur GitHub"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "8px",
              color: "#7A5550",
              transition: "color 150ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#C9524A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#7A5550";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
  onClick,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
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
