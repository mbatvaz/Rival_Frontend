import { test, expect } from '@playwright/test';

for (const width of [390, 1280]) {
  test(`Portfolio entry runs only on document load at ${width}px @smoke`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      window.entryRuns = 0;
      const animate = window.Element.prototype.animate;
      window.Element.prototype.animate = function (frames, options) {
        if (options?.id === 'rv-list-entry') window.entryRuns++;
        return animate.call(this, frames, options);
      };
    });
    await page.goto('portfolio/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const initial = await page.evaluate(() => window.entryRuns);
    expect(initial).toBeGreaterThan(0);
    const opener = page.locator('.rv-portfolio-card__open').first();
    for (let index = 0; index < 2; index++) {
      await opener.click();
      await expect(page.locator('.rv-viewer:visible')).toHaveCount(1);
      await page.keyboard.press('Escape');
      await expect(page.locator('.rv-viewer:visible')).toHaveCount(0);
      await expect(opener).toBeFocused();
      expect(await page.evaluate(() => window.entryRuns)).toBe(initial);
    }
    await page.locator('[data-rv-filter="service"]').nth(1).click();
    await page.locator('[data-rv-filter="service"]').first().click();
    expect(await page.evaluate(() => window.entryRuns)).toBe(initial);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    expect(await page.evaluate(() => window.entryRuns)).toBeGreaterThan(0);
  });
}
