import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

for (const width of [1024, 1280, 1600, 1920, 2560]) {
  test(`Customer desktop sidebar stays in place across home/booking at ${width}px @visual`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    const failures = [];
    page.on('pageerror', error => failures.push(error.message));
    page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
    await page.goto('customer/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const nav = page.locator('.rv-booking-sidebar');
    const home = await nav.boundingBox();
    await nav.locator('[data-rv-customer-book]').click();
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const booking = await nav.boundingBox();
    expect(home.x, 'Shared sidebar must not jump horizontally').toBeCloseTo(booking.x, 1);
    expect(home.y).toBeCloseTo(booking.y, 1);
    expect(home.width).toBeCloseTo(booking.width, 1);
    expect(home.height).toBeCloseTo(booking.height, 1);
    await nav.getByRole('link', { name: 'خانه', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    expect((await nav.boundingBox()).x).toBeCloseTo(home.x, 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width > 1600) {
      const canvas = await page.evaluate(() => ({
        page: getComputedStyle(document.querySelector('.rv-customer-home')).backgroundImage,
        body: getComputedStyle(document.body).backgroundImage
      }));
      expect(canvas.page, 'The capped content must not clip the canvas gradient').toBe('none');
      expect(canvas.body).toContain('linear-gradient');
      const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
      const dir = `tests/screens/phase04-shell/${mode}`;
      await fs.mkdir(dir, { recursive: true });
      await page.screenshot({ path: `${dir}/CUS-01-${width}.png`, fullPage: true });
    }
    expect(failures).toEqual([]);
  });
}
