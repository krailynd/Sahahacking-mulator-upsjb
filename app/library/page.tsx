import { MODULE_CONFIG } from "@/lib/data/module-config";

export const metadata = {
  title: "Biblioteca de fórmulas • Interstellar Physics Lab"
};

export default function LibraryPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 py-16">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl font-semibold text-white">Biblioteca de fórmulas</h1>
        <p className="text-slate-300">
          Derivaciones esenciales para cada módulo con enlaces directos a las simulaciones.
        </p>
      </header>
      <div className="space-y-6">
        {Object.values(MODULE_CONFIG).map((module) => (
          <article
            key={module.slug}
            className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-500/10"
          >
            <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white capitalize">{module.slug.replaceAll("-", " ")}</h2>
                <p className="text-sm text-slate-400">{module.description}</p>
              </div>
            </header>
            <ul className="space-y-2 text-indigo-100">
              {module.formulas.map((formula) => (
                <li key={formula} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono">
                  {formula}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
