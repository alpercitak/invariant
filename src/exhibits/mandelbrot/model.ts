/** Return the first iteration at which z escapes the radius-2 circle. */
export function escapeStep(real: number, imaginary: number, limit: number): number {
  const steps = Math.floor(limit);
  if (!Number.isFinite(steps) || steps < 1) return 0;

  let zReal = 0;
  let zImaginary = 0;

  for (let step = 1; step <= steps; step += 1) {
    const nextReal = zReal * zReal - zImaginary * zImaginary + real;
    const nextImaginary = 2 * zReal * zImaginary + imaginary;
    zReal = nextReal;
    zImaginary = nextImaginary;

    if (zReal * zReal + zImaginary * zImaginary > 4) return step;
  }

  return 0;
}
