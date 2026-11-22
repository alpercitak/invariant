import { relativeAmplitude } from './model';
import { DEFAULT_PHASE, DEFAULT_WAVELENGTH, PALETTE, pathDifferenceMap } from './plot';

const canvas = document.querySelector<HTMLCanvasElement>('#interference-map');
const context = canvas?.getContext('2d', { alpha: false });
const wavelength = document.querySelector<HTMLInputElement>('#interference-wavelength');
const phase = document.querySelector<HTMLInputElement>('#interference-phase');
const wavelengthValue = document.querySelector<HTMLOutputElement>('#interference-wavelength-value');
const phaseValue = document.querySelector<HTMLOutputElement>('#interference-phase-value');
const midpoint = document.querySelector<HTMLOutputElement>('#interference-midpoint');
const reset = document.querySelector<HTMLButtonElement>('#interference-reset');

if (canvas && context && wavelength && phase && wavelengthValue && phaseValue && midpoint && reset) {
  const distances = pathDifferenceMap(canvas.width, canvas.height);
  const image = context.createImageData(canvas.width, canvas.height);
  for (let index = 3; index < image.data.length; index += 4) {
    image.data[index] = 255;
  }

  const draw = () => {
    const meters = wavelength.valueAsNumber;
    const degrees = phase.valueAsNumber;
    for (let index = 0; index < distances.length; index += 1) {
      const shade = Math.round(relativeAmplitude(distances[index], meters, degrees) * 255);
      const [red, green, blue] = PALETTE[shade];
      const pixel = 4 * index;
      image.data[pixel] = red;
      image.data[pixel + 1] = green;
      image.data[pixel + 2] = blue;
    }
    context.putImageData(image, 0, 0);
    wavelengthValue.value = `${meters.toFixed(1)} m`;
    phaseValue.value = `${degrees}°`;
    wavelength.setAttribute('aria-valuetext', wavelengthValue.value);
    phase.setAttribute('aria-valuetext', `${degrees} degrees`);
    const amplitude = relativeAmplitude(0, meters, degrees);
    midpoint.value = `Midpoint amplitude ${Math.round(amplitude * 100)}%`;
  };

  wavelength.addEventListener('input', draw);
  phase.addEventListener('input', draw);
  reset.addEventListener('click', () => {
    wavelength.valueAsNumber = DEFAULT_WAVELENGTH;
    phase.valueAsNumber = DEFAULT_PHASE;
    draw();
  });
  draw();
}
