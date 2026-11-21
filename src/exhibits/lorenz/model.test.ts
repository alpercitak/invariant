import { describe, expect, test } from 'bun:test';
import { derivative, distance, rk4, type State } from './model';

describe('Lorenz model', () => {
  test('has the expected stationary points', () => {
    expect(derivative([0, 0, 0])).toEqual([0, 0, 0]);
    const fixedPoint = Math.sqrt((8 / 3) * 27);
    expect(derivative([fixedPoint, fixedPoint, 27]).every((value) => Math.abs(value) < 1e-12)).toBe(true);
  });

  test('RK4 converges as the step is refined over a short horizon', () => {
    const initial: State = [1, 1, 1];
    let coarse = initial;
    let fine = initial;
    for (let i = 0; i < 10; i += 1) coarse = rk4(coarse, 0.01);
    for (let i = 0; i < 20; i += 1) fine = rk4(fine, 0.005);
    const veryFine = (() => {
      let state = initial;
      for (let i = 0; i < 40; i += 1) state = rk4(state, 0.0025);
      return state;
    })();
    expect(distance(fine, veryFine)).toBeLessThan(distance(coarse, veryFine));
  });
});
