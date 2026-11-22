export const ECCENTRICITY = 0.45;

export type Point = { x: number; y: number };

const TWO_PI = 2 * Math.PI;

export function barycentricScales(ratio: number): { a: number; b: number } {
  return { a: -1 / (1 + ratio), b: ratio / (1 + ratio) };
}

export function relativeOrbit(phase: number): Point {
  const meanAnomaly = TWO_PI * phase;
  let eccentricAnomaly = meanAnomaly;

  for (let iteration = 0; iteration < 6; iteration += 1) {
    eccentricAnomaly -=
      (eccentricAnomaly - ECCENTRICITY * Math.sin(eccentricAnomaly) - meanAnomaly) /
      (1 - ECCENTRICITY * Math.cos(eccentricAnomaly));
  }

  return {
    x: Math.cos(eccentricAnomaly) - ECCENTRICITY,
    y: Math.sqrt(1 - ECCENTRICITY ** 2) * Math.sin(eccentricAnomaly),
  };
}

export function barycentricPositions(ratio: number, phase: number): { a: Point; b: Point } {
  const scales = barycentricScales(ratio);
  const relative = relativeOrbit(phase);
  return {
    a: { x: scales.a * relative.x, y: scales.a * relative.y },
    b: { x: scales.b * relative.x, y: scales.b * relative.y },
  };
}
