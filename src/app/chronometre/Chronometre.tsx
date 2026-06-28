url: https://raw.githubusercontent.com/Manidrim/my-utils-for-versel/feat/chronometre-implementation/src/app/chronometre/Chronometre.tsx

"use client";
import { useState, useEffect } from "react";

export default function Chronometre() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      centiseconds: centiseconds.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds, centiseconds } = formatTime(time);

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "24px", background: "#FEF0ED", borderRadius: "16px", border: "1px solid #EDD9D5" }}>
      <h1 style={{ fontFamily: "var(--font-dm-serif)", fontSize: "24px", color: "#2C1A17", marginBottom: "20px" }}>Chronomètre</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "48px", fontFamily: "monospace", color: "#2C1A17" }}>
          {hours}:{minutes}:{seconds}.{centiseconds}
        </span>
      </div>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button
          onClick={startStop}
          style={{
            padding: "12px 24px",
            background: isRunning ? "#E07B72" : "#
6BA368",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {isRunning ? "Pause" : "Démarrer"}
        </button>
        <button
          onClick={reset}
          style={{
            padding: "12px 24px",
            background: "#A36B68",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Réinitialiser
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <a href="/" style={{ fontSize: "12px", color: "#7A5550" }}>← Retour</a>
      </div>
    </div>
  );
};
