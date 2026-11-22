export const GRID_WIDTH = 22;
export const GRID_HEIGHT = 16;

export type Cell = readonly [column: number, row: number];

export function seedBoard(cells: readonly Cell[]): Uint8Array {
  const board = new Uint8Array(GRID_WIDTH * GRID_HEIGHT);
  for (const [column, row] of cells) {
    board[row * GRID_WIDTH + column] = 1;
  }
  return board;
}

export function nextGeneration(board: Uint8Array): Uint8Array {
  const next = new Uint8Array(GRID_WIDTH * GRID_HEIGHT);

  for (let row = 0; row < GRID_HEIGHT; row += 1) {
    for (let column = 0; column < GRID_WIDTH; column += 1) {
      let neighbors = 0;
      for (let neighborRow = row - 1; neighborRow <= row + 1; neighborRow += 1) {
        for (let neighborColumn = column - 1; neighborColumn <= column + 1; neighborColumn += 1) {
          if (
            (neighborRow !== row || neighborColumn !== column) &&
            neighborRow >= 0 &&
            neighborRow < GRID_HEIGHT &&
            neighborColumn >= 0 &&
            neighborColumn < GRID_WIDTH
          ) {
            neighbors += board[neighborRow * GRID_WIDTH + neighborColumn];
          }
        }
      }

      const index = row * GRID_WIDTH + column;
      if (neighbors === 3 || (board[index] === 1 && neighbors === 2)) next[index] = 1;
    }
  }

  return next;
}
