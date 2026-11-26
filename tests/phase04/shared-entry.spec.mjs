import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

const routes = ['', 'portfolio/', 'booking-rules/', 'login/', '_preview/context/auth-02/?state=default', 'account-unavailable/',
  'customer/book/', ...['bk-02', 'bk-f01', 'bk-f02', 'bk-p01', 'bk-r01', 'bk-req01', 'bk-rec01', 'bk-alert01', 'pay-res', 'state-04', 'state-05', 'state-06', 'state-07'].map(id => `_preview/context/${id}/`)];
for (const width of [390, 768, 1280]) {
  test(`Implemented pages keep fixed chrome static at ${width}px @visual`, async ({ page }, info) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
    for (const route of routes) {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      await expect(page.locator('html')).toHaveAttribute('data-rv-entry', /^(ready|static)$/);
      await expect(page.locator('main [data-rv-entry]')).toHaveCount(0);
      expect(await page.locator('#rv-main').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
      const fixed = '#rv-main, h1, .rv-section-head, .rv-booking-mast, .rv-auth-top, .rv-role-nav, .rv-booking-steps';
      expect(await page.locator(fixed).evaluateAll(elements => elements.every(el => !el.getAnimations().some(animation => animation.id === 'rv-list-entry')))).toBe(true);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect.poll(() => page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'rv-list-entry').length)).toBe(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
      if (['', 'login/', 'customer/book/'].includes(route)) {
        const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
        const dir = `tests/screens/shared-entry/${mode}`;
        await fs.mkdir(dir, { recursive: true });
        await page.screenshot({ path: `${dir}/${route ? route.split('/')[0] : 'public'}-${width}.png`, fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('Customer mobile rails reserve shadow space without changing horizontal keyboard scrolling @visual', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('customer/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  for (const selector of ['.rv-appointment-rail', '.rv-customer-payment-rail']) {
    const rail = page.locator(selector);
    const geometry = await rail.evaluate(el => {
      const box = el.getBoundingClientRect(), card = el.firstElementChild.getBoundingClientRect();
      return { top: card.top - box.top, bottom: box.bottom - card.bottom, overflow: getComputedStyle(el).overflowX };
    });
    expect(geometry.top).toBeGreaterThanOrEqual(64);
    expect(geometry.bottom).toBeGreaterThanOrEqual(64);
    expect(geometry.overflow).toBe('auto');
    await rail.focus(); await page.keyboard.press('End');
    expect(await rail.evaluate(el => Math.abs(el.scrollLeft))).toBeGreaterThan(0);
    await page.keyboard.press('Home');
    await rail.evaluate(el => el.blur());
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
  const dir = `tests/screens/shared-entry/${mode}`;
  await fs.mkdir(dir, { recursive: true });
  await page.screenshot({ path: `${dir}/customer-shadows-390.png`, fullPage: true });
});
