export function polygonPoints(points: readonly (readonly [number, number])[]) {
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

export function areaSummary(a: number, b: number) {
  return `${a * a} + ${b * b} = ${a * a + b * b} square units`;
}
