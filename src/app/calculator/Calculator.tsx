"use client";

import { useCallback, useEffect, useState } from "react";

type Operator = "+" | "-" | "*" | "/";

type State = {
  current: string;
  previous: number | null;
  operator: Operator | null;
  justEvaluated: boolean;
  error: boolean;
};

const initialState: State = {
  current: "0",
  previous: null,
  operator: null,
  justEvaluated: false,
  error: false,
};

const OPERATOR_SYMBOLS: Record<Operator, string> = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

function compute(a: number, b: number, op: Operator): number | null {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? null : a / b;
  }
}

function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  const rounded = Math.round(n * 1e12) / 1e12;
  return String(rounded);
}

function inputDigit(state: State, digit: string): State {
  if (state.error) return { ...initialState, current: digit };
  if (state.justEvaluated) {
    return { ...initialState, current: digit };
  }
  if (state.current === "0") {
    return { ...state, current: digit };
  }
  if (state.current.replace("-", "").replace(".", "").length >= 15) {
    return state;
  }
  return { ...state, current: state.current + digit };
}

function inputDecimal(state: State): State {
  if (state.error) return { ...initialState, current: "0." };
  if (state.justEvaluated) {
    return { ...initialState, current: "0." };
  }
  if (state.current.includes(".")) return state;
  return { ...state, current: state.current + "." };
}

function chooseOperator(state: State, op: Operator): State {
  if (state.error) return state;
  const currentNum = parseFloat(state.current);

  if (state.previous !== null && state.operator && !state.justEvaluated) {
    const result = compute(state.previous, currentNum, state.operator);
    if (result === null) {
      return { ...initialState, current: "Error", error: true };
    }
    return {
      current: formatNumber(result),
      previous: result,
      operator: op,
      justEvaluated: true,
      error: false,
    };
  }

  return {
    current: state.current,
    previous: currentNum,
    operator: op,
    justEvaluated: true,
    error: false,
  };
}

function evaluate(state: State): State {
  if (state.error) return state;
  if (state.operator === null || state.previous === null) return state;
  const currentNum = parseFloat(state.current);
  const result = compute(state.previous, currentNum, state.operator);
  if (result === null) {
    return { ...initialState, current: "Error", error: true };
  }
  return {
    current: formatNumber(result),
    previous: null,
    operator: null,
    justEvaluated: true,
    error: false,
  };
}

function backspace(state: State): State {
  if (state.error || state.justEvaluated) return state;
  if (state.current.length <= 1 || (state.current.length === 2 && state.current.startsWith("-"))) {
    return { ...state, current: "0" };
  }
  return { ...state, current: state.current.slice(0, -1) };
}

export default function Calculator() {
  const [state, setState] = useState<State>(initialState);

  const onDigit = useCallback(
    (d: string) => setState((s) => inputDigit(s, d)),
    [],
  );
  const onDecimal = useCallback(() => setState((s) => inputDecimal(s)), []);
  const onOperator = useCallback(
    (op: Operator) => setState((s) => chooseOperator(s, op)),
    [],
  );
  const onEquals = useCallback(() => setState((s) => evaluate(s)), []);
  const onClear = useCallback(() => setState(initialState), []);
  const onBackspace = useCallback(() => setState((s) => backspace(s)), []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const k = e.key;
      if (/^[0-9]$/.test(k)) {
        onDigit(k);
      } else if (k === ".") {
        onDecimal();
      } else if (k === "+" || k === "-" || k === "*" || k === "/") {
        e.preventDefault();
        onOperator(k);
      } else if (k === "Enter" || k === "=") {
        e.preventDefault();
        onEquals();
      } else if (k === "Backspace") {
        onBackspace();
      } else if (k === "Escape") {
        onClear();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onDigit, onDecimal, onOperator, onEquals, onBackspace, onClear]);

  const displayValue = state.error ? "Error" : state.current;

  const digitClass =
    "rounded-xl p-4 text-xl font-medium bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95 transition";
  const opClass =
    "rounded-xl p-4 text-xl font-semibold bg-orange-500 hover:bg-orange-400 text-white active:scale-95 transition";
  const utilClass =
    "rounded-xl p-4 text-xl font-medium bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 active:scale-95 transition";
  const equalsClass =
    "rounded-xl p-4 text-xl font-semibold bg-orange-600 hover:bg-orange-500 text-white active:scale-95 transition";

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-zinc-900 shadow-xl p-4 border border-zinc-200 dark:border-zinc-800">
      <div
        aria-live="polite"
        className="mb-4 rounded-xl bg-zinc-100 dark:bg-zinc-950 px-4 py-6 text-right text-4xl font-mono tracking-tight overflow-x-auto"
      >
        {displayValue}
        {state.operator && !state.error && (
          <span className="ml-2 text-orange-500">
            {OPERATOR_SYMBOLS[state.operator]}
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button type="button" onClick={onClear} className={utilClass} aria-label="Clear">
          C
        </button>
        <button type="button" onClick={onBackspace} className={utilClass} aria-label="Backspace">
          ⌫
        </button>
        <div aria-hidden />
        <button type="button" onClick={() => onOperator("/")} className={opClass} aria-label="Divide">
          ÷
        </button>

        <button type="button" onClick={() => onDigit("7")} className={digitClass}>7</button>
        <button type="button" onClick={() => onDigit("8")} className={digitClass}>8</button>
        <button type="button" onClick={() => onDigit("9")} className={digitClass}>9</button>
        <button type="button" onClick={() => onOperator("*")} className={opClass} aria-label="Multiply">
          ×
        </button>

        <button type="button" onClick={() => onDigit("4")} className={digitClass}>4</button>
        <button type="button" onClick={() => onDigit("5")} className={digitClass}>5</button>
        <button type="button" onClick={() => onDigit("6")} className={digitClass}>6</button>
        <button type="button" onClick={() => onOperator("-")} className={opClass} aria-label="Subtract">
          −
        </button>

        <button type="button" onClick={() => onDigit("1")} className={digitClass}>1</button>
        <button type="button" onClick={() => onDigit("2")} className={digitClass}>2</button>
        <button type="button" onClick={() => onDigit("3")} className={digitClass}>3</button>
        <button type="button" onClick={() => onOperator("+")} className={opClass} aria-label="Add">
          +
        </button>

        <button
          type="button"
          onClick={() => onDigit("0")}
          className={`${digitClass} col-span-2`}
        >
          0
        </button>
        <button type="button" onClick={onDecimal} className={digitClass}>
          .
        </button>
        <button type="button" onClick={onEquals} className={equalsClass} aria-label="Equals">
          =
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-500">
        Clavier pris en charge : chiffres, + − × ÷, Entrée, Retour arrière, Échap
      </p>
    </div>
  );
}
