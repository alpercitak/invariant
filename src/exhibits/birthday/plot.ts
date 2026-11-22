import { drawBirthdays } from './model';

export const INITIAL_GROUP_SIZE = 23;
export const MAX_GROUP_SIZE = 60;

export const MONTHS = [
  ['Jan', 31],
  ['Feb', 28],
  ['Mar', 31],
  ['Apr', 30],
  ['May', 31],
  ['Jun', 30],
  ['Jul', 31],
  ['Aug', 31],
  ['Sep', 30],
  ['Oct', 31],
  ['Nov', 30],
  ['Dec', 31],
] as const;

export const CALENDAR_DAYS = MONTHS.flatMap(([name, days], row) =>
  Array.from({ length: days }, (_, column) => ({ row, column, label: `${name} ${column + 1}` })),
);

export const percent = new Intl.NumberFormat('en', { style: 'percent', maximumFractionDigits: 1 });

export function startingGroup(): number[] {
  let seed = 22;
  return drawBirthdays(MAX_GROUP_SIZE, () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 2 ** 32;
  });
}

export function sharedDates(counts: Uint16Array): string {
  const dates = CALENDAR_DAYS.filter((_, index) => counts[index] > 1).map(({ label }) => label);
  return dates.length ? `This group shares ${dates.join(', ')}` : 'No shared dates in this group';
}
