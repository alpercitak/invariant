import { HEIGHT, WIDTH } from './model';

export const PALETTE = [
  [15, 23, 27],
  [15, 32, 40],
  [17, 42, 51],
  [21, 53, 62],
  [25, 65, 74],
  [32, 79, 86],
  [43, 92, 96],
  [57, 107, 106],
  [74, 123, 116],
  [94, 140, 126],
  [117, 157, 136],
  [142, 173, 144],
  [168, 190, 151],
  [194, 205, 156],
  [221, 217, 155],
  [244, 223, 148],
];

export const ADVANCE_STEPS = 250;

export function colorIndex(concentration: number) {
  return Math.max(0, Math.min(PALETTE.length - 1, Math.floor((concentration / 0.4) * (PALETTE.length - 1))));
}

export function fieldPaths(v: Float32Array) {
  const paths = PALETTE.map(() => '');
  for (let y = 0; y < HEIGHT; y += 1) {
    let start = 0;
    let color = colorIndex(v[y * WIDTH]);
    for (let x = 1; x <= WIDTH; x += 1) {
      const next = x === WIDTH ? -1 : colorIndex(v[y * WIDTH + x]);
      if (next !== color) {
        if (color > 0) paths[color] += `M${start} ${y}h${x - start}v1H${start}Z`;
        start = x;
        color = next;
      }
    }
  }
  return paths;
}

export function fieldReadout(steps: number, v: Float32Array) {
  let rich = 0;
  for (const value of v) {
    if (value >= 0.18) rich += 1;
  }
  return `Step ${steps.toLocaleString('en')} · High V in ${Math.round((100 * rich) / v.length)}% of cells`;
}
