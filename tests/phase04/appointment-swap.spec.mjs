import { test, expect } from '@playwright/test';

const route = 'customer/appointments/demo/';
const fixtureTime = new Date('2026-11-22T08:00:00Z');
const targetDay = '2026-11-27';
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


test('Old swap previews show appointment details without swap controls @smoke', async ({ page }) => {
  await open(page, 'swapCustomer=a&swapPreview=create');
  await expect(page.locator('[data-rv-detail-current] .rv-appointment-hero')).toBeVisible();
  await expect(page.locator('[data-rv-swap-open], [id^="rv-swap-"]')).toHaveCount(0);
  await expect(page.locator('[data-rv-detail-rsc]')).toBeVisible();
  await expect(page.locator('[data-rv-detail-cancel]')).toBeVisible();
});

test('Preview index excludes swap scenes and the embedded credit page @smoke', async ({ page }) => {
  await page.goto('_preview/');
  await expect(page.locator('a[href*="/customer/appointments/demo/"]').first()).toBeVisible();
  await expect(page.locator('a[href*="swapPreview="], a[href*="/context/cus-07/"]')).toHaveCount(0);
});
