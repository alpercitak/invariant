export type Point = { x: number; y: number };
export type ControlPoints = [Point, Point, Point, Point];

export function deCasteljau(
  points: ControlPoints,
  t: number,
): { first: [Point, Point, Point]; second: [Point, Point]; point: Point } {
  const interpolate = (start: Point, end: Point): Point => ({
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t,
  });
  const first: [Point, Point, Point] = [
    interpolate(points[0], points[1]),
    interpolate(points[1], points[2]),
    interpolate(points[2], points[3]),
  ];
  const second: [Point, Point] = [interpolate(first[0], first[1]), interpolate(first[1], first[2])];
  return { first, second, point: interpolate(second[0], second[1]) };
}
