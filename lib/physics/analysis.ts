import type { ModuleSlug } from "@/lib/data/modules";

export type GenericSample = { x: number; y: number; t: number };

export type ModuleComputation = {
  samples: GenericSample[];
  metrics: Record<string, number>;
};

export function computeGenericSimulation(
  slug: ModuleSlug,
  params: Record<string, number>
): ModuleComputation {
  switch (slug) {
    case "tiro-con-rozamiento":
      return computeDragProjectile(params);
    case "movimiento-circular":
      return computeCircular(params);
    case "colisiones-2d":
      return computeCollisions(params);
    case "energia-trabajo":
      return computeEnergy(params);
    case "electroestatica":
      return computeElectrostatics(params);
    case "circuitos-dc":
      return computeCircuit(params);
    case "optica-geometrica":
      return computeOptics(params);
    case "termodinamica":
      return computeThermo(params);
    case "relatividad-basica":
      return computeRelativity(params);
    default:
      return { samples: [], metrics: {} };
  }
}

function computeDragProjectile(params: Record<string, number>): ModuleComputation {
  const velocity = params.velocity ?? 20;
  const angle = ((params.angle ?? 45) * Math.PI) / 180;
  const cd = params.cd ?? 0.1;
  const area = params.area ?? 0.03;
  const mass = params.mass ?? 1;
  const rho = 1.225;
  const dt = 0.02;
  const state = { x: 0, y: 0, vx: velocity * Math.cos(angle), vy: velocity * Math.sin(angle) };
  const samples: GenericSample[] = [{ x: 0, y: 0, t: 0 }];
  let t = 0;
  let maxY = 0;
  while (t < 30) {
    const speed = Math.sqrt(state.vx ** 2 + state.vy ** 2);
    const drag = 0.5 * cd * rho * area * speed;
    state.vx += (-drag * state.vx * dt) / mass;
    state.vy += (-9.81 * dt - (drag * state.vy * dt) / mass);
    state.x += state.vx * dt;
    state.y += state.vy * dt;
    t += dt;
    maxY = Math.max(maxY, state.y);
    samples.push({ x: state.x, y: state.y, t });
    if (state.y < 0) break;
  }
  return {
    samples,
    metrics: {
      alcance: state.x,
      alturaMaxima: maxY,
      tiempoVuelo: t
    }
  };
}

function computeCircular(params: Record<string, number>): ModuleComputation {
  const radius = params.radius ?? 2;
  const torque = params.torque ?? 5;
  const mass = params.mass ?? 2;
  const inertia = mass * radius * radius;
  const alpha = torque / inertia;
  const samples: GenericSample[] = [];
  for (let t = 0; t <= 12; t += 0.2) {
    const omega = alpha * t;
    samples.push({ x: radius * Math.cos(omega), y: radius * Math.sin(omega), t });
  }
  return {
    samples,
    metrics: {
      inercia: inertia,
      aceleracionAngular: alpha
    }
  };
}

function computeCollisions(params: Record<string, number>): ModuleComputation {
  const m1 = params.m1 ?? 1;
  const m2 = params.m2 ?? 1;
  const v1 = params.v1 ?? 2;
  const v2 = params.v2 ?? -1;
  const e = params.restitution ?? 1;
  const v1p = ((m1 - e * m2) * v1 + (1 + e) * m2 * v2) / (m1 + m2);
  const v2p = ((m2 - e * m1) * v2 + (1 + e) * m1 * v1) / (m1 + m2);
  return {
    samples: [
      { x: v1, y: v2, t: 0 },
      { x: v1p, y: v2p, t: 1 }
    ],
    metrics: {
      energiaInicial: 0.5 * (m1 * v1 * v1 + m2 * v2 * v2),
      energiaFinal: 0.5 * (m1 * v1p * v1p + m2 * v2p * v2p)
    }
  };
}

function computeEnergy(params: Record<string, number>): ModuleComputation {
  const m = params.mass ?? 1;
  const h = params.height ?? 5;
  const k = params.k ?? 10;
  const ep = m * 9.81 * h;
  const es = 0.5 * k * h * h;
  return {
    samples: [
      { x: 0, y: ep, t: 0 },
      { x: 1, y: es, t: 1 }
    ],
    metrics: {
      energiaPotencial: ep,
      energiaElastica: es
    }
  };
}

function computeElectrostatics(params: Record<string, number>): ModuleComputation {
  const q1 = params.q1 ?? 1;
  const q2 = params.q2 ?? -1;
  const distance = params.distance ?? 1;
  const k = 8.9875517923e9;
  const eField = (k * Math.abs(q1)) / (distance * distance);
  return {
    samples: [
      { x: 0, y: q1, t: 0 },
      { x: distance, y: q2, t: 1 }
    ],
    metrics: {
      campo: eField,
      potencial: (k * (q1 + q2)) / distance
    }
  };
}

function computeCircuit(params: Record<string, number>): ModuleComputation {
  const V = params.voltage ?? 12;
  const R = params.resistance ?? 10;
  const C = params.capacitance ?? 0.001;
  const tau = R * C;
  const samples: GenericSample[] = [];
  for (let t = 0; t <= 5 * tau; t += tau / 20) {
    const voltage = V * (1 - Math.exp(-t / tau));
    samples.push({ x: t, y: voltage, t });
  }
  return {
    samples,
    metrics: {
      corrienteInicial: V / R,
      constanteTiempo: tau
    }
  };
}

function computeOptics(params: Record<string, number>): ModuleComputation {
  const f = params.focal ?? 0.5;
  const doObj = params.objectDistance ?? 2;
  const di = 1 / (1 / f - 1 / doObj);
  const m = -di / doObj;
  return {
    samples: [
      { x: 0, y: 0, t: 0 },
      { x: di, y: m, t: 1 }
    ],
    metrics: {
      distanciaImagen: di,
      aumento: m
    }
  };
}

function computeThermo(params: Record<string, number>): ModuleComputation {
  const ph = params.pressureHigh ?? 200;
  const pl = params.pressureLow ?? 80;
  const vh = params.volumeHigh ?? 2;
  const vl = params.volumeLow ?? 1;
  const work = (ph - pl) * (vh - vl);
  return {
    samples: [
      { x: vl, y: pl, t: 0 },
      { x: vh, y: ph, t: 1 }
    ],
    metrics: {
      trabajo: work,
      eficiencia: 1 - pl / ph
    }
  };
}

function computeRelativity(params: Record<string, number>): ModuleComputation {
  const beta = params.velocity ?? 0.6;
  const tau = params.properTime ?? 1;
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  return {
    samples: [
      { x: 0, y: tau, t: 0 },
      { x: beta, y: gamma * tau, t: 1 }
    ],
    metrics: {
      gamma,
      tiempoDil: gamma * tau,
      contraccion: 1 / gamma
    }
  };
}
