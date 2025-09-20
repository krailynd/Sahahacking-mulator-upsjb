"use client";

import { useMemo } from "react";
import katex from "katex";
import type { ModuleSlug } from "@/lib/data/modules";
import type { ModuleSimulationState } from "./useSimulationStore";

interface Props {
  slug: ModuleSlug;
  state: ModuleSimulationState;
}

export function StepByStep({ state }: Props) {
  const { summary, latex } = state.result ?? { summary: [], latex: [] };
  const renderedLatex = useMemo(
    () =>
      latex.map((expression) =>
        katex.renderToString(expression, { throwOnError: false, output: "html" })
      ),
    [latex]
  );

  if (!state.result) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300">
        Ejecuta la simulación para ver la resolución paso a paso.
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-black/30 p-5">
      <h2 className="text-lg font-semibold text-white">Cómo se resolvió</h2>
      <ol className="space-y-2 text-sm text-slate-200">
        {summary.map((item, index) => (
          <li key={index} className="rounded-lg border border-white/5 bg-white/5 px-4 py-2">
            {item}
          </li>
        ))}
      </ol>
      <div className="space-y-3">
        {renderedLatex.map((html, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/5 bg-slate-950/60 px-4 py-3"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </div>
    </div>
  );
}
