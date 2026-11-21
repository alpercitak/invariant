import { logisticSamples } from './model';
import { DIAGRAM_HEIGHT, growthX, sampleMarks, sampleRange, traceDescription, tracePoints } from './plot';

const slider = document.querySelector<HTMLInputElement>('#logistic-growth');
const value = document.querySelector<HTMLOutputElement>('#logistic-growth-value');
const range = document.querySelector<HTMLOutputElement>('#logistic-range');
const cursor = document.querySelector('#logistic-cursor');
const dots = document.querySelector('#logistic-selection');
const trace = document.querySelector('#logistic-trace');
const description = document.querySelector('#logistic-trace-description');

if (slider && value && range && cursor && dots && trace && description) {
  const update = () => {
    const growth = slider.valueAsNumber;
    const x = growthX(growth);
    const samples = logisticSamples(growth);
    cursor.setAttribute('transform', `translate(${x})`);
    dots.setAttribute('d', sampleMarks(x, samples, DIAGRAM_HEIGHT));
    trace.setAttribute('points', tracePoints(samples));
    description.textContent = traceDescription(samples);
    range.value = sampleRange(samples);
    value.value = growth.toFixed(3);
  };

  slider.addEventListener('input', update);
  for (const preset of document.querySelectorAll<HTMLButtonElement>('button[name="logistic-preset"]')) {
    preset.addEventListener('click', () => {
      slider.value = preset.value;
      update();
    });
  }
  update();
}
