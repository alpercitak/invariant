import { describe, expect, test } from 'bun:test';
import { decompose, evaluate, sampleOutline, sampleRmsError } from './model';
import { outline } from './outline';

describe('Fourier model', () => {
  test('samples the closing edge by distance', () => {
    const samples = sampleOutline(
      [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 4, y: 4 },
        { x: 4, y: 4 },
        { x: 0, y: 4 },
      ],
      8,
    );
    expect(samples).toEqual([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 4, y: 4 },
      { x: 2, y: 4 },
      { x: 0, y: 4 },
      { x: 0, y: 2 },
    ]);
  });

  test('decomposes a constant and reconstructs every sample', () => {
    const samples = Array.from({ length: 9 }, () => ({ x: 3, y: -2 }));
    const harmonics = decompose(samples);
    expect(harmonics[0].frequency).toBe(0);
    expect(harmonics[0].real).toBeCloseTo(3);
    expect(harmonics[0].imaginary).toBeCloseTo(-2);
    expect(harmonics.slice(1).some(({ frequency }) => frequency < 0)).toBe(true);
    samples.forEach((sample, j) => {
      const result = evaluate(harmonics, j / samples.length);
      expect(result.x).toBeCloseTo(sample.x, 10);
      expect(result.y).toBeCloseTo(sample.y, 10);
    });
    expect(sampleRmsError(samples, harmonics)).toBeCloseTo(0, 10);
  });

  test('uses signed bins and added harmonics reduce reconstruction error', () => {
    const samples = Array.from({ length: 9 }, (_, j) => {
      const one = (2 * Math.PI * j) / 9;
      const two = 2 * one;
      return { x: 2 + Math.cos(one) + 0.4 * Math.cos(two), y: Math.sin(one) - 0.4 * Math.sin(two) };
    });
    const harmonics = decompose(samples);
    expect(harmonics.slice(0, 3).map(({ frequency }) => frequency)).toEqual([0, 1, -2]);
    const error = (size: number) => sampleRmsError(samples, harmonics.slice(0, size));
    expect(error(1)).toBeGreaterThan(error(2));
    expect(error(2)).toBeGreaterThan(error(3));
    expect(error(harmonics.length)).toBeCloseTo(0, 10);
  });

  test('the full set of harmonics recovers every point of the exhibited outline', () => {
    const samples = sampleOutline(outline);
    const harmonics = decompose(samples);
    samples.forEach((sample, index) => {
      const result = evaluate(harmonics, index / samples.length);
      expect(Math.hypot(result.x - sample.x, result.y - sample.y)).toBeLessThan(1e-10);
    });
  });
});
