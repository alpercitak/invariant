export const HALF_LONGITUDE = 60;
export const MIN_LATITUDE = 0;
export const MAX_LATITUDE = 65;
export const DEFAULT_LATITUDE = 40;
export const EARTH_RADIUS_KM = 6371;

const degreesToRadians = Math.PI / 180;
const radiansToDegrees = 180 / Math.PI;

export function greatCircleLatitude(latitude: number, longitude: number): number {
  // The plane through the symmetric endpoints and the sphere's center has equation z = slope × x.
  const endpointLatitude = latitude * degreesToRadians;
  const longitudeRadians = longitude * degreesToRadians;
  return (
    Math.atan((Math.tan(endpointLatitude) * Math.cos(longitudeRadians)) / Math.cos(HALF_LONGITUDE * degreesToRadians)) *
    radiansToDegrees
  );
}

export function routeDistances(latitude: number): { greatCircle: number; parallel: number } {
  const latitudeRadians = latitude * degreesToRadians;
  const halfLongitudeRadians = HALF_LONGITUDE * degreesToRadians;
  return {
    greatCircle: EARTH_RADIUS_KM * 2 * Math.asin(Math.cos(latitudeRadians) * Math.sin(halfLongitudeRadians)),
    parallel: EARTH_RADIUS_KM * Math.cos(latitudeRadians) * 2 * halfLongitudeRadians,
  };
}
