import type { Cell } from './model';

const pulsar: Cell[] = [];
for (const outer of [-6, -1, 1, 6]) {
  for (const inner of [-4, -3, -2, 2, 3, 4]) {
    pulsar.push([10 + outer, 7 + inner], [10 + inner, 7 + outer]);
  }
}

export const PATTERNS: { name: string; cells: readonly Cell[] }[] = [
  { name: 'Pulsar', cells: pulsar },
  {
    name: 'Block',
    cells: [
      [10, 7],
      [11, 7],
      [10, 8],
      [11, 8],
    ],
  },
  {
    name: 'Blinker',
    cells: [
      [9, 7],
      [10, 7],
      [11, 7],
    ],
  },
  {
    name: 'Glider',
    cells: [
      [7, 4],
      [8, 5],
      [6, 6],
      [7, 6],
      [8, 6],
    ],
  },
];
