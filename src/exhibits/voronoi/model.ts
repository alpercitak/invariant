export type Point = { x: number; y: number };
export type Bounds = { width: number; height: number };

export function voronoiCells(sites: readonly Point[], bounds: Bounds): Point[][] {
  return sites.map((site, index) => {
    let polygon: Point[] = [
      { x: 0, y: 0 },
      { x: bounds.width, y: 0 },
      { x: bounds.width, y: bounds.height },
      { x: 0, y: bounds.height },
    ];

    for (let otherIndex = 0; otherIndex < sites.length && polygon.length; otherIndex += 1) {
      if (otherIndex === index) continue;
      const other = sites[otherIndex];
      const dx = other.x - site.x;
      const dy = other.y - site.y;
      const limit = (other.x * other.x + other.y * other.y - site.x * site.x - site.y * site.y) / 2;
      if (dx === 0 && dy === 0) {
        if (otherIndex < index) polygon = [];
        continue;
      }

      const clipped: Point[] = [];
      for (let i = 0; i < polygon.length; i += 1) {
        const start = polygon[i];
        const end = polygon[(i + 1) % polygon.length];
        const startDistance = dx * start.x + dy * start.y - limit;
        const endDistance = dx * end.x + dy * end.y - limit;
        const startInside = startDistance <= 0;
        const endInside = endDistance <= 0;
        if (startInside) clipped.push(start);
        if (startInside !== endInside) {
          const t = startDistance / (startDistance - endDistance);
          clipped.push({
            x: start.x + t * (end.x - start.x),
            y: start.y + t * (end.y - start.y),
          });
        }
      }
      polygon = clipped;
    }
    return polygon;
  });
}
