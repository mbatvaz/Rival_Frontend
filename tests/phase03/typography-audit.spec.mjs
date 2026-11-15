import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

const routes = ['', 'booking-rules/', 'portfolio/', 'login/', '_preview/context/bk-01/', '_preview/context/bk-02/',
  '_preview/context/bk-f01/?demo=artboard', '_preview/context/bk-p01/', '_preview/context/bk-r01/',
  '_preview/context/bk-rec01/', '_preview/context/bk-f02/', '_preview/context/bk-req01/'];
const snapshot = page => page.evaluate(() => {
  const font = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'];
  const spacing = ['textAlign', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'whiteSpace'];
  const read = (el, properties) => Object.fromEntries(properties.map(name => [name, getComputedStyle(el)[name]]));
  const path = el => {
    const parts = [];
    for (; el && el !== document.body; el = el.parentElement) {
      const index = [...el.parentElement.children].indexOf(el);
      parts.push(el.tagName + ':' + index);
    }
    return parts.reverse().join('/');
  };
  const visible = el => el.checkVisibility() && !el.closest('[hidden],[inert]');
  const ordinary = [...document.querySelectorAll('h1,h2,h3,p,legend,.rv-muted')].filter(el => visible(el) &&
    !el.closest('[data-rv-overflow-text]') && !el.querySelector('[data-rv-overflow-text]'));
  const labels = [...document.querySelectorAll('[data-rv-overflow-text]')].filter(visible);
  return {
    prose: ordinary.map(el => ({ path: path(el), ...read(el, [...font, ...spacing]),
      x: Math.round(el.getBoundingClientRect().x), width: Math.round(el.getBoundingClientRect().width) })),
    labels: labels.map(el => ({ path: path(el), ...read(el, font) })),
    inherited: labels.filter(el => el.classList.contains('rv-text-line')).map(el => ({
      path: path(el), outer: read(el, font), inner: read(el.firstElementChild, font)
    })),
    leakage: document.querySelectorAll('.rv-text-line:not([data-rv-overflow-text])').length,
    overflow: document.documentElement.scrollWidth > window.innerWidth
  };
});

for (const width of [320, 390, 768, 1023, 1024, 1280, 1440]) {
  test('Text motion preserves original typography and ordinary text spacing at ' + width + ' @visual @a11y', async ({ page, context }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const baseline = await context.newPage();
    await baseline.setViewportSize({ width, height: 900 });
    await baseline.emulateMedia({ reducedMotion: 'reduce' });
    await baseline.route('**/components/overflow-text.js', route => route.fulfill({
      contentType: 'text/javascript', body: 'export function initOverflowText() {}'
    }));
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await fs.mkdir('tests/screens/typography-audit', { recursive: true });
    for (const route of routes) {
      await Promise.all([page.goto(route || './'), baseline.goto(route || './')]);
      for (const target of [page, baseline]) {
        await expect(target.locator('html')).toHaveAttribute('data-rv-ready', 'true');
        await target.evaluate(() => document.fonts.ready);
      }
      const [actual, reference] = await Promise.all([snapshot(page), snapshot(baseline)]);
      expect(actual.prose, route + ' prose').toEqual(reference.prose);
      expect(actual.labels, route + ' labels').toEqual(reference.labels);
      for (const entry of actual.inherited) expect(entry.inner, route + ' inner font ' + entry.path).toEqual(entry.outer);
      expect(actual.leakage, route).toBe(0);
      expect(actual.overflow, route).toBe(false);
      if (route.includes('bk-r01')) {
        const caption = page.locator('.rv-booking-package [data-rv-overflow-text]').first();
        await expect(caption).toHaveCSS('font-weight', '600');
        await expect(caption).toHaveCSS('font-size', '13px');
        await expect(caption).toHaveCSS('line-height', '18px');
      }
      if ([390, 768, 1280].includes(width)) await page.screenshot({
        path: 'tests/screens/typography-audit/' + (route.split('?')[0].split('/').filter(Boolean).pop() || 'home') + '-' + width + '.png', fullPage: true
      });
    }
    expect(errors).toEqual([]);
    await baseline.close();
  });
}
