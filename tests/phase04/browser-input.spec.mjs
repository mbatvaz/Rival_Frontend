import { test, expect } from '@playwright/test';

test('WebOTP fills the current SMS step and aborts on manual entry @smoke', async ({ page }) => {
  await page.addInitScript(() => {
    window.OTPCredential = function () {};
    window.sms = [];
    Object.defineProperty(window.navigator.credentials, 'get', { value: ({ otp, signal }) => new Promise(resolve => {
      window.sms.push({ otp, signal, resolve });
    }) });
  });
  await page.goto('login/?state=otp');
  await expect.poll(() => page.evaluate(() => window.sms.length)).toBe(1);
  await expect.poll(() => page.evaluate(() => window.sms[0].otp.transport)).toEqual(['sms']);
  await page.locator('[data-rv-code]').pressSequentially('1');
  expect(await page.evaluate(() => window.sms[0].signal.aborted)).toBe(true);
  await page.evaluate(() => window.sms[0].resolve({ code: '12345' }));
  await expect(page.locator('[data-rv-code]')).toHaveValue('۱');
  await page.reload();
  await expect.poll(() => page.evaluate(() => window.sms.length)).toBe(1);
  await page.evaluate(() => window.sms[0].resolve({ code: '12345' }));
  await expect(page).toHaveURL(/\/customer\/$/);
});

test('Touch gestures only dismiss More and sheets from portfolio through recurring booking @smoke', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(new URL('customer/appointments/', baseURL).href);
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const session = await context.newCDPSession(page);
    async function swipe(target, dx, dy, { x: offsetX = 0, y: offsetY = 0 } = {}) {
      const box = await target.boundingBox({ timeout: 3000 });
      expect(box).not.toBeNull();
      const x = box.x + box.width / 2 + offsetX;
      const y = box.y + box.height / 2 + offsetY;
      await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (const ratio of [0.25, 0.5, 0.75, 1]) {
        await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * ratio, y: y + dy * ratio }] });
      }
      await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    }
    const more = page.locator('#rv-more');
    const moreButton = page.locator('.rv-customer-dock__tabs button[data-rv-sheet-open="rv-more"]');
    await moreButton.tap();
    await expect(more).toBeVisible();
    await expect.poll(() => more.evaluate(el => el.getAnimations().length)).toBe(0);
    await swipe(more.locator('.rv-more-list'), -110, 0);
    await expect(more).toBeHidden();
    await swipe(moreButton, 80, 0);
    await expect(more).toBeHidden();
    const filterButton = page.locator('[data-rv-appointments-filter]');
    await swipe(filterButton, 0, -80);
    await expect(page.locator('#rv-appointments-filter')).toBeHidden();

    for (const [route, trigger, panelId] of [
      ['customer/appointments/', '[data-rv-appointments-filter]', '#rv-appointments-filter'],
      ['portfolio/', '.rv-portfolio-card__open', '.rv-viewer'],
      ['customer/requests/', '[data-rv-sheet-open="rv-request-filter"]', '#rv-request-filter'],
      ['_preview/context/bk-f01/', '[data-rv-sheet-open="rv-booking-alert"]', '#rv-booking-alert'],
      ['_preview/context/bk-rec01/', '[data-rv-rec-add]', '#rv-rec-sheet']
    ]) {
      await page.goto(new URL(route, baseURL).href);
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      const opener = page.locator(trigger).first();
      await opener.tap();
      const panel = page.locator(panelId).first();
      await expect(panel).toBeVisible();
      await expect.poll(() => panel.evaluate(el => el.getAnimations().length)).toBe(0);
      const grip = panel.locator('[data-rv-sheet-grip]');
      await expect(grip).toHaveCount(1);
      if (panelId === '#rv-rec-sheet') {
        await swipe(grip, 0, 16);
        await expect(panel).toBeVisible();
        await expect.poll(() => panel.evaluate(el => el.getAnimations().length)).toBe(0);
      }
      if (panelId === '#rv-appointments-filter') {
        const zone = panel.locator('[data-rv-sheet-drag-zone]');
        const box = await zone.boundingBox();
        await swipe(zone, 0, 56, { y: -box.height / 3 - 4 });
        await expect(panel).toBeHidden();
        await expect(opener).toBeFocused();
        continue;
      }
      const recurring = panelId === '#rv-rec-sheet';
      const edge = recurring ? { y: 16 } : { x: 36 };
      expect(await grip.evaluate((el, { x = 0, y = 0 }) => {
        const rect = el.getBoundingClientRect();
        const hit = document.elementFromPoint(rect.x + rect.width / 2 + x, rect.y + rect.height / 2 + y);
        return hit === el || hit?.hasAttribute('data-rv-sheet-drag-zone');
      }, edge), panelId).toBe(true);
      await swipe(grip, 0, 100, edge);
      await expect(panel).toBeHidden();
      await expect(opener).toBeFocused();
    }
  } finally {
    await context.close();
  }
});
