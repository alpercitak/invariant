import { describe, expect, test } from 'bun:test';
import {
  DEFAULT_LATITUDE,
  greatCircleLatitude,
  HALF_LONGITUDE,
  MAX_LATITUDE,
  MIN_LATITUDE,
  routeDistances,
} from './model';

describe('great-circles model', () => {
  test('keeps the great circle on the equator when its endpoints are on the equator', () => {
    expect(greatCircleLatitude(0, 0)).toBe(0);
    expect(greatCircleLatitude(0, HALF_LONGITUDE)).toBe(0);
  });

  test('reaches the expected midpoint latitude for 60° endpoints', () => {
    expect(greatCircleLatitude(60, 0)).toBeCloseTo((Math.atan(Math.tan(Math.PI / 3) / 0.5) * 180) / Math.PI, 12);
  });

  test('is symmetric across the midpoint and endpoint longitudes', () => {
    for (let latitude = MIN_LATITUDE; latitude <= MAX_LATITUDE; latitude += 1) {
      expect(greatCircleLatitude(latitude, -30)).toBeCloseTo(greatCircleLatitude(latitude, 30), 12);
      expect(greatCircleLatitude(latitude, -HALF_LONGITUDE)).toBeCloseTo(latitude, 12);
      expect(greatCircleLatitude(latitude, HALF_LONGITUDE)).toBeCloseTo(latitude, 12);
    }
  });

  test('matches at the equator and the great-circle route is shorter elsewhere', () => {
    const equator = routeDistances(0);
    expect(equator.greatCircle).toBeCloseTo(equator.parallel, 10);

    for (let latitude = MIN_LATITUDE; latitude <= MAX_LATITUDE; latitude += 1) {
      const { greatCircle, parallel } = routeDistances(latitude);
      expect(greatCircle).toBeLessThanOrEqual(parallel + 1e-10);
      if (latitude > 0) expect(greatCircle).toBeLessThan(parallel);
    }
  });

  test('uses the configured default latitude as a valid route', () => {
    const { greatCircle, parallel } = routeDistances(DEFAULT_LATITUDE);
    expect(greatCircle).toBeGreaterThan(0);
    expect(parallel).toBeGreaterThan(greatCircle);
  });
});
