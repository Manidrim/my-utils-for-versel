import Link from "next/link";

type Tool = {
  href: string;
  name: string;
  description: string;
};

const tools: Tool[] = [
  {
    href: "/calculator",
    name: "Calculatrice",
    description: "Addition, soustraction, multiplication, division.",
  },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 gap-8">
      <header className="text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Mes outils front
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Une collection de petits utilitaires web déployés sur Vercel.
        </p>
      </header>

      <section className="w-full max-w-3xl grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500 transition"
          >
            <h2 className="text-lg font-semibold">{tool.name}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {tool.description}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
