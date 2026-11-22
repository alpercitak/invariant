import { describe, expect, test } from 'bun:test';
import { remainingArea, sierpinskiTriangles, type Triangle } from './model';

const initial: Triangle = [
  { x: 0, y: 2 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

function area([a, b, c]: Triangle): number {
  return Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) / 2;
}

describe('Sierpiński triangle', () => {
  test('subdivides into the three corner triangles in input order', () => {
    expect(sierpinskiTriangles(initial, 1)).toEqual([
      [
        { x: 0, y: 2 },
        { x: -0.5, y: 1 },
        { x: 0.5, y: 1 },
      ],
      [
        { x: -0.5, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
      ],
      [
        { x: 0.5, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
    ]);
  });

  test('triples the triangle count with each subdivision', () => {
    expect(sierpinskiTriangles(initial, 0)).toHaveLength(1);
    expect(sierpinskiTriangles(initial, 3)).toHaveLength(27);
  });

  test('matches the remaining area fraction', () => {
    const triangles = sierpinskiTriangles(initial, 4);
    const totalArea = triangles.reduce((sum, triangle) => sum + area(triangle), 0);
    expect(totalArea / area(initial)).toBeCloseTo(remainingArea(4));
    expect(remainingArea(4)).toBe(81 / 256);
  });
});
