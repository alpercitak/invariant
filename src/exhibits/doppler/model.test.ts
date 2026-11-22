import { describe, expect, test } from 'bun:test';
import { observedFrequencies, wavefrontAtAge } from './model';

describe('Doppler model', () => {
  test('keeps wavefronts centered on a stationary source', () => {
    expect(wavefrontAtAge(0, 1).centerX).toBeCloseTo(0);
    expect(wavefrontAtAge(0, 1).radius).toBe(1);
    expect(wavefrontAtAge(0, 3).centerX).toBeCloseTo(0);
    expect(wavefrontAtAge(0, 3).radius).toBe(3);
  });

  test('spaces emitted wavefronts closer ahead and farther behind', () => {
    const speedPercent = 50;
    const ages = [1, 2, 3];
    const frontPositions = ages.map((age) => {
      const { centerX, radius } = wavefrontAtAge(speedPercent, age);
      return centerX + radius;
    });
    const rearPositions = ages.map((age) => {
      const { centerX, radius } = wavefrontAtAge(speedPercent, age);
      return centerX - radius;
    });

    expect(frontPositions[1] - frontPositions[0]).toBe(0.5);
    expect(frontPositions[2] - frontPositions[1]).toBe(0.5);
    expect(rearPositions[0] - rearPositions[1]).toBe(1.5);
    expect(rearPositions[1] - rearPositions[2]).toBe(1.5);
  });

  test('computes the stationary receiver frequencies without rounding', () => {
    expect(observedFrequencies(0)).toEqual({ ahead: 440, behind: 440 });
    expect(observedFrequencies(50)).toEqual({ ahead: 880, behind: 440 / 1.5 });
  });
});
