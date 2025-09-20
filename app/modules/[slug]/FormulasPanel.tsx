"use client";

import type { ModuleConfig } from "@/lib/data/module-config";
import type { ModuleSlug } from "@/lib/data/modules";
import type { ModuleSimulationState } from "./useSimulationStore";

interface Props {
  slug: ModuleSlug;
  config: ModuleConfig;
  state: ModuleSimulationState;
}

export function FormulasPanel({ config, state }: Props) {
  const metricsEntries = state.result ? Object.entries(state.result.metrics) : [];

  return (
    <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Fórmulas clave</h2>
        <ul className="space-y-2 text-sm text-indigo-100">
          {config.formulas.map((formula) => (
            <li key={formula} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 font-mono">
              {formula}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Resultados</h2>
        <ul className="space-y-2 text-sm text-slate-200">
          {metricsEntries.length === 0 && <li>No hay resultados todavía.</li>}
          {metricsEntries.map(([key, value]) => (
            <li key={key} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-2">
              <span className="uppercase tracking-widest text-indigo-200">{key}</span>
              <span>{value.toFixed ? value.toFixed(3) : value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
