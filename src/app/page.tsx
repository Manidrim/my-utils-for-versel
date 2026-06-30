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

const DictationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const ConvertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const AdditionIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const MultiplicationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
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
    tag: "Maths",
    available: true,
    href: "/percentage",
  },
  {
    id: "dictation-success",
    icon: <DictationIcon />,
    name: "Pourcentage de réussite",
    description: "Calculez votre score de dictée : mots justes et pourcentage de réussite",
    tag: "Éducation",
    available: true,
    href: "/dictation-success",
  },
  {
    id: "converter",
    icon: <ConvertIcon />,
    name: "Conversions",
    description: "Unités de mesure, températures, devises",
    tag: "Sciences",
    available: true,
    href: "/converter",
  },
  {
    id: "addition",
    icon: <AdditionIcon />,
    name: "Tables d'addition",
    description: "Jeu d'apprentissage : révise tes tables avec des additions jusqu'à 10",
    tag: "Jeu",
    available: true,
    href: "/addition",
  },
  {
    id: "multiplication",
    icon: <MultiplicationIcon />,
    name: "Tables de multiplication",
    description: "Jeu d'apprentissage : révise tes tables avec des multiplications jusqu'à 10",
    tag: "Jeu",
    available: true,
    href: "/multiplication",
  },
  {
    id: "chronometre",
    icon: <TimerIcon />,
    name: "Chronometre",
    description: "Mesurer le temps écoulé",
    tag: "Nouveau",
    available: true,
    href: "/chronometre",
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
