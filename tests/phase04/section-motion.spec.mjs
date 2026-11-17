import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

for (const width of [390, 768, 1280]) {
  test(`Data items enter in near-complete sequence at ${width}px @visual`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      window.listEntries = [];
      const animate = window.Element.prototype.animate;
      window.Element.prototype.animate = function (frames, options) {
        const animation = animate.call(this, frames, options);
        if (options?.id === 'rv-list-entry') {
          animation.pause();
          window.listEntries.push({ target: this, frames, options });
        }
        return animation;
      };
    });
    await page.goto('customer/book/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const sequence = await page.evaluate(() => window.listEntries.filter(item => item.target.matches('[data-rv-service-choice]')).map(item => ({ frames: item.frames, delay: item.options.delay, duration: item.options.duration })));
    expect(sequence.length).toBeGreaterThan(2);
    sequence.forEach((item, index) => {
      expect(item.delay).toBeCloseTo(index * 170);
      expect(item.duration).toBe(240);
      expect(Object.keys(item.frames[0])).toEqual(width < 1024 ? ['opacity', 'transform'] : ['opacity']);
      if (width < 1024) expect(item.frames[0].transform).toBe('translateX(-24px)');
    });
    expect(await page.locator('h1, .rv-section-head, .rv-booking-sidebar, .rv-booking-steps, #rv-main').evaluateAll(elements => elements.every(el => el.getAnimations().every(animation => animation.id !== 'rv-list-entry')))).toBe(true);
    await page.evaluate(async () => {
      const animations = document.getAnimations().filter(animation => animation.id === 'rv-list-entry');
      await Promise.all(animations.map(animation => animation.ready));
      animations.forEach(animation => { animation.currentTime = 620; });
    });
    const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
    await fs.mkdir(`tests/screens/list-entry/${mode}`, { recursive: true });
    await page.screenshot({ path: `tests/screens/list-entry/${mode}/booking-enter-${width}.png`, fullPage: true });
    await page.evaluate(() => {
      const list = document.querySelector('[data-rv-choices-list]');
      for (let i = 0; i < 12; i++) { const card = list.firstElementChild.cloneNode(true); card.dataset.rvServiceChoice = 'test-' + i; list.append(card); }
    });
    await page.locator('[data-rv-service-choice]').last().focus();
    const added = await page.evaluate(() => window.listEntries.filter(item => item.target.dataset.rvServiceChoice?.startsWith('test-')).map(item => item.options.delay));
    expect(added).toEqual([]);
    const card = page.locator('[data-rv-service-choice]').last();
    await card.focus();
    expect(await card.evaluate(el => el.getAnimations().filter(animation => animation.id === 'rv-list-entry').length)).toBe(0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(() => page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'rv-list-entry').length)).toBe(0);
    await page.goto('customer/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    await page.screenshot({ path: `tests/screens/list-entry/${mode}/customer-${width}.png`, fullPage: true });
  });
}

test('Portfolio records enter across visual rows rather than whole DOM columns @visual', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.addInitScript(() => {
    window.rowOrder = [];
    const animate = window.Element.prototype.animate;
    window.Element.prototype.animate = function (frames, options) {
      if (options?.id === 'rv-list-entry' && this.matches('[data-rv-work]')) {
        const rect = this.getBoundingClientRect();
        window.rowOrder.push({ top: rect.top, right: rect.right, index: [...document.querySelectorAll('[data-rv-work]')].indexOf(this) });
      }
      return animate.call(this, frames, options);
    };
  });
  await page.goto('portfolio/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const order = await page.evaluate(() => window.rowOrder);
  expect(order.length).toBeGreaterThan(3);
  for (let index = 1; index < order.length; index++) {
    const previous = order[index - 1], current = order[index];
    if (Math.abs(current.top - previous.top) <= 4) expect(current.right).toBeLessThanOrEqual(previous.right);
    else expect(current.top).toBeGreaterThan(previous.top);
  }
  expect(order.map(item => item.index)).not.toEqual(order.map((_, index) => index));
});

test('Home and ordinary navigation never fade the entire page; absent animation API stays usable @smoke', async ({ page }) => {
  const fades = [];
  await page.exposeFunction('recordMainFade', frames => fades.push(frames));
  await page.addInitScript(() => {
    window.mainFades = [];
    const animate = window.Element.prototype.animate;
    window.Element.prototype.animate = function (frames, options) {
      if (this.matches('main, .rv-public, .rv-booking')) { window.mainFades.push(frames); window.recordMainFade(frames); }
      return animate.call(this, frames, options);
    };
  });
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'rv-list-entry').length)).toBe(0);
  expect(await page.evaluate(() => window.mainFades)).toEqual([]);
  await page.locator('.rv-home-hero [data-rv-book]').click();
  await expect(page).toHaveURL(/(?:customer\/book|login)\//);
  expect(fades).toEqual([]);
  expect(await page.evaluate(() => window.mainFades)).toEqual([]);
  await page.addInitScript(() => { window.Element.prototype.animate = undefined; });
  await page.goto('customer/book/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-service-choice]').first()).toHaveCSS('opacity', '1');
});
