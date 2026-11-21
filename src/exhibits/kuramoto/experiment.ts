import { createState, type OscillatorState, orderParameter, STEP, step } from './model';

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing experiment element: ${selector}`);
  return element;
}
const canvas = required<HTMLCanvasElement>('#oscillators');
function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const drawingContext = canvas.getContext('2d');
  if (!drawingContext) throw new Error('Canvas 2D is unavailable in this browser.');
  return drawingContext;
}
const context = getContext(canvas);
const coupling = required<HTMLInputElement>('#coupling');
const couplingValue = required<HTMLOutputElement>('#coupling-value');
const synchrony = required<HTMLOutputElement>('#synchrony');
const play = required<HTMLButtonElement>('#play');
const reset = required<HTMLButtonElement>('#reset');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let state: OscillatorState = createState();
let paused = reducedMotion.matches;
let frame = 0;
let animationActive = false;
let resumeAfterPageShow = false;
let previous = 0;
let accumulator = 0;

function draw() {
  const bounds = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  if (canvas.width !== Math.round(bounds.width * ratio) || canvas.height !== Math.round(bounds.height * ratio)) {
    canvas.width = Math.round(bounds.width * ratio);
    canvas.height = Math.round(bounds.height * ratio);
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, bounds.width, bounds.height);
  const cx = bounds.width / 2;
  const cy = bounds.height / 2;
  const radius = Math.min(bounds.width, bounds.height) * 0.34;
  context.strokeStyle = 'rgba(232, 220, 201, 0.18)';
  context.lineWidth = 1;
  context.beginPath();
  context.arc(cx, cy, radius, 0, Math.PI * 2);
  context.stroke();
  for (const phase of state.phases) {
    const x = cx + radius * Math.cos(phase);
    const y = cy + radius * Math.sin(phase);
    context.fillStyle = '#67c5b2';
    context.beginPath();
    context.arc(x, y, 3.2, 0, Math.PI * 2);
    context.fill();
  }
  const { coherence, meanPhase } = orderParameter(state.phases);
  context.strokeStyle = '#f2b84b';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(cx, cy);
  context.lineTo(cx + radius * coherence * Math.cos(meanPhase), cy + radius * coherence * Math.sin(meanPhase));
  context.stroke();
  context.fillStyle = '#f2b84b';
  context.beginPath();
  context.arc(
    cx + radius * coherence * Math.cos(meanPhase),
    cy + radius * coherence * Math.sin(meanPhase),
    5,
    0,
    Math.PI * 2,
  );
  context.fill();
  synchrony.value = `${Math.round(coherence * 100)}% · ${coherence < 0.25 ? 'scattered' : coherence < 0.65 ? 'partly aligned' : 'mostly together'}`;
}

function animate(now: number) {
  if (!animationActive) return;
  if (!paused) {
    accumulator += Math.min((now - previous) / 1000, 0.1);
    while (accumulator >= STEP) {
      state = step(state, Number(coupling.value));
      accumulator -= STEP;
    }
  }
  previous = now;
  draw();
  frame = requestAnimationFrame(animate);
}
function start() {
  if (paused || animationActive) return;
  animationActive = true;
  previous = 0;
  frame = requestAnimationFrame(animate);
}
function stop() {
  animationActive = false;
  cancelAnimationFrame(frame);
}
coupling.addEventListener('input', () => {
  couplingValue.value = Number(coupling.value).toFixed(1);
});
play.addEventListener('click', () => {
  paused = !paused;
  play.textContent = paused ? 'Play' : 'Pause';
  if (paused) stop();
  else start();
});
reset.addEventListener('click', () => {
  state = createState();
  accumulator = 0;
  draw();
});
window.addEventListener('resize', draw);
reducedMotion.addEventListener('change', () => {
  if (!reducedMotion.matches) return;
  paused = true;
  play.textContent = 'Play';
  stop();
});
if (reducedMotion.matches) play.textContent = 'Play';
draw();
start();
window.addEventListener('pagehide', () => {
  resumeAfterPageShow = !paused;
  stop();
});
window.addEventListener('pageshow', () => {
  if (resumeAfterPageShow && !paused) start();
  resumeAfterPageShow = false;
});
