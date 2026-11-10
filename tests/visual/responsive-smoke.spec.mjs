import { test, expect } from '@playwright/test';

for (const width of [390, 768, 1280]) {
  test(`central directory renders without horizontal page overflow at ${width}px @visual`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('_preview/');
    await expect(page.getByRole('heading', { name: 'فهرست صفحات و مسیرهای پروژه' })).toBeVisible();
    const sizes = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth
    }));
    expect(sizes.content).toBeLessThanOrEqual(sizes.viewport + 1);
    await page.screenshot({ path: `test-results/preview-${width}.png`, fullPage: true });
  });
}
