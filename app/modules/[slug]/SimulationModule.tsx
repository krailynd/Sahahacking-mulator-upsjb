"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import type { ModuleDefinition } from "@/lib/data/modules";
import type { ModuleConfig } from "@/lib/data/module-config";
import { ControlsPanel } from "./ControlsPanel";
import { FormulasPanel } from "./FormulasPanel";
import { StepByStep } from "./StepByStep";
import { Blackboard } from "@/components/Blackboard/Blackboard";
import { useSimulationStore } from "./useSimulationStore";

const SimulationCanvas = dynamic(() => import("./SimulationCanvas"), { ssr: false });

interface Props {
  moduleDefinition: ModuleDefinition;
  config: ModuleConfig;
}

export function SimulationModule({ moduleDefinition, config }: Props) {
  const { initialiseModule, runSimulation, state } = useSimulationStore((store) => ({
    initialiseModule: store.initialiseModule,
    runSimulation: store.runSimulation,
    state: store.state[moduleDefinition.slug]
  }));

  useEffect(() => {
    initialiseModule(moduleDefinition.slug, config.defaultParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleDefinition.slug, initialiseModule, JSON.stringify(config.defaultParams)]);

  useEffect(() => {
    if (!state?.result) {
      runSimulation(moduleDefinition.slug);
    }
  }, [moduleDefinition.slug, runSimulation, state?.result]);

  if (!state) return null;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.35em] text-indigo-300">Simulación</p>
        <h1 className="text-4xl font-semibold text-white">{moduleDefinition.title}</h1>
        <p className="text-slate-300">{moduleDefinition.summary}</p>
      </header>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <SimulationCanvas slug={moduleDefinition.slug} state={state} config={config} />
          <StepByStep slug={moduleDefinition.slug} state={state} />
        </div>
        <ControlsPanel slug={moduleDefinition.slug} config={config} state={state} />
      </section>
      <FormulasPanel slug={moduleDefinition.slug} config={config} state={state} />
      <Blackboard title={`Blackboard · ${moduleDefinition.title}`} />
    </main>
  );
}
