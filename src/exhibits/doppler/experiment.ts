import { INITIAL_PHASE, pitchSummary, wavefrontMark } from './plot';

const plot = document.querySelector('#doppler-plot');
const slider = document.querySelector<HTMLInputElement>('#doppler-speed');
const speedValue = document.querySelector('#doppler-speed-value');
const pitch = document.querySelector<HTMLOutputElement>('#doppler-pitch');
const play = document.querySelector<HTMLButtonElement>('#doppler-play');
const direction = plot?.querySelector('[data-direction]');

if (plot && slider && speedValue && pitch && play && direction) {
  const wavefronts = plot.querySelectorAll('[data-wavefront]');
  const wavePeriodMs = 850;
  let phase = INITIAL_PHASE;
  let frame = 0;
  let previous: number | undefined;

  const draw = () => {
    const speed = slider.valueAsNumber;
    wavefronts.forEach((circle, index) => {
      const { centerX, radius, opacity } = wavefrontMark(speed, index, phase);
      circle.setAttribute('cx', String(centerX));
      circle.setAttribute('r', String(radius));
      circle.setAttribute('opacity', String(opacity));
    });
  };

  const updateSpeed = () => {
    const speed = slider.valueAsNumber;
    direction.setAttribute('opacity', speed === 0 ? '0' : '1');
    slider.setAttribute('aria-valuetext', `${speed}% of sound speed`);
    speedValue.textContent = `${speed}%`;
    pitch.value = pitchSummary(speed);
    draw();
  };

  const tick = (now: number) => {
    if (previous !== undefined) phase = (phase + (now - previous) / wavePeriodMs) % 1;
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

  slider.addEventListener('input', updateSpeed);
  play.addEventListener('click', () => {
    if (frame) {
      pause();
    } else {
      frame = requestAnimationFrame(tick);
      play.textContent = 'Pause';
    }
  });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', ({ matches }) => {
    if (matches) pause();
  });
  window.addEventListener('pagehide', pause);

  updateSpeed();
  slider.disabled = false;
  play.disabled = false;
}
