export type Point = { x: number; y: number };
export type Harmonic = { frequency: number; real: number; imaginary: number; magnitude: number };

export const SAMPLE_COUNT = 129;
const TWO_PI = 2 * Math.PI;

export function sampleOutline(vertices: readonly Point[], count = SAMPLE_COUNT): Point[] {
  if (vertices.length === 0 || count <= 0) return [];
  const edges = vertices.map((start, i) => {
    const end = vertices[(i + 1) % vertices.length];
    return { start, end, length: Math.hypot(end.x - start.x, end.y - start.y) };
  });
  const perimeter = edges.reduce((sum, edge) => sum + edge.length, 0);
  if (perimeter === 0) return Array.from({ length: count }, () => ({ ...vertices[0] }));

  return Array.from({ length: count }, (_, sample) => {
    let distance = (sample * perimeter) / count;
    for (const { start, end, length } of edges) {
      if (length === 0) continue;
      if (distance <= length) {
        const t = distance / length;
        return { x: start.x + t * (end.x - start.x), y: start.y + t * (end.y - start.y) };
      }
      distance -= length;
    }
    return { ...vertices[0] };
  });
}

export function decompose(samples: readonly Point[]): Harmonic[] {
  const count = samples.length;
  if (count === 0) return [];
  const harmonics = Array.from({ length: count }, (_, bin): Harmonic => {
    const frequency = bin <= Math.floor(count / 2) ? bin : bin - count;
    let real = 0;
    let imaginary = 0;
    for (let j = 0; j < count; j += 1) {
      const angle = (TWO_PI * frequency * j) / count;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const x = samples[j].x;
      const y = samples[j].y;
      real += x * cosine + y * sine;
      imaginary += y * cosine - x * sine;
    }
    real /= count;
    imaginary /= count;
    return { frequency, real, imaginary, magnitude: Math.hypot(real, imaginary) };
  });
  const [stationary, ...rotating] = harmonics;
  return [stationary, ...rotating.sort((a, b) => b.magnitude - a.magnitude)];
}

export function vectorAt(harmonic: Harmonic, phase: number): Point {
  const angle = TWO_PI * harmonic.frequency * phase;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return {
    x: harmonic.real * cosine - harmonic.imaginary * sine,
    y: harmonic.real * sine + harmonic.imaginary * cosine,
  };
}

export function evaluate(harmonics: readonly Harmonic[], phase: number): Point {
  return harmonics.reduce(
    (sum, harmonic) => {
      const vector = vectorAt(harmonic, phase);
      return { x: sum.x + vector.x, y: sum.y + vector.y };
    },
    { x: 0, y: 0 },
  );
}

export function sampleRmsError(samples: readonly Point[], harmonics: readonly Harmonic[]): number {
  if (samples.length === 0) return 0;
  const squaredError = samples.reduce((sum, sample, j) => {
    const estimate = evaluate(harmonics, j / samples.length);
    return sum + (sample.x - estimate.x) ** 2 + (sample.y - estimate.y) ** 2;
  }, 0);
  return Math.sqrt(squaredError / samples.length);
}
