import { describe, expect, test } from 'bun:test';
import { barycentricPositions, barycentricScales, ECCENTRICITY, relativeOrbit } from './model';

describe('two-body orbit model', () => {
  test('places periapsis and apoapsis at their analytic distances', () => {
    expect(relativeOrbit(0)).toEqual({ x: 1 - ECCENTRICITY, y: 0 });
    expect(relativeOrbit(0.5).x).toBeCloseTo(-(1 + ECCENTRICITY), 12);
    expect(relativeOrbit(0.5).y).toBeCloseTo(0, 12);
  });

  test('advances uniformly in mean anomaly according to Kepler’s equation', () => {
    const eccentricAnomaly = Math.PI / 2;
    const phase = (eccentricAnomaly - ECCENTRICITY) / (2 * Math.PI);
    const point = relativeOrbit(phase);

    expect(point.x).toBeCloseTo(-ECCENTRICITY, 12);
    expect(point.y).toBeCloseTo(Math.sqrt(1 - ECCENTRICITY ** 2), 12);
  });

  test('closes after one normalized period and keeps the center of mass fixed', () => {
    for (const ratio of [1, 4, 10]) {
      const start = barycentricPositions(ratio, 0);
      const end = barycentricPositions(ratio, 1);
      expect(end.a.x).toBeCloseTo(start.a.x, 12);
      expect(end.a.y).toBeCloseTo(start.a.y, 12);
      expect(end.b.x).toBeCloseTo(start.b.x, 12);
      expect(end.b.y).toBeCloseTo(start.b.y, 12);

      const scales = barycentricScales(ratio);
      const positions = barycentricPositions(ratio, 0.37);
      expect(ratio * positions.a.x + positions.b.x).toBeCloseTo(0, 12);
      expect(ratio * positions.a.y + positions.b.y).toBeCloseTo(0, 12);
      expect(ratio * scales.a + scales.b).toBeCloseTo(0, 12);
    }
  });

  test('changes each body’s share of the separation without changing the relative orbit', () => {
    const phase = 0.28;
    const relative = relativeOrbit(phase);
    const equal = barycentricPositions(1, phase);
    const unequal = barycentricPositions(10, phase);
    expect(equal.a).toEqual({ x: -equal.b.x, y: -equal.b.y });
    expect(unequal.b.x - unequal.a.x).toBeCloseTo(relative.x, 12);
    expect(unequal.b.y - unequal.a.y).toBeCloseTo(relative.y, 12);
    expect(Math.hypot(unequal.a.x, unequal.a.y)).toBeLessThan(Math.hypot(equal.a.x, equal.a.y));
  });
});
