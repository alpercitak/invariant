import { describe, expect, test } from 'bun:test';
import { createField, DIFFUSION_U, PRESETS, seededField, stepField } from './model';

describe('Gray–Scott model', () => {
  test('the homogeneous equilibrium remains unchanged', () => {
    const field = createField(4, 3);
    stepField(field, PRESETS[0]);
    expect([...field.u]).toEqual(Array(12).fill(1));
    expect([...field.v]).toEqual(Array(12).fill(0));
  });

  test('a uniform perturbation follows the local Euler update', () => {
    const field = createField(3, 2);
    field.u.fill(0.8);
    field.v.fill(0.2);
    stepField(field, { feed: 0.1, kill: 0.2 });
    expect(field.u[0]).toBeCloseTo(0.788, 6);
    expect(field.v[0]).toBeCloseTo(0.172, 6);
  });

  test('diffusion uses wrapped neighbors at both grid edges', () => {
    const field = createField(5, 3);
    field.u.fill(0);
    field.u[0] = 0.5;
    stepField(field, { feed: 0, kill: 0 });
    expect(field.u[4]).toBeCloseTo(DIFFUSION_U * 0.5, 6);
    expect(field.u[5]).toBeCloseTo(DIFFUSION_U * 0.5, 6);
    expect(field.u.reduce((sum, value) => sum + value, 0)).toBeCloseTo(0.5, 6);
  });

  test('seeded patches are reproducible and contain V-rich cells', () => {
    const first = seededField();
    const again = seededField();
    expect(first.u).toEqual(again.u);
    expect(first.v).toEqual(again.v);
    expect(first.v.some((value) => value > 0.2)).toBe(true);
    expect(first.v.some((value) => value === 0)).toBe(true);
  });

  test('both presets sustain a nonuniform field with finite concentrations', () => {
    for (const preset of PRESETS) {
      const field = seededField();
      for (let step = 0; step < 1200; step += 1) stepField(field, preset);
      expect(field.u.every((value) => Number.isFinite(value) && value >= 0)).toBe(true);
      expect(field.v.every((value) => Number.isFinite(value) && value >= 0)).toBe(true);
      expect(field.v.some((value) => value > 0.25)).toBe(true);
      expect(field.v.some((value) => value < 0.05)).toBe(true);
    }
  });
});
