import { describe, expect, test } from 'bun:test';
import { GRID_HEIGHT, GRID_WIDTH, nextGeneration, seedBoard } from './model';
import { PATTERNS } from './presets';

function liveCells(board: Uint8Array): [number, number][] {
  const cells: [number, number][] = [];
  for (let row = 0; row < GRID_HEIGHT; row += 1) {
    for (let column = 0; column < GRID_WIDTH; column += 1) {
      if (board[row * GRID_WIDTH + column] === 1) cells.push([column, row]);
    }
  }
  return cells;
}

describe('Game of Life model', () => {
  test('a block remains unchanged', () => {
    const block = seedBoard([
      [5, 5],
      [6, 5],
      [5, 6],
      [6, 6],
    ]);
    expect(nextGeneration(block)).toEqual(block);
  });

  test('a blinker has period two', () => {
    const start = seedBoard([
      [5, 4],
      [5, 5],
      [5, 6],
    ]);
    const next = nextGeneration(start);
    expect(liveCells(next)).toEqual([
      [4, 5],
      [5, 5],
      [6, 5],
    ]);
    expect(nextGeneration(next)).toEqual(start);
  });

  test('the exhibited pulsar repeats after three generations', () => {
    const start = seedBoard(PATTERNS[0].cells);
    const first = nextGeneration(start);
    const second = nextGeneration(first);
    expect(liveCells(start)).toHaveLength(48);
    expect(liveCells(first)).toHaveLength(56);
    expect(liveCells(second)).toHaveLength(72);
    expect(nextGeneration(second)).toEqual(start);
  });

  test('a glider moves one cell down and right after four generations', () => {
    const start = seedBoard([
      [1, 0],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
    let result = start;
    for (let generation = 0; generation < 4; generation += 1) {
      result = nextGeneration(result);
    }
    expect(liveCells(result)).toEqual([
      [2, 1],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ]);
  });

  test('cells do not wrap across the board boundary', () => {
    const edge = seedBoard([
      [0, 0],
      [GRID_WIDTH - 1, 0],
      [0, GRID_HEIGHT - 1],
    ]);
    const next = nextGeneration(edge);
    expect(next[GRID_WIDTH - 1]).toBe(0);
    expect(next[(GRID_HEIGHT - 1) * GRID_WIDTH]).toBe(0);
  });
});
