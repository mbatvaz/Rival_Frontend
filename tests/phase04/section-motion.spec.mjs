import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { installMotionProbe } from '../helpers/motion.mjs';

for (const width of [390, 1280]) {
  test(`Customer record entry is consistent at ${width}px @visual`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.addInitScript(installMotionProbe, { record: 'recordEntries' });
    for (const [route, selector, direction = ''] of [
      ['customer/appointments/', '[data-rv-appointments-records] > a', '-24px'],
      ['customer/requests/', '[data-rv-request-record]', '-24px'],
      ['customer/requests/demo/', '.rv-request-slot', '-24px'],
      ['customer/availability-alerts/?state=example', '.rv-appointment-history'],
      ['customer/notifications/', '[data-rv-notification]'],
      ['customer/profile/?state=example', '.rv-profile__list', '-24px']
    ]) {
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      const entries = await page.evaluate(selector => window.recordEntries.filter(entry => entry.target.matches(selector))
        .map(entry => ({ duration: entry.options.duration, delay: entry.options.delay, opacity: Number(entry.frames[0].opacity), translate: entry.frames[0].translate })), selector);
      expect(entries.length, route).toBeGreaterThan(0);
      expect(entries.every(entry => entry.duration === 400 && (direction ? entry.translate?.startsWith(direction) : !entry.translate)), route).toBe(true);
      expect(entries.every(entry => entry.opacity < 0.5), route).toBe(true);
      if (entries.length > 1) expect(entries.some(entry => entry.delay > 0), route).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(width);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await expect.poll(() => page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'rv-list-entry').length)).toBe(0);
      const added = await page.evaluate(() => window.recordEntries.length);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      if (route === 'customer/requests/') {
        await page.locator('label').filter({ has: page.locator('[name="request-tab"][value="done"]') }).click();
        await expect(page.locator('[data-rv-request-group="done"]')).toBeVisible();
        await expect.poll(() => page.evaluate(() => window.recordEntries.length)).toBeGreaterThan(added);
        continue;
      }
      if (/^customer\/(availability-alerts|notifications|profile)\//.test(route)) {
        const back = page.locator('.rv-customer-panel__more-back');
        if (width < 1024) {
          await back.click();
          await expect(page.getByRole('dialog', { name: 'بیشتر' })).toBeVisible();
          await page.keyboard.press('Escape');
          await expect(back).toBeFocused();
        } else await expect(back).toBeHidden();
      }
      expect(await page.evaluate(() => window.recordEntries.length), route).toBe(added);
    }
  });
}

for (const width of [390, 768, 1280]) {
  test(`Booking choices keep their position on initial render at ${width}px @visual`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(installMotionProbe, { record: 'listEntries' });
    await page.goto('customer/book/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const rail = page.locator('[data-rv-choices-list]');
    await expect(rail).toHaveCSS('animation-name', 'rv-booking-choices-enter');
    const active = rail.locator('[data-rv-centered="true"]');
    const geometry = () => active.evaluate(el => {
      const { x, y, width, height } = el.getBoundingClientRect();
      const viewport = el.closest('[data-rv-choices-list]').getBoundingClientRect();
      return [x - viewport.x, y - viewport.y, width, height].map(value => Math.round(value * 100) / 100);
    });
    const before = await geometry();
    expect(await page.evaluate(() => window.listEntries.some(entry => entry.target.matches('[data-rv-service-choice]')))).toBe(false);
    const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
    await fs.mkdir(`tests/screens/list-entry/${mode}`, { recursive: true });
    await rail.screenshot({ path: `tests/screens/list-entry/${mode}/booking-choices-${width}.png` });
    expect(await geometry()).toEqual(before);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(rail).toHaveCSS('animation-name', 'none');
  });
}

test('Portfolio records enter across visual rows rather than whole DOM columns @visual', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.addInitScript(installMotionProbe, { record: 'rowOrder', selector: '[data-rv-work]' });
  await page.goto('portfolio/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  const order = await page.evaluate(() => window.rowOrder.toSorted((a, b) => a.options.delay - b.options.delay).map(({ top, right, target }) => ({ top, right,
    index: [...document.querySelectorAll('[data-rv-work]')].indexOf(target) })));
  expect(order.length).toBeGreaterThan(3);
  for (let index = 1; index < order.length; index++) {
    const previous = order[index - 1], current = order[index];
    if (Math.abs(current.top - previous.top) <= 4) expect(current.right).toBeLessThanOrEqual(previous.right);
    else expect(current.top).toBeGreaterThan(previous.top);
  }
  expect(order.map(item => item.index)).not.toEqual(order.map((_, index) => index));
});

test('Home and ordinary navigation never fade the entire page; absent animation API stays usable @smoke', async ({ page }) => {
  const fades = [];
  await page.exposeFunction('recordMainFade', frames => fades.push(frames));
  await page.addInitScript(() => {
    window.mainFades = [];
    const animate = window.Element.prototype.animate;
    window.Element.prototype.animate = function (frames, options) {
      if (this.matches('main, .rv-public, .rv-booking')) { window.mainFades.push(frames); window.recordMainFade(frames); }
      return animate.call(this, frames, options);
    };
  });
  await page.goto('');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'rv-list-entry').length)).toBe(0);
  expect(await page.evaluate(() => window.mainFades)).toEqual([]);
  await page.locator('.rv-home-hero [data-rv-book]').click();
  await expect(page).toHaveURL(/(?:customer\/book|login)\//);
  expect(fades).toEqual([]);
  expect(await page.evaluate(() => window.mainFades)).toEqual([]);
  await page.addInitScript(() => { window.Element.prototype.animate = undefined; });
  await page.goto('customer/book/');
  await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await expect(page.locator('[data-rv-service-choice]').first()).toHaveCSS('opacity', '1');
});

async function delayResource(page, pattern) {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route(pattern, async route => { await gate; await route.continue(); });
  return release;
}

test('The first visible portfolio frame waits for the font and starts with the card motion @visual', async ({ page }) => {
  await page.addInitScript(installMotionProbe, { record: 'entries', selector: '[data-rv-work]' });
  const fonts = await delayResource(page, '**/fonts/YekanBakh-*.woff2');
  const data = await delayResource(page, '**/mock-data/public/portfolio.json');
  try {
    await page.goto('portfolio/', { waitUntil: 'commit' });
    await expect(page.locator('body')).toHaveCSS('visibility', 'hidden');
    fonts();
    await expect(page.locator('html')).toHaveAttribute('data-rv-font', 'ready');
    await expect(page.locator('.rv-portfolio-grid')).toBeHidden();
    await expect(page.locator('[data-rv-portfolio-loading]')).toBeVisible();
    data();
    await expect(page.locator('html')).toHaveAttribute('data-rv-entry', 'ready');
    await expect(page.locator('.rv-portfolio-grid')).toBeVisible();
    expect(await page.evaluate(() => Number(window.entries[0].frames[0].scale))).toBeLessThan(1);
  } finally { fonts(); data(); }
});

test('A non-home section keeps its skeleton until delayed fonts and data settle @smoke', async ({ page }) => {
  await page.addInitScript(installMotionProbe, { record: 'entries', selector: '[data-rv-work]' });
  const fonts = await delayResource(page, '**/fonts/YekanBakh-*.woff2');
  const data = await delayResource(page, '**/mock-data/public/portfolio.json');
  try {
    await page.goto('portfolio/', { waitUntil: 'commit' });
    await expect(page.locator('html')).toHaveAttribute('data-rv-entry', 'static');
    await expect(page.locator('html')).toHaveAttribute('data-rv-font', 'pending');
    await expect(page.locator('[data-rv-portfolio-loading]')).toBeVisible();
    expect(await page.evaluate(() => window.entries.length)).toBe(0);
    fonts();
    data();
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    await expect(page.locator('.rv-portfolio-grid')).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.entries.length)).toBeGreaterThan(0);
  } finally { fonts(); data(); }
});

test('A card keeps its own skeleton until the image is decoded @visual', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const release = await delayResource(page, '**/img/public/classic.png');
  try {
    await page.goto('portfolio/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const card = page.locator('.rv-portfolio-card--lead');
    await expect(page.locator('[data-rv-portfolio-loading]')).toBeHidden();
    await expect(card).toHaveCSS('visibility', 'hidden');
    expect(await card.evaluate(el => getComputedStyle(el, '::before').visibility)).toBe('visible');
    expect(await card.evaluate(el => getComputedStyle(el, '::after').animationName)).toBe('rv-skeleton-shimmer');
    await expect(page.locator('[data-rv-work]:not(.rv-portfolio-card--lead)').first()).toBeVisible();
    const dir = `tests/screens/list-entry/${info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root'}`;
    await fs.mkdir(dir, { recursive: true });
    await page.screenshot({ path: `${dir}/portfolio-card-loading-390.png` });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await card.evaluate(el => getComputedStyle(el, '::after').animationName)).toBe('none');
    release();
    await expect(card).toHaveAttribute('data-rv-media-ready');
    await expect(card).toBeVisible();
  } finally { release(); }
});

test('A missing picture releases its skeleton and keeps the card controls available @smoke', async ({ page }) => {
  await page.route('**/img/public/classic.png', route => route.abort());
  await page.goto('portfolio/');
  const card = page.locator('.rv-portfolio-card--lead');
  await expect(card.locator('img')).toHaveAttribute('data-rv-media-failed');
  await expect(card.getByRole('button')).toBeVisible();
});

test('Booking uses three skeleton cards while its catalogue is pending @visual', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const catalogue = await delayResource(page, '**/mock-data/booking/catalog.json');
  try {
    await page.goto('customer/book/', { waitUntil: 'domcontentloaded' });
    const loading = page.locator('[data-rv-choices-loading]');
    await expect(loading.locator('.rv-skel:visible')).toHaveCount(3);
    await expect(page.locator('[data-rv-quick-loading] .rv-booking-quick__card:visible')).toHaveCount(2);
    await expect(page.locator('[data-rv-choices-list]')).toBeHidden();
    const dir = `tests/screens/list-entry/${info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root'}`;
    await fs.mkdir(dir, { recursive: true });
    await page.screenshot({ path: `${dir}/booking-loading-390.png` });
    catalogue();
    await expect(loading).toBeHidden();
    await expect(page.locator('[data-rv-service-choice="face-hair"]')).toBeVisible();
  } finally { catalogue(); }
});
