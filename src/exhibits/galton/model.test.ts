import { describe, expect, test } from 'bun:test';
import { binProbabilities, dropBall, ROW_COUNT } from './model';

describe('Galton board model', () => {
  test('uses supplied samples to determine the path and final bin', () => {
    const turns = [0.1, 0.9, 0.2, 0.8, 0.3, 0.7, 0.4, 0.6, 0.49, 0.51];
    let next = 0;
    const path = dropBall(0.5, () => turns[next++]);

    expect(path).toEqual([0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
    expect(path).toHaveLength(ROW_COUNT + 1);
    expect(path.at(-1)).toBe(5);
  });

  test('returns the known fair binomial coefficients', () => {
    expect(binProbabilities(0.5)).toEqual([
      1 / 1024,
      10 / 1024,
      45 / 1024,
      120 / 1024,
      210 / 1024,
      252 / 1024,
      210 / 1024,
      120 / 1024,
      45 / 1024,
      10 / 1024,
      1 / 1024,
    ]);
  });

  test('biased probabilities sum to one and have mean n p', () => {
    const probability = 0.7;
    const bins = binProbabilities(probability);
    const sum = bins.reduce((total, bin) => total + bin, 0);
    const mean = bins.reduce((total, mass, bin) => total + bin * mass, 0);

    expect(sum).toBeCloseTo(1);
    expect(mean).toBeCloseTo(ROW_COUNT * probability);
  });
});
