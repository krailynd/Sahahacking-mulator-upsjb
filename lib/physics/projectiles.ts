import { AIR_DENSITY_SEA_LEVEL, G } from "@/lib/physics/constants";
import { rungeKutta4 } from "@/lib/physics/integrators";

export type DragModel = "none" | "linear" | "quadratic";

export interface ProjectileParameters {
  velocity: number;
  angle: number;
  mass: number;
  cd: number;
  diameter: number;
  altitude: number;
  windX: number;
  windY: number;
  dragModel?: DragModel;
}

export interface ProjectileState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
}

export interface ProjectileMetrics {
  timeOfFlight: number;
  maxHeight: number;
  range: number;
  impactSpeed: number;
}

export interface ProjectileSimulationResult {
  trajectory: ProjectileState[];
  metrics: ProjectileMetrics;
}

const DEG_TO_RAD = Math.PI / 180;

function airDensity(altitude: number) {
  const scaleHeight = 8500; // m
  return AIR_DENSITY_SEA_LEVEL * Math.exp(-altitude / scaleHeight);
}

export function simulateProjectile(
  params: ProjectileParameters,
  step = 0.02,
  maxTime = 60
): ProjectileSimulationResult {
  const {
    velocity,
    angle,
    mass,
    cd,
    diameter,
    altitude,
    windX,
    windY,
    dragModel = "quadratic"
  } = params;

  const theta = angle * DEG_TO_RAD;
  const area = Math.PI * (diameter / 2) * (diameter / 2);
  const rho = airDensity(altitude);
  const cLinear = cd * rho * area;
  const cQuadratic = 0.5 * cd * rho * area;

  const derivative = ([x, y, vx, vy]: number[]): [number, number, number, number] => {
    const relativeVx = vx - windX;
    const relativeVy = vy - windY;
    const speed = Math.sqrt(relativeVx * relativeVx + relativeVy * relativeVy) + 1e-8;
    let ax = 0;
    let ay = -G;
    if (dragModel === "linear") {
      ax -= (cLinear * relativeVx) / mass;
      ay -= (cLinear * relativeVy) / mass;
    } else if (dragModel === "quadratic") {
      ax -= (cQuadratic * speed * relativeVx) / mass;
      ay -= (cQuadratic * speed * relativeVy) / mass;
    }
    return [vx, vy, ax, ay];
  };

  let state: [number, number, number, number] = [
    0,
    0,
    velocity * Math.cos(theta),
    velocity * Math.sin(theta)
  ];

  const trajectory: ProjectileState[] = [
    { x: state[0], y: state[1], vx: state[2], vy: state[3], t: 0 }
  ];

  let t = 0;
  let maxHeight = state[1];
  let impactSpeed = state[2];

  while (t < maxTime) {
    const nextState = rungeKutta4(state, t, step, derivative);
    t += step;
    state = nextState;
    maxHeight = Math.max(maxHeight, state[1]);
    impactSpeed = Math.sqrt(state[2] * state[2] + state[3] * state[3]);
    trajectory.push({ x: state[0], y: state[1], vx: state[2], vy: state[3], t });
    if (state[1] <= 0 && t > 0.1) break;
  }

  const lastValid = trajectory[trajectory.length - 1];
  const metrics: ProjectileMetrics = {
    timeOfFlight: lastValid.t,
    maxHeight,
    range: lastValid.x,
    impactSpeed
  };

  return { trajectory, metrics };
}
