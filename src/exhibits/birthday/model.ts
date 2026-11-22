export const DAYS_PER_YEAR = 365;

export function sharedBirthdayProbability(groupSize: number): number {
  if (groupSize > DAYS_PER_YEAR) return 1;

  let noSharedBirthday = 1;
  for (let person = 0; person < groupSize; person += 1) {
    noSharedBirthday *= (DAYS_PER_YEAR - person) / DAYS_PER_YEAR;
  }

  return 1 - noSharedBirthday;
}

export function drawBirthdays(count: number, random: () => number = Math.random): number[] {
  return Array.from({ length: count }, () => Math.floor(random() * DAYS_PER_YEAR));
}

export function birthdayCounts(days: readonly number[]): Uint16Array {
  const counts = new Uint16Array(DAYS_PER_YEAR);
  for (const day of days) counts[day] += 1;
  return counts;
}
