import { describe, expect, test } from 'bun:test';
import { estimatePi, samplePoint } from './model';

describe('Monte Carlo pi model', () => {
  test('uses two supplied samples as coordinates and includes the circle boundary', () => {
    const values = [1, 0];
    let calls = 0;

    expect(samplePoint(() => values[calls++])).toEqual({ x: 1, y: 0, inside: true });
    expect(calls).toBe(2);
  });

  test('classifies points inside and outside the quarter disk', () => {
    const inside = [0.6, 0.8];
    const outside = [0.8, 0.8];

    expect(samplePoint(() => inside.shift() ?? 0).inside).toBe(true);
    expect(samplePoint(() => outside.shift() ?? 0).inside).toBe(false);
  });

  test('estimates pi from the fraction inside the quarter disk', () => {
    expect(estimatePi(1, 4)).toBe(1);
    expect(estimatePi(3, 4)).toBe(3);
    expect(estimatePi(0, 0)).toBeUndefined();
  });
});
