import fs from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'stylist/';
const screenshotDir = 'tests/screens/phase05';
const finishedTab = page => page.getByRole('tab', { name: /^پایان‌یافته/ });
const dialog = page => page.getByRole('dialog', { name: 'ثبت عدم حضور' });

async function open(page, state = '') {
  await page.goto(route + (state ? '?state=' + state : ''));
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}

async function capture(page, name) {
  await fs.mkdir(screenshotDir, { recursive: true });
  await page.screenshot({ path: screenshotDir + '/' + name + '.png', fullPage: true, animations: 'disabled' });
}

test('STY-01 dashboard follows the role navigation breakpoint and has no page overflow @smoke', async ({ page }) => {
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page);
  const dock = page.getByRole('navigation', { name: 'ناوبری اصلی آرایشگر' });
  const sidebar = page.getByRole('navigation', { name: 'منوی آرایشگر' });
  for (const width of [320, 375, 390, 767, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const nav = width >= 768 ? sidebar : dock;
    await expect(nav.getByRole('link', { name: 'داشبورد' })).toHaveAttribute('aria-current', 'page');
    await expect(width >= 768 ? dock : sidebar).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const thumbnail = await page.locator('.rv-stylist-request img').first().boundingBox();
    expect(thumbnail.height).toBeCloseTo(124, 0);
    if ([390, 768, 1280].includes(width)) {
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await capture(page, 'sty-01-default-' + width);
    }
  }
  expect(failures).toEqual([]);
  await page.setViewportSize({ width: 390, height: 900 });
  await dock.getByRole('button', { name: 'بیشتر' }).click();
  await expect(page.getByRole('dialog', { name: 'بیشتر' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dock.getByRole('button', { name: 'بیشتر' })).toBeFocused();
});

test('STY-01 no-show is confirmed by keyboard, stored locally and applied to the day gauge @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await open(page);
  await page.getByRole('tab', { name: /^پیش رو/ }).focus();
  await page.keyboard.press('ArrowLeft');
  await expect(finishedTab(page)).toBeFocused();
  await expect(finishedTab(page)).toHaveAttribute('aria-selected', 'true');
  const appointment = page.getByRole('button', { name: 'ثبت عدم حضور برای عرفان رحیمی' });
  await appointment.focus();
  await page.keyboard.press('Enter');
  await expect(dialog(page)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(appointment).toBeFocused();
  await appointment.click();
  await dialog(page).getByRole('button', { name: 'ثبت عدم حضور', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('عدم حضور ثبت شد');
  await expect(appointment).toBeHidden();
  await expect(page.getByRole('img', { name: /۱ عدم حضور/ })).toBeVisible();
  await open(page, 'completed');
  await expect(appointment).toBeHidden();
  await expect(page.getByLabel(/۱ عدم حضور/)).toBeVisible();
});

test('STY-01 review variants render separately and account inactivity locks booking @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const state of ['completed', 'empty', 'inactive', 'no-show', 'no-show-saved']) {
    await open(page, state);
    if (state === 'empty') {
      await expect(page.getByRole('heading', { name: 'امروز نوبتی ندارید' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'برنامه امروز' })).toBeHidden();
    }
    if (state === 'inactive') {
      await expect(page.getByRole('heading', { name: 'حساب کاری شما غیرفعال است' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'منتظر پاسخ شما' })).toBeHidden();
      await expect(page.getByRole('link', { name: /رزرو دستی/ })).toHaveCount(0);
    }
    if (state === 'no-show') {
      await expect(dialog(page)).toBeVisible();
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    }
    if (state === 'no-show-saved') await expect(page.getByRole('status')).toHaveText('عدم حضور ثبت شد');
    await capture(page, 'sty-01-' + state + '-390');
  }
});
