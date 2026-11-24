import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'customer/appointments/demo/';
const fixtureTime = new Date('2026-11-22T08:00:00Z');
const targetDay = '2026-11-27';
const createButton = page => page.getByRole('button', { name: 'ایجاد کد تعویض', exact: true });
const createSheet = page => page.getByRole('dialog', { name: 'ایجاد کد تعویض نوبت' });
const redeemSheet = page => page.getByRole('dialog', { name: 'ثبت کد تعویض نوبت' });
const confirmSheet = page => page.getByRole('dialog', { name: 'تأیید تعویض نوبت' });
const resultSheet = page => page.getByRole('dialog', { name: 'نتیجهٔ تعویض نوبت' });
const dateButton = sheet => sheet.getByRole('button', { name: /تاریخ نوبتی که می‌خواهید بگیرید/ });
const calendar = page => page.getByRole('dialog', { name: 'انتخاب تاریخ نوبت دریافتی' });
const codeLabel = sheet => sheet.locator('[data-rv-swap-code]');
const backgroundScroll = page => page.locator('[data-rv-page]')
  .evaluate(element => Math.abs(Number.parseFloat(element.style.getPropertyValue('--rv-sheet-scroll'))));

async function open(page, query = 'swapCustomer=a') {
  await page.clock.setFixedTime(fixtureTime);
  await page.goto(route + '?' + query);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}

async function call(page, operation, ...args) {
  return page.evaluate(async ({ operation, args }) => {
    const { api } = await import(document.documentElement.dataset.rvBasePath + 'js/core/api.js');
    try {
      if (operation === 'ledger') return (await api.read('customer/appointment-swap')).data;
      return await api.appointmentSwap[operation](...args);
    } catch (error) {
      return { error: error.code };
    }
  }, { operation, args });
}

async function selectDate(page, day = targetDay) {
  const sheet = createSheet(page);
  await dateButton(sheet).click();
  await calendar(page).locator('input[value="' + day + '"]').focus();
  await page.keyboard.press('Space');
  await expect(calendar(page)).toBeHidden();
  await expect(dateButton(sheet)).toBeFocused();
}

async function generate(page) {
  await createButton(page).click();
  await selectDate(page);
  await createSheet(page).getByRole('button', { name: 'موافقت و ایجاد کد' }).click();
  await expect(codeLabel(createSheet(page))).toHaveText(/^[A-F0-9-]{29}$/);
}

for (const width of [320, 390, 768, 1023, 1024, 1280]) {
  test(`swap Sheet, calendar and feedback at ${width}px @visual @a11y`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: width < 1280 ? 'reduce' : 'no-preference' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
    await open(page);
    const capture = [390, 768, 1280].includes(width);
    const mode = baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
    const check = async state => {
      await page.evaluate(() => Promise.allSettled(document.getAnimations()
        .filter(animation => Number.isFinite(animation.effect.getComputedTiming().endTime))
        .map(animation => animation.finished)));
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      const sizes = await page.locator('[data-rv-swap-open], .rv-appointment-swap button, #rv-swap-calendar input, #rv-swap-calendar button')
        .evaluateAll(controls => controls.filter(control => control.getClientRects().length).map(control => {
          const { width, height } = control.getBoundingClientRect();
          return Math.min(width, height);
        }));
      expect(sizes.every(size => size >= 44)).toBe(true);
      if (capture) {
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        expect(axe.violations.map(item => [item.id, item.nodes.map(node => node.target)])).toEqual([]);
        await page.screenshot({ path: `tests/screens/phase04-swap/${mode}/${state}-${width}.png`, fullPage: true });
      }
    };
    await expect(page.locator('[data-rv-swap-open]')).toHaveCount(2);
    await check('detail');
    await createButton(page).focus();
    await page.keyboard.press('Enter');
    const sheet = createSheet(page);
    await expect(sheet.getByText(/توافق مالی خصوصی/)).toBeVisible();
    await expect(sheet.getByText(/سالن در قبال تصمیم و توافق/)).toBeVisible();
    await expect(page.locator('[data-rv-cancel-hero]')).toBeVisible();
    await expect(page.locator('[data-rv-sheet-layer]')).toHaveAttribute('data-rv-swap-lift', '');
    const scroll = await backgroundScroll(page);
    const submit = sheet.getByRole('button', { name: 'موافقت و ایجاد کد' });
    await expect(submit).toBeDisabled();
    await check('create');
    await dateButton(sheet).click();
    await expect(calendar(page)).toBeVisible();
    await expect(calendar(page).locator('input[value="2026-11-22"]')).toBeDisabled();
    await expect(calendar(page).locator('input:not([type="radio"])')).toHaveCount(0);
    await check('calendar');
    await page.keyboard.press('Escape');
    await expect(dateButton(sheet)).toBeFocused();
    await selectDate(page);
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(sheet.getByRole('timer')).toHaveText('۱۰:۰۰');
    await expect(sheet.getByRole('progressbar')).toHaveAttribute('value', '600');
    await expect(sheet.getByRole('timer')).toHaveAttribute('aria-live', 'off');
    await check('active');
    await page.keyboard.press('Escape');
    await expect(createButton(page)).toBeFocused();
    await expect(page.locator('[data-rv-cancel-hero]')).toBeHidden();
    expect(await page.evaluate(() => window.scrollY)).toBe(scroll);
    const redeemButton = page.getByRole('button', { name: 'ثبت کد تعویض', exact: true });
    await expect(redeemButton).toBeDisabled();
    await page.clock.setFixedTime(+fixtureTime + 600_000);
    await expect(redeemButton).toBeEnabled();
    await redeemButton.click();
    const redeem = redeemSheet(page);
    await expect(page.locator('[data-rv-cancel-hero]')).toBeVisible();
    await expect(redeem.getByText(/مدیریت و حضور/)).toBeVisible();
    await check('redeem');
    await redeem.getByLabel('کد تعویض دریافتی').fill('bad');
    await redeem.getByRole('button', { name: 'بررسی کد تعویض' }).click();
    await expect(redeem.getByRole('alert')).toHaveText(/کد تعویض معتبر نیست/);
    await expect(redeem.getByLabel('کد تعویض دریافتی')).toHaveValue('bad');
    await check('error');
    const offer = await call(page, 'create', 'b', 'SWAP-02', 0, '2026-11-25');
    await redeem.getByLabel('کد تعویض دریافتی').fill(offer.code);
    await redeem.getByRole('button', { name: 'بررسی کد تعویض' }).click();
    const confirm = confirmSheet(page);
    await expect(confirm.locator('[data-rv-swap-current]')).toContainText('۱۶:۰۰');
    await expect(confirm.locator('[data-rv-swap-incoming]')).toContainText('۱۰:۳۰');
    await expect(confirm.getByRole('heading')).toBeFocused();
    expect((await call(page, 'ledger')).history).toHaveLength(0);
    await check('confirm');
    await confirm.getByRole('button', { name: 'بازگشت به کد' }).click();
    await expect(redeem.getByLabel('کد تعویض دریافتی')).toHaveValue(offer.code);
    await expect(redeem.getByLabel('کد تعویض دریافتی')).toBeFocused();
    await page.keyboard.press('Enter');
    await confirm.getByRole('button', { name: 'موافقت و تعویض نوبت' }).click();
    await expect(resultSheet(page).getByRole('status')).toHaveText('تعویض نوبت با موفقیت انجام شد.');
    await expect(resultSheet(page).getByRole('status')).toHaveCSS('text-align', 'center');
    await expect(resultSheet(page).locator('[data-rv-swap-booked]')).toContainText('۱۰:۳۰');
    await check('confirmed-success');
    expect(errors).toEqual([]);
  });
}

test('active code survives reload, expires at the stored deadline, and permits a fresh code @smoke', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await open(page);
  await expect(page.locator('[data-rv-detail-current] .rv-appointment-countdown')).toBeVisible();
  await generate(page);
  const [offer] = (await call(page, 'ledger')).offers;
  await createSheet(page).getByRole('button', { name: 'کپی کد' }).click();
  await expect(createSheet(page).getByRole('status')).toHaveText('کد کپی شد.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(offer.code);
  expect(offer.expiresAt - offer.createdAt).toBe(600_000);
  expect(await call(page, 'create', 'a', 'SWAP-01', 0, '2026-11-26')).toEqual(offer);
  await page.clock.setFixedTime(offer.createdAt + 95_000);
  await page.reload();
  await expect(page.getByRole('button', { name: 'ثبت کد تعویض' })).toBeDisabled();
  await createButton(page).click();
  await expect(codeLabel(createSheet(page))).toContainText(offer.code.slice(0, 4));
  await expect(createSheet(page).getByRole('timer')).toHaveText('۰۸:۲۵');
  await expect(createSheet(page).getByRole('progressbar')).toHaveAttribute('value', '505');
  await expect(createSheet(page).getByRole('button', { name: 'موافقت و ایجاد کد' })).toBeHidden();
  await page.clock.setFixedTime(offer.expiresAt);
  await expect(createSheet(page).getByRole('status')).toHaveText(/مهلت کد تمام شد/);
  await expect(page.locator('[data-rv-swap-open="redeem"]')).toBeEnabled();
  expect(await call(page, 'redeem', 'b', 'SWAP-02', 0, offer.code)).toEqual({ error: 'EXPIRED' });
  await selectDate(page);
  await createSheet(page).getByRole('button', { name: 'موافقت و ایجاد کد' }).click();
  await expect(createSheet(page).getByRole('timer')).toHaveText('۱۰:۰۰');
  expect((await call(page, 'ledger')).offers.map(item => item.status)).toEqual(['expired', 'active']);
});

test('directory opens every swap preview without issuing or redeeming a code', async ({ page }) => {
  await page.clock.setFixedTime(fixtureTime);
  await page.goto('_preview/');
  const variants = [
    ['a', 'create', createSheet],
    ['a', 'code', createSheet],
    ['b', 'redeem', redeemSheet],
    ['b', 'confirm', confirmSheet],
    ['b', 'success', resultSheet]
  ];
  const links = [];
  for (const [customer, state, dialog] of variants) {
    const href = await page.locator(`a[href$="?swapCustomer=${customer}&swapPreview=${state}"]`).first().getAttribute('href');
    links.push({ href, state, dialog });
  }
  for (const { href, state, dialog } of links) {
    await page.goto(href);
    await expect(dialog(page)).toBeVisible();
    if (state === 'code') await expect(dialog(page).getByRole('timer')).toHaveText('۱۰:۰۰');
    if (state === 'confirm') await expect(dialog(page).getByRole('button', { name: 'موافقت و تعویض نوبت' })).toBeDisabled();
    await page.keyboard.press('Escape');
    await expect(dialog(page)).toBeHidden();
    const ledger = await call(page, 'ledger');
    expect(ledger.offers).toHaveLength(0);
    expect(ledger.history).toHaveLength(0);
    await expect(page.locator('[data-rv-detail-current] .rv-appointment-hero')).toBeVisible();
  }
});

test('swap keeps the visible background position on close and matches the cancellation scrim', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await page.addInitScript(() => {
    window.liftTiming = [];
    const animate = window.Element.prototype.animate;
    window.Element.prototype.animate = function (frames, options) {
      if (options?.id === 'rv-card-lift' && this.matches('[data-rv-cancel-hero]')) window.liftTiming.push(options.duration);
      return animate.call(this, frames, options);
    };
  });
  await open(page);
  const opener = createButton(page);
  const hero = page.locator('[data-rv-cancel-hero]');
  const scrim = page.locator('[data-rv-sheet-layer] > .rv-sheet-scrim');
  await page.getByRole('button', { name: 'لغو نوبت', exact: true }).click();
  const cancellationColor = await scrim.evaluate(element => getComputedStyle(element).backgroundColor);
  await page.keyboard.press('Escape');
  await expect(hero).toBeHidden();
  for (const reducedMotion of ['no-preference', 'reduce']) {
    await page.emulateMedia({ reducedMotion });
    await opener.scrollIntoViewIfNeeded();
    const start = await page.evaluate(() => window.scrollY);
    expect(start).toBeGreaterThan(0);
    await page.evaluate(() => { window.liftTiming.length = 0; });
    await opener.click();
    await expect(hero.locator('.rv-appointment-hero')).toBeVisible();
    const visibleScroll = await backgroundScroll(page);
    expect(visibleScroll).toBeLessThan(start);
    expect(await page.evaluate(() => window.liftTiming)).toEqual(reducedMotion === 'reduce' ? [] : [240]);
    await expect(scrim).toHaveCSS('background-color', cancellationColor);
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
    await expect(hero).toBeHidden();
    expect(await page.evaluate(() => window.scrollY)).toBe(visibleScroll);
  }
});

test('create waits for its final contents and opens with the shared motion and clean initial focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 720 });
  await open(page);
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route('**/mock-data/customer/appointment-swap.json', async route => {
    await gate;
    await route.continue();
  });
  const opener = createButton(page);
  await opener.click();
  await expect(opener).toHaveAttribute('aria-busy', 'true');
  await expect(createSheet(page)).toBeHidden();
  release();
  const sheet = createSheet(page);
  await expect(sheet.getByText(/توافق مالی خصوصی/)).toBeVisible();
  await expect(sheet).toHaveCSS('animation-name', 'rv-sheet-enter');
  const close = sheet.getByRole('button', { name: /بستن/ });
  await expect(close).toBeFocused();
  await expect(close).toHaveCSS('outline-style', 'none');
  await page.keyboard.press('Tab');
  await expect(dateButton(sheet)).toBeFocused();
  await expect(dateButton(sheet)).toHaveCSS('outline-style', 'solid');
});

test('swap updates both customer views, keeps the reserved slots and refunds the original payer @smoke @visual @a11y', async ({ page, context, baseURL }) => {
  await open(page);
  const recipient = await context.newPage();
  await recipient.setViewportSize({ width: 390, height: 844 });
  await open(recipient, 'swapCustomer=b');
  await generate(page);
  const before = await call(page, 'ledger');
  const [offer] = before.offers;
  await recipient.getByRole('button', { name: 'ثبت کد تعویض', exact: true }).click();
  const sheet = redeemSheet(recipient);
  const formatted = offer.code.toLowerCase().replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
  await sheet.getByLabel('کد تعویض دریافتی').fill(formatted.match(/.{4}/g).join(' - '));
  await sheet.getByRole('button', { name: 'بررسی کد تعویض' }).click();
  await expect(confirmSheet(recipient).locator('[data-rv-swap-current]')).toHaveText(/۶ آذر.*۱۰:۳۰/);
  await expect(confirmSheet(recipient).locator('[data-rv-swap-incoming]')).toHaveText(/۴ آذر.*۱۶:۰۰/);
  expect(await call(recipient, 'ledger')).toEqual(before);
  await confirmSheet(recipient).getByRole('button', { name: 'موافقت و تعویض نوبت' }).click();
  await expect(resultSheet(recipient).getByRole('status')).toHaveText('تعویض نوبت با موفقیت انجام شد.');
  const axe = await new AxeBuilder({ page: recipient }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(axe.violations.map(item => item.id)).toEqual([]);
  const mode = baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
  await recipient.screenshot({ path: `tests/screens/phase04-swap/${mode}/success-390.png`, fullPage: true });
  const after = await call(page, 'ledger');
  expect(after.appointments).toEqual(before.appointments.map((record, index) => ({
    ...record, attendeeUserId: index ? 'a' : 'b', revision: record.revision + 1
  })));
  expect(after.history).toEqual([expect.objectContaining({ previousAttendees: ['a', 'b'], newAttendees: ['b', 'a'], offerId: offer.id })]);
  expect(await call(page, 'redeem', 'b', 'SWAP-02', 0, offer.code)).toEqual({ error: 'CONSUMED' });
  await recipient.keyboard.press('Escape');
  await expect(resultSheet(recipient)).toBeHidden();
  await expect(recipient.getByRole('status').filter({ hasText: 'تعویض نوبت با موفقیت انجام شد.' })).toBeVisible();
  await recipient.getByRole('link', { name: 'مشاهده نوبت دریافتی' }).click();
  await expect(recipient.locator('[data-rv-detail-current]')).toHaveAttribute('data-rv-detail-id', 'SWAP-01');
  await expect(recipient.locator('[data-rv-swap-owner]')).toHaveText(/مشتری دو/);
  await expect(recipient.locator('.rv-appointment-detail__receipt')).toBeHidden();
  await recipient.getByRole('button', { name: 'لغو نوبت', exact: true }).click();
  await expect(recipient.getByRole('dialog').getByText(/به پرداخت‌کنندهٔ اولیه برمی‌گردد/)).toBeVisible();
  await recipient.keyboard.press('Escape');
  await expect(recipient.getByRole('button', { name: 'جابه‌جایی', exact: true })).toBeEnabled();
  await recipient.getByRole('link', { name: 'بازگشت به نوبت‌ها' }).click();
  await expect(recipient.locator('[data-rv-record="SWAP-01"]')).toBeVisible();
  await expect(recipient.locator('[data-rv-record="SWAP-02"]')).toHaveCount(0);
  await page.goto('customer/?swapCustomer=a');
  await expect(page.locator('[data-rv-appointment="SWAP-02"]')).toBeVisible();
  await page.goto(route + '?swapCustomer=a&appointment=SWAP-01');
  await expect(page.getByRole('heading', { name: 'نوبت پیدا نشد' })).toBeVisible();
  await page.goto(route + '?swapCustomer=a');
  await expect(page.locator('[data-rv-detail-current]')).toHaveAttribute('data-rv-detail-id', 'SWAP-02');
  await expect(page.getByRole('button', { name: 'جابه‌جایی', exact: true })).toBeDisabled();
  await recipient.goto(route + '?swapCustomer=b');
  await recipient.getByRole('button', { name: 'جابه‌جایی', exact: true }).click();
  await recipient.getByRole('button', { name: 'ادامه', exact: true }).click();
  const confirmation = recipient.getByRole('dialog', { name: 'تأیید جابه‌جایی' });
  await expect(confirmation.getByText(/برای پرداخت‌کنندهٔ اولیه/)).toBeVisible();
  await confirmation.getByRole('button', { name: 'تأیید جابه‌جایی' }).click();
  await expect(recipient.getByRole('heading', { name: 'نوبت جابه‌جا شد' })).toBeVisible();
  const [rescheduled] = (await call(recipient, 'ledger')).appointments;
  expect(rescheduled).toMatchObject({ attendeeUserId: 'b', payerUserId: 'a', rescheduleAllowance: 0, revision: 2 });
});

for (const [changes, error] of [
  [{ stylistId: 'sina' }, 'STYLIST_MISMATCH'],
  [{ serviceId: 'hair' }, 'SERVICE_MISMATCH'],
  [{ durationMinutes: 30 }, 'CONFIGURATION_MISMATCH'],
  [{ branchId: 'other' }, 'CONFIGURATION_MISMATCH'],
  [{ configurationId: 'other' }, 'CONFIGURATION_MISMATCH'],
  [{ status: 'cancelled' }, 'INELIGIBLE'],
  [{ status: 'done' }, 'INELIGIBLE'],
  [{ dayOffset: -1 }, 'INELIGIBLE']
]) {
  test('swap validation rejects ' + JSON.stringify(changes), async ({ page }) => {
    await page.route('**/mock-data/customer/appointment-swap.json', async route => {
      const response = await route.fetch();
      const json = await response.json();
      Object.assign(json.data.appointments[1], changes);
      await route.fulfill({ response, json });
    });
    await open(page);
    const offer = await call(page, 'create', 'a', 'SWAP-01', 0, targetDay);
    const before = await call(page, 'ledger');
    expect(await call(page, 'redeem', 'b', 'SWAP-02', 0, offer.code)).toEqual({ error });
    expect(await call(page, 'ledger')).toEqual(before);
  });
}

test('a reviewed code can expire before confirmation without changing either appointment', async ({ page }) => {
  await open(page, 'swapCustomer=b');
  const offer = await call(page, 'create', 'a', 'SWAP-01', 0, targetDay);
  const before = await call(page, 'ledger');
  await page.getByRole('button', { name: 'ثبت کد تعویض', exact: true }).click();
  await redeemSheet(page).getByLabel('کد تعویض دریافتی').fill(offer.code);
  await redeemSheet(page).getByRole('button', { name: 'بررسی کد تعویض' }).click();
  await expect(confirmSheet(page)).toBeVisible();
  await page.clock.setFixedTime(offer.expiresAt);
  await confirmSheet(page).getByRole('button', { name: 'موافقت و تعویض نوبت' }).click();
  await expect(redeemSheet(page).getByRole('alert')).toHaveText(/اعتبار این کد تمام شده است/);
  await expect(resultSheet(page)).toBeHidden();
  const after = await call(page, 'ledger');
  expect(after.appointments).toEqual(before.appointments);
  expect(after.history).toHaveLength(0);
});

test('invalid date, wrong day, same owner and conflicting revisions cannot swap', async ({ page }) => {
  await open(page);
  for (const date of ['2026-11-22', '2026-11-31', 'not-a-date']) {
    expect(await call(page, 'create', 'a', 'SWAP-01', 0, date)).toEqual({ error: 'INVALID_DATE' });
  }
  expect(await call(page, 'create', 'b', 'SWAP-01', 0, targetDay)).toEqual({ error: 'CHANGED' });
  const offer = await call(page, 'create', 'a', 'SWAP-01', 0, '2026-11-26');
  expect(await call(page, 'redeem', 'b', 'SWAP-02', 0, 'wrong')).toEqual({ error: 'INVALID_CODE' });
  expect(await call(page, 'redeem', 'a', 'SWAP-01', 0, offer.code)).toEqual({ error: 'SAME_USER' });
  expect(await call(page, 'redeem', 'b', 'SWAP-02', 2, offer.code)).toEqual({ error: 'CHANGED' });
  expect(await call(page, 'redeem', 'b', 'SWAP-02', 0, offer.code)).toEqual({ error: 'DATE_MISMATCH' });
  await call(page, 'reschedule', 'a', 'SWAP-01', 0, { date: '2026-11-28', time: '12:00', mode: 'standard' });
  expect(await call(page, 'redeem', 'b', 'SWAP-02', 0, offer.code)).toEqual({ error: 'CHANGED' });
  expect((await call(page, 'ledger')).history).toEqual([]);
});

test('storage failure and simultaneous redemption never leave a partial swap', async ({ page, context }) => {
  await open(page);
  const other = await context.newPage();
  await open(other, 'swapCustomer=b');
  const offer = await call(page, 'create', 'a', 'SWAP-01', 0, targetDay);
  const before = await call(page, 'ledger');
  await page.evaluate(() => {
    const setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.endsWith(':customer/appointment-swap')) throw new Error('test write failure');
      return setItem.call(this, key, value);
    };
  });
  expect(await call(page, 'redeem', 'b', 'SWAP-02', 0, offer.code)).toEqual({ error: 'STORAGE_ERROR' });
  expect(await call(page, 'ledger')).toEqual(before);
  await page.reload();
  const results = await Promise.all([page, other].map(tab => call(tab, 'redeem', 'b', 'SWAP-02', 0, offer.code)));
  expect(results).toEqual(expect.arrayContaining([{ error: 'CONSUMED' }, expect.objectContaining({ receivedAppointmentId: 'SWAP-01' })]));
  const after = await call(page, 'ledger');
  expect(after.history).toHaveLength(1);
  expect(after.appointments.map(item => item.attendeeUserId)).toEqual(['b', 'a']);
});

test('browser without Web Locks leaves the demo readable and shows a recoverable error', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window.navigator, 'locks', { value: undefined }));
  await open(page);
  await createButton(page).click();
  await selectDate(page);
  const sheet = createSheet(page);
  await sheet.getByRole('button', { name: 'موافقت و ایجاد کد' }).click();
  await expect(sheet.getByRole('alert')).toHaveText(/انجام عملیات در این مرورگر ممکن نیست/);
  await expect(sheet.getByRole('button', { name: 'موافقت و ایجاد کد' })).toBeEnabled();
});
