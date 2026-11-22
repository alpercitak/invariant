export const LOT_SIZE = 1000;
export const MIN_DEFECT_PERCENT = 1;
export const MAX_DEFECT_PERCENT = 50;
export const DETECTION_PERCENT = 90;
export const FALSE_ALARM_PERCENT = 10;

export function inspectLot(defectPercent: number) {
  const defective = (LOT_SIZE * defectPercent) / 100;
  const intact = LOT_SIZE - defective;
  const flaggedDefective = (defective * DETECTION_PERCENT) / 100;
  const missedDefective = defective - flaggedDefective;
  const flaggedIntact = (intact * FALSE_ALARM_PERCENT) / 100;
  const unflaggedIntact = intact - flaggedIntact;
  const totalFlagged = flaggedDefective + flaggedIntact;

  return {
    flaggedDefective,
    missedDefective,
    flaggedIntact,
    unflaggedIntact,
    totalFlagged,
    probability: flaggedDefective / totalFlagged,
  };
}
