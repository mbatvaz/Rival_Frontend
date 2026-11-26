import { expect, test } from '@playwright/test';
import { installMotionProbe } from '../helpers/motion.mjs';
import AxeBuilder from '@axe-core/playwright';

const route = 'customer/profile/';
const states = {
  example: null,
  edit: 'ویرایش پروفایل',
  password: 'تنظیم رمز عبور',
  'phone-current': 'تغییر شماره موبایل',
  'phone-new': 'تغییر شماره موبایل',
  'passkey-delete': 'حذف Passkey لپ‌تاپ خانه؟'
};

async function open(page, path = route) {
  await page.goto(path);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-profile-error]')).toBeEmpty();
}

test('Profile is reachable from More and photo and names persist locally @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('customer/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await page.getByRole('button', { name: 'بیشتر', exact: true }).click();
  await page.getByRole('link', { name: 'پروفایل و روش‌های ورود' }).click();
  await expect(page).toHaveURL(/\/customer\/profile\/$/);
  const trigger = page.getByRole('button', { name: 'ویرایش', exact: true });
  await expect(trigger).toBeEnabled();
  await trigger.focus();
  await page.keyboard.press('Enter');
  const edit = page.getByRole('dialog', { name: 'ویرایش پروفایل' });
  const firstName = edit.getByLabel('نام', { exact: true });
  await expect(edit).toBeFocused();
  await firstName.fill('علی');
  await edit.locator('#profile-photo').setInputFiles('src/wwwroot/img/public/hall-wide.png');
  await expect(edit.locator('cropper-selection')).toBeVisible();
  await edit.getByRole('button', { name: 'اعمال برش' }).click();
  const picture = edit.locator('[data-profile-photo]');
  await expect(picture).toHaveAttribute('src', /^data:image\/jpeg;base64,/);
  await expect.poll(() => picture.evaluate(img => [img.naturalWidth, img.naturalHeight])).toEqual([240, 240]);
  await edit.getByRole('button', { name: 'ذخیره', exact: true }).click();
  await expect(trigger).toBeFocused();
  await expect(page.getByRole('region', { name: 'حساب شما' })).toContainText('علی کریمی');
  await page.reload();
  await expect(page.getByRole('region', { name: 'حساب شما' })).toContainText('علی کریمی');
  await expect(page.locator('.rv-profile__identity img')).toHaveAttribute('src', /^data:image\/jpeg;base64,/);
  await trigger.click();
  await edit.getByRole('button', { name: 'حذف عکس' }).click();
  await edit.getByRole('button', { name: 'ذخیره', exact: true }).click();
  await expect(page.locator('.rv-profile__identity img')).toBeHidden();
  await open(page, route + '?state=example');
  await expect(page.getByRole('region', { name: 'حساب شما' })).toContainText('رضا کریمی');
  await page.getByRole('button', { name: 'بازگشت به منوی بیشتر' }).click();
  await expect(page.getByRole('link', { name: 'پروفایل و روش‌های ورود' })).toBeVisible();
});

test('Mobile sheet waits for text focus and restores scroll after the keyboard closes @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    const viewport = Object.assign(new window.EventTarget(), { height: 844, width: 390, scale: 1, offsetTop: 0 });
    Object.defineProperty(window, 'visualViewport', { value: viewport });
  });
  await open(page, route + '?state=password');
  const dialog = page.getByRole('dialog', { name: 'تنظیم رمز عبور' });
  await expect(dialog).toBeFocused();
  const field = dialog.locator('input[type="password"]').last();
  const initial = await page.evaluate(() => window.scrollY);
  await field.focus();
  async function resizeKeyboard(height) {
    await page.evaluate(value => {
      Object.defineProperty(window.visualViewport, 'height', { value, configurable: true });
      window.visualViewport.dispatchEvent(new Event('resize'));
    }, height);
  }
  await resizeKeyboard(390);
  await expect.poll(() => field.evaluate(element => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(375);
  await resizeKeyboard(844);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(initial);
  await expect(field).toBeFocused();
});

test('Phone replacement requires both codes and rejects the current number @smoke', async ({ page }) => {
  await page.addInitScript(installMotionProbe, { id: 'rv-otp-rejected', record: 'otpShakes' });
  await open(page);
  await page.getByRole('button', { name: /شماره موبایل/ }).click();
  const dialog = page.getByRole('dialog', { name: 'تغییر شماره موبایل' });
  const code = dialog.locator('#profile-code');
  await expect(dialog.getByRole('link', { name: 'تماس با سالن' })).toHaveAttribute('href', 'tel:09141452321');
  await code.fill('۱۱۱۱۱');
  await dialog.getByRole('button', { name: 'ادامه' }).click();
  await expect(dialog.getByRole('alert')).toContainText('کد تأیید درست نیست');
  await expect.poll(() => page.evaluate(() => window.otpShakes.length)).toBe(1);
  await code.fill('۱۲۳۴۵');
  await dialog.getByRole('button', { name: 'ادامه' }).click();
  const phone = dialog.getByLabel('شماره تازه', { exact: true });
  await expect(phone).toBeFocused();
  await phone.fill('۰۹۱۴۲۷۱۳۸۴۰');
  await dialog.getByRole('button', { name: 'ارسال کد' }).click();
  await expect(dialog.getByRole('alert')).toContainText('شماره موبایل تازه و معتبر');
  await phone.fill('۰۹۱۲۴۴۰۷۱۶۳');
  await dialog.getByRole('button', { name: 'ارسال کد' }).click();
  await expect(phone).toHaveAttribute('readonly', '');
  await expect(dialog.getByRole('button', { name: 'ثبت شماره تازه' })).toBeDisabled();
  await code.fill('۲۳۴۵۶');
  await dialog.getByRole('button', { name: 'ثبت شماره تازه' }).click();
  await expect(dialog).toBeHidden();
  await page.reload();
  await expect(page.getByRole('region', { name: 'حساب شما' })).toContainText('۰۹۱۲ ۴۴۰ ۷۱۶۳');
});

test('Expired phone codes can be replaced and cancel discards verification', async ({ page }) => {
  await page.clock.install();
  await open(page);
  await page.getByRole('button', { name: /شماره موبایل/ }).click();
  const dialog = page.getByRole('dialog', { name: 'تغییر شماره موبایل' });
  const code = dialog.locator('#profile-code');
  await page.clock.fastForward(121000);
  await code.fill('12345');
  await dialog.getByRole('button', { name: 'ادامه' }).click();
  await expect(dialog.getByRole('alert')).toContainText('زمان این کد تمام شد');
  await dialog.getByRole('button', { name: 'ارسال دوباره کد', exact: true }).click();
  await expect(dialog.locator('[data-profile-demo-code]')).toContainText('۲۳۴۵۶');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await page.getByRole('button', { name: /شماره موبایل/ }).click();
  await expect(code).toHaveValue('');
  await expect(dialog.getByText('قدم ۱ از ۲')).toBeVisible();
});

test('Password setup checks confirmation, without storing the password value', async ({ page }) => {
  await open(page);
  await page.getByRole('button', { name: 'تنظیم رمز', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'تنظیم رمز عبور' });
  const password = dialog.getByLabel('رمز تازه', { exact: true });
  const repeat = dialog.getByLabel('تکرار رمز تازه', { exact: true });
  const save = dialog.getByRole('button', { name: 'ذخیره رمز' });
  await password.fill('ExamplePassword9021');
  await dialog.getByRole('button', { name: 'نمایش رمز تازه', exact: true }).click();
  await expect(password).toHaveAttribute('type', 'text');
  await save.click();
  await expect(dialog.getByRole('alert')).toContainText('یکسان نیست');
  await repeat.fill('ExamplePassword9021');
  await save.click();
  await expect(page.getByText('تنظیم شده؛ اختیاری')).toBeVisible();
  expect(await page.evaluate(() => JSON.stringify(localStorage))).not.toContain('ExamplePassword9021');
});

test('Passkey touch confirmation restores focus and unsupported browsers retain SMS', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => Object.defineProperty(window, 'PublicKeyCredential', { value: undefined }));
  await open(page);
  await expect(page.getByText('کد پیامکی', { exact: true })).toBeVisible();
  await expect(page.locator('[data-profile-add-passkey]')).toBeHidden();
  const remove = page.getByRole('button', { name: 'حذف Passkey لپ‌تاپ خانه' });
  await remove.click();
  const confirm = page.getByRole('alertdialog');
  await expect(confirm.getByRole('button', { name: 'انصراف' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(remove).toBeFocused();
  await remove.click();
  const action = confirm.getByRole('button', { name: 'حذف', exact: true });
  const touch = await context.newCDPSession(page);
  await action.hover();
  const box = await action.boundingBox();
  const point = [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }];
  await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: point });
  await touch.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
  await expect(confirm).toBeVisible();
  await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: point });
  await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.getByRole('button', { name: 'حذف Passkey آیفون رضا' })).toBeFocused();
  await page.reload();
  await expect(page.getByText('۱ دستگاه', { exact: true })).toBeVisible();
  await expect(remove).toHaveCount(0);
});

test('A supported browser can add one simulated device', async ({ page }) => {
  await page.addInitScript(() => { window.PublicKeyCredential = function () {}; });
  await open(page);
  const add = page.getByRole('button', { name: 'افزودن Passkey روی این دستگاه' });
  await add.click();
  await expect(page.getByRole('button', { name: 'حذف Passkey این دستگاه' })).toBeFocused();
  await expect(add).toBeDisabled();
  await page.reload();
  await expect(page.getByText('۳ دستگاه', { exact: true })).toBeVisible();
  await expect(add).toBeDisabled();
});

for (const width of [320, 390, 768, 1023, 1024, 1280]) {
  const primary = [390, 768, 1280].includes(width);
  test('Profile source states at ' + width + (primary ? ' @visual @a11y' : ' @visual @root-visual'), async ({ page, baseURL }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
    const mode = new URL(baseURL).pathname === '/' ? 'root' : 'subpath';
    for (const [state, name] of Object.entries(states)) {
      if (!primary && !['example', 'phone-new'].includes(state)) continue;
      await page.setViewportSize({ width, height: state === 'example' ? 960 : 844 });
      await open(page, route + '?state=' + state);
      if (name) await expect(page.getByRole(state === 'passkey-delete' ? 'alertdialog' : 'dialog', { name })).toBeVisible();
      else await expect(page.getByRole('heading', { name: 'پروفایل', exact: true })).toBeVisible();
      if (state === 'passkey-delete') {
        const row = await page.locator('[data-profile-selected]').boundingBox();
        const sheet = await page.getByRole('alertdialog').boundingBox();
        expect(row.y + row.height).toBeLessThanOrEqual(sheet.y);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const undersized = await page.locator('.rv-profile, .rv-profile-sheet').locator('button:visible:not([disabled]), a[href]:visible')
        .evaluateAll(nodes => nodes.filter(node => {
          const rect = node.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        }).map(node => node.getAttribute('aria-label') ?? node.textContent.trim()));
      expect(undersized, state).toEqual([]);
      if (primary) {
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        expect(axe.violations, state).toEqual([]);
      }
      await page.screenshot({ path: `tests/screens/profile/${mode}/${state}-${width}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}
