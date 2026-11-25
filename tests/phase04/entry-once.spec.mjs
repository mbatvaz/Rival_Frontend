import { test, expect } from '@playwright/test';
import { installMotionProbe } from '../helpers/motion.mjs';

for (const width of [390, 1280]) {
  test(`Portfolio replays after filtering and stays still on popup close at ${width}px @smoke`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(installMotionProbe, { record: 'entryRuns' });
    await page.goto('portfolio/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const initial = await page.evaluate(() => window.entryRuns.length);
    expect(initial).toBeGreaterThan(0);
    const opener = page.locator('.rv-portfolio-card__open').first();
    for (let index = 0; index < 2; index++) {
      await opener.click();
      await expect(page.locator('.rv-viewer:visible')).toHaveCount(1);
      const beforeClose = await page.evaluate(() => window.entryRuns.length);
      await page.keyboard.press('Escape');
      await expect(page.locator('.rv-viewer:visible')).toHaveCount(0);
      await expect(opener).toBeFocused();
      expect(await page.evaluate(() => window.entryRuns.length)).toBe(beforeClose);
    }
    const filter = page.locator('[data-rv-filter="service"]');
    const beforeFilter = await page.evaluate(() => window.entryRuns.length);
    await filter.nth(1).click();
    await expect(filter.nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => page.evaluate(() => window.entryRuns.length)).toBeGreaterThan(beforeFilter);
    await filter.first().click();
    await expect(filter.first()).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => window.entryRuns.every(({ frames }) => Number(frames[0].scale) < 1))).toBe(true);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    expect(await page.evaluate(() => window.entryRuns.length)).toBeGreaterThan(0);
  });
}
