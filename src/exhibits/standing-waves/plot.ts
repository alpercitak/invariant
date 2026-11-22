import { frequency, modeAmplitude, nodePositions, STRING_LENGTH_METERS } from './model';

export const LEFT = 38;
export const RIGHT = 522;
export const MIDDLE = 121;
export const HEIGHT = 242;
const AMPLITUDE = 80;
const SAMPLE_INTERVALS = 180;

function xAt(position: number): number {
  return LEFT + (position / STRING_LENGTH_METERS) * (RIGHT - LEFT);
}

export function wavePoints(harmonic: number, displacement: (amplitude: number) => number): string {
  return Array.from({ length: SAMPLE_INTERVALS + 1 }, (_, index) => {
    const position = (index / SAMPLE_INTERVALS) * STRING_LENGTH_METERS;
    const y = MIDDLE - displacement(modeAmplitude(harmonic, position)) * AMPLITUDE;
    return `${xAt(position).toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

export function nodeMarks(harmonic: number): string {
  return nodePositions(harmonic)
    .map((position) => `M${xAt(position).toFixed(2)} ${MIDDLE}h0.01`)
    .join('');
}

export function modeReadout(harmonic: number): string {
  return `${nodePositions(harmonic).length} nodes including the ends · ${frequency(harmonic)} Hz`;
}

export function modeDescription(harmonic: number): string {
  const nodes = nodePositions(harmonic).map((position) => Number(position.toFixed(3)));
  return `Harmonic ${harmonic}. Node positions in meters from the left end: ${nodes.join(', ')}.`;
}
