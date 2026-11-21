import { describe, expect, test } from 'bun:test';
import { createState, orderParameter, step } from './model';

describe('Kuramoto model', () => {
  test('uncoupled oscillators advance at their own natural rates', () => {
    const state = { phases: [0.2, 1.1], frequencies: [-0.5, 1.25], time: 0 };
    const next = step(state, 0, 0.1);
    expect(next.phases[0]).toBeCloseTo(0.15, 10);
    expect(next.phases[1]).toBeCloseTo(1.225, 10);
  });

  test('order parameter distinguishes aligned and spread phases', () => {
    expect(orderParameter([0, 0, 0]).coherence).toBeCloseTo(1);
    expect(orderParameter([0, Math.PI]).coherence).toBeCloseTo(0);
  });

  test('seeded experiments repeat and coupling changes the dynamics', () => {
    const start = createState(42, 16);
    expect(createState(42, 16)).toEqual(start);
    const free = step(start, 0);
    const coupled = step(start, 3);
    expect(coupled.phases).not.toEqual(free.phases);
    expect(coupled.time).toBeGreaterThan(start.time);
  });
});
