import { remainingArea, sierpinskiTriangles, type Triangle } from './model';

export const INITIAL_DEPTH = 3;
export const MAX_DEPTH = 6;

const SIDE = 288;
const base = 24 + (SIDE * Math.sqrt(3)) / 2;
const original: Triangle = [
  { x: 280, y: 24 },
  { x: 136, y: base },
  { x: 424, y: base },
];

export function trianglePath(depth: number): string {
  return sierpinskiTriangles(original, depth)
    .map((points) => `M${points.map(({ x, y }) => `${x.toFixed(3)} ${y.toFixed(3)}`).join('L')}Z`)
    .join('');
}

export function stepSummary(depth: number): string {
  const pieces = 3 ** depth;
  const percent = Number((100 * remainingArea(depth)).toFixed(1));
  return `${pieces} ${pieces === 1 ? 'triangle' : 'triangles'} · ${percent}% area left`;
}
