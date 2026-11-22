import { COLORS, centerReadout, escapeMap, MAX_STEPS, shadeIndex, VIEWS, type View } from './plot';

const canvas = document.querySelector<HTMLCanvasElement>('#mandelbrot-plot');
const context = canvas?.getContext('2d', { alpha: false });
const slider = document.querySelector<HTMLInputElement>('#mandelbrot-limit');
const steps = document.querySelector<HTMLOutputElement>('#mandelbrot-limit-value');
const probe = document.querySelector<HTMLOutputElement>('#mandelbrot-probe');
const description = document.querySelector('#mandelbrot-view-description');
const regions = document.querySelectorAll<HTMLButtonElement>('button[name="mandelbrot-view"]');

if (canvas && context && slider && steps && probe && description) {
  const { width, height } = canvas;
  const image = context.createImageData(width, height);
  const maps = new Map<View, Uint8Array>();
  let view = VIEWS[0];

  const draw = () => {
    const limit = slider.valueAsNumber;
    let pixels = maps.get(view);
    if (!pixels) {
      pixels = escapeMap(view, width, height, MAX_STEPS);
      maps.set(view, pixels);
    }
    for (let index = 0; index < pixels.length; index += 1) {
      const color = COLORS[shadeIndex(pixels[index], limit)];
      const offset = index * 4;
      image.data[offset] = color[0];
      image.data[offset + 1] = color[1];
      image.data[offset + 2] = color[2];
      image.data[offset + 3] = 255;
    }
    context.putImageData(image, 0, 0);
    steps.value = slider.value;
    probe.value = centerReadout(view, limit);
    description.textContent = view.description;
  };

  slider.addEventListener('input', draw);
  for (const button of regions) {
    button.addEventListener('click', () => {
      view = VIEWS[Number(button.value)];
      for (const region of regions) region.setAttribute('aria-pressed', String(region === button));
      draw();
    });
  }
  draw();
}
