import { test, expect } from '@playwright/test';

test('Desktop drag settles gradually on the nearest centered portrait @visual', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.goto('portfolio/?state=viewer');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const rail = page.locator('.rv-viewer:not([hidden]) .rv-viewer__rail');
  await rail.evaluate(async element => {
    await document.fonts.ready;
    await Promise.all(element.closest('.rv-viewer').getAnimations().map(animation => animation.finished));
  });
  const box = await rail.boundingBox();
  await page.mouse.move(box.x + 80, box.y + 100);
  await page.mouse.down();
  await page.mouse.move(box.x + 300, box.y + 100, { steps: 8 });
  await page.mouse.up();
  const positions = await rail.evaluate(async element => {
    const values = [];
    for (let index = 0; index < 8; index++) {
      await new Promise(resolve => window.requestAnimationFrame(resolve));
      values.push(element.firstElementChild.getBoundingClientRect().left);
    }
    return values;
  });
  expect(new Set(positions.map(value => Math.round(value))).size).toBeGreaterThan(2);
  await expect.poll(() => rail.evaluate(element => {
    const frame = element.getBoundingClientRect();
    return Math.min(...[...element.querySelectorAll('figure')].map(figure => {
      const box = figure.getBoundingClientRect();
      return Math.abs(box.left + box.width / 2 - frame.left - frame.width / 2);
    }));
  })).toBeLessThan(2);
});

test('Portfolio photos open in PhotoSwipe and restore focus through both dialogs @a11y @smoke', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('portfolio/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const card = page.locator('[data-rv-sheet-open="work-1"]');
  await card.click();
  const sheet = page.locator('#work-1');
  const rail = sheet.locator('.rv-viewer__rail');
  await rail.focus();
  await page.keyboard.press('ArrowLeft');
  const selected = rail.locator('figure').nth(1);
  await expect(selected).toHaveAttribute('data-rv-active', 'true');
  await expect(selected).toHaveCSS('opacity', '1');
  await expect(rail.locator('figure').first()).toHaveCSS('opacity', '0.8');
  const image = selected.getByRole('link');
  await image.focus();
  await page.keyboard.press('Enter');
  const lightbox = page.getByRole('dialog', { name: 'نمایش بزرگ تصاویر نمونه‌کار' });
  await expect(lightbox).toBeVisible();
  await expect(lightbox.locator('.pswp__counter')).toHaveText('2 / 3');
  await expect(page.locator('[data-rv-sheet-layer]')).toHaveJSProperty('inert', true);
  await expect(lightbox.getByRole('button', { name: 'بستن نمایش بزرگ' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(lightbox.locator(':focus')).toHaveCount(1);
  await lightbox.getByRole('button', { name: 'بزرگ‌نمایی' }).click();
  await expect(lightbox).toHaveClass(/pswp--zoomed-in/);
  await page.keyboard.press('Escape');
  await expect(lightbox).toHaveCount(0);
  await expect(image).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(sheet).toBeHidden();
  await expect(card).toBeFocused();
});
