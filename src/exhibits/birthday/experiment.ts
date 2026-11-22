import { birthdayCounts, drawBirthdays, sharedBirthdayProbability } from './model';
import { MAX_GROUP_SIZE, percent, sharedDates, startingGroup } from './plot';

const slider = document.querySelector<HTMLInputElement>('#birthday-size');
const sizeValue = document.querySelector<HTMLOutputElement>('#birthday-size-value');
const drawButton = document.querySelector<HTMLButtonElement>('#birthday-draw');
const probability = document.querySelector('#birthday-probability');
const sample = document.querySelector<HTMLOutputElement>('#birthday-sample');
const days = document.querySelectorAll<SVGCircleElement>('#birthday-experiment [data-count]');

if (slider && sizeValue && drawButton && probability && sample) {
  let birthdays = startingGroup();

  const render = () => {
    const counts = birthdayCounts(birthdays.slice(0, slider.valueAsNumber));
    days.forEach((day, index) => {
      day.dataset.count = String(counts[index]);
    });
    sample.value = sharedDates(counts);
  };

  const updateSize = () => {
    sizeValue.value = slider.value;
    probability.textContent = percent.format(sharedBirthdayProbability(slider.valueAsNumber));
    render();
  };

  slider.addEventListener('input', updateSize);
  drawButton.addEventListener('click', () => {
    birthdays = drawBirthdays(MAX_GROUP_SIZE);
    render();
  });

  updateSize();
  slider.disabled = false;
  drawButton.disabled = false;
}
