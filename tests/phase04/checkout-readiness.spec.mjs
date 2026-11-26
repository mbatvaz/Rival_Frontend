import { test, expect } from '@playwright/test';

for (const width of [390, 768, 1280]) {
  test(`Checkout first paint and avatar geometry at ${width}px @smoke`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      const animate = window.Element.prototype.animate;
      window.checkoutFirstFrames = [];
      window.checkoutEffects = [];
      window.Element.prototype.animate = function (frames, timing) {
        if (this.matches('[data-rv-ticket-avatar], [data-rv-ticket-image]') || this.closest('.rv-booking-action')) {
          window.checkoutFirstFrames.push({ target: this, hidden: getComputedStyle(this).visibility === 'hidden', frames });
        }
        const effect = animate.call(this, frames, timing);
        window.queueMicrotask(() => {
          if (effect.id === 'rv-list-entry') {
            effect.pause();
            window.checkoutEffects.push(effect);
          }
        });
        return effect;
      };
    });
    let releaseCatalog, releaseAvatar;
    const catalog = new Promise(resolve => { releaseCatalog = resolve; });
    const avatarSource = new Promise(resolve => { releaseAvatar = resolve; });
    await page.route('**/mock-data/booking/catalog.json', async route => { await catalog; await route.continue(); });
    await page.route('**/img/public/amir.png', async route => {
      await avatarSource;
      if (width === 768) await route.abort();
      else await route.continue();
    });
    try {
      await page.goto('_preview/context/bk-f02/?stylist=amir', { waitUntil: 'domcontentloaded' });
      const action = page.locator('.rv-booking-action');
      const avatar = page.locator('[data-rv-ticket-avatar]');
      await expect(action).toHaveCSS('visibility', 'hidden');
      releaseCatalog();
      await expect(avatar).toHaveAttribute('src', /amir\.png$/);
      await expect(action).toHaveCSS('visibility', 'hidden');
      await expect(avatar).toHaveCSS('visibility', 'hidden');
      releaseAvatar();
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      const entries = await page.evaluate(() => window.checkoutFirstFrames.map(({ target, hidden, frames }) => ({
        avatar: target.hasAttribute('data-rv-ticket-avatar'), cover: target.hasAttribute('data-rv-ticket-image'), hidden, frames
      })));
      expect(entries.some(entry => !entry.avatar)).toBe(true);
      expect(entries.some(entry => entry.cover)).toBe(false);
      const cover = page.locator('[data-rv-ticket-image]');
      const radius = await cover.evaluate(el => getComputedStyle(el).borderStartStartRadius);
      expect(parseFloat(radius)).toBeGreaterThan(0);
      if (width < 1024) {
        await expect(page.locator('.rv-checkout-breakdown')).toHaveCSS('border-start-start-radius', radius);
        const edges = await cover.evaluate(el => {
          const box = el.getBoundingClientRect();
          const card = el.closest('.rv-checkout-breakdown').getBoundingClientRect();
          return [box.top - card.top, box.left - card.left, card.right - box.right];
        });
        expect(edges).toEqual([0, 0, 0]);
      }
      expect(entries.every(entry => entry.hidden)).toBe(true);
      const bounds = () => avatar.boundingBox();
      const surface = page.locator('.rv-booking-hold');
      const paint = () => surface.evaluate(el => {
        const { backgroundImage, backgroundColor, boxShadow } = getComputedStyle(el);
        return { backgroundImage, backgroundColor, boxShadow };
      });
      const sample = time => page.evaluate(async instant => {
        const effects = window.checkoutEffects;
        await Promise.all(effects.map(animation => animation.ready));
        for (const effect of effects) { effect.pause(); effect.currentTime = instant; }
      }, time);
      await sample(0);
      const firstPaint = await paint();
      const firstPosition = await bounds();
      await sample(310);
      expect(await paint()).toEqual(firstPaint);
      if (width === 390) await page.screenshot({ path: info.outputPath('checkout-during-entry.png') });
      await sample(2000);
      expect(await paint()).toEqual(firstPaint);
      if (width === 390) await page.screenshot({ path: info.outputPath('checkout-after-entry.png') });
      const lastPosition = await bounds();
      expect(firstPosition.x).toBeCloseTo(lastPosition.x, 1);
      expect(firstPosition.y).toBeCloseTo(lastPosition.y, 1);
      if (width === 768) {
        await expect(avatar).toHaveAttribute('data-rv-media-failed');
        expect(entries.some(entry => entry.avatar)).toBe(false);
        await expect(avatar).toHaveCSS('opacity', '0');
      } else {
        const fades = entries.filter(entry => entry.avatar);
        expect(fades).toHaveLength(1);
        expect(fades[0].frames.opacity).toEqual([0, 1]);
      }
      await expect(page.locator('.rv-checkout-breakdown')).toHaveCSS('overflow', 'visible');
    } finally { releaseCatalog(); releaseAvatar(); }
  });
}

test.use({ hasTouch: true });

test('Touch focus leaves portfolio card unoutlined and keyboard restores the focus ring @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('portfolio/');
  const card = page.locator('.rv-portfolio-card').first();
  const opener = card.locator('button');
  await opener.tap();
  await page.locator('.rv-viewer:visible [data-rv-sheet-close]').first().tap();
  await expect(opener).toBeFocused();
  await expect(card).toHaveCSS('outline-style', 'none');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect(opener).toBeFocused();
  await expect(card).toHaveCSS('outline-style', 'solid');
});

test('Payment result keeps the loading frame until the selected state is ready @smoke', async ({ page }) => {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route('**/mock-data/booking/catalog.json', async route => { await gate; await route.continue(); });
  try {
    await page.goto('_preview/context/pay-res/?state=success', { waitUntil: 'domcontentloaded' });
    const result = page.locator('[data-rv-result-view="success"]');
    await expect(page.locator('html')).toHaveAttribute('data-rv-loading', 'pending');
    await expect(result).toBeHidden();
    release();
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    await expect(result).toBeVisible();
    await expect(page.locator('[data-rv-result-view]:visible')).toHaveCount(1);
  } finally { release(); }
});
