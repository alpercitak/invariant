import { describe, expect, test } from 'bun:test';
import { frequency, MAX_HARMONIC, MIN_HARMONIC, modeAmplitude, nodePositions, STRING_LENGTH_METERS } from './model';

describe('standing-wave model', () => {
  test('calculates the expected modal frequencies', () => {
    expect(frequency(1)).toBe(50);
    expect(frequency(2)).toBe(100);
    expect(frequency(3)).toBe(150);
    expect(frequency(6)).toBe(300);
  });

  test('places every allowed mode node at zero displacement', () => {
    for (let harmonic = MIN_HARMONIC; harmonic <= MAX_HARMONIC; harmonic += 1) {
      for (const position of nodePositions(harmonic)) {
        expect(Math.abs(modeAmplitude(harmonic, position))).toBeLessThan(1e-12);
      }
    }
  });

  test('has alternating unit antinodes for the third harmonic', () => {
    const harmonic = 3;
    const amplitudes = Array.from({ length: harmonic }, (_, index) =>
      modeAmplitude(harmonic, ((index + 0.5) * STRING_LENGTH_METERS) / harmonic),
    );

    expect(amplitudes[0]).toBeCloseTo(1);
    expect(amplitudes[1]).toBeCloseTo(-1);
    expect(amplitudes[2]).toBeCloseTo(1);
  });
});
