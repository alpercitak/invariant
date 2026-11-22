import { ROW_COUNT } from './model';

export const WIDTH = 560;
export const HEIGHT = 320;
export const BASELINE = 284;
export const BAR_HEIGHT = 84;
export const MIN_CHART_SHARE = 0.4;

export function peg(row: number, rightTurns: number) {
  return { x: WIDTH / 2 + (2 * rightTurns - row) * 21, y: 21 + row * 16 };
}

export function routePoints(path: readonly number[]): string {
  return path
    .map((rightTurns, row) => {
      const { x, y } = peg(row, rightTurns);
      return `${x},${y}`;
    })
    .join(' ');
}

export function percent(share: number): string {
  return `${Math.round(share * 100)}%`;
}

export function boardDescription(expected: number[], observed: number[], path: number[] = []): string {
  const shares = (values: number[]) => values.map((share) => `${(share * 100).toFixed(1)}%`).join(', ');
  const turns = path.slice(1).map((rightTurns, row) => (rightTurns === path[row] ? 'left' : 'right'));
  const tally = observed.length
    ? ` Observed shares: ${shares(observed)}. Latest route: ${turns.join(', ')}.`
    : ' No balls dropped yet.';
  return `Bins 0 through ${ROW_COUNT}, from left to right. Predicted shares: ${shares(expected)}.${tally}`;
}
