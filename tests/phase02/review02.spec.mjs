import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const directory = 'tests/screens/phase02-review02/' + (basePath === '/' ? 'root' : 'subpath');
async function ready(page) {
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(document.getAnimations().filter(a => a.effect.getComputedTiming().iterations !== Infinity).map(a => a.finished));
  });
}
async function capture(page, name) {
  await fs.mkdir(directory, { recursive: true });
  await page.screenshot({ path: directory + '/' + name + '.png', fullPage: true });
}

for (const width of [1280, 1920]) {
  test('Desktop contact columns end together and navigation matches button corners at ' + width + ' @visual', async ({ page }) => {
    await page.setViewportSize({ width, height: 940 });
    await page.goto('');
    await ready(page);
    const layout = await page.evaluate(() => {
      const box = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
      const nav = getComputedStyle(document.querySelector('.rv-public-header__nav'));
      const button = getComputedStyle(document.querySelector('[data-rv-session-link]'));
      return {
        photoBottom: Math.max(...[...document.querySelectorAll('.rv-hall img')].map(el => el.getBoundingClientRect().bottom)),
        cta: box('.rv-home-visit .rv-booking-cta'), map: box('.rv-visit'),
        radius: nav.borderRadius, buttonRadius: button.borderRadius, background: nav.backgroundColor,
        border: nav.borderTopWidth, blur: nav.backdropFilter,
        image: box('.rv-hall img:nth-child(3)'),
        topRadius: getComputedStyle(document.querySelector('.rv-home-hero')).borderTopRightRadius,
        titleSize: Number.parseFloat(getComputedStyle(document.querySelector('.rv-home-hero h1')).fontSize)
      };
    });
    expect(Math.abs(layout.photoBottom - layout.cta.bottom), JSON.stringify(layout)).toBeLessThan(2);
    expect(layout.map.height).toBeLessThan(480);
    expect(layout.map.height).toBeGreaterThan(220);
    expect(layout.cta.height).toBeLessThan(240);
    expect(layout.radius).toBe(layout.buttonRadius);
    expect(layout.background).toContain('/ 0.78');
    expect(layout.border).toBe('0px');
    expect(layout.blur).toContain('blur(22px)');
    expect(layout.topRadius).toBe('0px');
    expect(layout.titleSize).toBe(width >= 1440 ? 54 : 36);
    expect(layout.image.width).toBe(264);
    expect(layout.image.height).toBe(180);
    await capture(page, 'PUB-01-balanced-' + width);
    await page.goto('portfolio/?state=error');
    await ready(page);
    const error = await page.locator('.rv-portfolio-error').boundingBox();
    const cta = await page.locator('[data-rv="portfolio"] > .rv-booking-cta').boundingBox();
    expect(error.width).toBeCloseTo(cta.width);
    expect(error.x).toBeCloseTo(cta.x);
    await capture(page, 'PUB-02-error-' + width);
  });
}

test('Desktop gallery is centered and supports vertical wheel and mouse drag @visual', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.goto('portfolio/?state=viewer');
  await ready(page);
  const dialog = page.getByRole('dialog');
  const rect = await dialog.boundingBox();
  expect(Math.abs(rect.y + rect.height / 2 - 470)).toBeLessThan(2);
  const rail = dialog.locator('.rv-viewer__rail');
  const frame = await rail.boundingBox();
  await page.mouse.move(frame.x + frame.width / 2, frame.y + frame.height / 2);
  await page.mouse.wheel(0, 160);
  await expect(rail.locator('figure').nth(1)).toHaveAttribute('data-rv-active', 'true');
  await rail.focus();
  await page.keyboard.press('Home');
  await expect(rail.locator('figure').first()).toHaveAttribute('data-rv-active', 'true');
  await page.mouse.move(frame.x + 80, frame.y + 140);
  await page.mouse.down();
  await page.mouse.move(frame.x + 340, frame.y + 140, { steps: 8 });
  await page.mouse.up();
  await expect(rail.locator('figure').first()).toHaveAttribute('data-rv-active', 'false');
  await capture(page, 'PUB-02-centered-drag');
});

test('Mobile gallery stays bottom attached and swipes between images @visual', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    const page = await context.newPage();
    await page.goto('portfolio/?state=viewer');
    await ready(page);
    const dialog = page.getByRole('dialog');
    await expect.poll(async () => {
      const rect = await dialog.boundingBox();
      return Math.abs(rect.y + rect.height - 844);
    }).toBeLessThan(2);
    const rail = dialog.locator('.rv-viewer__rail');
    const box = await rail.boundingBox();
    const session = await context.newCDPSession(page);
    const y = box.y + 150;
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + 40, y }] });
    for (const x of [90, 140, 190, 240, 290]) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: box.x + x, y }] });
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect(rail.locator('figure').first()).toHaveAttribute('data-rv-active', 'false');
    await capture(page, 'PUB-02-mobile-swipe');
  } finally { await context.close(); }
});

test('Rules navigation follows desktop document scrolling @visual', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 940 });
  await page.goto('booking-rules/');
  await ready(page);
  await page.evaluate(() => window.scrollTo(0, 1000));
  const nav = await page.locator('.rv-rules__toc').boundingBox();
  expect(nav.y).toBeCloseTo(24);
  await capture(page, 'PUB-03-sticky');
});

test('Password is a full login view with SMS navigation, history and portrait OTP cells @visual', async ({ page }) => {
  await page.goto('login/');
  await ready(page);
  await page.getByRole('button', { name: 'ورود با رمز عبور', exact: true }).click();
  await expect(page).toHaveURL(/method=password/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'ورود با رمز عبور' })).toBeVisible();
  await expect(page.getByLabel('رمز عبور', { exact: true })).toBeVisible();
  await page.reload();
  await ready(page);
  await capture(page, 'AUTH-01-password-page');
  await page.getByRole('button', { name: 'ورود با ارسال پیامک', exact: true }).click();
  await expect(page.locator('[data-rv-password-stage]')).toBeHidden();
  await page.goBack();
  await expect(page.locator('[data-rv-password-stage]')).toBeVisible();
  await page.goto('login/?state=otp');
  await ready(page);
  const cell = await page.locator('[data-rv-otp-cell]').first().boundingBox();
  expect(cell.height).toBeGreaterThan(cell.width);
  await expect(page.locator('[data-rv-code-timer]')).toHaveCount(0);
  const timer = await page.locator('.rv-auth-timer').boundingBox();
  const resend = await page.locator('[data-rv-resend]').boundingBox();
  expect(resend.x + resend.width / 2).toBeCloseTo(timer.x + timer.width / 2);
  await capture(page, 'AUTH-01-centered-resend');
});

test('An overflowing portfolio filter rail drags without activating a filter @visual', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('portfolio/');
  await ready(page);
  const rail = page.locator('.rv-chip-rail').first();
  const box = await rail.boundingBox();
  const url = page.url();
  await page.mouse.move(box.x + 40, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width - 20, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeLessThan(-20);
  await expect(page).toHaveURL(url);
});
