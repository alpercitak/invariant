import { escapeStep } from './model';

export const MIN_STEPS = 24;
export const MAX_STEPS = 240;
export const DEFAULT_STEPS = 96;
export const VIEWS = [
  {
    name: 'Whole set',
    description: 'A heart-shaped body with round lobes and branching edges.',
    real: -0.62,
    imaginary: 0,
    span: 3.8,
  },
  {
    name: 'Seahorse Valley',
    description: 'Spirals and curling filaments in the cleft between the two largest lobes.',
    real: -0.75,
    imaginary: 0.1,
    span: 0.064,
  },
  {
    name: 'Miniature',
    description: 'A small body with lobes that echoes the shape of the whole set.',
    real: -1.754,
    imaginary: 0,
    span: 0.064,
  },
];
export type View = (typeof VIEWS)[number];

export const COLORS = [
  [8, 11, 17],
  [21, 26, 42],
  [25, 32, 52],
  [28, 41, 65],
  [31, 50, 78],
  [32, 61, 89],
  [33, 74, 103],
  [31, 86, 113],
  [30, 99, 121],
  [31, 111, 128],
  [36, 123, 133],
  [46, 136, 138],
  [62, 150, 139],
  [83, 162, 139],
  [109, 173, 138],
  [137, 182, 133],
  [164, 189, 128],
  [191, 194, 124],
  [218, 199, 122],
  [244, 203, 123],
];

const shades = Array.from({ length: MAX_STEPS + 1 }, (_, step) =>
  step === 0 ? 0 : 1 + Math.min(COLORS.length - 2, Math.floor(Math.log2(step) * 2.4)),
);

export function escapeMap(view: View, width: number, height: number, limit: number): Uint8Array {
  const result = new Uint8Array(width * height);
  const units = view.span / width;

  for (let row = 0; row < height; row += 1) {
    const imaginary = view.imaginary + (height / 2 - row - 0.5) * units;
    for (let column = 0; column < width; column += 1) {
      const real = view.real + (column + 0.5 - width / 2) * units;
      result[row * width + column] = escapeStep(real, imaginary, limit);
    }
  }
  return result;
}

export function shadeIndex(step: number, limit: number): number {
  return step > limit ? 0 : shades[step];
}

export function centerReadout(view: View, limit: number): string {
  const sign = view.imaginary < 0 ? '−' : '+';
  const point = view.imaginary ? `${view.real} ${sign} ${Math.abs(view.imaginary)}i` : String(view.real);
  const step = escapeStep(view.real, view.imaginary, limit);
  return `${point} · ${step ? `escapes at step ${step}` : `no escape in ${limit} steps`}`;
}
