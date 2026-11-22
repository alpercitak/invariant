import { inspectLot } from './model';
import { flaggedSummary, lotDescription, lotMarks, percent } from './plot';

const slider = document.querySelector<HTMLInputElement>('#bayes-defect');
const value = document.querySelector('#bayes-defect-value');
const probability = document.querySelector('[data-bayes-probability]');
const summary = document.querySelector('[data-bayes-count]');
const details = document.querySelector('#bayes-lot-details');
const paths = document.querySelectorAll('#bayes-lot [data-lot-category]');

if (slider && value && probability && summary && details) {
  const draw = () => {
    const lot = inspectLot(slider.valueAsNumber);
    const rate = `${slider.value}%`;
    slider.setAttribute('aria-valuetext', rate);
    value.textContent = rate;
    probability.textContent = percent.format(lot.probability);
    summary.textContent = flaggedSummary(lot);
    details.textContent = lotDescription(lot);
    lotMarks(lot).forEach(({ path }, index) => {
      paths[index].setAttribute('d', path);
    });
  };

  slider.addEventListener('input', draw);
  slider.disabled = false;
  draw();
}
