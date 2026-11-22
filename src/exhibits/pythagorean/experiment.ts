import { type Board, buildDissection } from './model';
import { areaSummary, polygonPoints } from './plot';

const leg = document.querySelector<HTMLInputElement>('#pythagorean-leg');
const length = document.querySelector('#pythagorean-length');
const areas = document.querySelector<HTMLOutputElement>('#pythagorean-areas');
const hypotenuse = document.querySelector('#pythagorean-hypotenuse');
const legs = document.querySelector('#pythagorean-legs');

function drawBoard(diagram: Element, board: Board) {
  const triangles = diagram.querySelectorAll('[data-triangle]');
  const squares = diagram.querySelectorAll('[data-square]');
  const labels = diagram.querySelectorAll('[data-label]');

  board.triangles.forEach((triangle, index) => {
    triangles[index].setAttribute('points', polygonPoints(triangle));
  });
  board.squares.forEach(({ points, center: [x, y] }, index) => {
    squares[index].setAttribute('points', polygonPoints(points));
    labels[index].setAttribute('x', String(x));
    labels[index].setAttribute('y', String(y));
  });
}

if (leg && length && areas && hypotenuse && legs) {
  const draw = () => {
    const a = leg.valueAsNumber;
    const dissection = buildDissection(a);
    drawBoard(hypotenuse, dissection.hypotenuse);
    drawBoard(legs, dissection.legs);
    length.textContent = String(a);
    areas.value = areaSummary(a, dissection.b);
  };

  leg.addEventListener('input', draw);
  leg.disabled = false;
  draw();
}
