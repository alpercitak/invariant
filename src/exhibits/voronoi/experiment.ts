import { type Point, voronoiCells } from './model';

const svg = document.querySelector<SVGSVGElement>('.map');
const cellLayer = document.querySelector<SVGGElement>('.cells');
const siteLayer = document.querySelector<SVGGElement>('.sites');
const status = document.querySelector<HTMLParagraphElement>('.status');
const reset = document.querySelector<HTMLButtonElement>('.reset');
if (svg && cellLayer && siteLayer && status && reset) {
  const initial: Point[] = [
    { x: 170, y: 130 },
    { x: 470, y: 105 },
    { x: 820, y: 170 },
    { x: 250, y: 440 },
    { x: 570, y: 350 },
    { x: 830, y: 490 },
  ];
  let sites = initial.map((point) => ({ ...point }));
  const colors = ['#dfa74b', '#73b9aa', '#d58354', '#7da6c1', '#be8baf', '#9ba96a'];
  let dragging: { index: number; pointerId: number } | undefined;
  const namespace = 'http://www.w3.org/2000/svg';
  const siteGroups = initial.map((_, index) => {
    const group = document.createElementNS(namespace, 'g');
    group.setAttribute('class', 'site');
    group.setAttribute('tabindex', '0');
    group.setAttribute('role', 'group');
    group.dataset.index = String(index);
    const hitArea = document.createElementNS(namespace, 'circle');
    hitArea.setAttribute('class', 'hit-area');
    hitArea.setAttribute('r', '64');
    const dot = document.createElementNS(namespace, 'circle');
    dot.setAttribute('class', 'marker');
    dot.setAttribute('r', '24');
    const label = document.createElementNS(namespace, 'text');
    label.textContent = String(index + 1);
    group.append(hitArea, dot, label);
    return group;
  });
  siteLayer.append(...siteGroups);

  const draw = () => {
    cellLayer.replaceChildren();
    const cells = voronoiCells(sites, { width: 1000, height: 620 });
    cells.forEach((polygon, index) => {
      if (!polygon.length) return;
      const shape = document.createElementNS(namespace, 'polygon');
      shape.setAttribute('points', polygon.map(({ x, y }) => `${x},${y}`).join(' '));
      shape.setAttribute('fill', colors[index % colors.length]);
      shape.setAttribute('class', 'cell');
      cellLayer.append(shape);
    });
    sites.forEach((point, index) => {
      const group = siteGroups[index];
      group.setAttribute('transform', `translate(${point.x} ${point.y})`);
      group.setAttribute(
        'aria-label',
        `Warehouse ${index + 1} at x ${Math.round(point.x)}, y ${Math.round(point.y)}. Use arrow keys to move.`,
      );
    });
  };
  function move(index: number, x: number, y: number) {
    sites[index] = { x: Math.max(20, Math.min(980, x)), y: Math.max(20, Math.min(600, y)) };
    draw();
  }
  const announce = (index: number) => {
    const { x, y } = sites[index];
    status.textContent = `Warehouse ${index + 1} is at x ${Math.round(x)}, y ${Math.round(y)}.`;
  };
  svg.addEventListener('pointerdown', (event) => {
    const target = event.target instanceof Element && event.target.closest<SVGGElement>('.site');
    if (!target || dragging || event.button !== 0) return;
    dragging = { index: Number(target.dataset.index), pointerId: event.pointerId };
    svg.setPointerCapture(event.pointerId);
  });
  svg.addEventListener('pointermove', (event) => {
    if (dragging?.pointerId !== event.pointerId) return;
    const bounds = svg.getBoundingClientRect();
    move(
      dragging.index,
      ((event.clientX - bounds.left) * 1000) / bounds.width,
      ((event.clientY - bounds.top) * 620) / bounds.height,
    );
  });
  svg.addEventListener('lostpointercapture', (event) => {
    if (dragging?.pointerId !== event.pointerId) return;
    announce(dragging.index);
    dragging = undefined;
  });
  svg.addEventListener('keydown', (event) => {
    const target = event.target instanceof Element && event.target.closest<SVGGElement>('.site');
    if (!target) return;
    const delta = event.shiftKey ? 25 : 8;
    const change: Record<string, Point> = {
      ArrowLeft: { x: -delta, y: 0 },
      ArrowRight: { x: delta, y: 0 },
      ArrowUp: { x: 0, y: -delta },
      ArrowDown: { x: 0, y: delta },
    };
    const step = change[event.key];
    if (!step) return;
    event.preventDefault();
    const index = Number(target.dataset.index);
    move(index, sites[index].x + step.x, sites[index].y + step.y);
    announce(index);
  });
  reset.addEventListener('click', () => {
    sites = initial.map((point) => ({ ...point }));
    draw();
    status.textContent = 'All six warehouses are back at their starting positions.';
  });
  draw();
}
