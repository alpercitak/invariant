import { expect, test } from '@playwright/test';

test('archive links to all exhibits and layouts fit a mobile screen', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await expect(page.getByRole('heading', { name: 'The Pattern Archive', level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);

  for (const name of [
    'Kuramoto synchronization',
    'Lorenz attractor',
    'Voronoi diagrams',
    'Fourier drawing',
    'Logistic map',
    'Galton board',
    'Mandelbrot set',
    'Standing waves',
    'Bézier curves',
    'Conway’s Game of Life',
  ]) {
    const card = page.getByRole('link', { name, exact: true });
    await expect(card.locator('svg')).toBeVisible();
    await card.click();
    await expect(page.getByRole('heading', { name, level: 1 })).toBeVisible();
    await expect(page.locator('math[display="block"]').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
    const guide = page.locator('details').filter({ hasText: 'How to read this' });
    await expect(guide.locator('p')).toBeHidden();
    await guide.locator('summary').press('Enter');
    await expect(guide.locator('p')).toBeVisible();
    await expect(guide.locator('p')).not.toBeEmpty();
    await page.getByRole('link', { name: 'All exhibits' }).click();
  }
});

test('Game of Life steps, plays, and resets the selected pattern', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/exhibits/life/');
  const pattern = page.getByRole('combobox', { name: 'Pattern' });
  const step = page.getByRole('button', { name: 'Step' });
  const play = page.getByRole('button', { name: 'Play' });
  const result = page.locator('#life-result');
  const board = page.getByRole('img', { name: 'Game of Life board' });
  await expect(play).toBeVisible();
  await expect(result).toHaveText('Generation 0 · 48 live · 0 new');
  await step.press('Enter');
  await expect(result).toContainText('Generation 1 · 56 live');
  await expect(board).toHaveAccessibleDescription(/New cells by row/);

  await pattern.selectOption({ label: 'Glider' });
  await expect(play).toBeVisible();
  await expect(result).toHaveText('Generation 0 · 5 live · 0 new');
  await expect(board).toHaveAccessibleDescription(/row 5, columns 8/);
  for (let generation = 0; generation < 4; generation += 1) await step.press('Enter');
  await expect(result).toHaveText('Generation 4 · 5 live · 2 new');
  await expect(board).toHaveAccessibleDescription(/row 6, columns 9/);

  await play.press('Enter');
  await expect(result).not.toContainText('Generation 4 ·');
  await page.getByRole('button', { name: 'Pause' }).press('Enter');
  await expect(play).toBeVisible();
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(pattern).toHaveValue('Glider');
  await expect(result).toHaveText('Generation 0 · 5 live · 0 new');
  await expect(board).toHaveAccessibleDescription(/row 5, columns 8/);
});

test('Bézier controls reshape the curve and the parameter reaches both endpoints', async ({ page }) => {
  await page.goto('/exhibits/bezier/');
  const slider = page.getByRole('slider', { name: 'Parameter t' });
  const plot = page.getByRole('group', { name: 'Cubic Bézier curve with four movable control points' });
  const control = page.getByRole('group', { name: /^Control point 2 at/ });
  const curve = page.locator('#bezier-curve');
  const result = page.getByLabel('Point on the curve', { exact: true });
  const initialCurve = await curve.getAttribute('d');
  const initialReading = await result.textContent();

  await control.press('Shift+ArrowRight');
  await expect(control).toBeFocused();
  await expect(control).toHaveAttribute('transform', 'translate(146 48)');
  await expect(control).toHaveAccessibleName(/at x 146, y 48/);
  await expect(plot).toHaveAccessibleDescription(/First step has x 96\.8 · y 166\.8.*Second step has x/);
  await expect(control.locator('.focus-ring')).toHaveCSS('stroke', 'rgb(240, 189, 120)');
  expect(await curve.getAttribute('d')).not.toBe(initialCurve);
  expect(await result.textContent()).not.toBe(initialReading);

  await control.scrollIntoViewIfNeeded();
  const handle = await control.locator('.handle-dot').boundingBox();
  if (!handle) throw new Error('Missing Bézier handle');
  const x = handle.x + handle.width / 2;
  const y = handle.y + handle.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 55, y + 30, { steps: 4 });
  await page.mouse.up();
  await expect(control).not.toHaveAttribute('transform', 'translate(146 48)');

  await slider.press('Home');
  await expect(result).toHaveText('x 64.0 · y 246.0');
  await slider.press('End');
  await expect(result).toHaveText('x 534.0 · y 236.0');

  await page.getByRole('button', { name: 'Reset curve' }).click();
  await expect(slider).toHaveValue('0.4');
  expect(await curve.getAttribute('d')).toBe(initialCurve);
  expect(await result.textContent()).toBe(initialReading);
});

test('Bézier touch dragging follows the handle through a multi-step gesture', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 800 },
    hasTouch: true,
    isMobile: true,
  });
  try {
    const page = await context.newPage();
    await page.goto('/exhibits/bezier/');
    const positions = await page.locator('#bezier-plot').evaluate((plot: SVGSVGElement) => {
      const matrix = plot.getScreenCTM();
      if (!matrix) throw new Error('Bézier plot is outside the viewport');
      return [
        [126, 48],
        [155, 85],
        [200, 135],
        [250, 200],
      ].map(([x, y]) => {
        const point = new DOMPoint(x, y).matrixTransform(matrix);
        return { x: point.x, y: point.y };
      });
    });
    const session = await context.newCDPSession(page);
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [positions[0]] });
    for (const point of positions.slice(1)) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [point] });
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    const transform = await page.locator('[data-bezier-handle="1"]').getAttribute('transform');
    const [x, y] = transform?.slice('translate('.length, -1).split(' ').map(Number) ?? [];
    expect(x).toBeCloseTo(250, 0);
    expect(y).toBeCloseTo(200, 0);
  } finally {
    await context.close();
  }
});

test('Standing waves keep nodes fixed while the string plays and pauses', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/exhibits/standing-waves/');
  const slider = page.getByRole('slider', { name: 'Harmonic' });
  const play = page.getByRole('button', { name: 'Play' });
  const wave = page.locator('#standing-string');
  const nodes = page.locator('#standing-nodes');
  const result = page.locator('#standing-result');
  const plot = page.getByRole('img', { name: 'Standing wave on a string fixed at both ends' });
  await expect(play).toBeVisible();
  await expect(result).toHaveText('3 nodes including the ends · 100 Hz');

  await slider.press('End');
  await expect(result).toHaveText('7 nodes including the ends · 300 Hz');
  await expect(plot).toHaveAccessibleDescription(/^Harmonic 6\./);
  const peak = await wave.getAttribute('points');
  const stationary = await nodes.getAttribute('d');

  await play.press('Enter');
  await expect.poll(() => wave.getAttribute('points')).not.toBe(peak);
  await page.getByRole('button', { name: 'Pause' }).press('Enter');
  const paused = await wave.getAttribute('points');
  await page.evaluate(
    () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))),
  );
  expect(await wave.getAttribute('points')).toBe(paused);
  expect(await nodes.getAttribute('d')).toBe(stationary);

  await slider.press('Home');
  await expect(result).toHaveText('2 nodes including the ends · 50 Hz');
  expect(await nodes.getAttribute('d')).not.toBe(stationary);
});

test('Mandelbrot presets and step limit change the map and the center escape result', async ({ page }) => {
  await page.goto('/exhibits/mandelbrot/');
  const canvas = page.getByRole('img', { name: 'Mandelbrot escape map' });
  const probe = page.getByLabel('Center point escape result');
  const steps = page.getByRole('slider', { name: 'Step limit' });
  const whole = page.getByRole('button', { name: 'Whole set' });
  const pixels = () => canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL());
  await expect(probe).toContainText('no escape in 96 steps');
  const overview = await pixels();

  const seahorse = page.getByRole('button', { name: 'Seahorse Valley' });
  await seahorse.press('Enter');
  await expect(seahorse).toHaveAttribute('aria-pressed', 'true');
  await expect(whole).toHaveAttribute('aria-pressed', 'false');
  await expect(probe).toContainText('escapes at step 33');
  const detail = await pixels();
  expect(detail).not.toBe(overview);

  await steps.press('Home');
  await expect(steps).toHaveValue('24');
  await expect(probe).toContainText('no escape in 24 steps');
  expect(await pixels()).not.toBe(detail);
  await steps.press('End');
  await expect(probe).toContainText('escapes at step 33');

  await page.getByRole('button', { name: 'Miniature' }).click();
  await expect(probe).toContainText('no escape in 240 steps');
  await whole.click();
  await expect(whole).toHaveAttribute('aria-pressed', 'true');
});

test('Galton board tallies drops and clears the sample when the bias changes', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.55;
  });
  await page.goto('/exhibits/galton/');
  const slider = page.getByRole('slider', { name: 'Chance of turning right' });
  const board = page.getByRole('img', { name: /^Galton board and distribution/ });
  const result = page.locator('#galton-result');
  const route = page.locator('#galton-route');
  const centerMark = page.locator('[data-galton-mark="5"]');
  const prediction = await centerMark.getAttribute('y1');
  await expect(result).toHaveText('0 balls');

  await page.getByRole('button', { name: 'Drop one' }).press('Enter');
  await expect(result).toHaveText('1 ball · last bin 0');
  await expect(route).toHaveAttribute('points', /^\d+,\d+ /);
  await expect(page.locator('[data-galton-bar="0"]')).toHaveAttribute('height', '84');
  await expect(board).toHaveAccessibleDescription(/Latest route: left, left, left/);
  await page.getByRole('button', { name: 'Drop 100' }).press('Enter');
  await expect(result).toContainText('101 balls');

  await slider.press('End');
  await expect(slider).toHaveAttribute('aria-valuetext', '80%');
  await expect(result).toHaveText('0 balls');
  await expect(route).toHaveAttribute('points', '');
  expect(await centerMark.getAttribute('y1')).not.toBe(prediction);

  await page.getByRole('button', { name: 'Drop 100' }).click();
  await expect(result).toHaveText('100 balls · last bin 10');
  await expect(board).toHaveAccessibleDescription(/Latest route: right, right, right/);
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(result).toHaveText('0 balls');
  await expect(slider).toHaveValue('80');
  await expect(page.locator('[data-galton-bar][height="0"]')).toHaveCount(11);
});

test('Logistic growth presets and keyboard input update both plots', async ({ page }) => {
  await page.goto('/exhibits/logistic/');
  const slider = page.getByRole('slider', { name: 'Growth factor' });
  const cursor = page.locator('#logistic-cursor');
  const trace = page.locator('#logistic-trace');
  const traceImage = page.getByRole('img', { name: /^The last 48 population values/ });
  const settledValues = page.locator('#logistic-range');
  const initialPoints = await trace.getAttribute('points');

  await expect(settledValues).toHaveText('0.513–0.799');
  await page.getByRole('button', { name: 'Settles' }).press('Enter');
  await expect(slider).toHaveValue('2.8');
  await expect(settledValues).toHaveText('0.643');
  await expect(traceImage).toHaveAccessibleDescription(/^Last eight values in order: 0\.643, 0\.643/);
  expect(await trace.getAttribute('points')).not.toBe(initialPoints);

  await page.getByRole('button', { name: 'Irregular' }).click();
  await expect(slider).toHaveValue('3.9');
  const selectedMarks = await page.locator('#logistic-selection').getAttribute('d');
  const diagramMarks = await page.locator('#logistic-columns').getAttribute('d');
  expect(selectedMarks).toBeTruthy();
  expect(diagramMarks).toContain(selectedMarks);

  await slider.press('End');
  await expect(slider).toHaveValue('4');
  await expect(cursor).toHaveAttribute('transform', 'translate(552)');
  await page.getByRole('button', { name: 'Alternates' }).click();
  await expect(settledValues).toHaveText('0.513–0.799');
  expect(await trace.getAttribute('points')).toBe(initialPoints);
});

test('Fourier redraws with keyboard input and restarts the trace while paused', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/exhibits/fourier/');
  const slider = page.getByRole('slider', { name: 'Rotating circles' });
  const error = page.getByLabel('RMS sample error', { exact: true });
  const play = page.getByRole('button', { name: 'Play' });
  const image = () => page.evaluate(() => document.querySelector('canvas')?.toDataURL());

  await expect(play).toBeVisible();
  await expect(error).toHaveText(/^0\.\d+$/);
  await slider.press('Home');
  await expect(slider).toHaveValue('0');
  const initialError = Number(await error.innerText());
  await slider.press('ArrowRight');
  await expect(slider).toHaveValue('1');
  expect(Number(await error.innerText())).toBeLessThan(initialError);
  await slider.press('End');
  await expect(slider).toHaveValue('128');
  await expect(error).toHaveText('<0.001');

  const restingImage = await image();
  await play.press('Enter');
  await expect.poll(image).not.toBe(restingImage);
  await page.getByRole('button', { name: 'Pause' }).press('Enter');
  await page.getByRole('button', { name: 'Restart trace' }).press('Enter');
  expect(await image()).toBe(restingImage);
  await expect(play).toBeVisible();
});

test('Kuramoto starts paused with reduced motion and couples with keyboard input', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/exhibits/kuramoto/');
  const play = page.getByRole('button', { name: 'Play' });
  const synchrony = page.locator('#synchrony');
  await expect(play).toBeVisible();
  await expect(synchrony).toHaveText(/\d+%/);
  const startingSynchrony = await synchrony.innerText();
  const coupling = page.getByRole('slider', { name: /Coupling/ });
  await coupling.press('End');
  await expect(coupling).toHaveValue('5');
  await play.press('Enter');
  await expect
    .poll(async () => Number.parseInt(await synchrony.innerText(), 10), { timeout: 10_000 })
    .toBeGreaterThan(90);

  await page.getByRole('button', { name: 'Pause' }).press('Enter');
  await page.getByRole('button', { name: 'Reset' }).press('Enter');
  await expect(synchrony).toHaveText(startingSynchrony);
  await expect(play).toBeVisible();
});

test('Lorenz advances both paths and restores the selected separation on reset', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/exhibits/lorenz/');
  const readout = page.locator('#readout');
  const separation = page.getByRole('slider', { name: /Initial separation/ });
  await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  await separation.press('End');
  await expect(readout).toHaveText('Time 0.00 · current distance 1.00');
  await page.getByRole('button', { name: 'Play' }).click();
  await expect(readout).not.toContainText('Time 0.00');

  await page.evaluate(() => {
    window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  const restored = await readout.innerText();
  await expect(readout).not.toHaveText(restored);

  await page.getByRole('button', { name: 'Pause' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(readout).toHaveText('Time 0.00 · current distance 1.00');
});

test('Voronoi sites move by keyboard and pointer and retain visible focus', async ({ page }) => {
  await page.goto('/exhibits/voronoi/');
  const site = page.getByRole('group', { name: /^Warehouse 1 at/ });
  await expect(site.locator('text')).toHaveCSS('text-anchor', 'middle');
  await expect(site).toHaveAttribute('transform', 'translate(170 130)');
  await site.press('Shift+ArrowRight');
  await expect(site).toHaveAttribute('transform', 'translate(195 130)');
  await expect(site).toBeFocused();
  await expect(site).toHaveCSS('outline-style', 'solid');

  const marker = site.locator('.marker');
  await marker.scrollIntoViewIfNeeded();
  const bounds = await marker.boundingBox();
  if (!bounds) throw new Error('Warehouse marker is outside the plot');
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 65, y + 25, { steps: 4 });
  await page.mouse.up();
  await expect(site).not.toHaveAttribute('transform', 'translate(195 130)');
  await page.getByRole('button', { name: 'Reset sites' }).click();
  await expect(site).toHaveAttribute('transform', 'translate(170 130)');
});
