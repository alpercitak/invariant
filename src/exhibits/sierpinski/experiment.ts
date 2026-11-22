import { stepSummary, trianglePath } from './plot';

const step = document.querySelector<HTMLInputElement>('#sierpinski-step');
const stepValue = document.querySelector('#sierpinski-step-value');
const shape = document.querySelector('#sierpinski-shape');
const summary = document.querySelector<HTMLOutputElement>('#sierpinski-summary');

if (step && stepValue && shape && summary) {
  const draw = () => {
    const depth = step.valueAsNumber;
    shape.setAttribute('d', trianglePath(depth));
    stepValue.textContent = String(depth);
    summary.value = stepSummary(depth);
  };

  step.addEventListener('input', draw);
  step.disabled = false;
  draw();
}
