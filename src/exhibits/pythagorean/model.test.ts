import { describe, expect, test } from 'bun:test';
import { buildDissection, DEFAULT_LEG, LEG_STEP, MAX_LEG, MIN_LEG, SIDE } from './model';

function triangleEdges(triangle: readonly (readonly [number, number])[]): number[] {
  return triangle
    .map((point, index) => {
      const next = triangle[(index + 1) % triangle.length];
      return Math.hypot(next[0] - point[0], next[1] - point[1]);
    })
    .sort((x, y) => x - y);
}

function polygonArea(points: readonly (readonly [number, number])[]): number {
  return (
    Math.abs(
      points.reduce((sum, point, index) => {
        const next = points[(index + 1) % points.length];
        return sum + point[0] * next[1] - next[0] * point[1];
      }, 0),
    ) / 2
  );
}

describe('Pythagorean dissection model', () => {
  test('builds the 3-4-5 arrangement with four congruent triangles', () => {
    const { b, hypotenuse, legs } = buildDissection(DEFAULT_LEG);
    expect(b).toBe(4);
    expect(hypotenuse.squares[0].label).toBe('c²');
    expect(legs.squares.map(({ label }) => label)).toEqual(['a²', 'b²']);
    expect(hypotenuse.triangles.map(triangleEdges)).toEqual(Array(4).fill([3, 4, 5]));
    expect(legs.triangles.map(triangleEdges)).toEqual(Array(4).fill([3, 4, 5]));
    expect(hypotenuse.squares[0].points).toEqual([
      [3, 0],
      [7, 3],
      [4, 7],
      [0, 4],
    ]);
  });

  test('covers the outer square exactly throughout the slider range', () => {
    for (let a = MIN_LEG; a <= MAX_LEG; a += LEG_STEP) {
      const { b, hypotenuse, legs } = buildDissection(a);
      for (const board of [hypotenuse, legs]) {
        const squareArea = board.squares.reduce((sum, square) => sum + polygonArea(square.points), 0);
        const triangleArea = board.triangles.reduce((sum, triangle) => sum + polygonArea(triangle), 0);
        expect(squareArea).toBe(a * a + b * b);
        expect(squareArea + triangleArea).toBe(SIDE * SIDE);
        expect(board.triangles.map(triangleEdges)).toEqual(
          Array(4).fill([a, b, Math.hypot(a, b)].sort((x, y) => x - y)),
        );
      }
    }
  });
});
