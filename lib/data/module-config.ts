import type { ModuleSlug } from "@/lib/data/modules";

export type ControlDefinition = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
};

export type ModuleConfig = {
  slug: ModuleSlug;
  description: string;
  defaultParams: Record<string, number>;
  controls: ControlDefinition[];
  formulas: string[];
};

export const MODULE_CONFIG: Record<ModuleSlug, ModuleConfig> = {
  "proyectiles": {
    slug: "proyectiles",
    description: "Simulación de proyectiles con arrastre lineal/cuadrático, viento y seguimiento de cámara infinito.",
    defaultParams: {
      velocity: 30,
      angle: 45,
      mass: 1,
      cd: 0.06,
      diameter: 0.12,
      altitude: 1500,
      windX: 0,
      windY: 0
    },
    controls: [
      { key: "velocity", label: "Velocidad inicial", min: 2, max: 80, step: 1, unit: "m/s" },
      { key: "angle", label: "Ángulo", min: 5, max: 85, step: 1, unit: "°" },
      { key: "mass", label: "Masa", min: 0.2, max: 10, step: 0.1, unit: "kg" },
      { key: "cd", label: "Coeficiente de arrastre", min: 0, max: 1, step: 0.01 },
      { key: "diameter", label: "Diámetro", min: 0.05, max: 0.3, step: 0.01, unit: "m" },
      { key: "altitude", label: "Altitud", min: 0, max: 4000, step: 50, unit: "m" },
      { key: "windX", label: "Viento X", min: -10, max: 10, step: 0.5, unit: "m/s" },
      { key: "windY", label: "Viento Y", min: -10, max: 10, step: 0.5, unit: "m/s" }
    ],
    formulas: [
      "x(t) = x_0 + \nabla\_x(t)",
      "y(t) = y_0 + v_0 t \sin(\theta) - \frac{1}{2} g t^2",
      "C\_d = \frac{1}{2} \rho A v^2"
    ]
  },
  "oscilador-armonico": {
    slug: "oscilador-armonico",
    description: "Oscilador armónico simple, amortiguado y forzado con curva de resonancia.",
    defaultParams: {
      amplitude: 1,
      mass: 1,
      k: 10,
      gamma: 0.1,
      omegaDrive: 1
    },
    controls: [
      { key: "amplitude", label: "Amplitud inicial", min: 0.2, max: 5, step: 0.1, unit: "m" },
      { key: "mass", label: "Masa", min: 0.2, max: 5, step: 0.1, unit: "kg" },
      { key: "k", label: "Constante elástica", min: 1, max: 40, step: 1, unit: "N/m" },
      { key: "gamma", label: "Amortiguamiento", min: 0, max: 2, step: 0.05 },
      { key: "omegaDrive", label: "Frecuencia forzada", min: 0.2, max: 5, step: 0.1, unit: "rad/s" }
    ],
    formulas: [
      "m \ddot{x} + \gamma \dot{x} + k x = F_0 \cos(\omega t)",
      "\omega\_0 = \sqrt{\frac{k}{m}}",
      "Q = \frac{\omega\_0}{2\gamma}"
    ]
  },
  "ondas": {
    slug: "ondas",
    description: "Interferencia y batidos en una cuerda bidimensional, con mapa de calor.",
    defaultParams: {
      amplitudeA: 1,
      amplitudeB: 0.8,
      frequencyA: 2,
      frequencyB: 2.5,
      phase: 0
    },
    controls: [
      { key: "amplitudeA", label: "Amplitud A", min: 0, max: 2, step: 0.1 },
      { key: "amplitudeB", label: "Amplitud B", min: 0, max: 2, step: 0.1 },
      { key: "frequencyA", label: "Frecuencia A", min: 0.5, max: 6, step: 0.1, unit: "Hz" },
      { key: "frequencyB", label: "Frecuencia B", min: 0.5, max: 6, step: 0.1, unit: "Hz" },
      { key: "phase", label: "Diferencia de fase", min: 0, max: 6.28, step: 0.1, unit: "rad" }
    ],
    formulas: [
      "y(x,t) = A \sin(kx - \omega t) + B \sin(kx - \omega t + \phi)",
      "I \propto A^2",
      "\Delta f = |f\_A - f\_B|"
    ]
  },
  "tiro-con-rozamiento": {
    slug: "tiro-con-rozamiento",
    description: "Proyectil con coeficientes dependientes de Reynolds y densidad variable.",
    defaultParams: {
      velocity: 25,
      angle: 50,
      mass: 1.2,
      cd: 0.12,
      area: 0.03
    },
    controls: [
      { key: "velocity", label: "Velocidad inicial", min: 5, max: 90, step: 1 },
      { key: "angle", label: "Ángulo", min: 10, max: 80, step: 1 },
      { key: "mass", label: "Masa", min: 0.5, max: 5, step: 0.1 },
      { key: "cd", label: "Coeficiente base", min: 0, max: 1, step: 0.02 },
      { key: "area", label: "Área frontal", min: 0.01, max: 0.1, step: 0.005 }
    ],
    formulas: ["F\_d = \frac{1}{2} C\_d \rho A v^2", "Re = \frac{\rho v L}{\mu}"]
  },
  "movimiento-circular": {
    slug: "movimiento-circular",
    description: "Visualización de torque, velocidad angular y momento de inercia variable.",
    defaultParams: {
      radius: 2,
      mass: 2,
      torque: 5
    },
    controls: [
      { key: "radius", label: "Radio", min: 0.5, max: 5, step: 0.1, unit: "m" },
      { key: "mass", label: "Masa", min: 0.5, max: 10, step: 0.1, unit: "kg" },
      { key: "torque", label: "Torque", min: 0, max: 20, step: 0.5, unit: "N·m" }
    ],
    formulas: ["\tau = I \alpha", "I = m r^2", "\omega = \omega_0 + \alpha t"]
  },
  "colisiones-2d": {
    slug: "colisiones-2d",
    description: "Colisiones elásticas e inelásticas con vectores normal/tangencial.",
    defaultParams: {
      m1: 1,
      m2: 1.5,
      v1: 4,
      v2: -2,
      restitution: 0.9
    },
    controls: [
      { key: "m1", label: "Masa 1", min: 0.5, max: 5, step: 0.1 },
      { key: "m2", label: "Masa 2", min: 0.5, max: 5, step: 0.1 },
      { key: "v1", label: "Velocidad 1", min: -6, max: 6, step: 0.2 },
      { key: "v2", label: "Velocidad 2", min: -6, max: 6, step: 0.2 },
      { key: "restitution", label: "Coeficiente de restitución", min: 0, max: 1, step: 0.05 }
    ],
    formulas: ["p = m v", "E = \frac{1}{2} m v^2", "v' = \frac{(m_1 - e m_2) v_1 + (1 + e) m_2 v_2}{m_1 + m_2}"]
  },
  "energia-trabajo": {
    slug: "energia-trabajo",
    description: "Pozos potenciales, áreas de trabajo y conservación de energía.",
    defaultParams: {
      mass: 1,
      height: 5,
      k: 12
    },
    controls: [
      { key: "mass", label: "Masa", min: 0.5, max: 5, step: 0.1 },
      { key: "height", label: "Altura", min: 0, max: 20, step: 0.5 },
      { key: "k", label: "Constante elástica", min: 1, max: 30, step: 1 }
    ],
    formulas: ["E_p = m g h", "E_k = \frac{1}{2} m v^2", "W = \int F \cdot ds"]
  },
  "electroestatica": {
    slug: "electroestatica",
    description: "Líneas de campo y potencial debido a cargas puntuales.",
    defaultParams: {
      q1: 2,
      q2: -3,
      distance: 2
    },
    controls: [
      { key: "q1", label: "Carga 1", min: -5, max: 5, step: 0.1, unit: "µC" },
      { key: "q2", label: "Carga 2", min: -5, max: 5, step: 0.1, unit: "µC" },
      { key: "distance", label: "Distancia", min: 0.5, max: 5, step: 0.1, unit: "m" }
    ],
    formulas: ["\vec{E} = k \frac{q}{r^2}", "V = k \frac{q}{r}", "\Phi = \int \vec{E} · d\vec{S}"]
  },
  "circuitos-dc": {
    slug: "circuitos-dc",
    description: "Circuitos resistivos y transitorios RC con gráficas temporales.",
    defaultParams: {
      voltage: 12,
      resistance: 10,
      capacitance: 0.001
    },
    controls: [
      { key: "voltage", label: "Voltaje", min: 1, max: 24, step: 1, unit: "V" },
      { key: "resistance", label: "Resistencia", min: 1, max: 100, step: 1, unit: "Ω" },
      { key: "capacitance", label: "Capacitancia", min: 0.0001, max: 0.01, step: 0.0001, unit: "F" }
    ],
    formulas: ["i(t) = \frac{V}{R} e^{-t/(RC)}", "v_C(t) = V(1 - e^{-t/(RC)})", "\tau = RC"]
  },
  "optica-geometrica": {
    slug: "optica-geometrica",
    description: "Trazado de rayos para lentes y espejos con diagrama interactivo.",
    defaultParams: {
      focal: 0.5,
      objectDistance: 2,
      height: 1
    },
    controls: [
      { key: "focal", label: "Distancia focal", min: -2, max: 2, step: 0.1, unit: "m" },
      { key: "objectDistance", label: "Distancia del objeto", min: 0.5, max: 5, step: 0.1, unit: "m" },
      { key: "height", label: "Altura", min: 0.1, max: 2, step: 0.1, unit: "m" }
    ],
    formulas: ["\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i}", "m = -\frac{d_i}{d_o}", "\theta = \theta'"]
  },
  "termodinamica": {
    slug: "termodinamica",
    description: "Ciclos PV y cálculo de trabajo como área bajo la curva.",
    defaultParams: {
      pressureHigh: 200,
      pressureLow: 80,
      volumeHigh: 2,
      volumeLow: 1
    },
    controls: [
      { key: "pressureHigh", label: "Presión alta", min: 100, max: 400, step: 10, unit: "kPa" },
      { key: "pressureLow", label: "Presión baja", min: 20, max: 120, step: 5, unit: "kPa" },
      { key: "volumeHigh", label: "Volumen máximo", min: 1, max: 4, step: 0.1, unit: "m³" },
      { key: "volumeLow", label: "Volumen mínimo", min: 0.5, max: 2, step: 0.1, unit: "m³" }
    ],
    formulas: ["W = \oint P dV", "\eta = 1 - \frac{Q_c}{Q_h}", "\Delta U = Q - W"]
  },
  "relatividad-basica": {
    slug: "relatividad-basica",
    description: "Visualizaciones de dilatación temporal y contracción de longitud.",
    defaultParams: {
      velocity: 0.6,
      properTime: 1
    },
    controls: [
      { key: "velocity", label: "Velocidad (c)", min: 0.1, max: 0.99, step: 0.01 },
      { key: "properTime", label: "Tiempo propio", min: 0.5, max: 10, step: 0.5, unit: "s" }
    ],
    formulas: ["\gamma = \frac{1}{\sqrt{1-\beta^2}}", "\Delta t = \gamma \Delta \tau", "L = \frac{L_0}{\gamma}"]
  }
};

export function getModuleConfig(slug: ModuleSlug) {
  return MODULE_CONFIG[slug];
}
