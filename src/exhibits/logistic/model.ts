export const GROWTH_MIN = 2.6;
export const GROWTH_MAX = 4;
export const DEFAULT_GROWTH = 3.2;

const INITIAL_POPULATION = 0.2;
const DISCARD_ITERATIONS = 512;
export const SAMPLE_COUNT = 48;

export function logisticSamples(growth: number): number[] {
  let population = INITIAL_POPULATION;
  for (let iteration = 0; iteration < DISCARD_ITERATIONS; iteration += 1) {
    population = growth * population * (1 - population);
  }

  const samples: number[] = [];
  for (let iteration = 0; iteration < SAMPLE_COUNT; iteration += 1) {
    population = growth * population * (1 - population);
    samples.push(population);
  }
  return samples;
}
