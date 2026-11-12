import { test, expect } from '@playwright/test';

test('Desktop date, times and persistent summary share one workspace @visual @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto('_preview/context/bk-f01/?service=face-hair&stylist=amir&demo=artboard');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const calendar = page.locator('[data-rv-time-calendar]');
  const dayPanel = page.locator('[data-rv-day-section]');
  const times = page.getByRole('region', { name: 'ساعت‌های روز' });
  const summary = page.locator('aside.rv-booking-summary');
  const submit = summary.locator('[data-rv-booking-submit]');
  await expect(calendar).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'مراحل رزرو' }).locator('[aria-current="step"]')).toContainText('زمان');
  const [dateBox, timeBox, summaryBox] = await Promise.all([dayPanel.boundingBox(), times.boundingBox(), summary.boundingBox()]);
  expect(dateBox.y).toBe(timeBox.y);
  expect(dateBox.y).toBeGreaterThan(summaryBox.y);
  expect(dateBox.x).toBeGreaterThan(timeBox.x);
  expect(timeBox.x).toBeGreaterThan(summaryBox.x);
  await expect(summary).toHaveCSS('position', 'sticky');
  await expect(submit).toBeDisabled();
  const quick = page.locator('[data-rv-quick-date]').first();
  await quick.check();
  await expect(quick).toBeChecked();
  const suggestedDate = await quick.getAttribute('data-rv-quick-date');
  const suggestedTime = await quick.getAttribute('data-rv-quick-time');
  await expect(calendar.locator('[data-rv-date="' + suggestedDate + '"]')).toBeChecked();
  await expect(times.locator('input[value="' + suggestedTime + '"]')).toBeChecked();
  await expect(submit).toBeEnabled();


  const next = calendar.getByRole('button', { name: 'ماه بعد' });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(calendar.locator('[data-rv-month-title]')).toContainText('آبان');
  await calendar.getByRole('button', { name: 'ماه قبل' }).click();
  await calendar.locator('input[data-rv-date="2026-10-15"]').focus();
  await page.keyboard.press('Space');
  const chosen = times.getByRole('radio', { name: '۱۶:۰۰' });
  await chosen.focus();
  await page.keyboard.press('Space');
  await expect(chosen).toBeChecked();
  await expect(quick).not.toBeChecked();
  await expect(summary).toContainText('۱۶:۰۰');

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(calendar).toBeHidden();
  await expect(page.locator('[data-rv-days]')).toBeVisible();
  await expect(chosen).toBeChecked();
  await expect(submit).toBeEnabled();
  await page.setViewportSize({ width: 1920, height: 939 });
  const quickBox = await page.locator('[data-rv-soon]').boundingBox();
  const wideDate = await dayPanel.boundingBox();
  expect(quickBox.x).toBeGreaterThan(wideDate.x);
  expect(quickBox.y).toBe(wideDate.y);
  await submit.click();
  await expect(page).toHaveURL(/bk-f02.*hold=/);
  const edit = page.getByRole('navigation', { name: 'مراحل رزرو' }).getByRole('link', { name: 'زمان' });
  await expect(edit).toHaveAttribute('href', /date=2026-10-15.*time=16%3A00/);
  await edit.click();
  await expect(page.getByRole('radio', { name: '۱۶:۰۰' })).toBeChecked();
});

test('Empty availability and the conflict reason stay with their desktop controls @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 939 });
  await page.goto('_preview/context/bk-f01/?state=none');
  const calendar = page.locator('[data-rv-time-calendar]');
  await expect(calendar).toBeHidden();
  await expect(page.locator('[data-rv-no-availability]')).toBeVisible();
  const summary = page.getByRole('complementary', { name: 'خلاصهٔ رزرو' });
  await expect(summary.getByRole('button', { name: 'خبرم کنید' })).toBeVisible();

  await page.goto('_preview/context/bk-f01/?state=conflict');
  await expect(summary.getByRole('status')).toContainText('تداخل دارد');
  await expect(summary.getByRole('button', { name: 'ادامه' })).toBeDisabled();
  await page.setViewportSize({ width: 471, height: 627 });
  await expect(summary.getByRole('status')).toBeInViewport();
  await expect(page.locator('.rv-day-strip__frame')).toBeVisible();
});
