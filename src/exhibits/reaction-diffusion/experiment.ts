import { HEIGHT, PRESETS, seededField, stepField, WIDTH } from './model';
import { ADVANCE_STEPS, colorIndex, fieldReadout, PALETTE } from './plot';

const canvas = document.querySelector<HTMLCanvasElement>('#reaction-grid');
const context = canvas?.getContext('2d', { alpha: false });
const preview = document.querySelector<HTMLElement>('#reaction-preview');
const preset = document.querySelector<HTMLSelectElement>('#reaction-preset');
const play = document.querySelector<HTMLButtonElement>('#reaction-play');
const advance = document.querySelector<HTMLButtonElement>('#reaction-advance');
const reset = document.querySelector<HTMLButtonElement>('#reaction-reset');
const result = document.querySelector('#reaction-result');
const pattern = document.querySelector('#reaction-pattern');
const announcement = document.querySelector<HTMLOutputElement>('#reaction-announcement');

if (canvas && context && preview && preset && play && advance && reset && result && pattern && announcement) {
  const pixels = context.createImageData(WIDTH, HEIGHT);
  const refreshMs = 1000 / 30;
  const stepsPerUpdate = 24;
  let field = seededField();
  let steps = 0;
  let frame = 0;
  let nextUpdate = 0;

  const draw = () => {
    for (let index = 0; index < field.v.length; index += 1) {
      const [red, green, blue] = PALETTE[colorIndex(field.v[index])];
      const pixel = index * 4;
      pixels.data[pixel] = red;
      pixels.data[pixel + 1] = green;
      pixels.data[pixel + 2] = blue;
      pixels.data[pixel + 3] = 255;
    }
    context.putImageData(pixels, 0, 0);
    result.textContent = fieldReadout(steps, field.v);
  };

  const advanceField = (count: number) => {
    const parameters = PRESETS[preset.selectedIndex];
    for (let step = 0; step < count; step += 1) stepField(field, parameters);
    steps += count;
    draw();
  };

  const tick = (now: number) => {
    if (now >= nextUpdate) {
      nextUpdate = now + refreshMs;
      advanceField(stepsPerUpdate);
    }
    frame = requestAnimationFrame(tick);
  };

  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    nextUpdate = 0;
    play.textContent = 'Play';
  };

  const announce = () => {
    announcement.value = result.textContent ?? '';
  };

  const resetField = () => {
    pause();
    field = seededField();
    steps = 0;
    draw();
    const description = PRESETS[preset.selectedIndex].description;
    pattern.textContent = description;
    announcement.value = `${result.textContent} ${description}`;
  };

  preset.addEventListener('change', resetField);
  reset.addEventListener('click', resetField);
  advance.addEventListener('click', () => {
    pause();
    advanceField(ADVANCE_STEPS);
    announce();
  });
  play.addEventListener('click', () => {
    if (frame) {
      pause();
      announce();
    } else {
      frame = requestAnimationFrame(tick);
      play.textContent = 'Pause';
    }
  });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', ({ matches }) => {
    if (matches && frame) {
      pause();
      announce();
    }
  });
  window.addEventListener('pagehide', pause);

  draw();
  preview.hidden = true;
  canvas.hidden = false;
  preset.disabled = false;
  play.disabled = false;
  advance.disabled = false;
  reset.disabled = false;
}
