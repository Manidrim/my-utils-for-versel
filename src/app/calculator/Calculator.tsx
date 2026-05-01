"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

type HistoryEntry = { expr: string; result: string };
type KeyType = "num" | "op" | "eq" | "clr";

export default function Calculator() {
  const router = useRouter();
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDigit = useCallback(
    (d: string) => {
      if (justEvaluated) {
        setDisplay(d);
        setExpression("");
        setJustEvaluated(false);
        return;
      }
      setDisplay((prev) =>
        prev === "0" ? d : prev.length < 14 ? prev + d : prev
      );
    },
    [justEvaluated]
  );

  const handleDecimal = useCallback(() => {
    if (justEvaluated) {
      setDisplay("0,");
      setExpression("");
      setJustEvaluated(false);
      return;
    }
    if (!display.includes(",")) setDisplay((prev) => prev + ",");
  }, [justEvaluated, display]);

  const handleOperator = useCallback(
    (op: string) => {
      setJustEvaluated(false);
      const displayOp: Record<string, string> = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
      };
      setExpression(display + " " + (displayOp[op] ?? op) + " ");
      setDisplay("0");
    },
    [display]
  );

  const handleEquals = useCallback(() => {
    try {
      const expr = expression + display;
      const evalExpr = expr
        .replace(/,/g, ".")
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/−/g, "-");
      // eslint-disable-next-line no-new-func
      const result = Function(
        '"use strict"; return (' + evalExpr + ")"
      )() as number;
      const resultStr = new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 10,
      }).format(result);
      setHistory((h) => [{ expr, result: resultStr }, ...h].slice(0, 6));
      setDisplay(resultStr);
      setExpression(expr + " =");
      setJustEvaluated(true);
    } catch {
      setDisplay("Erreur");
      setExpression("");
    }
  }, [expression, display]);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setJustEvaluated(false);
  }, []);

  const handleSign = useCallback(() => {
    setDisplay((d) => (d.startsWith("-") ? d.slice(1) : "-" + d));
  }, []);

  const handlePercent = useCallback(() => {
    try {
      const val = parseFloat(display.replace(",", ".")) / 100;
      setDisplay(
        new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 10 }).format(
          val
        )
      );
    } catch {
      /* ignore */
    }
  }, [display]);

  const handleBackspace = useCallback(() => {
    if (justEvaluated) return;
    setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
  }, [justEvaluated]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
      else if (e.key === ".") handleDecimal();
      else if (e.key === "+") handleOperator("+");
      else if (e.key === "-") handleOperator("-");
      else if (e.key === "*") handleOperator("*");
      else if (e.key === "/") {
        e.preventDefault();
        handleOperator("/");
      } else if (e.key === "Enter" || e.key === "=") handleEquals();
      else if (e.key === "Backspace") handleBackspace();
      else if (e.key === "Escape") handleClear();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleBackspace,
    handleClear,
  ]);

  const fontSize =
    display.length > 11 ? "24px" : display.length > 7 ? "32px" : "42px";

  return (
    <div
      style={{
        fontFamily: "var(--font-dm-sans)",
        maxWidth: "min(960px, 95vw)",
        margin: "0 auto",
        padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr min(280px, 30vw)",
        gap: "clamp(16px, 4vw, 32px)",
        alignItems: "start",
      }}
    >
      {/* Main calculator */}
      <div>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#7A5550",
            fontSize: "clamp(11px, 2.5vw, 13px)",
            fontWeight: 500,
            padding: "0 0 20px 0",
            marginLeft: "-4px",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M9 2L4 7l5 5" />
          </svg>
          Tous les outils
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "clamp(32px, 8vw, 40px)",
              height: "clamp(32px, 8vw, 40px)",
              borderRadius: "10px",
              background: "#FEF0ED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E07B72",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="10" y2="10" />
              <line x1="12" y1="10" x2="14" y2="10" />
              <line x1="16" y1="10" x2="16" y2="10" />
              <line x1="8" y1="14" x2="10" y2="14" />
              <line x1="12" y1="14" x2="14" y2="14" />
              <line x1="16" y1="14" x2="16" y2="14" />
              <line x1="8" y1="18" x2="10" y2="18" />
              <line x1="12" y1="18" x2="14" y2="18" />
              <line x1="16" y1="18" x2="16" y2="18" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(18px, 4vw, 22px)",
                color: "#2C1A17",
              }}
            >
              Calculatrice
            </div>
            <div style={{ fontSize: "clamp(10px, 2.5vw, 12px)", color: "#B89490" }}>
              Calculs simples et rapides
            </div>
          </div>
        </div>

        {/* Display */}
        <div
          aria-live="polite"
          style={{
            background: "#FEF0ED",
            border: "1px solid #EDD9D5",
            borderRadius: "14px",
            padding: "clamp(12px, 3vw, 20px) clamp(16px, 4vw, 24px)",
            marginBottom: "clamp(12px, 3vw, 16px)",
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "clamp(11px, 2.5vw, 13px)",
              color: "#B89490",
              minHeight: "clamp(16px, 4vw, 18px)",
              marginBottom: "clamp(4px, 1vw, 6px)",
            }}
          >
            {expression || " "}
          </div>
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              isMobile ? "clamp(20px, 6vw, 28px)" : fontSize,
              fontWeight: 500,
              color: "#2C1A17",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              transition: "font-size 100ms",
            }}
          >
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(6px, 1.5vw, 8px)",
          }}
        >
          <CalcKey label="AC" type="clr" onClick={handleClear} />
          <CalcKey label="±" type="op" onClick={handleSign} />
          <CalcKey label="%" type="op" onClick={handlePercent} />
          <CalcKey label="÷" type="op" onClick={() => handleOperator("/")} />

          {[7, 8, 9].map((n) => (
            <CalcKey
              key={n}
              label={String(n)}
              onClick={() => handleDigit(String(n))}
            />
          ))}
          <CalcKey label="×" type="op" onClick={() => handleOperator("*")} />

          {[4, 5, 6].map((n) => (
            <CalcKey
              key={n}
              label={String(n)}
              onClick={() => handleDigit(String(n))}
            />
          ))}
          <CalcKey label="−" type="op" onClick={() => handleOperator("-")} />

          {[1, 2, 3].map((n) => (
            <CalcKey
              key={n}
              label={String(n)}
              onClick={() => handleDigit(String(n))}
            />
          ))}
          <CalcKey label="+" type="op" onClick={() => handleOperator("+")} />

          <CalcKey label="0" wide onClick={() => handleDigit("0")} />
          <CalcKey label="," onClick={handleDecimal} />
          <CalcKey label="=" type="eq" onClick={handleEquals} />
        </div>
      </div>

      {/* History sidebar */}
      <div style={{ 
        paddingTop: isMobile ? "24px" : "66px", 
        order: isMobile ? -1 : 0 
      }}>
        <div
          style={{
            fontSize: "clamp(10px, 2vw, 11px)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#B89490",
            marginBottom: "clamp(8px, 2vw, 12px)",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Historique
        </div>

        {history.length === 0 ? (
          <div
            style={{
              fontSize: "clamp(12px, 3vw, 13px)",
              color: "#D4B8B4",
              textAlign: "center",
              padding: "clamp(20px, 5vw, 32px) 0",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Vos calculs apparaîtront ici
          </div>
        ) : (
          history.map((h, i) => (
            <div
              key={i}
              onClick={() => {
                setDisplay(h.result);
                setExpression("");
                setJustEvaluated(true);
              }}
              style={{
                background: i === 0 ? "#FEF0ED" : "white",
                border: "1px solid #EDD9D5",
                borderRadius: "8px",
                padding: "clamp(8px, 2vw, 10px) clamp(10px, 2.5vw, 14px)",
                marginBottom: "clamp(6px, 1.5vw, 8px)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "clamp(10px, 2vw, 11px)",
                  color: "#B89490",
                  marginBottom: "2px",
                }}
              >
                {h.expr}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                  fontWeight: 500,
                  color: "#2C1A17",
                }}
              >
                {h.result}
              </div>
            </div>
          ))
        )}

        {history.length > 0 && (
          <button
            onClick={() => setHistory([])}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "clamp(10px, 2vw, 11px)",
              color: "#B89490",
              padding: "clamp(3px, 1vw, 4px) 0",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Effacer l&apos;historique
          </button>
        )}
      </div>
    </div>
  );
}

function CalcKey({
  label,
  type = "num",
  wide,
  onClick,
}: {
  label: string;
  type?: KeyType;
  wide?: boolean;
  onClick: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  const styles: Record<KeyType, React.CSSProperties> = {
    num: {
      background: "white",
      border: "1px solid #EDD9D5",
      color: "#2C1A17",
      boxShadow: "0 2px 4px rgba(180,80,60,0.05)",
    },
    op: {
      background: "#FEF0ED",
      border: "1px solid #F5C4BC",
      color: "#C9524A",
      boxShadow: "none",
    },
    eq: {
      background: "#E07B72",
      border: "none",
      color: "white",
      boxShadow: "0 3px 10px rgba(180,80,60,0.28)",
    },
    clr: {
      background: "#F9E5E3",
      border: "1px solid #F0B4AC",
      color: "#C0392B",
      boxShadow: "none",
    },
  };

  return (
    <button
      aria-label={label}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => {
        setPressed(false);
        onClick();
      }}
      onMouseLeave={() => setPressed(false)}
      style={{
        gridColumn: wide ? "span 2" : "span 1",
        height: "clamp(48px, 12vw, 58px)",
        ...styles[type],
        borderRadius: "10px",
        cursor: "pointer",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "clamp(14px, 3.5vw, 16px)",
        fontWeight: 500,
        transform: pressed ? "scale(0.93)" : "scale(1)",
        transition: "transform 80ms, box-shadow 150ms",
      }}
    >
      {label}
    </button>
  );
}
