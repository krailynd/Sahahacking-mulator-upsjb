import Link from "next/link";
import { FEATURED_MODULES, MODULE_DEFINITIONS } from "@/lib/data/modules";

export const metadata = {
  title: "Módulos • Interstellar Physics Lab"
};

export default function ModulesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="space-y-4 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Módulos Destacados</p>
        <h1 className="text-4xl font-semibold text-white">Elige tu aventura física</h1>
        <p className="mx-auto max-w-3xl text-slate-300">
          Cada simulación ofrece explicación paso a paso, historial, fórmulas y Blackboard integrado.
        </p>
      </header>

      <section className="mt-16 grid gap-8 lg:grid-cols-3">
        {FEATURED_MODULES.map((module) => (
          <ModuleCard key={module.slug} {...module} accent />
        ))}
      </section>

      <section className="mt-20 space-y-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Todos los módulos</p>
            <h2 className="text-2xl font-semibold text-white">12 Módulos Disponibles</h2>
          </div>
          <p className="text-slate-400">60+ horas de contenido · Fondo infinito · Experimentos reproducibles</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {MODULE_DEFINITIONS.map((module) => (
            <ModuleCard key={module.slug} {...module} />
          ))}
        </div>
      </section>
    </main>
  );
}

type CardProps = (typeof MODULE_DEFINITIONS)[number] & { accent?: boolean };

function ModuleCard({ slug, title, summary, tags, duration, level, icon, accent }: CardProps) {
  return (
    <article
      className={`group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-500/10 transition hover:shadow-indigo-500/30 ${accent ? "border-indigo-400/40 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-slate-900/60" : ""}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-3xl">
          <span>{icon}</span>
          <div className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-widest text-indigo-200">
            {level} · {duration}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-300">{summary}</p>
        <ul className="flex flex-wrap gap-2 text-[11px] uppercase tracking-widest text-indigo-200/80">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full border border-indigo-200/20 px-3 py-1">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/modules/${slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
        >
          Iniciar
          <span aria-hidden>→</span>
        </Link>
        <span className="text-xs text-slate-400">Historial sincronizado</span>
      </div>
    </article>
  );
}
