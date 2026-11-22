import { barycentricPositions, barycentricScales, ECCENTRICITY, type Point } from './model';

export const INITIAL_RATIO = 3;
export const MAX_RATIO = 10;
export const INITIAL_PHASE = 0.33;
export const ORIGIN = { x: 280, y: 157 };

const SCALE = 165;

export function orbitEllipses(ratio: number) {
  const { a, b } = barycentricScales(ratio);
  const ellipse = (factor: number) => {
    const rx = Math.abs(factor) * SCALE;
    return { cx: ORIGIN.x - factor * SCALE * ECCENTRICITY, rx, ry: rx * Math.sqrt(1 - ECCENTRICITY ** 2) };
  };
  return { a: ellipse(a), b: ellipse(b) };
}

export function plotPositions(ratio: number, phase: number) {
  const { a, b } = barycentricPositions(ratio, phase);
  const toPlot = ({ x, y }: Point) => ({ x: ORIGIN.x + x * SCALE, y: ORIGIN.y - y * SCALE });
  return { a: toPlot(a), b: toPlot(b) };
}

export function orbitSummary(ratio: number): string {
  return ratio === 1 ? 'Equal-size orbits' : `B’s orbit is ${ratio}× as wide as A’s`;
}
