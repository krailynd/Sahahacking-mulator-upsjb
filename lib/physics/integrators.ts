export type Derivative<T extends number[]> = (
  state: T,
  time: number
) => T;

export function euler<T extends number[]>(
  state: T,
  time: number,
  step: number,
  derivative: Derivative<T>
): T {
  const slope = derivative(state, time);
  return state.map((value, index) => value + step * slope[index]) as T;
}

export function semiImplicitEuler<T extends number[]>(
  state: T,
  time: number,
  step: number,
  derivative: Derivative<T>
): T {
  const slope = derivative(state, time);
  const next: number[] = [];
  for (let index = 0; index < state.length; index += 1) {
    next[index] = state[index] + step * slope[index];
  }
  return next as T;
}

export function rungeKutta4<T extends number[]>(
  state: T,
  time: number,
  step: number,
  derivative: Derivative<T>
): T {
  const k1 = derivative(state, time);
  const stateK2 = state.map((value, index) => value + (step / 2) * k1[index]) as T;
  const k2 = derivative(stateK2, time + step / 2);
  const stateK3 = state.map((value, index) => value + (step / 2) * k2[index]) as T;
  const k3 = derivative(stateK3, time + step / 2);
  const stateK4 = state.map((value, index) => value + step * k3[index]) as T;
  const k4 = derivative(stateK4, time + step);
  const result = state.map(
    (value, index) =>
      value + (step / 6) * (k1[index] + 2 * k2[index] + 2 * k3[index] + k4[index])
  );
  return result as T;
}
