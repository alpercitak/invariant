import { type ControlPoints, deCasteljau, type Point } from './model';
import {
  constructionDescription,
  controlLabel,
  curvePath,
  DEFAULT_T,
  dotMarks,
  HEIGHT,
  INITIAL_POINTS,
  INSET,
  pointList,
  pointReadout,
  WIDTH,
} from './plot';

const svg = document.querySelector<SVGSVGElement>('#bezier-plot');
const polygon = document.querySelector('#bezier-controls');
const curve = document.querySelector('#bezier-curve');
const firstLine = document.querySelector('#bezier-first');
const secondLine = document.querySelector('#bezier-second');
const firstDots = document.querySelector('#bezier-first-dots');
const secondDots = document.querySelector('#bezier-second-dots');
const marker = document.querySelector('#bezier-point');
const description = document.querySelector('#bezier-construction');
const slider = document.querySelector<HTMLInputElement>('#bezier-parameter');
const value = document.querySelector<HTMLOutputElement>('#bezier-value');
const reading = document.querySelector<HTMLOutputElement>('#bezier-reading');
const reset = document.querySelector<HTMLButtonElement>('#bezier-reset');
const handles = document.querySelectorAll<SVGGElement>('[data-bezier-handle]');

if (
  svg &&
  polygon &&
  curve &&
  firstLine &&
  secondLine &&
  firstDots &&
  secondDots &&
  marker &&
  description &&
  slider &&
  value &&
  reading &&
  reset
) {
  let points: ControlPoints = [...INITIAL_POINTS];
  let drag: { index: number; pointerId: number; offset: Point } | undefined;
  const directions: Record<string, Point> = {
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
  };

  const draw = () => {
    const t = slider.valueAsNumber;
    const { first, second, point } = deCasteljau(points, t);
    polygon.setAttribute('points', pointList(points));
    curve.setAttribute('d', curvePath(points));
    firstLine.setAttribute('points', pointList(first));
    secondLine.setAttribute('points', pointList(second));
    firstDots.setAttribute('d', dotMarks(first));
    secondDots.setAttribute('d', dotMarks(second));
    marker.setAttribute('cx', String(point.x));
    marker.setAttribute('cy', String(point.y));
    description.textContent = constructionDescription(first, second);
    value.value = t.toFixed(2);
    reading.value = pointReadout(point);
  };

  const positionHandle = (index: number) => {
    const point = points[index];
    handles[index].setAttribute('transform', `translate(${point.x} ${point.y})`);
    handles[index].setAttribute('aria-label', controlLabel(point, index));
  };

  const move = (index: number, x: number, y: number) => {
    points[index] = {
      x: Math.round(Math.min(WIDTH - INSET, Math.max(INSET, x)) * 10) / 10,
      y: Math.round(Math.min(HEIGHT - INSET, Math.max(INSET, y)) * 10) / 10,
    };
    positionHandle(index);
    draw();
  };

  const pointerPosition = (event: PointerEvent) => {
    const matrix = svg.getScreenCTM();
    return matrix && new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
  };

  handles.forEach((handle, index) => {
    // Chromium can cancel drags on inner SVG shapes despite their touch-action setting.
    handle.addEventListener('touchstart', (event) => event.preventDefault(), { passive: false });
    handle.addEventListener('pointerdown', (event) => {
      if (drag || event.button !== 0) return;
      const pointer = pointerPosition(event);
      if (!pointer) return;
      const point = points[index];
      drag = { index, pointerId: event.pointerId, offset: { x: point.x - pointer.x, y: point.y - pointer.y } };
      svg.setPointerCapture(event.pointerId);
      handle.focus({ preventScroll: true });
    });
    handle.addEventListener('keydown', (event) => {
      const direction = directions[event.key];
      if (!direction) return;
      event.preventDefault();
      const step = event.shiftKey ? 20 : 5;
      const point = points[index];
      move(index, point.x + direction.x * step, point.y + direction.y * step);
    });
  });
  svg.addEventListener('pointermove', (event) => {
    if (drag?.pointerId !== event.pointerId) return;
    const pointer = pointerPosition(event);
    if (pointer) move(drag.index, pointer.x + drag.offset.x, pointer.y + drag.offset.y);
  });
  svg.addEventListener('lostpointercapture', (event) => {
    if (drag?.pointerId === event.pointerId) drag = undefined;
  });
  slider.addEventListener('input', draw);
  reset.addEventListener('click', () => {
    points = [...INITIAL_POINTS];
    slider.value = String(DEFAULT_T);
    handles.forEach((_, index) => {
      positionHandle(index);
    });
    draw();
  });
  draw();
}
