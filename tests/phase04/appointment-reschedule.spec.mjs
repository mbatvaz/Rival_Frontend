import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'customer/appointments/demo/';
const gotoState = async (page, state = '') => {
  await page.goto(route + (state ? '?state=' + state : ''));
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
};
const title = page => page.getByRole('heading', { name: 'جابه‌جایی نوبت', exact: true });
const dialog = page => page.getByRole('dialog', { name: 'تأیید جابه‌جایی' });
const start = page => page.getByRole('button', { name: 'جابه‌جایی', exact: true });
const proceed = page => page.getByRole('button', { name: 'ادامه', exact: true });
const variants = [
  ['lt24', /جابه‌جایی در این بازه، حق بازگشت هزینه را از بین می‌برد/],
  ['rsc-select', /روز و ساعت تازه/],
  ['rsc-confirm', /هزینه تازه‌ای ندارد/],
  ['rsc-warn', /امکان بازگشت هزینه این نوبت برای همیشه/],
  ['rsc-comp', /سهم جابه‌جایی خودتان مصرف نمی‌شود/],
  ['rsc-done', /لغو تا جمعه ۲۴ مهر، ۱۱:۰۰/],
  ['rsc-done-lt24', /لغو از این پس بدون بازگشت هزینه است/],
  ['rsc-used', /لغو: ۱۲۰٬۰۰۰ تومان/],
  ['rsc-used-nr', /حق بازگشت با جابه‌جایی قبلی از بین رفته/]
];

for (const width of [320, 390, 768, 1023, 1024, 1280]) {
  test(`CUS-04-RSC preview variants at ${width}px @visual @a11y`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: width === 1280 ? 'no-preference' : 'reduce' });
    const failures = [];
    page.on('pageerror', error => failures.push(error.message));
    page.on('console', message => { if (message.type() === 'error') failures.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) failures.push(response.url()); });
    const capture = [390, 768, 1280].includes(width);
    const mode = baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
    await page.goto('_preview/');
    for (const [state] of variants) {
      await expect(page.locator(`a[href$="?state=${state}"]`).first()).toBeAttached();
    }
    for (const [state, evidence] of capture ? variants : variants.slice(1, 4)) {
      await gotoState(page, state);
      await expect(page.getByText(evidence).first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      const controls = await page.locator('[data-rv-rsc-picker], #rv-reschedule-confirm').locator('button, input, a')
        .evaluateAll(elements => elements.filter(element => element.getClientRects().length).map(element => {
          const { width, height } = element.getBoundingClientRect();
          return Math.min(width, height);
        }));
      expect(controls.every(size => size >= 44)).toBe(true);
      if (capture) {
        await page.evaluate(() => Promise.allSettled(document.getAnimations()
          .filter(animation => Number.isFinite(animation.effect.getComputedTiming().endTime))
          .map(animation => animation.finished)));
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        expect(axe.violations).toEqual([]);
        await page.screenshot({ path: `tests/screens/phase04-reschedule/${mode}/${state}-${width}.png`, fullPage: true });
      }
    }
    expect(failures).toEqual([]);
  });
}

test('CUS-04-RSC changes the day and time, keeps confirmation keyboard-accessible and saves the result @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoState(page);
  await start(page).click();
  await expect(title(page)).toBeVisible();
  await expect(page.locator('[data-rv-customer-dock]')).toBeHidden();
  await expect(page.getByRole('radio', { name: '۱۷:۳۰' })).toBeDisabled();
  await expect(page.getByRole('radio', { name: '۱۸:۰۰' })).toBeDisabled();
  await page.getByRole('link', { name: 'مشاهده نوبت' }).click();
  await expect(page.getByRole('heading', { name: 'فیشیال', exact: true })).toBeVisible();
  await page.goBack();
  await expect(proceed(page)).toBeEnabled();
  await page.getByRole('button', { name: /جمعه/ }).first().click();
  await expect(proceed(page)).toBeDisabled();
  await expect(page.getByText(/سالن در این روز تعطیل است/)).toBeVisible();
  await page.getByRole('button', { name: /یکشنبه/ }).first().click();
  const slot = page.getByRole('radio', { name: '۰۹:۳۰' });
  await slot.focus();
  await page.keyboard.press('Space');
  await expect(slot).toBeChecked();
  await proceed(page).focus();
  await page.keyboard.press('Enter');
  await expect(dialog(page)).toBeVisible();
  await expect(dialog(page).getByText(/یکشنبه ۲۶ مهر، ۰۹:۳۰/)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(proceed(page)).toBeFocused();
  await page.keyboard.press('Enter');
  await dialog(page).getByRole('button', { name: 'تأیید جابه‌جایی' }).click();
  await expect(page.getByRole('heading', { name: 'نوبت جابه‌جا شد' })).toBeVisible();
  await expect(page.getByText('لغو تا شنبه ۲۵ مهر، ۰۹:۳۰ با بازگشت کامل هزینه است.')).toBeVisible();
  await page.getByRole('link', { name: 'مشاهده نوبت' }).click();
  await expect(start(page)).toBeDisabled();
  await expect(page.getByText(/این نوبت یک بار جابه‌جا شده است/)).toBeVisible();
  await page.getByRole('link', { name: 'بازگشت به نوبت‌ها' }).click();
  await expect(page.getByRole('link', { name: /جزئیات نوبت یکشنبه ۲۶ مهر، ساعت ۰۹:۳۰/ })).toBeVisible();
  await page.goto('customer/');
  await expect(page.getByRole('listitem', { name: /یکشنبه ۲۶ مهر ساعت ۰۹:۳۰/ })).toBeVisible();
});

test('CUS-04-RSC late reschedule keeps forfeiture after reload @smoke', async ({ page }) => {
  await gotoState(page, 'lt24');
  await start(page).click();
  await expect(page.getByText(/در این بازه، جابه‌جایی حق بازگشت هزینه را از بین می‌برد/)).toBeVisible();
  await proceed(page).click();
  await dialog(page).getByRole('button', { name: 'جابه‌جا می‌کنم' }).click();
  await expect(page.getByText(/لغو از این پس بدون بازگشت هزینه است/)).toBeVisible();
  await page.getByRole('link', { name: 'مشاهده نوبت' }).click();
  await page.reload();
  await expect(page.getByText(/حق بازگشت با جابه‌جایی قبلی از بین رفته/)).toBeVisible();
  await expect(start(page)).toBeDisabled();
  await page.getByRole('button', { name: 'لغو نوبت' }).click();
  await expect(page.getByRole('dialog').getByText('با لغو این نوبت مبلغی برنمی‌گردد.')).toBeVisible();
  await gotoState(page, 'rsc-warn');
  await expect(dialog(page)).toBeVisible();
});

test('CUS-04-RSC compensation can be used once without consuming the ordinary allowance @smoke', async ({ page }) => {
  await gotoState(page, 'rsc-comp');
  await proceed(page).click();
  await expect(dialog(page).getByText(/حق جبرانی مصرف می‌شود/)).toBeVisible();
  await dialog(page).getByRole('button', { name: 'تأیید جابه‌جایی' }).click();
  await page.getByRole('link', { name: 'مشاهده نوبت' }).click();
  await expect(start(page)).toBeEnabled();
  await start(page).click();
  await expect(proceed(page)).toBeDisabled();
  await expect(page.getByRole('radio', { name: '۱۰:۳۰' })).toHaveCount(0);
  await gotoState(page, 'comp');
  await expect(start(page)).toBeDisabled();
});

test('CUS-04-RSC opens the active compensation from its existing home record @smoke', async ({ page }) => {
  await page.goto('customer/');
  await page.locator('[data-rv-appointment="BK-48390"]').getByRole('link', { name: 'جابه‌جایی' }).click();
  await expect(title(page)).toBeVisible();
  await expect(page.locator('[data-rv-rsc-current]')).toHaveText('سه‌شنبه ۲۸ مهر، ۱۵:۳۰');
  await expect(page.getByText(/با حق جبرانی، سهم جابه‌جایی خودتان مصرف نمی‌شود/)).toBeVisible();
  await page.getByRole('link', { name: 'بازگشت به جزئیات نوبت' }).click();
  await expect(page.getByRole('button', { name: 'جابه‌جایی جبرانی' })).toBeEnabled();
});

test('CUS-04-RSC mobile day rail selects the centered day on scroll @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await gotoState(page, 'rsc-select');
  const rail = page.locator('[data-rv-days]');
  const centered = async () => rail.evaluate(element => {
    const frame = element.getBoundingClientRect();
    const active = element.querySelector('[aria-pressed="true"]').getBoundingClientRect();
    return Math.abs((frame.left + frame.right - active.left - active.right) / 2);
  });
  await expect.poll(centered).toBeLessThan(2);
  await rail.locator('[data-rv-day="2026-10-18"]').click();
  await expect(rail.locator('[data-rv-day="2026-10-18"]')).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(centered).toBeLessThan(2);
  await rail.evaluate(element => element.scrollBy({ left: -52, behavior: 'instant' }));
  await expect(rail.locator('[data-rv-day="2026-10-19"]')).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(centered).toBeLessThan(3);
});

test('CUS-04-RSC desktop calendar shares the selection with the mobile date strip @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 893 });
  await gotoState(page, 'rsc-select');
  const calendar = page.getByRole('radiogroup', { name: 'روزهای ماه' });
  await expect(calendar).toBeVisible();
  await expect(page.getByText('نزدیک‌ترین زمان', { exact: true })).toHaveCount(0);
  expect(await page.locator('[data-rv-rsc-times]').evaluate(grid =>
    getComputedStyle(grid).gridTemplateColumns.split(' ').length)).toBe(4);
  await calendar.getByRole('radio', { name: /یکشنبه.*۲۶/ }).check();
  await page.getByRole('radio', { name: '۰۹:۳۰' }).check();
  await page.setViewportSize({ width: 624, height: 893 });
  await expect(calendar).toBeHidden();
  await expect(page.getByRole('button', { name: /یکشنبه.*۲۶/ })).toHaveAttribute('aria-pressed', 'true');
  await proceed(page).click();
  const sheet = dialog(page);
  await expect(sheet).toBeVisible();
  await sheet.evaluate(element => Promise.allSettled(element.getAnimations().map(animation => animation.finished)));
  const gap = await sheet.locator('.rv-reschedule-sheet__facts').evaluate(facts =>
    facts.getBoundingClientRect().top - facts.previousElementSibling.previousElementSibling.getBoundingClientRect().bottom);
  expect(gap).toBeGreaterThanOrEqual(16);
  await expect(sheet.locator('.rv-reschedule-sheet__facts')).toHaveCSS('font-weight', '300');
  await expect(page.locator('[data-rv-rsc-picker] .rv-booking-context')).toHaveCSS('visibility', 'hidden');
  await gotoState(page, 'rsc-warn');
  const warning = dialog(page).locator('[data-rv-rsc-danger]');
  await expect(warning).toBeVisible();
  await dialog(page).evaluate(element => Promise.allSettled(element.getAnimations().map(animation => animation.finished)));
  expect(await warning.evaluate(element => element.getBoundingClientRect().top
    - element.previousElementSibling.getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(16);
  await gotoState(page, 'rsc-used-nr');
  await expect(page.locator('.rv-appointment-detail__timeline > li').first())
    .toHaveCSS('border-image-source', /rgba\(0, 0, 0, 0\) 15px, rgb/);
});
