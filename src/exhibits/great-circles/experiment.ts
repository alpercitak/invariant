import { latitudeLabel, routeDescription, routeLines, routeSummary, type View } from './plot';

const latitude = document.querySelector<HTMLInputElement>('#great-circles-latitude');
const value = document.querySelector('#great-circles-latitude-value');
const distance = document.querySelector<HTMLOutputElement>('#great-circles-distance');
const globe = document.querySelector('#great-circles-globe');
const map = document.querySelector('#great-circles-map');
const descriptions = document.querySelectorAll('#great-circles-globe desc, #great-circles-map desc');

function drawRoute(diagram: Element, view: View, degrees: number) {
  const route = routeLines(view, degrees);
  diagram.querySelector('[data-route="parallel"]')?.setAttribute('points', route.parallel);
  diagram.querySelector('[data-route="shortest"]')?.setAttribute('points', route.shortest);
  diagram.querySelector('[data-endpoint="start"]')?.setAttribute('transform', `translate(${route.start})`);
  diagram.querySelector('[data-endpoint="end"]')?.setAttribute('transform', `translate(${route.end})`);
}

if (latitude && value && distance && globe && map) {
  const draw = () => {
    const degrees = latitude.valueAsNumber;
    const label = latitudeLabel(degrees);
    latitude.setAttribute('aria-valuetext', label);
    value.textContent = label;
    distance.value = routeSummary(degrees);
    const description = routeDescription(degrees);
    for (const element of descriptions) element.textContent = description;
    drawRoute(globe, 'globe', degrees);
    drawRoute(map, 'map', degrees);
  };

  latitude.addEventListener('input', draw);
  latitude.disabled = false;
  draw();
}
