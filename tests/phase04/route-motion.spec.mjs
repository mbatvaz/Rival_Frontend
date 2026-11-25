import { test, expect } from '@playwright/test';

async function visit(page, route, width = 390) {
  await page.setViewportSize({ width, height: 900 });
  await page.addInitScript(() => {
    const nativeAnimate = window.Element.prototype.animate;
    window.moves = [];
    window.Element.prototype.animate = function (frames, timing) {
      const animation = nativeAnimate.call(this, frames, timing);
      window.queueMicrotask(() => {
        if (animation.id) window.moves.push({ node: this, id: animation.id, frames, timing });
      });
      return animation;
    };
  });
  await page.goto(route);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}
const moves = (page, selector, property, id = 'rv-list-entry') => page.evaluate(({ selector, property, id }) =>
  window.moves.filter(move => move.id === id && move.node.matches(selector) && Object.hasOwn(move.frames, property))
    .map(move => ({ values: move.frames[property], delay: move.timing.delay, duration: move.timing.duration })),
{ selector, property, id });

test('Rules reveal the frame before the text, and fragment links scroll to their section @visual', async ({ page }) => {
  await visit(page, 'booking-rules/');
  const card = '#book .rv-rule-ways';
  await expect.poll(() => moves(page, card, 'translate')).toHaveLength(1);
  const [frame] = await moves(page, card, 'translate');
  const [content] = await moves(page, card + ' > li', 'opacity');
  expect(content.delay).toBeGreaterThanOrEqual(frame.duration);
  await page.locator('.rv-rules__toc a[href="#salon"]').click();
  await expect(page).toHaveURL(/#salon$/);
  await expect(page.locator('#salon h2')).toBeInViewport();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect.poll(() => moves(page, '#salon .rv-panel', 'translate')).not.toHaveLength(0);
});

test('Login digits bounce left to right and a lock notice reveals from the right @visual', async ({ page }) => {
  await visit(page, 'login/?state=otp');
  const digits = await moves(page, '[data-rv-otp-cell]', 'scale');
  expect(digits).toHaveLength(5);
  expect(digits.map(({ delay }) => delay)).toEqual([116.5, 233, 349.5, 466, 582.5]);
  expect(Number(digits[0].values[1])).toBeGreaterThan(1);
  await page.goto('login/?state=locked');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const [notice] = await moves(page, '[data-rv-auth-lock]', 'clipPath');
  expect(notice.values[0]).toBe('inset(0 0 0 100%)');
});

test('Appointment image reveals from its bottom after the summary arrives @visual', async ({ page }) => {
  await visit(page, 'customer/appointments/demo/?state=inactive', 768);
  await expect.poll(() => moves(page, '.rv-appointment-hero__media', 'clipPath')).toHaveLength(1);
  const [panel] = await moves(page, '.rv-appointment-hero__panel', 'translate');
  const [image] = await moves(page, '.rv-appointment-hero__media', 'clipPath');
  const [notice] = await moves(page, '[data-rv-inactive-banner]', 'clipPath');
  expect(image.delay).toBeGreaterThanOrEqual(panel.duration - 20);
  expect(image.values[0]).toBe('inset(100% 0 0)');
  expect(notice.values[0]).toBe('inset(0 0 0 100%)');
});

for (const [path, nodes, action, axis] of [
  ['_preview/context/bk-01/', '[data-rv-quick-items] > a', null, '-24px 0'],
  ['_preview/context/bk-f01/', '.rv-booking-soon > label', '.rv-booking-action', '-24px 0'],
  ['_preview/context/bk-f02/', '.rv-booking-prices dl > div', '.rv-booking-action', '-24px 0'],
  ['_preview/context/bk-r01/', '.rv-booking-package > li', null, '0 16px'],
  ['customer/appointments/demo/?state=rsc-select', '[data-rv-rsc-times] > label', '.rv-reschedule__footer', '-24px 0']
]) {
  test(`Booking entry on ${path} staggers the requested section @visual`, async ({ page }) => {
    await visit(page, path);
    await expect.poll(async () => (await moves(page, nodes, 'translate')).length).toBeGreaterThan(1);
    const entries = await moves(page, nodes, 'translate');
    expect(entries.every(entry => entry.values[0] === axis)).toBe(true);
    expect(entries[1].delay).toBeGreaterThan(entries[0].delay);
    expect(entries[1].delay).toBeLessThan(entries[0].delay + entries[0].duration);
    if (action) expect((await moves(page, action, 'translate'))[0].values[0]).toBe('0 100%');
  });
}
