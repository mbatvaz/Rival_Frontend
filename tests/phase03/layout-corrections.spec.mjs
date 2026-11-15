import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

const ready = page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');

test('Overflow text stays on one line, updates after content changes and respects reduced motion @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('_preview/context/bk-01/');
  await ready(page);
  const caption = page.locator('[data-rv-service-choice="groom"] .rv-booking-choice__caption > span');
  await expect(caption).toHaveClass(/rv-text-line/);
  await expect(caption).toHaveCSS('white-space', 'nowrap');
  await expect(caption).toHaveAttribute('data-rv-text-overflow', 'true');
  await expect(caption.locator('.rv-text-line__content')).toHaveCSS('animation-name', 'rv-overflow-text');
  await expect(caption).toHaveAttribute('tabindex', '0');
  await caption.focus();
  await expect(caption.locator('.rv-text-line__content')).toHaveCSS('animation-name', 'none');
  await expect(caption).toHaveCSS('overflow-x', 'auto');
  await page.keyboard.press('Tab');
  await caption.evaluate(el => { el.textContent = 'متنی بسیار طولانی برای بررسی تغییر محتوای کارت و حرکت آن در یک سطر'; });
  await expect(caption.locator('.rv-text-line__content')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(caption.locator('.rv-text-line__content')).toHaveCSS('animation-name', 'none');
  await expect(caption).toHaveCSS('overflow-x', 'auto');
  await expect(page.locator('[data-rv-service-choice="groom"]')).toHaveAccessibleName(/پکیج دامادی/);
});

test('Mobile choice cards, dots and progress use compact geometry @visual @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['bk-01/', 'bk-02/']) {
    await page.goto('_preview/context/' + route);
    await ready(page);
    const center = await page.locator('[data-rv-centered="true"]').boundingBox();
    const side = await page.locator('[data-rv-centered="false"]').first().boundingBox();
    expect(side.height / center.height).toBeCloseTo(.84, 1);
    const rail = await page.locator('[data-rv-choices-list]').boundingBox();
    const dots = await page.locator('[data-rv-choice-dots]').boundingBox();
    expect(dots.y - rail.y - rail.height).toBeLessThanOrEqual(9);
    const progress = page.locator('[data-rv-mobile-progress]');
    if (!await progress.isVisible()) continue;
    const fill = await progress.evaluate(el => {
      return { expected: el.value / el.max };
    });
    // Reduced motion hides the decorative shine; normal mode retains native progress semantics.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    expect(fill.expected).toBeGreaterThan(0);
    const ratio = await progress.evaluate(el => el.parentElement.querySelector('.rv-booking-progress__shine').getBoundingClientRect().width / el.parentElement.clientWidth);
    expect(ratio).toBeCloseTo(fill.expected, 2);
    await page.emulateMedia({ reducedMotion: 'reduce' });
  }
});

test('Empty choice headings are absent and desktop cards remain compact @visual @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const route of ['bk-01/', 'bk-02/']) {
    await page.goto('_preview/context/' + route + '?state=empty');
    await ready(page);
    await expect(page.locator('.rv-section-head')).toBeHidden();
    await expect(page.locator('[data-rv-choices-empty]')).toBeVisible();
  }
  await page.goto('_preview/context/bk-f01/?demo=artboard');
  await ready(page);
  const context = await page.locator('.rv-booking-summary [data-rv-booking-context]').boundingBox();
  expect(context.height).toBeLessThanOrEqual(120);
  await expect(page.locator('[data-rv-action-sub]')).toBeHidden();
  const steps = await page.locator('.rv-booking-detail > .rv-booking-step-row').boundingBox();
  const quick = await page.locator('[data-rv-soon]').boundingBox();
  expect(quick.y - steps.y - steps.height).toBeLessThan(65);
  const grid = page.locator('[data-rv-time-calendar] [data-rv-month-grid]');
  const before = await grid.boundingBox();
  await page.getByRole('button', { name: 'ماه بعد', exact: true }).first().click();
  await expect(grid.locator('[data-rv-date="2026-11-01"]')).toHaveCount(1);
  const after = await grid.boundingBox();
  expect(after.height).toBeCloseTo(before.height, 1);
  await page.goto('_preview/context/bk-f02/');
  await ready(page);
  const image = await page.locator('[data-rv-ticket-image]').boundingBox();
  expect(image.width / image.height).toBeCloseTo(3, 1);
  const edges = await page.locator('.rv-ticket-when span, [data-rv-ticket-time]').evaluateAll(els => els.map(el => {
    const range = document.createRange(); range.selectNodeContents(el); return range.getBoundingClientRect().left;
  }));
  expect(Math.max(...edges) - Math.min(...edges)).toBeLessThan(1);
});

test('Booking corrections capture mobile, tablet and desktop review evidence @visual', async ({ page }) => {
  await fs.mkdir('tests/screens/booking-corrections', { recursive: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['bk-01/', 'bk-02/', 'bk-f01/?demo=artboard', 'bk-f02/']) {
      await page.goto('_preview/context/' + route);
      await ready(page);
      await page.screenshot({ path: 'tests/screens/booking-corrections/' + route.split('/')[0] + '-' + width + '.png', fullPage: true });
    }
  }
  expect(errors).toEqual([]);
});
