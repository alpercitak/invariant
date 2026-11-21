import { describe, expect, test } from 'bun:test';
import { DEFAULT_GROWTH, GROWTH_MAX, GROWTH_MIN, logisticSamples, SAMPLE_COUNT } from './model';

describe('logistic model', () => {
  test('samples the stable fixed point at growth 2.8', () => {
    const fixedPoint = (2.8 - 1) / 2.8;
    const samples = logisticSamples(2.8);
    expect(samples).toHaveLength(SAMPLE_COUNT);
    for (const sample of samples) expect(sample).toBeCloseTo(fixedPoint, 12);
  });

  test('alternates between the theoretical period-two values at growth 3.2', () => {
    const growth = DEFAULT_GROWTH;
    const offset = Math.sqrt((growth - 3) * (growth + 1));
    const low = (growth + 1 - offset) / (2 * growth);
    const high = (growth + 1 + offset) / (2 * growth);
    const samples = logisticSamples(growth);
    expect(samples.at(-2)).toBeCloseTo(low, 12);
    expect(samples.at(-1)).toBeCloseTo(high, 12);
  });

  test('remains bounded at the maximum growth setting', () => {
    expect(GROWTH_MIN).toBeLessThan(GROWTH_MAX);
    const samples = logisticSamples(GROWTH_MAX);
    expect(samples).toHaveLength(SAMPLE_COUNT);
    expect(samples.every((sample) => sample >= 0 && sample <= 1)).toBe(true);
  });
});
