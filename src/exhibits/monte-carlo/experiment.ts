import { estimatePi, samplePoint } from './model';
import { plotPosition } from './plot';

const canvas = document.querySelector<HTMLCanvasElement>('#monte-carlo-points');
const context = canvas?.getContext('2d');
const buttons = document.querySelectorAll<HTMLButtonElement>('button[name="monte-carlo-add"]');
const reset = document.querySelector<HTMLButtonElement>('#monte-carlo-reset');
const estimateValue = document.querySelector('#monte-carlo-estimate');
const count = document.querySelector('#monte-carlo-count');
const error = document.querySelector('#monte-carlo-error');

if (canvas && context && reset && estimateValue && count && error) {
  const styles = getComputedStyle(canvas);
  context.fillStyle = styles.getPropertyValue('--secondary');
  context.strokeStyle = styles.getPropertyValue('--accent');
  context.lineWidth = 1.5;
  const format = new Intl.NumberFormat('en-US');
  let inside = 0;
  let total = 0;

  const updateReadout = () => {
    const estimate = estimatePi(inside, total);
    count.textContent = `${format.format(inside)} / ${format.format(total)}`;
    estimateValue.textContent = estimate?.toFixed(5) ?? '—';
    error.textContent = estimate === undefined ? '—' : Math.abs(estimate - Math.PI).toPrecision(3);
  };

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const batch = Number(button.value);
      for (let index = 0; index < batch; index += 1) {
        const point = samplePoint(Math.random);
        const [x, y] = plotPosition(point);
        context.beginPath();
        if (point.inside) {
          inside += 1;
          context.arc(x, y, 2.5, 0, 2 * Math.PI);
          context.fill();
        } else {
          context.arc(x, y, 3.25, 0, 2 * Math.PI);
          context.stroke();
        }
      }
      total += batch;
      updateReadout();
    });
  }

  reset.addEventListener('click', () => {
    inside = 0;
    total = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateReadout();
  });
}
