import { describe, expect, test } from 'bun:test';
import { pathDifference, relativeAmplitude, SOURCE_OFFSET } from './model';

describe('two-source interference model', () => {
  test('computes path difference from sources at either side of the origin', () => {
    expect(pathDifference(0, 0)).toBe(0);
    expect(pathDifference(SOURCE_OFFSET, 0)).toBe(2 * SOURCE_OFFSET);
    expect(pathDifference(-SOURCE_OFFSET, 0)).toBe(-2 * SOURCE_OFFSET);
    expect(pathDifference(3, 0)).toBe(2 * SOURCE_OFFSET);
    expect(pathDifference(-3, 0)).toBe(-2 * SOURCE_OFFSET);
  });

  test('gives full relative amplitude at constructive phase and zero at destructive phase', () => {
    expect(relativeAmplitude(0, 2, 0)).toBeCloseTo(1);
    expect(relativeAmplitude(1, 2, 0)).toBeCloseTo(0);
    expect(relativeAmplitude(0, 2, 180)).toBeCloseTo(0);
    expect(relativeAmplitude(1, 2, 180)).toBeCloseTo(1);
  });
});
