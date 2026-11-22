export const MIN_HARMONIC = 1;
export const MAX_HARMONIC = 6;
export const DEFAULT_HARMONIC = 2;
export const STRING_LENGTH_METERS = 1;
export const WAVE_SPEED_METERS_PER_SECOND = 100;

export function frequency(harmonic: number): number {
  return (harmonic * WAVE_SPEED_METERS_PER_SECOND) / (2 * STRING_LENGTH_METERS);
}

export function modeAmplitude(harmonic: number, position: number): number {
  return Math.sin((Math.PI * harmonic * position) / STRING_LENGTH_METERS);
}

export function nodePositions(harmonic: number): number[] {
  return Array.from({ length: harmonic + 1 }, (_, index) => (index * STRING_LENGTH_METERS) / harmonic);
}
