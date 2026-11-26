import { test, expect } from '@playwright/test';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();

test('Role-shell booking uses the canonical ink action and accessible booking name @visual @a11y', async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('customer/');
    const link = page.getByRole('navigation', { name: width >= 1024 ? 'منوی مشتری' : 'ناوبری اصلی مشتری', exact: true }).getByRole('link', { name: 'رزرو نوبت', exact: true });
    await expect(link).toBeVisible();
    expect(await link.evaluate(element => getComputedStyle(element).backgroundColor)).toBe('rgb(18, 20, 23)');
    expect(await link.getAttribute('href')).toBe(basePath + 'customer/book/');
  }
});

for (const width of [390, 1280]) {
  test('Viewer uses its approved motion at ' + width + ' and restores focus after repeated Escape @visual @a11y', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('portfolio/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const opener = page.getByRole('button', { name: 'فید کوتاه کلاسیک', exact: true });
    await opener.click();
    const panel = page.getByRole('dialog', { name: 'فید کوتاه کلاسیک' });
    await expect(panel).toBeVisible();
    const entry = await panel.evaluate(element => {
      const animation = element.getAnimations().find(motion => motion.id === 'rv-sheet-enter');
      const frames = animation?.effect.getKeyframes() ?? [];
      return { duration: animation?.effect.getTiming().duration, frames };
    });
    expect(entry.duration).toBe(633);
    expect(entry.frames[0].transform).toContain('translateY');
    expect(entry.frames.every(frame => frame.opacity === undefined)).toBe(true);
    await expect(panel.locator('[data-rv-sheet-grip]')).toBeVisible();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(() => panel.evaluate(element => element.getAnimations().length)).toBe(0);
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(opener).toBeFocused();
    await expect(page.locator('[data-rv-page]')).not.toHaveAttribute('inert');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await opener.click();
    await expect(panel).toBeVisible();
    await panel.getByRole('button', { name: 'بستن نمایشگر' }).click();
    const exit = await panel.evaluate(element => element.getAnimations()
      .find(animation => animation.id === 'rv-sheet-exit')?.effect.getKeyframes() ?? []);
    expect(exit.at(-1)?.transform).toContain('translateY');
    expect(exit.every(frame => frame.opacity === undefined)).toBe(true);
    await expect(panel).toBeHidden();
    await expect(opener).toBeFocused();
  });
}

test('Shared motion cancellation follows live reduced-motion preference and preserves navigation fallback @smoke', async ({ page }) => {
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await page.evaluate(async prefix => {
    const { motionTiming, startMotion } = await import(prefix + 'js/components/motion.js');
    window.motionResult = 'pending';
    startMotion(document.querySelector('main'), [{ opacity: 1 }, { opacity: 0 }], motionTiming('duration-deliberate')).finished
      .then(() => { window.motionResult = 'settled'; });
  }, basePath);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => page.evaluate(() => window.motionResult)).toBe('settled');
  expect(await page.locator('main').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
  await page.locator('[data-rv-carousel-caption]:visible a').click();
  await expect(page).toHaveURL(new RegExp(basePath + 'portfolio/'));
});

test('Unsupported animation and visibility APIs leave native navigation, sheets and steps usable @smoke @a11y', async ({ page }) => {
  await page.addInitScript(() => {
    window.Element.prototype.animate = undefined;
    window.Element.prototype.getAnimations = undefined;
    window.IntersectionObserver = undefined;
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('.rv-home-steps h3')).toHaveCount(3);
  await page.evaluate(async prefix => {
    const { motionTiming, startMotion } = await import(prefix + 'js/components/motion.js');
    await startMotion(document.querySelector('main'), [{ opacity: 1 }, { opacity: 0 }], motionTiming()).finished;
  }, basePath);
  await page.locator('[data-rv-carousel-caption]:visible a').click();
  await expect(page).toHaveURL(new RegExp(basePath + 'portfolio/'));
  const opener = page.getByRole('button', { name: 'فید کوتاه کلاسیک', exact: true });
  await opener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(errors).toEqual([]);
});

test('Loading feedback uses transform-only shimmer and becomes static with reduced motion @visual', async ({ page }) => {
  await page.goto('portfolio/?state=loading');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const skeleton = page.locator('.rv-portfolio-skeleton span').first();
  const motion = await skeleton.evaluate(element => ({
    duration: getComputedStyle(element, '::after').animationDuration,
    properties: element.getAnimations({ subtree: true }).flatMap(animation =>
      animation.effect.getKeyframes().flatMap(frame => Object.keys(frame)))
  }));
  expect(motion.duration).toBe('1.4s');
  expect(motion.properties).toContain('transform');
  expect(motion.properties).not.toContain('backgroundPosition');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await skeleton.evaluate(element => getComputedStyle(element, '::after').animationName)).toBe('none');
  await expect(skeleton).toBeVisible();
});
