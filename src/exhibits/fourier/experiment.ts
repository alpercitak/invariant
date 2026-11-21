import { decompose, evaluate, sampleOutline, sampleRmsError, vectorAt } from './model';
import { outline } from './outline';

const canvas = document.querySelector<HTMLCanvasElement>('#fourier-plot');
const context = canvas?.getContext('2d');
const slider = document.querySelector<HTMLInputElement>('#fourier-count');
const count = document.querySelector<HTMLOutputElement>('#fourier-count-value');
const error = document.querySelector<HTMLOutputElement>('#fourier-error');
const play = document.querySelector<HTMLButtonElement>('#fourier-play');
const restart = document.querySelector<HTMLButtonElement>('#fourier-restart');

if (canvas && context && slider && count && error && play && restart) {
  const samples = sampleOutline(outline);
  const harmonics = decompose(samples);
  const [center] = harmonics;
  const traceDensity = samples.length * 4;
  const loopMs = 6500;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let phase = 0;
  let previous = 0;
  let frame = 0;
  let playing = !reducedMotion.matches;
  let width = 0;
  let height = 0;
  let selected = harmonics.slice(0, 1);
  let trace = [evaluate(selected, 0)];

  const draw = () => {
    if (!width || !height) return;
    const scale = Math.min(width / 2.55, height / 1.88);
    const toX = (x: number) => width / 2 + x * scale;
    const toY = (y: number) => height / 2 - y * scale;

    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(width * 0.08, height / 2);
    context.lineTo(width * 0.92, height / 2);
    context.moveTo(width / 2, height * 0.08);
    context.lineTo(width / 2, height * 0.92);
    context.setLineDash([2, 6]);
    context.strokeStyle = '#343d40';
    context.lineWidth = 1;
    context.stroke();

    context.beginPath();
    outline.forEach(({ x, y }, index) => {
      if (index === 0) context.moveTo(toX(x), toY(y));
      else context.lineTo(toX(x), toY(y));
    });
    context.closePath();
    context.setLineDash([6, 5]);
    context.strokeStyle = '#8c9a99';
    context.stroke();

    context.beginPath();
    trace.forEach(({ x, y }, index) => {
      if (index === 0) context.moveTo(toX(x), toY(y));
      else context.lineTo(toX(x), toY(y));
    });
    context.closePath();
    context.setLineDash([]);
    context.strokeStyle = 'rgba(240, 189, 120, 0.58)';
    context.lineWidth = 1.65;
    context.stroke();

    let x = center.real;
    let y = center.imaginary;
    for (let index = 1; index < selected.length; index += 1) {
      const harmonic = selected[index];
      const vector = vectorAt(harmonic, phase);
      const radius = harmonic.magnitude * scale;
      if (radius >= 1) {
        context.beginPath();
        context.arc(toX(x), toY(y), radius, 0, 2 * Math.PI);
        context.strokeStyle = 'rgba(141, 210, 201, 0.54)';
        context.lineWidth = 1;
        context.stroke();
        context.beginPath();
        context.moveTo(toX(x), toY(y));
        context.lineTo(toX(x + vector.x), toY(y + vector.y));
        context.strokeStyle = '#8dd2c9';
        context.stroke();
      }
      x += vector.x;
      y += vector.y;
    }

    if (phase > 0) {
      const visited = Math.floor(phase * trace.length);
      context.beginPath();
      context.moveTo(toX(trace[0].x), toY(trace[0].y));
      for (let index = 1; index <= visited; index += 1) {
        context.lineTo(toX(trace[index].x), toY(trace[index].y));
      }
      context.lineTo(toX(x), toY(y));
      context.strokeStyle = '#f0bd78';
      context.lineWidth = 1.65;
      context.stroke();
    }

    context.beginPath();
    context.arc(toX(x), toY(y), 3.8, 0, 2 * Math.PI);
    context.fillStyle = '#f0bd78';
    context.fill();
  };

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  };

  const update = () => {
    const limit = slider.valueAsNumber;
    selected = harmonics.slice(0, limit + 1);
    trace = Array.from({ length: traceDensity }, (_, index) => evaluate(selected, index / traceDensity));
    const rms = sampleRmsError(samples, selected);
    error.value = rms < 0.001 ? '<0.001' : rms.toFixed(3);
    count.value = slider.value;
    draw();
  };

  const tick = (now: number) => {
    if (previous) phase = (phase + Math.min(now - previous, 64) / loopMs) % 1;
    previous = now;
    draw();
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    previous = 0;
  };

  const setPlaying = (next: boolean) => {
    stop();
    playing = next;
    play.textContent = playing ? 'Pause' : 'Play';
    if (playing) frame = requestAnimationFrame(tick);
  };

  slider.addEventListener('input', update);
  play.addEventListener('click', () => setPlaying(!playing));
  restart.addEventListener('click', () => {
    phase = 0;
    previous = 0;
    draw();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) setPlaying(false);
  });
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', ({ persisted }) => {
    if (persisted && playing) setPlaying(true);
  });

  update();
  resize();
  new ResizeObserver(resize).observe(canvas);
  setPlaying(playing);
}
