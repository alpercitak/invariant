export const SIDE = 7;
export const MIN_LEG = 2;
export const MAX_LEG = 5;
export const LEG_STEP = 0.25;
export const DEFAULT_LEG = 3;

type Point = readonly [x: number, y: number];
type Square = { points: readonly Point[]; center: Point; label: string };
export type Board = { triangles: readonly (readonly Point[])[]; squares: readonly Square[] };

export function buildDissection(a: number): { b: number; hypotenuse: Board; legs: Board } {
  const b = SIDE - a;
  const hypotenuse: Board = {
    triangles: [
      [
        [0, 0],
        [a, 0],
        [0, b],
      ],
      [
        [SIDE, 0],
        [SIDE, a],
        [a, 0],
      ],
      [
        [SIDE, SIDE],
        [b, SIDE],
        [SIDE, a],
      ],
      [
        [0, SIDE],
        [0, b],
        [b, SIDE],
      ],
    ],
    squares: [
      {
        points: [
          [a, 0],
          [SIDE, a],
          [b, SIDE],
          [0, b],
        ],
        center: [SIDE / 2, SIDE / 2],
        label: 'c²',
      },
    ],
  };

  const legs: Board = {
    triangles: [
      [
        [a, 0],
        [SIDE, 0],
        [a, a],
      ],
      [
        [SIDE, 0],
        [SIDE, a],
        [a, a],
      ],
      [
        [0, a],
        [a, a],
        [0, SIDE],
      ],
      [
        [a, a],
        [a, SIDE],
        [0, SIDE],
      ],
    ],
    squares: [
      {
        points: [
          [0, 0],
          [a, 0],
          [a, a],
          [0, a],
        ],
        center: [a / 2, a / 2],
        label: 'a²',
      },
      {
        points: [
          [a, a],
          [SIDE, a],
          [SIDE, SIDE],
          [a, SIDE],
        ],
        center: [(a + SIDE) / 2, (a + SIDE) / 2],
        label: 'b²',
      },
    ],
  };

  return { b, hypotenuse, legs };
}
