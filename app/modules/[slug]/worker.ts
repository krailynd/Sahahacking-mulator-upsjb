import type { ModuleSlug } from "@/lib/data/modules";
import { simulateProjectile } from "@/lib/physics/projectiles";
import { simulateOscillator } from "@/lib/physics/oscilator";
import { simulateWaves } from "@/lib/physics/waves";
import { computeGenericSimulation } from "@/lib/physics/analysis";
import type { SimulationResult } from "./useSimulationStore";

interface SimulationMessage {
  type: "simulate";
  slug: ModuleSlug;
  params: Record<string, number>;
  dragModel?: string;
  options?: Record<string, unknown>;
}

self.onmessage = (event: MessageEvent<SimulationMessage>) => {
  const message = event.data;
  if (message.type !== "simulate") return;
  const result = runSimulation(message.slug, message.params, message.dragModel);
  const payload: SimulationResult = {
    slug: message.slug,
    timestamp: Date.now(),
    params: message.params,
    ...result
  };
  self.postMessage({ type: "result", result: payload });
};

function runSimulation(slug: ModuleSlug, params: Record<string, number>, dragModel?: string) {
  switch (slug) {
    case "proyectiles": {
      const simulation = simulateProjectile({
        velocity: params.velocity ?? 20,
        angle: params.angle ?? 45,
        mass: params.mass ?? 1,
        cd: params.cd ?? 0.1,
        diameter: params.diameter ?? 0.1,
        altitude: params.altitude ?? 0,
        windX: params.windX ?? 0,
        windY: params.windY ?? 0,
        dragModel: (dragModel as any) ?? "quadratic"
      });
      const summary = [
        `Se integra la trayectoria con paso fijo de 0.02 s usando RK4 hasta el impacto en t = ${simulation.metrics.timeOfFlight.toFixed(
          2
        )} s.`,
        `El proyectil alcanza una altura máxima de ${simulation.metrics.maxHeight.toFixed(
          2
        )} m y recorre ${simulation.metrics.range.toFixed(2)} m.`,
        `La velocidad de impacto estimada es ${simulation.metrics.impactSpeed.toFixed(2)} m/s.`
      ];
      const latex = [
        String.raw`\vec{F}_d = -\frac{1}{2} C_d \rho A \|\vec{v}-\vec{v}_\text{viento}\| (\vec{v}-\vec{v}_\text{viento})`,
        String.raw`m\dot{\vec{v}} = \vec{F}_d + m\vec{g}`,
        String.raw`t_\text{vuelo} \approx ${simulation.metrics.timeOfFlight.toFixed(2)}`
      ];
      return {
        trajectory: simulation.trajectory,
        metrics: simulation.metrics,
        summary,
        latex
      };
    }
    case "oscilador-armonico": {
      const simulation = simulateOscillator({
        amplitude: params.amplitude ?? 1,
        mass: params.mass ?? 1,
        k: params.k ?? 10,
        gamma: params.gamma ?? 0.1,
        omegaDrive: params.omegaDrive ?? 1
      });
      const summary = [
        `Se integra la ecuación del oscilador amortiguado-forzado con k = ${params.k} N/m y gamma = ${params.gamma}.`,
        `Frecuencia natural ω₀ = ${simulation.omega0.toFixed(2)} rad/s.`,
        `Factor de calidad Q ≈ ${simulation.qualityFactor.toFixed(2)}.`
      ];
      const latex = [
        String.raw`m\ddot{x}+\gamma\dot{x}+kx=F_0\cos(\omega t)`,
        String.raw`\omega_0=\sqrt{\frac{k}{m}}`,
        String.raw`Q=\frac{\omega_0}{2\gamma}`
      ];
      return {
        samples: simulation.samples,
        metrics: {
          omega0: simulation.omega0,
          qualityFactor: simulation.qualityFactor
        },
        summary,
        latex
      };
    }
    case "ondas": {
      const simulation = simulateWaves({
        amplitudeA: params.amplitudeA ?? 1,
        amplitudeB: params.amplitudeB ?? 0.8,
        frequencyA: params.frequencyA ?? 2,
        frequencyB: params.frequencyB ?? 2.5,
        phase: params.phase ?? 0
      });
      return {
        samples: simulation.samples,
        metrics: simulation.metrics,
        summary: [
          "Se suman dos ondas sinusoidales para obtener la interferencia resultante.",
          `Amplitud máxima observada: ${simulation.metrics.amplitudMaxima.toFixed(2)}.`,
          `Frecuencia media: ${simulation.metrics.frecuenciaMedia.toFixed(2)} Hz.`
        ],
        latex: [
          String.raw`y(x)=A\sin(kx-\omega t)+B\sin(kx-\omega t+\phi)`,
          String.raw`\Delta f = |f_A-f_B|`
        ]
      };
    }
    default: {
      const computation = computeGenericSimulation(slug, params);
      return {
        samples: computation.samples,
        metrics: computation.metrics,
        summary: [
          "Simulación simplificada ejecutada en el worker con integración estable.",
          `Parámetros evaluados: ${Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join(", ")}.`
        ],
        latex: [String.raw`Resultado\ aproximado= ${JSON.stringify(computation.metrics)}`]
      };
    }
  }
}
