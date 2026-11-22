import { GRID_HEIGHT, GRID_WIDTH } from './model';

export const CELL_SIZE = 24;
export const WIDTH = GRID_WIDTH * CELL_SIZE;
export const HEIGHT = GRID_HEIGHT * CELL_SIZE;

export function boardFrame(board: Uint8Array, previous = board) {
  let live = '';
  let born = '';
  let population = 0;
  let births = 0;
  const liveRows: string[] = [];
  const bornRows: string[] = [];
  for (let row = 0; row < GRID_HEIGHT; row += 1) {
    const liveColumns: number[] = [];
    const bornColumns: number[] = [];
    for (let column = 0; column < GRID_WIDTH; column += 1) {
      const index = row * GRID_WIDTH + column;
      if (!board[index]) continue;
      const x = column * CELL_SIZE;
      const y = row * CELL_SIZE;
      liveColumns.push(column + 1);
      population += 1;
      if (previous[index]) {
        live += `M${x + 2} ${y + 2}h20v20h-20z`;
      } else {
        born += `M${x + 12} ${y + 1}l11 11 -11 11 -11 -11z`;
        bornColumns.push(column + 1);
        births += 1;
      }
    }
    if (liveColumns.length) liveRows.push(`row ${row + 1}, columns ${liveColumns.join(', ')}`);
    if (bornColumns.length) bornRows.push(`row ${row + 1}, columns ${bornColumns.join(', ')}`);
  }
  const cells = liveRows.length ? `Live cells by row. ${liveRows.join('. ')}.` : 'No live cells.';
  const newCells = bornRows.length ? ` New cells by row. ${bornRows.join('. ')}.` : '';
  const description = `Rows count from the top and columns from the left, both starting at 1. ${cells}${newCells}`;
  return { live, born, population, births, description };
}

export function boardReadout(generation: number, population: number, births: number): string {
  return `Generation ${generation} · ${population} live · ${births} new`;
}
