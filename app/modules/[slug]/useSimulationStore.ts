"use client";

import { create } from "zustand";
import type { ModuleSlug } from "@/lib/data/modules";
import type { ProjectileState, DragModel } from "@/lib/physics/projectiles";

export interface SimulationResult {
  slug: ModuleSlug;
  timestamp: number;
  params: Record<string, number>;
  metrics: Record<string, number>;
  samples?: { x: number; y: number; t: number }[];
  trajectory?: ProjectileState[];
  summary: string[];
  latex: string[];
}

export interface ModuleSimulationState {
  params: Record<string, number>;
  status: "idle" | "running" | "error";
  dragModel?: DragModel;
  options: {
    showVectors: boolean;
    slowMotion: boolean;
  };
  result?: SimulationResult;
  history: SimulationResult[];
}

type SimulationStore = {
  state: Partial<Record<ModuleSlug, ModuleSimulationState>>;
  initialiseModule: (slug: ModuleSlug, defaults: Record<string, number>) => void;
  updateParam: (slug: ModuleSlug, key: string, value: number) => void;
  setDragModel: (slug: ModuleSlug, model: DragModel) => void;
  setOption: (slug: ModuleSlug, key: keyof ModuleSimulationState["options"], value: boolean) => void;
  runSimulation: (slug: ModuleSlug) => void;
  receiveResult: (slug: ModuleSlug, result: SimulationResult) => void;
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  state: {},
  initialiseModule(slug, defaults) {
    set((previous) => ({
      state: {
        ...previous.state,
        [slug]: {
          params: { ...defaults },
          status: "idle",
          dragModel: "quadratic",
          options: { showVectors: true, slowMotion: false },
          history: []
        }
      }
    }));
  },
  updateParam(slug, key, value) {
    set((previous) => {
      const moduleState = previous.state[slug];
      if (!moduleState) return previous;
      return {
        state: {
          ...previous.state,
          [slug]: {
            ...moduleState,
            params: {
              ...moduleState.params,
              [key]: value
            }
          }
        }
      };
    });
  },
  setDragModel(slug, model) {
    set((previous) => {
      const moduleState = previous.state[slug];
      if (!moduleState) return previous;
      return {
        state: {
          ...previous.state,
          [slug]: {
            ...moduleState,
            dragModel: model
          }
        }
      };
    });
  },
  setOption(slug, key, value) {
    set((previous) => {
      const moduleState = previous.state[slug];
      if (!moduleState) return previous;
      return {
        state: {
          ...previous.state,
          [slug]: {
            ...moduleState,
            options: {
              ...moduleState.options,
              [key]: value
            }
          }
        }
      };
    });
  },
  runSimulation(slug) {
    const moduleState = get().state[slug];
    if (!moduleState) return;
    set((previous) => ({
      state: {
        ...previous.state,
        [slug]: {
          ...moduleState,
          status: "running"
        }
      }
    }));
    const worker = new Worker(new URL("./worker.ts", import.meta.url));
    worker.onmessage = (event) => {
      const message = event.data as { type: string; result: SimulationResult };
      if (message.type === "result") {
        get().receiveResult(slug, message.result);
        worker.terminate();
      }
    };
    worker.postMessage({
      type: "simulate",
      slug,
      params: moduleState.params,
      dragModel: moduleState.dragModel,
      options: moduleState.options
    });
  },
  receiveResult(slug, result) {
    set((previous) => {
      const moduleState = previous.state[slug];
      if (!moduleState) return previous;
      return {
        state: {
          ...previous.state,
          [slug]: {
            ...moduleState,
            status: "idle",
            result,
            history: [result, ...moduleState.history].slice(0, 25)
          }
        }
      };
    });
  }
}));
