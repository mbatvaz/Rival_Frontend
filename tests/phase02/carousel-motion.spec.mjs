import { test, expect } from '@playwright/test';

test('Home carousel supports keyboard and labelled indicators without enabling reduced-motion autoplay @a11y @smoke', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const stage = page.locator('.rv-home-carousel__stage');
  const selectors = page.locator('[data-rv-carousel-select]');
  const active = page.locator('[data-rv-carousel-caption]:visible');
  await stage.focus();
  await expect(page.locator('[data-rv-carousel-description]')).toHaveAttribute('aria-live', 'polite');
  await page.keyboard.press('ArrowLeft');
  await expect(selectors.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('End');
  await expect(selectors.last()).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Home');
  await expect(selectors.first()).toHaveAttribute('aria-pressed', 'true');
  await selectors.nth(2).click();
  const selected = await active.textContent();
  await page.clock.fastForward(12000);
  await expect(active).toHaveText(selected);
  await expect(page.locator('[data-rv-carousel-toggle]')).toHaveCount(0);
  expect(await selectors.evaluateAll(items => items.every(item => {
    const rect = item.getBoundingClientRect();
    return rect.width >= 44 && rect.height >= 44;
  }))).toBe(true);
});

test('Autoplay runs without a toggle and stops when reduced motion is enabled @smoke', async ({ page }) => {
  await page.clock.install();
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const active = page.locator('[data-rv-carousel-caption]:visible');
  const original = await active.textContent();
  await expect(page.locator('[data-rv-carousel-toggle]')).toHaveCount(0);
  await page.mouse.move(0, 0);
  await page.clock.fastForward(6100);
  await expect(active).not.toHaveText(original);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const stopped = await active.textContent();
  await page.clock.fastForward(12000);
  await expect(active).toHaveText(stopped);
});

test('Carousel focus and hover suspend automatic motion without losing manual selection @smoke', async ({ page }) => {
  await page.clock.install();
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const active = page.locator('[data-rv-carousel-caption]:visible');
  const stage = page.locator('.rv-home-carousel__stage');
  await stage.hover();
  const hovered = await active.textContent();
  await page.clock.fastForward(6100);
  await expect(active).toHaveText(hovered);
  await stage.focus();
  await page.mouse.move(0, 0);
  await page.keyboard.press('ArrowLeft');
  const selected = await active.textContent();
  expect(selected).not.toBe(hovered);
  await page.clock.fastForward(6100);
  await expect(active).toHaveText(selected);
});

test('Booking explanation loops in view and cancels to static final state when reduced motion changes @visual', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const steps = page.locator('.rv-home-steps');
  await steps.scrollIntoViewIfNeeded();
  await expect(steps).toHaveAttribute('data-rv-steps-motion', 'playing');
  const timings = await steps.locator('.rv-home-steps__number').evaluateAll(items => items.map(item =>
    item.getAnimations().map(animation => animation.effect.getTiming())));
  expect(timings.flat()).toHaveLength(3);
  expect(timings.flat().every(timing => timing.iterations === Infinity && timing.duration === 4200)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(steps).not.toHaveAttribute('data-rv-steps-motion');
  expect(await steps.locator('.rv-home-steps__number').evaluateAll(items =>
    items.every(item => item.getAnimations().length === 0))).toBe(true);
  await expect(steps.locator('h3')).toHaveCount(3);
});
