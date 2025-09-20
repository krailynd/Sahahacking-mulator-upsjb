import { describe, expect, it } from "vitest";
import { euler, rungeKutta4, semiImplicitEuler } from "@/lib/physics/integrators";

describe("integrators", () => {
  const derivative = ([x, v]: number[]) => [v, -x];

  it("euler integrates harmonic oscillator approximately", () => {
    const result = euler([1, 0], 0, 0.01, derivative);
    expect(result[0]).toBeCloseTo(1, 1);
    expect(result[1]).toBeCloseTo(-0.01, 2);
  });

  it("semi implicit euler integrates", () => {
    const result = semiImplicitEuler([1, 0], 0, 0.01, derivative);
    expect(result[0]).toBeCloseTo(1, 1);
    expect(result[1]).toBeCloseTo(-0.01, 2);
  });

  it("rk4 offers better accuracy", () => {
    const result = rungeKutta4([1, 0], 0, 0.01, derivative);
    expect(result[0]).toBeCloseTo(0.99995, 4);
    expect(result[1]).toBeCloseTo(-0.0099998, 4);
  });
});
