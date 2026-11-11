import { test, expect } from '@playwright/test';

test('Desktop date, times and persistent summary share one workspace @visual @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto('_preview/context/bk-f01/?service=face-hair&stylist=amir');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const calendar = page.locator('[data-rv-time-calendar]');
  const dayPanel = page.locator('[data-rv-day-section]');
  const times = page.getByRole('region', { name: 'ساعت‌های روز' });
  const summary = page.locator('aside.rv-booking-summary');
  const submit = summary.locator('[data-rv-booking-submit]');
  await expect(calendar).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'مراحل رزرو' }).locator('[aria-current="step"]')).toHaveText('زمان');
  const [dateBox, timeBox, summaryBox] = await Promise.all([dayPanel.boundingBox(), times.boundingBox(), summary.boundingBox()]);
  expect(dateBox.y).toBe(timeBox.y);
  expect(dateBox.y).toBe(summaryBox.y);
  expect(dateBox.x).toBeGreaterThan(timeBox.x);
  expect(timeBox.x).toBeGreaterThan(summaryBox.x);
  await expect(summary).toHaveCSS('position', 'sticky');
  await expect(submit).toBeDisabled();

  const next = calendar.getByRole('button', { name: 'ماه بعد' });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(calendar.locator('[data-rv-month-title]')).toContainText('آبان');
  await calendar.getByRole('button', { name: 'ماه قبل' }).click();
  await calendar.locator('button[data-rv-date="2026-10-15"]').focus();
  await page.keyboard.press('Enter');
  const chosen = times.getByRole('radio', { name: '۱۶:۰۰' });
  await chosen.focus();
  await page.keyboard.press('Space');
  await expect(chosen).toBeChecked();
  await expect(summary).toContainText('۱۶:۰۰');

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(calendar).toBeHidden();
  await expect(page.locator('[data-rv-days]')).toBeVisible();
  await expect(chosen).toBeChecked();
  await expect(submit).toBeEnabled();
  await page.setViewportSize({ width: 1440, height: 900 });
  await submit.click();
  await expect(page).toHaveURL(/bk-f02.*hold=/);
  const edit = page.getByRole('navigation', { name: 'مراحل رزرو' }).getByRole('link', { name: 'زمان' });
  await expect(edit).toHaveAttribute('href', /date=2026-10-15.*time=16%3A00/);
  await edit.click();
  await expect(page.getByRole('radio', { name: '۱۶:۰۰' })).toBeChecked();
});
