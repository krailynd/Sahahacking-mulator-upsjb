"use client";

import { useSimulationStore, type ModuleSimulationState } from "./useSimulationStore";
import type { ModuleConfig } from "@/lib/data/module-config";
import type { ModuleSlug } from "@/lib/data/modules";

interface Props {
  slug: ModuleSlug;
  config: ModuleConfig;
  state: ModuleSimulationState;
}

export function ControlsPanel({ slug, config, state }: Props) {
  const { updateParam, runSimulation, setDragModel, setOption } = useSimulationStore((store) => ({
    updateParam: store.updateParam,
    runSimulation: store.runSimulation,
    setDragModel: store.setDragModel,
    setOption: store.setOption
  }));

  return (
    <aside className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
      <header className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Control de parámetros</h2>
        <p className="text-xs uppercase tracking-widest text-indigo-200">{config.description}</p>
      </header>
      <div className="space-y-5">
        {config.controls.map((control) => (
          <div key={control.key} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-indigo-200">
              <span>{control.label}</span>
              <span>
                {state.params[control.key]?.toFixed(2)} {control.unit ?? ""}
              </span>
            </div>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={state.params[control.key] ?? control.min}
              onChange={(event) => updateParam(slug, control.key, Number(event.target.value))}
              className="w-full accent-indigo-400"
            />
          </div>
        ))}
      </div>
      {slug === "proyectiles" && (
        <div className="space-y-3 rounded-2xl border border-indigo-400/40 bg-indigo-500/10 p-4">
          <p className="text-sm font-medium text-indigo-100">Opciones avanzadas</p>
          <div className="flex flex-wrap gap-3 text-xs text-indigo-100">
            {(["none", "linear", "quadratic"] as const).map((model) => (
              <button
                key={model}
                onClick={() => setDragModel(slug, model)}
                className={`rounded-full border px-3 py-1 ${state.dragModel === model ? "border-indigo-300 bg-indigo-500/50" : "border-white/10 bg-white/10"}`}
              >
                {model}
              </button>
            ))}
          </div>
          <div className="space-y-2 text-xs text-indigo-100">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.options.showVectors}
                onChange={(event) => setOption(slug, "showVectors", event.target.checked)}
              />
              Mostrar vectores de velocidad
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.options.slowMotion}
                onChange={(event) => setOption(slug, "slowMotion", event.target.checked)}
              />
              Modo lento
            </label>
          </div>
        </div>
      )}
      <button
        onClick={() => runSimulation(slug)}
        disabled={state.status === "running"}
        className="w-full rounded-full border border-indigo-400/60 bg-indigo-500/40 px-5 py-2 text-sm font-medium text-indigo-100 transition hover:bg-indigo-500/60 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.status === "running" ? "Calculando..." : "Ejecutar simulación"}
      </button>
      <div className="space-y-2 text-xs text-slate-300">
        <p className="font-medium text-indigo-100">Historial</p>
        <ul className="max-h-40 space-y-1 overflow-y-auto pr-2 text-[11px] tracking-widest">
          {state.history.length === 0 && <li>Sin registros aún.</li>}
          {state.history.map((entry) => (
            <li key={entry.timestamp} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <div className="flex items-center justify-between">
                <span>{new Date(entry.timestamp).toLocaleTimeString("es-ES")}</span>
                <span>{Object.values(entry.metrics)[0]?.toFixed?.(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
