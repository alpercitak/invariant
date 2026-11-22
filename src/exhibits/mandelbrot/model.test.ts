import { describe, expect, test } from 'bun:test';
import { escapeStep } from './model';

describe('Mandelbrot escape model', () => {
  test('keeps fixed and periodic points that stay within the radius', () => {
    expect(escapeStep(0, 0, 100)).toBe(0);
    expect(escapeStep(-1, 0, 100)).toBe(0);
    expect(escapeStep(-2, 0, 100)).toBe(0);
  });

  test('does not count points exactly on the radius-2 boundary as escaped', () => {
    expect(escapeStep(-2, 0, 1)).toBe(0);
    expect(escapeStep(-2, 0, 2)).toBe(0);
    expect(escapeStep(-2, 0, 20)).toBe(0);
  });

  test('reports the first strict crossing, including at the iteration limit', () => {
    expect(escapeStep(2, 0, 1)).toBe(0);
    expect(escapeStep(2, 0, 2)).toBe(2);
    expect(escapeStep(2, 0, 3)).toBe(2);
    expect(escapeStep(1, 0, 2)).toBe(0);
    expect(escapeStep(1, 0, 3)).toBe(3);
  });

  test('preserves conjugate symmetry', () => {
    for (const [real, imaginary] of [
      [-0.1, 0.7],
      [0.3, 0.4],
      [-1.25, 0.2],
    ]) {
      expect(escapeStep(real, imaginary, 100)).toBe(escapeStep(real, -imaginary, 100));
    }
  });
});
