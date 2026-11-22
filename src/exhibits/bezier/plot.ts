import type { ControlPoints, Point } from './model';

export const WIDTH = 600;
export const HEIGHT = 320;
export const INSET = 28;
export const DEFAULT_T = 0.4;
export const INITIAL_POINTS: ControlPoints = [
  { x: 64, y: 246 },
  { x: 126, y: 48 },
  { x: 456, y: 62 },
  { x: 534, y: 236 },
];

export function pointList(points: readonly Point[]): string {
  return points.map(({ x, y }) => `${x},${y}`).join(' ');
}

export function dotMarks(points: readonly Point[]): string {
  return points.map(({ x, y }) => `M${x} ${y}h0.01`).join('');
}

export function curvePath([start, first, second, end]: ControlPoints): string {
  return `M${start.x} ${start.y}C${first.x} ${first.y} ${second.x} ${second.y} ${end.x} ${end.y}`;
}

export function controlLabel(point: Point, index: number): string {
  return `Control point ${index + 1} at x ${point.x}, y ${point.y}. Use arrow keys to move.`;
}

export function pointReadout({ x, y }: Point): string {
  return `x ${x.toFixed(1)} · y ${y.toFixed(1)}`;
}

export function constructionDescription(first: readonly Point[], second: readonly Point[]): string {
  return `First step has ${first.map(pointReadout).join(', ')}. Second step has ${second.map(pointReadout).join(', ')}.`;
}
