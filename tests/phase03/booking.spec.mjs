import { test, expect } from '@playwright/test';

const context = id => '_preview/context/' + id + '/';
const submit = page => page.locator('[data-rv-booking-submit]');
const ready = async page => {
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-booking-error]')).toBeHidden();
};
const go = async (page, path) => { await page.goto(path); await ready(page); };

test('Fixed booking carries service, stylist and time through one hold and an idempotent demo result @smoke', async ({ page }) => {
  await go(page, 'customer/book/');
  await page.locator('[data-rv-service-choice="face-hair"]').click();
  await ready(page);
  await page.locator('[data-rv-stylist-choice="amir"]').click();
  await ready(page);
  await expect(submit(page)).toBeDisabled();
  await expect(page.locator('[data-rv-days] button')).toHaveCount(31);
  await expect(page.locator('[data-rv-days] [data-rv-today]')).toHaveCount(1);
  await page.locator('[data-rv-quick-date]').first().click();
  await expect(submit(page)).toBeEnabled();
  await submit(page).click();
  await ready(page);
  await expect(page.locator('[data-rv-ticket-time]')).toContainText(/[:]/);
  await expect(page.locator('[data-rv-price-due]')).toHaveText('۹۰٬۰۰۰ تومان');
  await expect(page).toHaveURL(/bk-f02.*hold=/);
  const checkout = page.url();
  await submit(page).click();
  await expect(page.getByRole('heading', { name: 'نوبت شما ثبت شد' })).toBeVisible();
  const reference = await page.locator('[data-rv-result-view="success"] [data-rv-result-code]').textContent();
  await go(page, checkout);
  await expect(page.getByRole('heading', { name: 'نوبت شما ثبت شد' })).toBeVisible();
  await expect(page.locator('[data-rv-result-view="success"] [data-rv-result-code]')).toHaveText(reference);
});

test('Hold expiration returns to the shared state and preserves booking context @smoke', async ({ page }) => {
  await page.clock.install();
  await go(page, context('bk-f02') + '?state=low&service=hair&stylist=taha');
  await expect(page.locator('[data-rv-hold-clock]')).toContainText('۰:');
  await page.clock.fastForward(50000);
  await expect(page.getByRole('heading', { name: 'زمان نگه‌داشت تمام شد' })).toBeVisible();
  await page.getByRole('link', { name: 'انتخاب دوباره زمان' }).click();
  await ready(page);
  await expect(page.locator('[data-rv-context-service]').first()).toHaveText('اصلاح سر');
});

test('Proposed selection and compound request reach distinct results without checkout @smoke', async ({ page }) => {
  await go(page, 'customer/book/');
  await page.locator('[data-rv-service-choice="facial"]').click();
  await ready(page);
  await expect(page.locator('[data-rv-stylist-choice]:visible')).toHaveCount(1);
  await page.locator('[data-rv-stylist-choice="sina"]').click();
  await ready(page);
  await page.locator('input[name="part"][value="صبح"]').check();
  await submit(page).click();
  await ready(page);
  const proposed = page.locator('[data-rv-result-view="proposed"]');
  await expect(proposed).toBeVisible();
  const tracking = proposed.locator('[data-rv-result-code]');
  await expect(tracking).toHaveText(/^#RQ-[A-F0-9]{8}$/);
  const reference = await tracking.textContent();
  await page.reload();
  await ready(page);
  await expect(tracking).toHaveText(reference);
  await go(page, 'customer/book/');
  await page.locator('[data-rv-service-choice="groom"]').click();
  await ready(page);
  await expect(page.locator('.rv-booking-package li')).toHaveCount(3);
  await expect(page.locator('#rv-main input')).toHaveCount(0);
  await submit(page).click();
  await ready(page);
  const requested = page.locator('[data-rv-result-view="requested"]');
  await expect(requested).toBeVisible();
  await expect(requested.locator('.rv-state-page__receipt')).toHaveCount(0);
  await expect(requested.locator('[data-rv-result-code]')).not.toHaveText(reference);
});

test('Availability alert uses the shared sheet, restores focus and detects a duplicate @smoke', async ({ page }) => {
  await go(page, context('bk-f01') + '?state=none');
  const opener = page.locator('[data-rv-sheet-open="rv-booking-alert"]');
  await opener.click();
  await expect(page.getByRole('dialog', { name: 'خبرم کنید' })).toBeVisible();
  await page.getByRole('button', { name: 'ثبت اعلان', exact: true }).click();
  await expect(page.locator('[data-rv-alert-done]')).toBeVisible();
  await expect(opener).toBeFocused();
  await page.reload();
  await ready(page);
  await expect(opener).toContainText('اعلان فعال است');
  await opener.click();
  await expect(page.locator('[data-rv-alert-duplicate]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});

test('Recurring creation, edit, removal, minimum and group checkout use one shared hold @smoke', async ({ page }) => {
  await go(page, context('bk-rec01') + '?state=short');
  await expect(submit(page)).toBeDisabled();
  await page.getByRole('button', { name: /افزودن نوبت|نوبت تازه/ }).click();
  const sheet = page.getByRole('dialog');
  const next = sheet.locator('[data-rv-rec-next]');
  await sheet.locator('input[name="rec-service"][value="face-hair"]').check();
  await sheet.locator('label:has(input[name="rec-stylist"][value="amir"])').click();
  await sheet.locator('[data-rv-month-move="1"]').click();
  await expect(sheet.locator('[data-rv-month-title]')).toContainText('آبان');
  await sheet.locator('[data-rv-month-move="-1"]').click();
  await expect(sheet.locator('[data-rv-month-title]')).toContainText('مهر');
  await sheet.locator('[data-rv-month-grid] input:enabled').first().check();
  await sheet.locator('input[name="rec-time"]:enabled').first().check();
  await expect(next).toContainText('افزودن ۱ نوبت');
  await next.click();
  await expect(page.locator('[data-rv-rec-edit]')).toHaveCount(3);
  await page.locator('[data-rv-rec-edit]').first().click();
  await expect(sheet.locator('[data-rv-rec-locked]')).toBeVisible();
  await sheet.locator('[data-rv-rec-delete]').click();
  await sheet.locator('[data-rv-rec-remove]').click();
  await expect(page.locator('[data-rv-rec-edit]')).toHaveCount(2);
  await expect(submit(page)).toBeDisabled();
  await go(page, context('bk-rec01') + '?state=invalid');
  await expect(submit(page)).toBeDisabled();
  await go(page, context('bk-rec01'));
  await submit(page).click();
  await ready(page);
  await expect(page.locator('[data-rv-group-items] li')).toHaveCount(5);
  await expect(page.locator('[data-rv-hold-clock]')).toHaveCount(1);
});
