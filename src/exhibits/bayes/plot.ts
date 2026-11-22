import type { inspectLot } from './model';

export const percent = new Intl.NumberFormat('en', { style: 'percent', maximumFractionDigits: 1 });

type Lot = ReturnType<typeof inspectLot>;

export function lotMarks(lot: Lot) {
  let index = 0;
  const groups = [
    { category: 'flagged-defective', count: lot.flaggedDefective, defective: true },
    { category: 'missed-defective', count: lot.missedDefective, defective: true },
    { category: 'flagged-intact', count: lot.flaggedIntact, defective: false },
    { category: 'unflagged-intact', count: lot.unflaggedIntact, defective: false },
  ];

  return groups.map(({ category, count, defective }) => {
    let path = '';
    for (let part = 0; part < count; part += 1, index += 1) {
      const x = (index % 40) * 10;
      const y = Math.floor(index / 40) * 10;
      path += defective ? `M${x + 5} ${y + 1}l4 4-4 4-4-4Z` : `M${x + 8} ${y + 5}a3 3 0 1 0-6 0a3 3 0 1 0 6 0Z`;
    }
    return { category, path };
  });
}

export function flaggedSummary(lot: Lot) {
  return `${lot.flaggedDefective} of ${lot.totalFlagged} flagged parts are defective`;
}

export function lotDescription(lot: Lot) {
  return `The inspection flagged ${lot.flaggedDefective} defective and ${lot.flaggedIntact} intact parts. It passed ${lot.missedDefective} defective and ${lot.unflaggedIntact} intact parts.`;
}
