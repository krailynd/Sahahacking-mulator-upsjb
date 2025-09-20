import { rungeKutta4 } from "@/lib/physics/integrators";

type OscillatorParams = {
  amplitude: number;
  mass: number;
  k: number;
  gamma: number;
  omegaDrive: number;
};

export function simulateOscillator(
  params: OscillatorParams,
  step = 0.01,
  duration = 40
) {
  const { amplitude, mass, k, gamma, omegaDrive } = params;
  const omega0 = Math.sqrt(k / mass);
  const forcingAmplitude = amplitude * gamma * 0.5;

  const derivative = ([x, v]: number[], t: number): [number, number] => {
    const forceDrive = forcingAmplitude * Math.cos(omegaDrive * t);
    const ax = (forceDrive - gamma * v - k * x) / mass;
    return [v, ax];
  };

  let state: [number, number] = [amplitude, 0];
  const samples: { t: number; x: number; v: number }[] = [{ t: 0, x: state[0], v: state[1] }];
  let t = 0;

  while (t < duration) {
    state = rungeKutta4(state, t, step, derivative);
    t += step;
    if (Math.floor(t / step) % 5 === 0) {
      samples.push({ t, x: state[0], v: state[1] });
    }
  }

  return {
    samples,
    omega0,
    qualityFactor: omega0 / (2 * gamma + 1e-6)
  };
}
