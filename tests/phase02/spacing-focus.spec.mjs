import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const target = 'tests/screens/spacing-focus/' + (basePath === '/' ? 'root' : 'subpath');
const ready = page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
async function capture(page, name) {
  await fs.mkdir(target, { recursive: true });
  await page.screenshot({ path: target + '/' + name + '.png', fullPage: true });
}

test('Portfolio captions stay compact at mobile and desktop sizes @visual', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('portfolio/');
    await ready(page);
    const caption = page.locator('.rv-portfolio-card__caption').first();
    const title = await caption.locator(':scope > span').boundingBox();
    const metadata = await caption.locator('p').boundingBox();
    expect((await caption.boundingBox()).height).toBeLessThan(64);
    expect(metadata.y - title.y - title.height).toBeLessThanOrEqual(4);
    await page.locator('[data-rv-sheet-open="work-1"]').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-rv-sheet-open="work-1"]')).toBeFocused();
    await capture(page, 'portfolio-' + width);
  }
});

test('Rules links form a native horizontal mobile rail and retain the desktop sidebar @visual @a11y', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1023, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('booking-rules/');
    await ready(page);
    const nav = page.getByRole('navigation', { name: 'بخش‌های این صفحه' });
    const links = nav.getByRole('link');
    const boxes = await links.evaluateAll(items => items.map(item => ({ y: item.getBoundingClientRect().y, height: item.getBoundingClientRect().height })));
    if (width < 1024) {
      expect(Math.max(...boxes.map(box => box.y)) - Math.min(...boxes.map(box => box.y))).toBeLessThan(1);
      expect(boxes.every(box => box.height >= 44)).toBe(true);
      await links.first().focus();
      for (let index = 0; index < 3; index++) await page.keyboard.press('Tab');
      await expect(links.last()).toBeFocused();
      await expect(links.last()).toBeInViewport();
      if (width <= 390) {
        await nav.hover();
        await page.mouse.wheel(-160, 0);
        await expect.poll(() => nav.evaluate(el => el.scrollLeft)).toBeLessThan(-1);
      }
    } else {
      expect(boxes[1].y).toBeGreaterThan(boxes[0].y);
      await expect(nav).toHaveCSS('position', 'sticky');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if ([390, 768, 1280].includes(width)) await capture(page, 'rules-' + width);
  }
});

test('Text entry thickens its existing border with no extra outline or layout shift @visual @a11y', async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, selector] of [
      ['login/', '[data-rv-phone]'], ['login/?method=password', '[data-rv-password]'],
      ['login/?state=expired', '[data-rv-phone]'], ['_preview/context/auth-02/?state=default', '[data-rv-first-name]'],
      ['_preview/context/auth-02/?state=default', '[data-rv-last-name]']
    ]) {
      await page.goto(route);
      await ready(page);
      const input = page.locator(selector);
      const wrapper = input.locator('..');
      await input.evaluate(el => el.blur());
      const before = await wrapper.boundingBox();
      await input.focus();
      await expect(wrapper).toHaveCSS('border-top-width', '2px');
      await expect(wrapper).toHaveCSS('border-top-color', 'rgb(18, 20, 23)');
      await expect(wrapper).toHaveCSS('outline-style', 'none');
      await expect(input).toHaveCSS('outline-style', 'none');
      const after = await wrapper.boundingBox();
      expect(after.height).toBeCloseTo(before.height, 1);
      expect(after.width).toBeCloseTo(before.width, 1);
      if (route === 'login/') await capture(page, 'phone-focus-' + width);
    }
    await page.goto('_preview/');
    await ready(page);
    const search = page.getByRole('searchbox');
    const before = await search.boundingBox();
    await search.focus();
    await expect(search).toHaveCSS('border-top-width', '2px');
    await expect(search).toHaveCSS('outline-style', 'none');
    expect((await search.boundingBox()).height).toBeCloseTo(before.height, 1);
  }
});
