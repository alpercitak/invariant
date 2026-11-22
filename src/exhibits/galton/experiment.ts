import { binProbabilities, dropBall, ROW_COUNT } from './model';
import { BAR_HEIGHT, BASELINE, boardDescription, MIN_CHART_SHARE, peg, percent, routePoints } from './plot';

const slider = document.querySelector<HTMLInputElement>('#galton-bias');
const bias = document.querySelector<HTMLOutputElement>('#galton-bias-value');
const result = document.querySelector<HTMLOutputElement>('#galton-result');
const route = document.querySelector('#galton-route');
const landing = document.querySelector('#galton-landing');
const scaleLabel = document.querySelector('#galton-scale');
const description = document.querySelector('#galton-distribution');
const bars = document.querySelectorAll('[data-galton-bar]');
const marks = document.querySelectorAll('[data-galton-mark]');
const one = document.querySelector('#galton-one');
const batch = document.querySelector('#galton-batch');
const reset = document.querySelector('#galton-reset');

if (slider && bias && result && route && landing && scaleLabel && description && one && batch && reset) {
  const counts = Array<number>(ROW_COUNT + 1).fill(0);

  const update = (path: number[] = []) => {
    const probability = slider.valueAsNumber / 100;
    const expected = binProbabilities(probability);
    const total = counts.reduce((sum, count) => sum + count, 0);
    const observed = total ? counts.map((count) => count / total) : [];
    const scale = Math.ceil(Math.max(MIN_CHART_SHARE, ...observed) * 10) / 10;

    bars.forEach((bar, bin) => {
      const height = ((observed[bin] ?? 0) / scale) * BAR_HEIGHT;
      bar.setAttribute('height', String(height));
      bar.setAttribute('y', String(BASELINE - height));
    });
    marks.forEach((mark, bin) => {
      const y = String(BASELINE - (expected[bin] / scale) * BAR_HEIGHT);
      mark.setAttribute('y1', y);
      mark.setAttribute('y2', y);
    });

    const bin = path[ROW_COUNT];
    route.setAttribute('points', routePoints(path));
    landing.setAttribute('r', path.length ? '5' : '0');
    if (path.length) landing.setAttribute('cx', String(peg(ROW_COUNT, bin).x));
    scaleLabel.textContent = percent(scale);
    bias.value = percent(probability);
    slider.setAttribute('aria-valuetext', bias.value);
    result.value = total ? `${total} ${total === 1 ? 'ball' : 'balls'} · last bin ${bin}` : '0 balls';
    description.textContent = boardDescription(expected, observed, path);
  };

  const drop = (amount: number) => {
    let path: number[] = [];
    for (let i = 0; i < amount; i += 1) {
      path = dropBall(slider.valueAsNumber / 100);
      counts[path[ROW_COUNT]] += 1;
    }
    update(path);
  };

  const clear = () => {
    counts.fill(0);
    update();
  };

  slider.addEventListener('input', clear);
  one.addEventListener('click', () => drop(1));
  batch.addEventListener('click', () => drop(100));
  reset.addEventListener('click', clear);
  clear();
}
