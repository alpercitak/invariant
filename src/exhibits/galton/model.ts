export const ROW_COUNT = 10;
export const DEFAULT_BIAS = 0.5;
export const MIN_BIAS = 0.2;
export const MAX_BIAS = 0.8;

export function dropBall(probability: number, sample: () => number = Math.random): number[] {
  const path = [0];

  for (let row = 0; row < ROW_COUNT; row += 1) {
    path.push(path[row] + (sample() < probability ? 1 : 0));
  }

  return path;
}

export function binProbabilities(probability: number): number[] {
  const probabilities: number[] = [];
  let coefficient = 1;

  for (let bin = 0; bin <= ROW_COUNT; bin += 1) {
    probabilities.push(coefficient * probability ** bin * (1 - probability) ** (ROW_COUNT - bin));
    coefficient = (coefficient * (ROW_COUNT - bin)) / (bin + 1);
  }

  return probabilities;
}
