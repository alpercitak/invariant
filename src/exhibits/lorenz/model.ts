export type State = readonly [x: number, y: number, z: number];

export const PARAMETERS = { sigma: 10, rho: 28, beta: 8 / 3 } as const;
export const STEP = 0.01;

export function derivative([x, y, z]: State): State {
  const { sigma, rho, beta } = PARAMETERS;
  return [sigma * (y - x), x * (rho - z) - y, x * y - beta * z];
}

export function rk4(state: State, step = STEP): State {
  const add = (a: State, b: State, scale: number): State => [
    a[0] + b[0] * scale,
    a[1] + b[1] * scale,
    a[2] + b[2] * scale,
  ];
  const k1 = derivative(state);
  const k2 = derivative(add(state, k1, step / 2));
  const k3 = derivative(add(state, k2, step / 2));
  const k4 = derivative(add(state, k3, step));
  return [
    state[0] + (step / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
    state[1] + (step / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
    state[2] + (step / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]),
  ];
}

export function distance(a: State, b: State): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}
