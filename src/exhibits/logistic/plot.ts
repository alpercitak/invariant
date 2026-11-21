import { GROWTH_MAX, GROWTH_MIN } from './model';

export const PLOT_WIDTH = 560;
export const DIAGRAM_HEIGHT = 180;
export const TRACE_HEIGHT = 84;
export const PLOT_INSET = 8;
export const PLOT_RIGHT = PLOT_WIDTH - PLOT_INSET;

export function growthX(growth: number): number {
  return PLOT_INSET + ((growth - GROWTH_MIN) / (GROWTH_MAX - GROWTH_MIN)) * (PLOT_RIGHT - PLOT_INSET);
}

export function sampleY(sample: number, height: number): number {
  return PLOT_INSET + (1 - sample) * (height - 2 * PLOT_INSET);
}

export function sampleMarks(x: number, samples: number[], height: number): string {
  const rows = new Set(samples.map((sample) => sampleY(sample, height).toFixed(1)));
  return [...rows].map((row) => `M${x.toFixed(1)} ${row}h0.01`).join('');
}

export function tracePoints(samples: number[]): string {
  return samples
    .map((sample, index) => {
      const x = PLOT_INSET + (index / (samples.length - 1)) * (PLOT_RIGHT - PLOT_INSET);
      return `${x.toFixed(1)},${sampleY(sample, TRACE_HEIGHT).toFixed(1)}`;
    })
    .join(' ');
}

export function sampleRange(samples: number[]): string {
  const low = Math.min(...samples).toFixed(3);
  const high = Math.max(...samples).toFixed(3);
  return low === high ? low : `${low}–${high}`;
}

export function traceDescription(samples: number[]): string {
  const lastValues = samples.slice(-8).map((sample) => sample.toFixed(3));
  return `Last eight values in order: ${lastValues.join(', ')}.`;
}
