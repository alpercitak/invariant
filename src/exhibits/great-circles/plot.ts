import { greatCircleLatitude, HALF_LONGITUDE, routeDistances } from './model';

export type View = 'globe' | 'map';
type Point = { x: number; y: number };

export const VIEW_BOX = '0 0 360 224';
export const GLOBE = { x: 180, y: 112, radius: 98 };
export const MAP_LATITUDES = [-30, 0, 30, 60, 90];
export const MAP_MERIDIANS = [-60, -30, 0, 30, 60];

const radians = Math.PI / 180;
const tilt = 30 * radians;
const cosTilt = Math.cos(tilt);
const sinTilt = Math.sin(tilt);
const kilometers = new Intl.NumberFormat('en', { maximumFractionDigits: 0 });

function globePoint(latitude: number, longitude: number) {
  const lat = latitude * radians;
  const lon = longitude * radians;
  const x = Math.cos(lat) * Math.cos(lon);
  const y = Math.cos(lat) * Math.sin(lon);
  const z = Math.sin(lat);
  return {
    x: GLOBE.x + GLOBE.radius * y,
    y: GLOBE.y - GLOBE.radius * (cosTilt * z - sinTilt * x),
    visible: cosTilt * x + sinTilt * z >= 0,
  };
}

export function mapPoint(latitude: number, longitude: number): Point {
  return { x: 188 + 1.5 * longitude, y: 155 - 1.5 * latitude };
}

function coordinates({ x, y }: Point) {
  return `${x.toFixed(2)} ${y.toFixed(2)}`;
}

export function globeGrid() {
  const lines = [
    ...[-60, -30, 0, 30, 60].map((latitude) =>
      Array.from({ length: 121 }, (_, step) => globePoint(latitude, -180 + step * 3)),
    ),
    ...Array.from({ length: 12 }, (_, meridian) =>
      Array.from({ length: 61 }, (_, step) => globePoint(-90 + step * 3, meridian * 30)),
    ),
  ];
  return lines
    .map((line) =>
      line
        .map((point, index) => (point.visible ? `${line[index - 1]?.visible ? 'L' : 'M'}${coordinates(point)}` : ''))
        .join(''),
    )
    .join('');
}

export function routeLines(view: View, latitude: number) {
  const project = view === 'globe' ? globePoint : mapPoint;
  const longitudes = Array.from({ length: 61 }, (_, index) => -HALF_LONGITUDE + (index * HALF_LONGITUDE) / 30);
  const parallel = longitudes.map((lon) => coordinates(project(latitude, lon)));
  const shortest = longitudes.map((lon) => coordinates(project(greatCircleLatitude(latitude, lon), lon)));
  return {
    parallel: parallel.join(' '),
    shortest: shortest.join(' '),
    start: parallel[0],
    end: parallel[parallel.length - 1],
  };
}

export function latitudeLabel(latitude: number) {
  return latitude === 0 ? '0° (equator)' : `${latitude}° N`;
}

export function routeDescription(latitude: number) {
  if (latitude === 0) return 'Both routes follow the equator.';
  const midpoint = greatCircleLatitude(latitude, 0).toFixed(1);
  return `Both endpoints are at ${latitude} degrees north. The great circle reaches ${midpoint} degrees north halfway between them.`;
}

export function routeSummary(latitude: number) {
  const { greatCircle, parallel } = routeDistances(latitude);
  if (latitude === 0) return `Both routes ${kilometers.format(greatCircle)} km`;
  return `Great circle ${kilometers.format(greatCircle)} km · Constant latitude ${kilometers.format(parallel)} km`;
}
