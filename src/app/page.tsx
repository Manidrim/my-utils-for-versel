import ToolCard from "./components/ToolCard";
import HeroCTA from "./components/HeroCTA";

const CalcIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" /><line x1="12" y1="10" x2="14" y2="10" /><line x1="16" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" /><line x1="12" y1="14" x2="14" y2="14" /><line x1="16" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="16" y2="18" />
  </svg>
);

const PercentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="8" cy="8" r="3" /><circle cx="16" cy="16" r="3" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

const ConvertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const TimerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5" />
    <path d="M9.5 3.5h5" /><path d="M12 3.5v2" />
  </svg>
);

const tools = [
  {
    id: "calculator",
    icon: <CalcIcon />,
    name: "Calculatrice",
    description: "Calculs simples et rapides avec historique intégré",
    tag: "Maths",
    available: true,
    href: "/calculator",
  },
  {
    id: "percentage",
    icon: <PercentIcon />,
    name: "Pourcentages",
    description: "Calcul de remises, taxes et variations",
    tag: "Bientôt",
    available: false,
  },
  {
    id: "converter",
    icon: <ConvertIcon />,
    name: "Conversions",
    description: "Unités de mesure, températures, devises",
    tag: "Bientôt",
    available: false,
  },
  {
    id: "timer",
    icon: <TimerIcon />,
    name: "Chronomètre",
    description: "Minuterie et compteur de temps",
    tag: "Bientôt",
    available: false,
  },
];

export default function Home() {
  return (
    <main style={{ flex: 1 }}>
      {/* Hero */}
      <div
        style={{
          padding: "64px 32px 52px",
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            background: "#FEF0ED",
            color: "#E07B72",
            borderRadius: "4px",
            padding: "3px 10px",
            marginBottom: "22px",
          }}
        >
          Outils en ligne
        </div>

        <h1
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(38px, 5vw, 58px)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#2C1A17",
            marginBottom: "16px",
            maxWidth: "560px",
            margin: "0 auto 16px",
          }}
        >
          Outils simples,
          <br />
          <span style={{ color: "#E07B72", fontStyle: "italic" }}>
            résultats clairs.
          </span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "16px",
            color: "#7A5550",
            lineHeight: 1.55,
            maxWidth: "380px",
            margin: "0 auto 36px",
          }}
        >
          Tous vos outils du quotidien, disponibles en un clic.
        </p>

        <HeroCTA />
      </div>

      {/* Tools section */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#B89490",
            marginBottom: "16px",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Tous les outils
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px 96px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              icon={tool.icon}
              name={tool.name}
              description={tool.description}
              tag={tool.tag}
              available={tool.available}
              href={tool.href}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
