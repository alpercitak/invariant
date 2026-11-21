import { describe, expect, test } from 'bun:test';
import { voronoiCells } from './model';

describe('Voronoi cells', () => {
  test('each cell contains points for which its site is nearest', () => {
    const sites = [
      { x: 20, y: 30 },
      { x: 80, y: 25 },
      { x: 55, y: 80 },
    ];
    const cells = voronoiCells(sites, { width: 100, height: 100 });
    for (let y = 5; y < 100; y += 10) {
      for (let x = 5; x < 100; x += 10) {
        const distances = sites.map((site) => Math.hypot(site.x - x, site.y - y));
        const nearest = Math.min(...distances);
        cells.forEach((polygon, owner) => {
          const inside =
            polygon.length > 0 &&
            polygon.every((a, i) => {
              const b = polygon[(i + 1) % polygon.length];
              return (b.x - a.x) * (y - a.y) - (b.y - a.y) * (x - a.x) >= -1e-6;
            });
          expect(inside).toBe(distances[owner] === nearest);
        });
      }
    }
  });

  test('coincident sites give the earlier site the region', () => {
    const sites = [
      { x: 20, y: 20 },
      { x: 80, y: 20 },
      { x: 20, y: 20 },
    ];
    const cells = voronoiCells(sites, { width: 100, height: 100 });
    expect(cells.slice(0, 2)).toEqual(voronoiCells(sites.slice(0, 2), { width: 100, height: 100 }));
    expect(cells[2]).toEqual([]);
    expect(cells.flat().every(({ x, y }) => Number.isFinite(x) && Number.isFinite(y))).toBe(true);
  });

  test('a single site owns the full bounded rectangle', () => {
    expect(voronoiCells([{ x: 4, y: 9 }], { width: 30, height: 40 })[0]).toEqual([
      { x: 0, y: 0 },
      { x: 30, y: 0 },
      { x: 30, y: 40 },
      { x: 0, y: 40 },
    ]);
  });
});
