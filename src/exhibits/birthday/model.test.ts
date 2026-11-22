import { describe, expect, test } from 'bun:test';
import { birthdayCounts, DAYS_PER_YEAR, drawBirthdays, sharedBirthdayProbability } from './model';

describe('birthday model', () => {
  test('computes the complement probability for uniform birthdays', () => {
    expect(sharedBirthdayProbability(2)).toBeCloseTo(1 / 365);
    expect(sharedBirthdayProbability(22)).toBeLessThan(0.5);
    expect(sharedBirthdayProbability(23)).toBeGreaterThan(0.5);
    expect(sharedBirthdayProbability(366)).toBe(1);
  });

  test('draws day indices from supplied random values', () => {
    const values = [0, 0.5, 0.999];
    let calls = 0;

    expect(drawBirthdays(3, () => values[calls++])).toEqual([0, 182, 364]);
    expect(calls).toBe(3);
    expect(drawBirthdays(0, () => 0)).toEqual([]);
    expect(DAYS_PER_YEAR).toBe(365);
  });

  test('counts birthdays by day index', () => {
    const counts = birthdayCounts([4, 4, 0, 364]);

    expect(counts).toBeInstanceOf(Uint16Array);
    expect(counts.length).toBe(365);
    expect(counts[0]).toBe(1);
    expect(counts[4]).toBe(2);
    expect(counts[364]).toBe(1);
    expect(counts[1]).toBe(0);
  });
});
