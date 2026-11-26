import fs from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'stylist/calendar/';
const screenDir = 'tests/screens/phase05';
const agenda = page => page.locator('.rv-stylist-timeline');
const dateHeading = page => page.locator('[data-rv-calendar-heading]');
const sheet = page => page.getByRole('dialog');
const block = page => page.getByRole('button', { name: /بستن زمان آزاد ۱۲:۰۰/ });

async function open(page, state = '') {
  await page.goto(route + (state ? '?state=' + state : ''));
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}

async function capture(page, name) {
  await fs.mkdir(screenDir, { recursive: true });
  await page.screenshot({ path: screenDir + '/sty-02-' + name + '.png', animations: 'disabled' });
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('STY-02 switches days and weeks, and selects a future date from the shared month sheet @smoke', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await open(page);
  await expect(page.getByRole('button', { name: 'شنبه ۲۵ مهر، گذشته' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'هفتهٔ قبل' })).toBeDisabled();
  await page.getByRole('button', { name: 'دوشنبه ۲۷ مهر' }).click();
  await expect(dateHeading(page)).toHaveText('دوشنبه ۲۷ مهر');
  await expect(agenda(page)).toContainText('کاوه احمدی');
  await page.getByRole('button', { name: 'هفتهٔ بعد' }).click();
  await expect(page.getByRole('button', { name: 'سه‌شنبه ۵ آبان، تعطیل رسمی' })).toBeEnabled();
  await page.getByRole('button', { name: 'هفتهٔ قبل' }).click();
  const month = page.getByRole('button', { name: 'مهر ۱۴۰۵', exact: true });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const frames = await month.evaluate(button => {
    button.click();
    return document.getElementById('rv-stylist-month').getAnimations()
      .find(animation => animation.id === 'rv-sheet-enter')?.effect.getKeyframes() ?? [];
  });
  expect(frames[0]?.transform).toContain('translateY');
  expect(frames.every(frame => frame.opacity === undefined)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(sheet(page)).toHaveAccessibleName('رفتن به روز');
  await expect(sheet(page).locator('[data-rv-sheet-grip]')).toBeVisible();
  await expect(sheet(page).getByRole('button', { name: 'ماه قبل' })).toBeDisabled();
  await expect(sheet(page).getByRole('radio', { name: 'شنبه ۱۴۰۵/۰۷/۲۵' })).toBeDisabled();
  await capture(page, 'month-390');
  await page.keyboard.press('Escape');
  await expect(month).toBeFocused();
  await page.keyboard.press('Enter');
  await sheet(page).getByRole('button', { name: 'ماه بعد' }).click();
  await sheet(page).getByRole('radio', { name: 'سه‌شنبه ۱۴۰۵/۰۸/۰۵' }).click();
  await expect(sheet(page)).toBeHidden();
  await expect(dateHeading(page)).toHaveText('سه‌شنبه ۵ آبان');
  await expect(agenda(page)).toBeHidden();
  expect(errors).toEqual([]);
});

test('STY-02 creates, edits and immediately releases a personal block across reloads @smoke', async ({ page }) => {
  await open(page, 'block');
  await expect(sheet(page)).toHaveAccessibleName('بستن این زمان');
  await expect(sheet(page).getByRole('checkbox')).toHaveCount(2);
  await capture(page, 'block-390');
  await sheet(page).getByRole('checkbox', { name: '۱۲:۳۰' }).uncheck();
  await sheet(page).getByLabel('عنوان، فقط برای خودتان').fill('استراحت');
  await sheet(page).getByRole('button', { name: 'بستن ۱۲:۰۰ تا ۱۲:۳۰' }).click();
  await expect(sheet(page)).toBeHidden();
  await open(page);
  await agenda(page).getByRole('button', { name: /^استراحت/ }).click();
  await expect(sheet(page)).toContainText('امروز، ۱۲:۰۰ تا ۱۲:۳۰');
  await sheet(page).getByRole('button', { name: 'ویرایش' }).click();
  await sheet(page).getByLabel('عنوان، فقط برای خودتان').fill('وقت شخصی');
  await sheet(page).getByRole('button', { name: 'ذخیره تغییرات' }).click();
  await agenda(page).getByRole('button', { name: /^وقت شخصی/ }).click();
  await sheet(page).getByRole('button', { name: 'باز کردن همین حالا' }).click();
  await expect(sheet(page)).toBeHidden();
  await expect(block(page)).toBeVisible();
});

test('STY-02 validates ReleaseAt and restores availability when the demo time arrives', async ({ page }) => {
  await page.clock.install();
  await open(page);
  await block(page).click();
  await sheet(page).getByRole('radio', { name: 'از ساعتی مشخص' }).check();
  const releaseTime = page.getByRole('button', { name: /^ساعت آزاد شدن/ });
  const chooseMinute = async keys => {
    await releaseTime.click();
    const minute = sheet(page).getByRole('spinbutton', { name: 'دقیقه' });
    await minute.focus();
    for (const key of keys) await page.keyboard.press(key);
    await sheet(page).getByRole('button', { name: 'ثبت ساعت' }).click();
    await expect(releaseTime).toBeFocused();
  };
  const save = sheet(page).getByRole('button', { name: 'بستن ۱۲:۰۰ تا ۱۳:۰۰' });
  await save.click();
  await expect(sheet(page).getByRole('alert')).toContainText('ساعت آزاد شدن را انتخاب کنید');
  await chooseMinute(['Home', 'ArrowUp']);
  await save.click();
  await expect(sheet(page)).toBeHidden();
  await expect(agenda(page).getByRole('button', { name: /آزاد برای رزرو از امروز، ۱۲:۰۱/ })).toBeVisible();
  await page.clock.fastForward(21 * 60000 + 5000);
  await expect(block(page)).toBeVisible();
  await page.reload();
  await expect(block(page)).toBeVisible();
});

test('STY-02 locks the release date and constrains snapping to the selected block', async ({ page }) => {
  await open(page);
  await page.getByRole('button', { name: 'دوشنبه ۲۷ مهر' }).click();
  await page.getByRole('button', { name: /بستن زمان آزاد ۰۸:۰۰/ }).click();
  await expect(sheet(page).getByRole('radio', { name: 'از ساعتی مشخص' })).toBeDisabled();
  await open(page, 'block-detail');
  await sheet(page).getByRole('button', { name: 'ویرایش' }).click();
  const date = sheet(page).locator('[data-rv-release-date]');
  await expect(date).toHaveText('۱۴۰۵/۰۷/۲۶');
  await expect(sheet(page).getByRole('button', { name: /تاریخ آزاد شدن/ })).toHaveCount(0);
  await page.getByRole('button', { name: /^ساعت آزاد شدن/ }).click();
  const hour = sheet(page).getByRole('spinbutton', { name: 'ساعت' });
  const minute = sheet(page).getByRole('spinbutton', { name: 'دقیقه' });
  await expect(hour).toHaveAttribute('aria-valuemin', '17');
  await expect(hour).toHaveAttribute('aria-valuemax', '18');
  await expect(minute).toHaveAttribute('aria-valuemin', '30');
  await minute.press('Home');
  const box = await minute.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height * 0.17, { steps: 6 });
  await page.mouse.up();
  await expect(minute).toHaveAttribute('aria-valuenow', '32');
  await expect(minute.locator('[data-distance="0"]')).toHaveText('۳۲');
  await hour.press('End');
  await expect(minute).toHaveAttribute('aria-valuemin', '0');
  await minute.press('End');
  await expect(minute).toHaveAttribute('aria-valuenow', '59');
  await expect(sheet(page).getByRole('button', { name: 'ثبت ساعت' })).toBeInViewport();
  await capture(page, 'release-clock-390');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: /^ساعت آزاد شدن/ })).toHaveText('۱۵:۰۰');
});

test('STY-02 renders all holiday and empty previews and saves date-only holiday acceptance', async ({ page }) => {
  await open(page, 'empty');
  await expect(page.getByText('نوبتی برای این روز ندارید')).toBeVisible();
  await expect(agenda(page)).toContainText('پایان ساعت کاری');
  await capture(page, 'empty-390');
  await open(page, 'holiday');
  await expect(agenda(page)).toBeHidden();
  await capture(page, 'holiday-390');
  await page.getByRole('button', { name: 'پذیرش در این روز', exact: true }).click();
  await sheet(page).getByRole('button', { name: 'ثبت پذیرش' }).click();
  await expect(page.getByText('تعطیل رسمی؛ شما ۱۰:۰۰ تا ۱۶:۰۰ پذیرش دارید')).toBeVisible();
  await page.reload();
  await expect(agenda(page)).toContainText('پایان پذیرش این روز');
  await open(page, 'holiday-accepting');
  await expect(agenda(page)).toContainText('علیرضا موسوی');
  await capture(page, 'holiday-accepting-390');
  await page.getByRole('button', { name: 'تغییر ساعت پذیرش' }).click();
  await sheet(page).getByLabel('از ساعت').fill('11:00');
  await sheet(page).getByRole('button', { name: 'ثبت پذیرش' }).click();
  await expect(sheet(page).getByRole('alert')).toContainText('تداخل دارد');
  await open(page, 'holiday');
  await page.getByRole('button', { name: 'تغییر ساعت پذیرش' }).click();
  await sheet(page).getByLabel('از ساعت').fill('11:00');
  await sheet(page).getByRole('button', { name: 'ثبت پذیرش' }).click();
  await expect(sheet(page)).toBeHidden();
  await open(page, 'holiday-accepting');
  await expect(agenda(page)).not.toContainText('علیرضا موسوی');
  await expect(agenda(page)).toContainText('نیما باقری');
});

test('STY-02 shared month and block-detail sheets fit from 320px through desktop and pass axe', async ({ page }) => {
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const state of ['month', 'block-detail']) {
      await open(page, state);
      await expect(sheet(page)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      if (width === 390) {
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
        if (state === 'block-detail') await capture(page, 'block-detail-390');
      }
      if (width === 1280 && state === 'month') await capture(page, 'month-1280');
    }
  }
});
