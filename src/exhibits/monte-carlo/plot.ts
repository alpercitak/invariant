import type { Sample } from './model';

export const PLOT_SIZE = 640;
export const MARGIN = 48;
export const SIDE = PLOT_SIZE - 2 * MARGIN;

export function plotPosition({ x, y }: Sample): [number, number] {
  return [MARGIN + x * SIDE, MARGIN + (1 - y) * SIDE];
}
