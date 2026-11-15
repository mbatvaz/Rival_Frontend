import { test, expect } from '@playwright/test';

test('Desktop drag settles gradually on the nearest centered portrait @visual', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.goto('portfolio/?state=viewer');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const rail = page.locator('.rv-viewer:not([hidden]) .rv-viewer__rail');
  await rail.evaluate(async element => {
    await document.fonts.ready;
    await Promise.all(element.closest('.rv-viewer').getAnimations().map(animation => animation.finished));
  });
  const box = await rail.boundingBox();
  await page.mouse.move(box.x + 80, box.y + 100);
  await page.mouse.down();
  await page.mouse.move(box.x + 300, box.y + 100, { steps: 8 });
  await page.mouse.up();
  const positions = await rail.evaluate(async element => {
    const values = [];
    for (let index = 0; index < 8; index++) {
      await new Promise(resolve => window.requestAnimationFrame(resolve));
      values.push(element.scrollLeft);
    }
    return values;
  });
  expect(new Set(positions.map(value => Math.round(value))).size).toBeGreaterThan(2);
  await expect.poll(() => rail.evaluate(element => {
    const frame = element.getBoundingClientRect();
    return Math.min(...[...element.querySelectorAll('figure')].map(figure => {
      const box = figure.getBoundingClientRect();
      return Math.abs(box.left + box.width / 2 - frame.left - frame.width / 2);
    }));
  })).toBeLessThan(2);
});
