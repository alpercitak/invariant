import { observedFrequencies, wavefrontAtAge } from './model';

export const INITIAL_PHASE = 0.55;
export const WAVEFRONT_COUNT = 14;

export function wavefrontMark(speed: number, index: number, phase: number) {
  const age = index + phase;
  return {
    ...wavefrontAtAge(speed, age),
    opacity: Math.min(age * 2, (WAVEFRONT_COUNT - age) / 4, 0.85),
  };
}

export function pitchSummary(speed: number) {
  const { ahead, behind } = observedFrequencies(speed);
  return `Behind ${Math.round(behind)} Hz · Ahead ${Math.round(ahead)} Hz`;
}
