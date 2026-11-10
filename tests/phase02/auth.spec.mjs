import { test, expect } from '@playwright/test';

async function login(page, query = '') {
  await page.goto('login/' + query);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}
const submit = page => page.locator('[data-rv-auth-submit]');

test('OTP is default; phone validation, Persian paste and safe return work @smoke', async ({ page, baseURL }) => {
  await login(page, '?return=' + encodeURIComponent(new URL('customer/book/', baseURL).pathname));
  await expect(page.locator('[data-rv-password-stage]')).toBeHidden();
  await expect(page.locator('[data-rv-auth-return]')).toBeVisible();
  await submit(page).click();
  await expect(page.locator('[data-rv-phone]')).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('شماره موبایل', { exact: true }).fill('۰۹۱۴۳۲۱۴۵۶۷');
  await submit(page).click();
  await expect(page.getByLabel('کد پیامک‌شده')).toBeFocused();
  await page.getByLabel('کد پیامک‌شده').fill('۱۲۳۴۵');
  await submit(page).click();
  await expect(page).toHaveURL(new URL('customer/book/', baseURL).href);
});

test('Resend waits 60 seconds, rotates code and invalidates old code @smoke', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-10T08:00:00Z') });
  await login(page, '?state=otp');
  const resend = page.locator('[data-rv-resend]');
  await expect(resend).toBeDisabled();
  await page.clock.fastForward(61000);
  await expect(resend).toBeEnabled();
  await resend.click();
  await expect(page.locator('[data-rv-auth-demo]')).toContainText('۲۳۴۵۶');
  await page.getByLabel('کد پیامک‌شده').fill('12345');
  await submit(page).click();
  await expect(page.locator('[data-rv-code-error]')).toContainText('درست نیست');
  await expect(resend).toBeDisabled();
});

test('Code expires after 120 seconds and can be recovered through resend @smoke', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-10T08:00:00Z') });
  await login(page, '?state=otp');
  await page.clock.fastForward(121000);
  await page.getByLabel('کد پیامک‌شده').fill('12345');
  await submit(page).click();
  await expect(page.locator('[data-rv-code-error]')).toContainText('اعتبار کد تمام شده');
  await page.locator('[data-rv-resend]').click();
  await expect(page.locator('[data-rv-code-error]')).toBeEmpty();
  await expect(page.locator('[data-rv-code-timer]')).toHaveCount(0);
});

test('Five failures lock every method for the same phone for 15 minutes, including reload @smoke', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-10T08:00:00Z') });
  await login(page, '?state=otp');
  for (let i = 0; i < 5; i++) {
    await page.getByLabel('کد پیامک‌شده').fill('00000');
    await submit(page).click();
    if (i < 4) await expect(page.locator('[data-rv-code-error]')).toContainText('درست نیست');
  }
  await expect(page.locator('[data-rv-auth-lock]')).toContainText('همهٔ روش‌های ورود');
  for (const method of await page.locator('[data-rv-method]').all()) await expect(method).toBeDisabled();
  await login(page);
  await page.getByLabel('شماره موبایل', { exact: true }).fill('09143214567');
  await page.getByLabel('شماره موبایل', { exact: true }).blur();
  await expect(submit(page)).toBeDisabled();
  await page.clock.fastForward(901000);
  await expect(submit(page)).toBeEnabled();
});

test('Password uses an independent login view and unsupported passkey keeps an OTP fallback @smoke', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'PublicKeyCredential', { value: undefined }));
  await login(page);
  await expect(page.locator('[data-rv-passkey]')).toBeVisible();
  await expect(page.locator('[data-rv-passkey]')).toBeDisabled();
  await page.getByRole('button', { name: 'ورود با رمز عبور', exact: true }).click();
  await page.getByLabel('شماره موبایل', { exact: true }).fill('09143214567');
  await page.getByLabel('رمز عبور', { exact: true }).fill('wrong');
  await submit(page).click();
  await expect(page.locator('[data-rv-password-error]')).toContainText('درست نیست');
  await page.getByLabel('رمز عبور', { exact: true }).fill('RivalDemo123');
  await submit(page).click();
  await expect(page).toHaveURL(/\/customer\/$/);
  expect(await page.evaluate(() => Object.values(localStorage).some(value => value.includes('RivalDemo123')))).toBe(false);
});

test('New user completes names and external return destinations are rejected @smoke', async ({ page }) => {
  await login(page, '?state=new&return=https%3A%2F%2Fevil.example%2F');
  await submit(page).click();
  await page.getByLabel('کد پیامک‌شده').fill('12345');
  await submit(page).click();
  await expect(page).toHaveURL(/\/context\/auth-02\//);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await page.getByRole('button', { name: 'ادامه', exact: true }).click();
  await expect(page.getByLabel('نام', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('نام', { exact: true }).fill('علی');
  await page.getByLabel('نام خانوادگی', { exact: true }).fill('رضایی');
  await page.getByRole('button', { name: 'ادامه', exact: true }).click();
  await expect(page).toHaveURL(/\/customer\/$/);
});

test('Direct completion context returns to login, preserving a safe internal return @smoke', async ({ page }) => {
  await page.goto('_preview/context/auth-02/');
  await expect(page).toHaveURL(/\/login\/\?state=new/);
});

test('Switching login methods cannot reset the shared failure counter @smoke', async ({ page }) => {
  await login(page, '?state=wrong');
  await page.getByRole('button', { name: 'ورود با رمز عبور', exact: true }).click();
  for (let i = 0; i < 3; i++) {
    await page.getByLabel('رمز عبور', { exact: true }).fill('wrong-' + i);
    await submit(page).click();
    if (i < 2) await expect(page.locator('[data-rv-password-error]')).toContainText('درست نیست');
  }
  await expect(page.locator('[data-rv-auth-lock]')).toContainText('همهٔ روش‌های ورود');
  await expect(page.locator('[data-rv-password-toggle]')).toBeDisabled();
});
