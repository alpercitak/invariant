export const EMITTED_FREQUENCY = 440;
export const DEFAULT_SPEED = 45;
export const MAX_SPEED = 70;
export const SPEED_STEP = 5;

export function wavefrontAtAge(speedPercent: number, ageInPeriods: number): { centerX: number; radius: number } {
  // One unit of distance is the distance sound travels during one emission period.
  return {
    centerX: -(speedPercent / 100) * ageInPeriods,
    radius: ageInPeriods,
  };
}

export function observedFrequencies(speedPercent: number): { ahead: number; behind: number } {
  const speedRatio = speedPercent / 100;
  return {
    ahead: EMITTED_FREQUENCY / (1 - speedRatio),
    behind: EMITTED_FREQUENCY / (1 + speedRatio),
  };
}
