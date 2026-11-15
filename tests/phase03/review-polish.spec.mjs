import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

const ready = page => expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');

test('Mobile rail reserves shadow space and dots stay above the navigation at document end @visual', async ({ page }) => {
  for (const width of [320, 390, 568, 768, 1023]) {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const id of ['bk-01', 'bk-02']) {
      await page.goto('_preview/context/' + id + '/');
      await ready(page);
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      const rail = page.locator('[data-rv-choices-list]');
      expect(await rail.evaluate(el => parseFloat(getComputedStyle(el).paddingBottom))).toBeGreaterThanOrEqual(64);
      const dots = await page.locator('[data-rv-choice-dots]').boundingBox();
      const nav = await page.locator('.rv-booking--dock > .rv-booking__main').evaluate(el => {
        const navigation = document.querySelector('.rv-role-nav');
        return navigation?.getBoundingClientRect().top ?? el.getBoundingClientRect().bottom;
      });
      expect(dots.y + dots.height).toBeLessThan(nav);
    }
  }
});

test('Progress shine moves right to left and is fully clipped at both loop endpoints @visual', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('_preview/context/bk-02/');
  await ready(page);
  const shine = page.locator('.rv-booking-progress__shine');
  const positions = await shine.evaluate(el => {
    const light = el.firstElementChild;
    const animation = light.getAnimations()[0]; animation.pause();
    const duration = animation.effect.getTiming().duration;
    const frame = fraction => {
      animation.currentTime = duration * fraction;
      const box = light.getBoundingClientRect(); return { x: box.x, right: box.right };
    };
    const clip = el.getBoundingClientRect();
    return { start: frame(0), middle: frame(.5), end: frame(.99999), clip: { x: clip.x, right: clip.right } };
  });
  expect(positions.start.x).toBeGreaterThanOrEqual(positions.clip.right - 1);
  expect(positions.middle.x).toBeLessThan(positions.start.x);
  expect(positions.end.right).toBeLessThanOrEqual(positions.clip.x + 1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(shine).toBeHidden();
});

test('Long payment label and amount wrap as right-aligned label then left-aligned amount @visual', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('_preview/context/bk-f02/?state=full-credit');
  await ready(page);
  const label = page.locator('[data-rv-payment-label]');
  const amount = page.locator('[data-rv-action-title]');
  await label.evaluate(el => { el.textContent = 'از اعتبار موجودی حساب شما کم می‌شود'; });
  await amount.evaluate(el => { el.textContent = '۱۲۳٬۴۵۶٬۷۸۹ تومان'; });
  const [a, b, container] = await Promise.all([label.boundingBox(), amount.boundingBox(), label.locator('..').boundingBox()]);
  expect(b.y).toBeGreaterThanOrEqual(a.y + a.height);
  expect(Math.abs(a.x + a.width - container.x - container.width)).toBeLessThan(1);
  expect(Math.abs(b.x - container.x)).toBeLessThan(1);
  await expect(amount).toHaveCSS('white-space', 'nowrap');
});

test('Mobile payment keeps its original stacked summary and returned badge does not cover the icon shadow @visual', async ({ page }) => {
  await fs.mkdir('tests/screens/review-polish', { recursive: true });
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('_preview/context/bk-f02/'); await ready(page);
    const label = page.locator('[data-rv-payment-label]');
    const amount = page.locator('[data-rv-action-title]');
    await expect(label.locator('..')).toHaveCSS('display', 'block');
    await expect(amount).not.toHaveCSS('text-align', 'left');
    const [a, b] = await Promise.all([label.boundingBox(), amount.boundingBox()]);
    expect(b.y).toBeGreaterThanOrEqual(a.y + a.height);
    await page.screenshot({ path: 'tests/screens/review-polish/payment-mobile-' + width + '.png', fullPage: true });
  }
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('_preview/context/pay-res/?state=returned'); await ready(page);
    const intro = page.locator('[data-rv-result-view="returned"] .rv-state-page__intro');
    await expect(intro.locator('.rv-state-page__badge')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(intro).toHaveCSS('overflow', 'visible');
    await page.screenshot({ path: 'tests/screens/review-polish/returned-shadow-' + width + '.png', fullPage: true });
  }
});

test('Package corners, recurring photo and mobile calendar selection use their explicit states @visual @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('_preview/context/bk-r01/');
  await ready(page);
  const image = page.locator('.rv-booking-package .rv-booking-choice > img').first();
  const radius = await image.evaluate(el => ({ image: getComputedStyle(el).borderRadius,
    caption: getComputedStyle(el.parentElement.querySelector('.rv-booking-choice__caption')).borderRadius }));
  expect(radius.image).toBe(radius.caption);
  await page.goto('_preview/context/bk-rec01/');
  await ready(page);
  await expect(page.locator('[data-rv-rec-photo]').first()).toHaveCSS('mask-image', /65%/);
  const photoRatio = await page.locator('[data-rv-rec-photo]').first().evaluate(el =>
    el.getBoundingClientRect().width / el.parentElement.clientWidth);
  expect(photoRatio).toBeCloseTo(.42, 2);
  await page.goto('_preview/context/bk-rec01/?state=new');
  await ready(page);
  const sheet = page.locator('#rv-rec-sheet');
  await sheet.locator('input[name="rec-service"][value="face-hair"]').check();
  await sheet.locator('input[name="rec-stylist"][value="amir"]').check();
  const days = sheet.locator('[data-rv-month-grid] input:enabled');
  await days.first().check();
  await days.nth(1).check();
  await expect(sheet.locator('[data-rv-month-grid] input:checked')).toHaveCount(1);
  await expect(days.first()).not.toBeChecked();
  const selected = sheet.locator('[data-rv-month-grid] input:checked + span');
  expect(await selected.evaluate(el => getComputedStyle(el).backgroundColor === getComputedStyle(el).color)).toBe(false);
  await expect(selected).toHaveCSS('outline-style', 'none');
  await expect(selected).toHaveCSS('border-radius', '999px');
});

test('Desktop state headers are centered and payment review states have one directory owner @smoke @visual', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const id of ['state-04', 'state-05']) {
    await page.goto('_preview/context/' + id + '/'); await ready(page);
    if (id === 'state-05') { await expect(page).toHaveURL(/pay-res\/\?state=checking/); await ready(page); }
    const box = await page.locator('.rv-booking__top h1').boundingBox();
    const content = await page.locator('.rv-booking__main').boundingBox();
    expect(Math.abs(box.x + box.width / 2 - content.x - content.width / 2)).toBeLessThan(1);
  }
  await page.goto('_preview/'); await ready(page);
  for (const id of ['STATE-05', 'STATE-06', 'STATE-07']) await expect(page.locator('[data-rv-page-id="' + id + '"]')).toHaveCount(0);
  const pay = page.locator('[data-rv-review-id="PAY-RES"]');
  await pay.locator('summary').click();
  for (const state of ['checking', 'review']) await expect(pay.locator('a[href$="?state=' + state + '"]')).toHaveCount(0);
  for (const state of ['returned', 'sms']) await expect(pay.locator('a[href$="?state=' + state + '"]')).toHaveCount(1);
  for (const state of ['returned', 'sms']) {
    await page.goto('_preview/context/pay-res/?state=' + state); await ready(page);
    await expect(page.locator('[data-rv-result-view="' + state + '"]')).toBeVisible();
  }
});

test('Polished booking states have review captures @visual', async ({ page }) => {
  await fs.mkdir('tests/screens/review-polish', { recursive: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const id of ['bk-01', 'bk-02', 'bk-r01', 'bk-rec01', 'state-04', 'state-05']) {
      await page.goto('_preview/context/' + id + '/'); await ready(page);
      await page.screenshot({ path: 'tests/screens/review-polish/' + id + '-' + width + '.png', fullPage: true });
    }
  }
});
