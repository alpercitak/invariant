import { nextGeneration, seedBoard } from './model';
import { boardFrame, boardReadout } from './plot';
import { PATTERNS } from './presets';

const pattern = document.querySelector<HTMLSelectElement>('#life-pattern');
const play = document.querySelector<HTMLButtonElement>('#life-play');
const step = document.querySelector<HTMLButtonElement>('#life-step');
const reset = document.querySelector<HTMLButtonElement>('#life-reset');
const live = document.querySelector('#life-live');
const born = document.querySelector('#life-born');
const result = document.querySelector('#life-result');
const description = document.querySelector('#life-description');
const announcement = document.querySelector<HTMLOutputElement>('#life-announcement');

if (pattern && play && step && reset && live && born && result && description && announcement) {
  let board = seedBoard(PATTERNS[pattern.selectedIndex].cells);
  let generation = 0;
  let timer: number | undefined;

  const draw = (previous = board) => {
    const frame = boardFrame(board, previous);
    live.setAttribute('d', frame.live);
    born.setAttribute('d', frame.born);
    result.textContent = boardReadout(generation, frame.population, frame.births);
    description.textContent = frame.description;
  };

  const advance = () => {
    const previous = board;
    board = nextGeneration(previous);
    generation += 1;
    draw(previous);
  };

  const pause = () => {
    window.clearInterval(timer);
    timer = undefined;
    play.textContent = 'Play';
  };

  const announce = () => {
    announcement.value = result.textContent ?? '';
  };

  const restart = () => {
    pause();
    board = seedBoard(PATTERNS[pattern.selectedIndex].cells);
    generation = 0;
    draw();
    announce();
  };

  pattern.addEventListener('change', restart);
  reset.addEventListener('click', restart);
  step.addEventListener('click', () => {
    pause();
    advance();
    announce();
  });
  play.addEventListener('click', () => {
    if (timer === undefined) {
      timer = window.setInterval(advance, 450);
      play.textContent = 'Pause';
    } else {
      pause();
      announce();
    }
  });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', ({ matches }) => {
    if (matches) pause();
  });
  window.addEventListener('pagehide', pause);

  draw();
}
