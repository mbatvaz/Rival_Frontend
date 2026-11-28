import { expect, test } from '@playwright/test';

async function open(page, route) {
  await page.goto(route);
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
}

test('STY-02 touch swipes browse weeks in their physical direction and respect the first week', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, hasTouch: true, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    const device = await context.newCDPSession(page);
    await open(page, 'stylist/calendar/');
    const strip = page.locator('.rv-stylist-week__viewport');
    const frame = await strip.boundingBox();
    async function swipe(from, to) {
      const points = x => [{ x: frame.x + frame.width * x, y: frame.y + frame.height / 2 }];
      await device.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: points(from) });
      await device.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: points(to) });
      await device.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    }
    const transforms = () => strip.evaluate(el => Object.fromEntries(
      el.getAnimations({ subtree: true }).filter(animation => animation.id.startsWith('rv-week-'))
        .map(animation => [animation.id, animation.effect.getKeyframes().map(frame => frame.transform)])
    ));
    await swipe(0.8, 0.2);
    await expect(page.getByRole('button', { name: 'هفتهٔ قبل' })).toBeDisabled();
    await swipe(0.2, 0.8);
    expect(await transforms()).toEqual({
      'rv-week-exit': ['translateX(0px)', 'translateX(100%)'],
      'rv-week-enter': ['translateX(-100%)', 'translateX(0px)']
    });
    await expect(page.getByRole('button', { name: 'سه‌شنبه ۵ آبان، تعطیل رسمی' })).toBeVisible();
    await expect(strip).not.toHaveAttribute('data-rv-week-sliding');
    await swipe(0.8, 0.2);
    expect(await transforms()).toEqual({
      'rv-week-exit': ['translateX(0px)', 'translateX(-100%)'],
      'rv-week-enter': ['translateX(100%)', 'translateX(0px)']
    });
    await expect(strip).not.toHaveAttribute('data-rv-week-sliding');
    await expect(page.getByRole('button', { name: 'هفتهٔ قبل' })).toBeDisabled();
    await expect(page.getByRole('heading', { name: /امروز، یکشنبه ۲۶ مهر/ })).toBeVisible();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await swipe(0.2, 0.8);
    await expect(strip).not.toHaveAttribute('data-rv-week-sliding');
    await expect(page.getByRole('button', { name: 'سه‌شنبه ۵ آبان، تعطیل رسمی' })).toBeVisible();
  } finally {
    await context.close();
  }
});

for (const role of ['stylist', 'admin']) {
  test(`${role} mobile dock slides the active pill before navigation`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, role + '/');
    const dock = page.locator('[data-rv-role-dock]');
    await expect(dock).toHaveAttribute('data-rv-dock-ready');
    const calendar = dock.getByRole('link', { name: 'تقویم', exact: true });
    const start = await calendar.evaluate(link => {
      link.click();
      const pill = link.parentElement.querySelector('.rv-customer-dock__indicator');
      return pill.getAnimations().find(animation => animation.id === 'rv-dock-slide')?.effect.getKeyframes()[0].transform;
    });
    expect(start).toMatch(/translateX\([1-9]/);
    await page.setViewportSize({ width: 494, height: 893 });
    await expect(page).toHaveURL(new RegExp(role + '/calendar/$'));
    await expect(calendar).toHaveAttribute('aria-current', 'page');
  });
}

test('STY-02 sidebar collapses the current item toward the right and opens the destination from the right', async ({ page }) => {
  await page.setViewportSize({ width: 967, height: 893 });
  await open(page, 'stylist/calendar/');
  const nav = page.getByRole('navigation', { name: 'منوی آرایشگر' });
  const result = await nav.getByRole('link', { name: 'داشبورد', exact: true }).evaluate(link => {
    const active = link.parentElement.querySelector('[aria-current="page"]');
    link.click();
    const style = getComputedStyle(active, '::before');
    return { name: style.animationName, origin: parseFloat(style.transformOrigin), width: active.offsetWidth };
  });
  expect(result.name).toBe('rv-sidebar-active-exit');
  expect(result.origin).toBeCloseTo(result.width, 0);
  await expect(page).toHaveURL(/stylist\/$/);
  const active = nav.locator('[aria-current="page"]');
  await expect(active).toHaveText('داشبورد');
  expect(await active.evaluate(link => getComputedStyle(link, '::before').animationName)).toBe('rv-sidebar-active-fill');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await active.evaluate(link => getComputedStyle(link, '::before').animationName)).toBe('none');
});
