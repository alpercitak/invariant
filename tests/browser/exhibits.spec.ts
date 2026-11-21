import { expect, test } from '@playwright/test';

test('archive links to all exhibits and layouts fit a mobile screen', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await expect(page.getByRole('heading', { name: 'The Pattern Archive', level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);

  for (const name of ['Kuramoto synchronization', 'Lorenz attractor', 'Voronoi diagrams', 'Fourier drawing']) {
    const card = page.getByRole('link', { name, exact: true });
    await expect(card.locator('svg')).toBeVisible();
    await card.click();
    await expect(page.getByRole('heading', { name, level: 1 })).toBeVisible();
    await expect(page.locator('math[display="block"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
    const guide = page.locator('details').filter({ hasText: 'How to read this' });
    await expect(guide.locator('p')).toBeHidden();
    await guide.locator('summary').press('Enter');
    await expect(guide.locator('p')).toBeVisible();
    await expect(guide.locator('p')).not.toBeEmpty();
    await page.getByRole('link', { name: 'All exhibits' }).click();
  }
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
