import { frequency } from './model';
import { modeDescription, modeReadout, nodeMarks, wavePoints } from './plot';

const slider = document.querySelector<HTMLInputElement>('#standing-harmonic');
const value = document.querySelector<HTMLOutputElement>('#standing-value');
const result = document.querySelector<HTMLOutputElement>('#standing-result');
const play = document.querySelector<HTMLButtonElement>('#standing-play');
const string = document.querySelector('#standing-string');
const upper = document.querySelector('#standing-upper');
const lower = document.querySelector('#standing-lower');
const nodes = document.querySelector('#standing-nodes');
const description = document.querySelector('#standing-description');

if (slider && value && result && play && string && upper && lower && nodes && description) {
  const twoPi = Math.PI * 2;
  const slowdown = 300;
  let phase = 0;
  let frame = 0;
  let previous: number | undefined;

  const draw = () => {
    const multiplier = Math.cos(phase);
    string.setAttribute(
      'points',
      wavePoints(slider.valueAsNumber, (amplitude) => amplitude * multiplier),
    );
  };

  const update = () => {
    const harmonic = slider.valueAsNumber;
    phase = 0;
    previous = undefined;
    upper.setAttribute('points', wavePoints(harmonic, Math.abs));
    lower.setAttribute(
      'points',
      wavePoints(harmonic, (amplitude) => -Math.abs(amplitude)),
    );
    nodes.setAttribute('d', nodeMarks(harmonic));
    description.textContent = modeDescription(harmonic);
    value.value = slider.value;
    result.value = modeReadout(harmonic);
    draw();
  };

  const tick = (now: number) => {
    if (previous !== undefined) {
      const elapsedSeconds = (now - previous) / 1000;
      phase = (phase + (elapsedSeconds * frequency(slider.valueAsNumber) * twoPi) / slowdown) % twoPi;
    }
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

  slider.addEventListener('input', update);
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

  update();
}
