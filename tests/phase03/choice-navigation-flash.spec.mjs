import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
for (const width of [390, 1280]) {
  test('Booking choice navigation never fades to a blank frame at ' + width + ' @smoke @visual', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const fades = [];
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.exposeFunction('recordBookingFade', frames => fades.push(frames));
    await page.addInitScript(() => {
      const animate = window.Element.prototype.animate;
      window.Element.prototype.animate = function (frames, options) {
        if (this.matches('.rv-booking > main')) window.recordBookingFade(frames);
        return animate.call(this, frames, options);
      };
      document.addEventListener('DOMContentLoaded', () => {
        const main = document.querySelector('.rv-booking > main');
        main?.getAnimations().forEach(animation => { animation.pause(); animation.currentTime = 0; });
        window.bookingFirstOpacity = main ? getComputedStyle(main).opacity : null;
      }, { once: true });
    });
    await page.goto('_preview/context/bk-01/');
    const ready = async () => {
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      expect(await page.evaluate(() => window.bookingFirstOpacity)).toBe('1');
      await expect(page.locator('.rv-booking > main')).toHaveCSS('opacity', '1');
    };
    await ready();
    await page.locator('[data-rv-service-choice="face-hair"]').click();
    await expect(page).toHaveURL(/bk-02\//); await ready();
    await page.locator('[data-rv-stylist-choice="amir"]').click();
    await expect(page).toHaveURL(/bk-f01\//); await ready();
    expect(fades).toEqual([]);
    expect(errors).toEqual([]);
    const dir = 'tests/screens/choice-navigation/' + (basePath === '/' ? 'root' : 'subpath');
    await fs.mkdir(dir, { recursive: true });
    await page.screenshot({ path: dir + '/no-flash-' + width + '.png', fullPage: true });
    await page.goBack(); await ready();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('[data-rv-stylist-choice="amir"]').click();
    await expect(page).toHaveURL(/bk-f01\//); await ready();
  });
}
