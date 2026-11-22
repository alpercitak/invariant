export type Point = { x: number; y: number };
export type Triangle = readonly [Point, Point, Point];

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function sierpinskiTriangles(initial: Triangle, depth: number): Triangle[] {
  let triangles: Triangle[] = [initial];

  for (let level = 0; level < depth; level += 1) {
    triangles = triangles.flatMap(([top, left, right]) => {
      const topLeft = midpoint(top, left);
      const topRight = midpoint(top, right);
      const base = midpoint(left, right);
      return [
        [top, topLeft, topRight],
        [topLeft, left, base],
        [topRight, base, right],
      ];
    });
  }

  return triangles;
}

export function remainingArea(depth: number): number {
  return (3 / 4) ** depth;
}
