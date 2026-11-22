export const SOURCE_OFFSET = 2;

export function pathDifference(x: number, y: number): number {
  return Math.hypot(x + SOURCE_OFFSET, y) - Math.hypot(x - SOURCE_OFFSET, y);
}

export function relativeAmplitude(pathDifferenceMeters: number, wavelength: number, phaseDegrees: number): number {
  const phase = (2 * Math.PI * pathDifferenceMeters) / wavelength + (phaseDegrees * Math.PI) / 180;
  return Math.abs(Math.cos(phase / 2));
}
