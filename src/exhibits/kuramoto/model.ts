export type OscillatorState = {
  phases: number[];
  frequencies: number[];
  time: number;
};

export const OSCILLATOR_COUNT = 64;
export const STEP = 0.025;
const TWO_PI = 2 * Math.PI;

function random(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let next = Math.imul(value ^ (value >>> 15), 1 | value);
    next ^= next + Math.imul(next ^ (next >>> 7), 61 | next);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function createState(seed = 17, count = OSCILLATOR_COUNT): OscillatorState {
  const sample = random(seed);
  return {
    phases: Array.from({ length: count }, () => sample() * TWO_PI),
    // A bounded, evenly spaced frequency distribution keeps the population balanced.
    frequencies: Array.from({ length: count }, (_, i) => 1.4 * ((2 * i) / Math.max(1, count - 1) - 1)),
    time: 0,
  };
}

export function orderParameter(phases: readonly number[]): { coherence: number; meanPhase: number } {
  if (phases.length === 0) return { coherence: 0, meanPhase: 0 };
  let x = 0;
  let y = 0;
  for (const phase of phases) {
    x += Math.cos(phase);
    y += Math.sin(phase);
  }
  return { coherence: Math.hypot(x, y) / phases.length, meanPhase: Math.atan2(y, x) };
}

function derivative(phases: readonly number[], frequencies: readonly number[], coupling: number): number[] {
  const { coherence, meanPhase } = orderParameter(phases);
  return phases.map((phase, i) => frequencies[i] + coupling * coherence * Math.sin(meanPhase - phase));
}

export function step(state: OscillatorState, coupling: number, dt = STEP): OscillatorState {
  const { phases, frequencies, time } = state;
  const k1 = derivative(phases, frequencies, coupling);
  const at = (k: number[], scale: number) => phases.map((phase, i) => phase + scale * k[i]);
  const k2 = derivative(at(k1, dt / 2), frequencies, coupling);
  const k3 = derivative(at(k2, dt / 2), frequencies, coupling);
  const k4 = derivative(at(k3, dt), frequencies, coupling);
  return {
    phases: phases.map((phase, i) => (phase + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) + TWO_PI) % TWO_PI),
    frequencies,
    time: time + dt,
  };
}
