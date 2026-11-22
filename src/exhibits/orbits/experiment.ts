import { INITIAL_PHASE, INITIAL_RATIO, orbitEllipses, orbitSummary, plotPositions } from './plot';

const slider = document.querySelector<HTMLInputElement>('#orbits-ratio');
const ratioValue = document.querySelector<HTMLOutputElement>('#orbits-ratio-value');
const summary = document.querySelector<HTMLOutputElement>('#orbits-summary');
const play = document.querySelector<HTMLButtonElement>('#orbits-play');
const reset = document.querySelector<HTMLButtonElement>('#orbits-reset');
const trackA = document.querySelector('[data-orbit-track="a"]');
const trackB = document.querySelector('[data-orbit-track="b"]');
const bodyA = document.querySelector('[data-orbit-body="a"]');
const bodyB = document.querySelector('[data-orbit-body="b"]');
const connector = document.querySelector('[data-orbit-link]');

if (slider && ratioValue && summary && play && reset && trackA && trackB && bodyA && bodyB && connector) {
  const orbitDurationMs = 8000;
  let phase = INITIAL_PHASE;
  let frame = 0;
  let previous: number | undefined;

  const draw = () => {
    const { a, b } = plotPositions(slider.valueAsNumber, phase);
    bodyA.setAttribute('transform', `translate(${a.x} ${a.y})`);
    bodyB.setAttribute('transform', `translate(${b.x} ${b.y})`);
    connector.setAttribute('x1', String(a.x));
    connector.setAttribute('y1', String(a.y));
    connector.setAttribute('x2', String(b.x));
    connector.setAttribute('y2', String(b.y));
  };

  const updateRatio = () => {
    const ratio = slider.valueAsNumber;
    const { a, b } = orbitEllipses(ratio);
    trackA.setAttribute('cx', String(a.cx));
    trackA.setAttribute('rx', String(a.rx));
    trackA.setAttribute('ry', String(a.ry));
    trackB.setAttribute('cx', String(b.cx));
    trackB.setAttribute('rx', String(b.rx));
    trackB.setAttribute('ry', String(b.ry));
    slider.setAttribute('aria-valuetext', `${ratio} to 1`);
    ratioValue.value = `${ratio}:1`;
    summary.value = orbitSummary(ratio);
    draw();
  };

  const tick = (now: number) => {
    if (previous !== undefined) phase = (phase + (now - previous) / orbitDurationMs) % 1;
    previous = now;
    draw();
    frame = requestAnimationFrame(tick);
  };

  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = undefined;
    play.textContent = 'Play';
  };

  slider.addEventListener('input', updateRatio);
  play.addEventListener('click', () => {
    if (frame) {
      pause();
    } else {
      frame = requestAnimationFrame(tick);
      play.textContent = 'Pause';
    }
  });
  reset.addEventListener('click', () => {
    pause();
    slider.valueAsNumber = INITIAL_RATIO;
    phase = INITIAL_PHASE;
    updateRatio();
  });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', ({ matches }) => {
    if (matches) pause();
  });
  window.addEventListener('pagehide', pause);

  updateRatio();
  slider.disabled = false;
  play.disabled = false;
  reset.disabled = false;
}
