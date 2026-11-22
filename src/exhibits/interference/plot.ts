import { pathDifference, SOURCE_OFFSET } from './model';

export const WIDTH_METERS = 14;
export const HEIGHT_METERS = 8;
export const DEFAULT_WAVELENGTH = 1.4;
export const DEFAULT_PHASE = 0;
export const SOURCE_POSITIONS = [0.5 - SOURCE_OFFSET / WIDTH_METERS, 0.5 + SOURCE_OFFSET / WIDTH_METERS];

const colorStops = [
  [10, 15, 29],
  [21, 42, 67],
  [36, 92, 114],
  [79, 156, 159],
  [234, 226, 178],
];

export const PALETTE = Array.from({ length: 256 }, (_, index) => {
  const stop = (index / 255) * (colorStops.length - 1);
  const lower = Math.min(Math.floor(stop), colorStops.length - 2);
  const fraction = stop - lower;
  return colorStops[lower].map((channel, channelIndex) => {
    return Math.round(channel + (colorStops[lower + 1][channelIndex] - channel) * fraction);
  });
});

export function pathDifferenceMap(width: number, height: number): Float64Array {
  return Float64Array.from({ length: width * height }, (_, index) => {
    const x = (((index % width) + 0.5) / width - 0.5) * WIDTH_METERS;
    const y = (0.5 - (Math.floor(index / width) + 0.5) / height) * HEIGHT_METERS;
    return pathDifference(x, y);
  });
}
