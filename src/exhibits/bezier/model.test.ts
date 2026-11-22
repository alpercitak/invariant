import { describe, expect, test } from 'bun:test';
import { type ControlPoints, deCasteljau } from './model';

describe('Bézier model', () => {
  const points: ControlPoints = [
    { x: 0, y: 1 },
    { x: 2, y: 3 },
    { x: 5, y: 2 },
    { x: 8, y: 6 },
  ];

  test('interpolates the curve endpoints', () => {
    expect(deCasteljau(points, 0).point).toEqual(points[0]);
    expect(deCasteljau(points, 1).point).toEqual(points[3]);
  });

  test('agrees with the cubic Bernstein polynomial at an interior parameter', () => {
    const t = 0.3;
    const [p0, p1, p2, p3] = points;
    const u = 1 - t;
    const curve = deCasteljau(points, t).point;
    const bernstein = (axis: 'x' | 'y') =>
      u ** 3 * p0[axis] + 3 * u ** 2 * t * p1[axis] + 3 * u * t ** 2 * p2[axis] + t ** 3 * p3[axis];

    expect(curve.x).toBeCloseTo(bernstein('x'));
    expect(curve.y).toBeCloseTo(bernstein('y'));
  });
});
