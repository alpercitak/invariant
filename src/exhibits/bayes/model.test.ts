import { describe, expect, test } from 'bun:test';
import {
  DETECTION_PERCENT,
  FALSE_ALARM_PERCENT,
  inspectLot,
  LOT_SIZE,
  MAX_DEFECT_PERCENT,
  MIN_DEFECT_PERCENT,
} from './model';

describe('Bayes inspection model', () => {
  test('shows the low base-rate result at 1%', () => {
    expect(inspectLot(1)).toEqual({
      flaggedDefective: 9,
      missedDefective: 1,
      flaggedIntact: 99,
      unflaggedIntact: 891,
      totalFlagged: 108,
      probability: 9 / 108,
    });
  });

  test('shows how the probability changes at 10% and 50%', () => {
    expect(inspectLot(10).probability).toBe(90 / 180);
    expect(inspectLot(50).probability).toBe(450 / 500);
  });

  test('partitions every supported lot into exact integer counts', () => {
    for (let defectPercent = MIN_DEFECT_PERCENT; defectPercent <= MAX_DEFECT_PERCENT; defectPercent += 1) {
      const result = inspectLot(defectPercent);
      const defective = (LOT_SIZE * defectPercent) / 100;
      const intact = LOT_SIZE - defective;

      expect(result.flaggedDefective + result.missedDefective).toBe(defective);
      expect(result.flaggedIntact + result.unflaggedIntact).toBe(intact);
      expect(result.totalFlagged).toBe(result.flaggedDefective + result.flaggedIntact);
      expect(result.probability).toBe(result.flaggedDefective / result.totalFlagged);
      for (const count of [
        result.flaggedDefective,
        result.missedDefective,
        result.flaggedIntact,
        result.unflaggedIntact,
        result.totalFlagged,
      ]) {
        expect(Number.isInteger(count)).toBe(true);
      }
      expect(result.flaggedDefective).toBe((defective * DETECTION_PERCENT) / 100);
      expect(result.flaggedIntact).toBe((intact * FALSE_ALARM_PERCENT) / 100);
    }
  });
});
