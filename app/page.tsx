import Link from "next/link";
import { FEATURED_MODULES, MODULE_DEFINITIONS } from "@/lib/data/modules";
import { Starfield } from "@/components/Starfield";
import { WarpLoader } from "@/components/WarpLoader";
import { SideDock } from "@/components/SideDock";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <WarpLoader />
      <Starfield density={120} />
      <SideDock />
      <div className="relative z-10 px-6 pb-24 pt-24 sm:px-12">
        <section className="mx-auto max-w-6xl space-y-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-300">
            Interstellar Physics Lab
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
            Simulaciones inmersivas para explorar la física sin límites
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-300">
            Domina proyectiles, oscilaciones, ondas, electromagnetismo, relatividad y más en
            un laboratorio interestelar con fondo infinito, análisis paso a paso e historial
            inteligente.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/modules"
              className="inline-flex items-center justify-center rounded-full border border-indigo-400/50 bg-indigo-500/20 px-6 py-3 text-sm font-medium text-indigo-200 shadow-lg shadow-indigo-500/20 backdrop-blur transition hover:bg-indigo-500/30"
            >
              Explorar Módulos
            </Link>
            <Link
              href="/library"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10"
            >
              Biblioteca de Fórmulas
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-6xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center shadow-lg shadow-indigo-500/10">
              <p className="text-4xl font-semibold text-white">12</p>
              <p className="text-sm uppercase tracking-widest text-slate-300">
                Módulos Disponibles
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center shadow-lg shadow-indigo-500/10">
              <p className="text-4xl font-semibold text-white">60+</p>
              <p className="text-sm uppercase tracking-widest text-slate-300">Horas de Contenido</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 text-center shadow-lg shadow-indigo-500/10">
              <p className="text-4xl font-semibold text-white">∞</p>
              <p className="text-sm uppercase tracking-widest text-slate-300">Espacio de Exploración</p>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {FEATURED_MODULES.map((module) => (
              <article
                key={module.slug}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-slate-900/60 p-8 shadow-2xl shadow-purple-500/10 backdrop-blur"
              >
                <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl transition duration-500 group-hover:scale-110" />
                <div className="absolute bottom-6 right-6 text-5xl opacity-90">{module.icon}</div>
                <div className="relative z-10 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs uppercase tracking-widest text-indigo-200">
                    {module.level} · {module.duration}
                  </div>
                  <h2 className="text-3xl font-semibold text-white">{module.title}</h2>
                  <p className="text-slate-200">{module.summary}</p>
                  <ul className="flex flex-wrap gap-2 text-xs text-indigo-200/80">
                    {module.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-indigo-200/20 px-3 py-1">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/modules/${module.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                  >
                    Iniciar Simulación
                    <span aria-hidden className="text-lg">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-5xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-lg shadow-indigo-500/20">
          <h2 className="text-2xl font-semibold text-white">Laboratorio Integral</h2>
          <p className="text-slate-300">
            Blackboard matemático con exportación a PDF, historial sincronizado, panel de notas
            lateral al estilo Vivaldi y fórmulas contextualizadas para cada simulación.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-indigo-200/80">
            <span className="rounded-full border border-indigo-200/20 px-4 py-2">Blackboard + PDF</span>
            <span className="rounded-full border border-indigo-200/20 px-4 py-2">Panel de Notas</span>
            <span className="rounded-full border border-indigo-200/20 px-4 py-2">Historial Inteligente</span>
            <span className="rounded-full border border-indigo-200/20 px-4 py-2">Explicaciones paso a paso</span>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-5xl text-center text-sm text-slate-400">
          <p>
            Diseñado con Web Workers, integradores RK4/Euler, render en tiempo real con React Three
            Fiber y animaciones GSAP para una experiencia fluida a 60 FPS incluso en escenas
            complejas.
          </p>
        </section>
      </div>
    </div>
  );
}
