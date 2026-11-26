import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

const ready = page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
const scope = page => expect(page.locator('.rv-text-line:not([data-rv-overflow-text])')).toHaveCount(0);

for (const width of [390, 768, 1280]) {
  test('Prose wraps normally while only compact card labels can move at ' + width + ' @visual @a11y', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await fs.mkdir('tests/screens/overflow-scope', { recursive: true });
    for (const [route, paragraph] of [
      ['booking-rules/', '.rv-rules__intro > p'],
      ['', '.rv-home-about .rv-lead'],
      ['_preview/context/bk-req01/', '.rv-state-page__intro .rv-lead'],
      ['_preview/context/bk-f02/', '[data-rv-ticket-service]']
    ]) {
      await page.goto(route || './');
      await ready(page);
      await scope(page);
      const prose = page.locator(paragraph).filter({ visible: true }).first();
      await expect(prose).not.toHaveClass(/rv-text-line/);
      await expect(prose).toHaveCSS('white-space', 'normal');
      await expect(prose).not.toHaveAttribute('tabindex');
      await prose.evaluate(el => { el.textContent = 'توضیح طولانی که باید به صورت عادی در چند سطر خوانده شود. '.repeat(6); });
      await expect.poll(() => prose.evaluate(el => el.clientHeight / parseFloat(getComputedStyle(el).lineHeight))).toBeGreaterThan(1);
      await expect(prose.locator('.rv-text-line__content')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.screenshot({ path: 'tests/screens/overflow-scope/' + (route.split('/')[0] || 'home') + '-' + width + '.png', fullPage: true });
    }
  });
}

test('Long variable service and stylist names stay within compact cards and short text stays still @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('_preview/context/bk-02/');
  await ready(page);
  const name = page.locator('[data-rv-centered="true"] [data-rv-overflow-text]');
  await expect(name).not.toHaveClass(/rv-text-line/);
  await name.evaluate(el => { el.textContent = 'نام و نام خانوادگی بسیار طولانی آرایشگر برای بررسی فضای کارت'; });
  await expect(name).toHaveAttribute('data-rv-text-overflow', 'true');
  await expect(name).toHaveCSS('white-space', 'nowrap');
  await scope(page);
  const summary = page.locator('[data-rv-context-service]');
  await summary.evaluate(el => { el.textContent = 'نام بسیار طولانی و متغیر خدمت در کارت خلاصه نوبت'; });
  await expect(summary).toHaveAttribute('data-rv-text-overflow', 'true');
  await summary.evaluate(el => { el.textContent = 'اصلاح'; });
  await expect(summary).not.toHaveClass(/rv-text-line/);
  await expect(summary.locator('.rv-text-line__content')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(name.locator('.rv-text-line__content')).toHaveCSS('animation-name', 'none');
  await expect(name).toHaveCSS('overflow-x', 'auto');
});

test('Portfolio captions are centered and long card text moves without ellipsis @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('portfolio/');
  await ready(page);
  const caption = page.locator('.rv-portfolio-card__caption').first();
  const title = caption.locator('span[data-rv-overflow-text]');
  await expect(title).toHaveCSS('text-align', 'center');
  await expect(caption.locator('p')).toHaveCSS('text-align', 'center');
  await title.evaluate(el => { el.textContent = 'عنوان نمونه‌کار برای آزمایش نمایش کامل متن در کارت '.repeat(5); });
  await expect(title).toHaveAttribute('data-rv-text-overflow', 'true');
  await expect(title).toHaveCSS('text-overflow', 'clip');
  await expect(title.locator('.rv-text-line__content')).toHaveCSS('animation-name', 'rv-overflow-text');
});
