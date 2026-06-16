"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type Question = { a: number; b: number };
type Feedback = { correct: boolean; expected: number; a: number; b: number };
type TableChoice = number | "all";

const TABLES: TableChoice[] = ["all", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const palette = {
  bg: "#FDF6F4",
  primary: "#E07B72",
  primaryHover: "#C9524A",
  dark: "#2C1A17",
  border: "#EDD9D5",
  secondary: "#7A5550",
  cardBg: "#FFFFFF",
  tabBg: "#FEF0ED",
  success: "#2F9E6B",
  successBg: "#E8F6EF",
  error: "#C9524A",
  errorBg: "#FCEBE9",
};

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeQuestion(table: TableChoice): Question {
  if (table === "all") {
    return { a: randInt(1, 10), b: randInt(1, 10) };
  }
  // Garde la table choisie comme l'un des termes ; côté aléatoire pour varier.
  const other = randInt(1, 10);
  return Math.random() < 0.5 ? { a: table, b: other } : { a: other, b: table };
}

export default function AdditionGame() {
  const [table, setTable] = useState<TableChoice>("all");
  // Première question déterministe (identique serveur/client) pour éviter tout
  // écart d'hydratation ; les suivantes sont aléatoires via les gestionnaires.
  const [question, setQuestion] = useState<Question>({ a: 3, b: 4 });
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [tabHover, setTabHover] = useState<TableChoice | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleTableChange(choice: TableChoice) {
    setTable(choice);
    setQuestion(makeQuestion(choice));
    setAnswer("");
    setFeedback(null);
    focusInput();
  }

  function handleNext() {
    setQuestion(makeQuestion(table));
    setAnswer("");
    setFeedback(null);
    focusInput();
  }

  function handleValidate() {
    if (answer === "") return;
    const expected = question.a + question.b;
    const correct = parseInt(answer, 10) === expected;
    setFeedback({ correct, expected, a: question.a, b: question.b });
    setScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }));
    if (correct) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBest((b) => Math.max(b, nextStreak));
    } else {
      setStreak(0);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (feedback) handleNext();
    else handleValidate();
  }

  function handleReset() {
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setBest(0);
    handleNext();
  }

  const inputBorder = feedback
    ? feedback.correct
      ? palette.success
      : palette.error
    : palette.border;

  const stats: { label: string; value: string | number }[] = [
    { label: "Bonnes réponses", value: `${score.correct}/${score.total}` },
    { label: "Série", value: streak },
    { label: "Record", value: best },
  ];

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
          Tables d'addition
        </h1>
        <p style={{ color: palette.secondary, fontSize: "15px", marginBottom: "32px" }}>
          Entraîne-toi aux additions jusqu'à 10.
        </p>

        {/* Table selector */}
        <div
          role="group"
          aria-label="Choisir une table"
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          {TABLES.map((t) => {
            const active = table === t;
            const hovered = tabHover === t;
            return (
              <button
                key={String(t)}
                type="button"
                aria-pressed={active}
                onClick={() => handleTableChange(t)}
                onMouseEnter={() => setTabHover(t)}
                onMouseLeave={() => setTabHover(null)}
                style={{
                  padding: "8px 16px",
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
                {t === "all" ? "Mélange" : `+${t}`}
              </button>
            );
          })}
        </div>

        {/* Game card */}
        <div
          style={{
            background: palette.cardBg,
            border: `1.5px solid ${palette.border}`,
            borderRadius: "16px",
            padding: "28px",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Equation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "14px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "40px",
                  fontWeight: 500,
                  color: palette.dark,
                  letterSpacing: "0.01em",
                }}
              >
                {`${question.a} + ${question.b} =`}
              </span>
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={answer}
                readOnly={feedback !== null}
                onChange={(e) =>
                  setAnswer(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))
                }
                placeholder="?"
                aria-label={`Résultat de ${question.a} plus ${question.b}`}
                style={{
                  width: "96px",
                  padding: "10px 12px",
                  border: `2px solid ${inputBorder}`,
                  borderRadius: "10px",
                  fontSize: "32px",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontWeight: 500,
                  textAlign: "center",
                  color: palette.dark,
                  background: palette.bg,
                  outline: "none",
                }}
              />
            </div>

            {/* Feedback */}
            <div
              role="status"
              aria-live="polite"
              style={{
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                padding: feedback ? "8px 14px" : 0,
                borderRadius: "10px",
                background: feedback
                  ? feedback.correct
                    ? palette.successBg
                    : palette.errorBg
                  : "transparent",
                color: feedback
                  ? feedback.correct
                    ? palette.success
                    : palette.error
                  : "transparent",
                fontSize: "15px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {feedback
                ? feedback.correct
                  ? streak > 0 && streak % 5 === 0
                    ? `🔥 Série de ${streak} ! Bravo !`
                    : "✓ Bravo !"
                  : `✗ Raté — ${feedback.a} + ${feedback.b} = ${feedback.expected}`
                : ""}
            </div>

            {/* Action button */}
            <button
              type="submit"
              disabled={!feedback && answer === ""}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background:
                  !feedback && answer === "" ? palette.border : palette.primary,
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: !feedback && answer === "" ? "default" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {feedback ? "Question suivante" : "Valider"}
            </button>
          </form>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: `1.5px solid ${palette.border}`,
            }}
          >
            {stats.map((s) => (
              <div key={s.label} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: palette.dark,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: palette.secondary,
                    marginTop: "2px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {score.total > 0 && (
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: "transparent",
                  border: "none",
                  color: palette.secondary,
                  fontSize: "13px",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Recommencer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
