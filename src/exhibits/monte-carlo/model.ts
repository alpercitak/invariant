export type Sample = { x: number; y: number; inside: boolean };

export function samplePoint(random: () => number): Sample {
  const x = random();
  const y = random();
  return { x, y, inside: x * x + y * y <= 1 };
}

export function estimatePi(inside: number, total: number): number | undefined {
  return total === 0 ? undefined : (4 * inside) / total;
}
