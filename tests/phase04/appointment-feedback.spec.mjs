import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const go = async (page, query = '') => { await page.goto('customer/appointments/' + query); await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true'); };
const sheet = page => page.locator('#rv-appointments-filter');
const picker = page => page.locator('#rv-appointment-date');

test('Filter reset clears applied filters immediately and survives reload', async ({ page }) => {
  await go(page, '?tab=history&service=face-hair&stylist=amir');
  await expect(page.locator('#rv-panel-history [data-rv-record]:visible')).toHaveCount(1);
  await page.locator('[data-rv-appointments-filter]').click();
  await sheet(page).getByRole('button', { name: 'حذف فیلترها' }).click();
  await expect(page).toHaveURL(/\?tab=history$/);
  await expect(sheet(page)).toBeVisible();
  await expect(sheet(page).getByRole('button', { name: 'نمایش ۵ نوبت' })).toBeVisible();
  await expect(page.locator('[data-rv-filter-count]')).toBeHidden();
  await page.reload();
  await expect(page.locator('#rv-panel-history [data-rv-record]:visible')).toHaveCount(5);
});

test('Active desktop item fills from the right with a reduced-motion fallback', async ({ page }) => {
  await page.setViewportSize({ width: 1378, height: 883 });
  await go(page, '?tab=history');
  const active = page.locator('.rv-booking-sidebar > a[aria-current="page"]');
  const paint = () => active.evaluate(el => {
    const style = getComputedStyle(el, '::before');
    return [style.animationName, style.transformOrigin.split(' ')[0], el.offsetWidth];
  });
  const [name, origin, width] = await paint();
  expect(name).toBe('rv-sidebar-active-fill');
  expect(parseFloat(origin)).toBeCloseTo(width, 0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect((await paint())[0]).toBe('none');
});

test('Mobile sheet grip dismisses only the top sheet after a deliberate pull', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go(page, '?state=filter');
  const opener = sheet(page).getByRole('button', { name: 'انتخاب از تاریخ از تقویم' });
  await opener.click();
  const pull = async (target, distance) => {
    const box = await target.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + 3);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 3 + distance, { steps: 4 });
    await page.mouse.up();
  };
  await pull(picker(page).locator('[data-rv-sheet-grip]'), 24);
  await expect(picker(page)).toBeVisible();
  await pull(picker(page).locator('[data-rv-sheet-grip]'), 90);
  await expect(picker(page)).toBeHidden();
  await expect(opener).toBeFocused();
  await pull(sheet(page).locator('[data-rv-sheet-grip]'), 90);
  await expect(sheet(page)).toBeHidden();
});

test('Desktop tools align beside the bell, month grids cap at three and history stays on one row @visual', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1024, 1206, 1280, 1378, 1600, 1920]) {
    await page.setViewportSize({ width, height: width === 1206 ? 883 : 900 });
    await go(page);
    const tools = await page.locator('.rv-appointments__tools').boundingBox();
    const bell = await page.locator('.rv-workspace__header > a').boundingBox();
    expect(Math.abs((tools.y + tools.height / 2) - (bell.y + bell.height / 2))).toBeLessThan(2);
    expect(tools.x).toBeGreaterThan(bell.x + bell.width);
    await page.locator('[data-rv-appointments-records]').first().evaluate(el => {
      for (let i = 0; i < 5; i++) el.append(el.firstElementChild.cloneNode(true));
    });
    const rectangles = await page.locator('#rv-panel-upcoming [data-rv-record]').evaluateAll(items => items.map(el => ({ top: el.getBoundingClientRect().top, month: el.closest('[data-rv-record-month]').querySelector('h2').textContent })));
    for (const top of new Set(rectangles.map(rect => rect.top))) {
      const row = rectangles.filter(rect => Math.abs(rect.top - top) < 1);
      expect(row.length).toBeLessThanOrEqual(3);
      expect(new Set(row.map(rect => rect.month)).size).toBe(1);
    }
    if (width >= 1280) expect(rectangles.filter(rect => rect.top === rectangles[0].top)).toHaveLength(3);
    await page.getByRole('radio', { name: /گذشته/ }).check();
    const row = page.locator('.rv-appointment-history').first();
    const positions = await row.locator('img,strong,.rv-muted,.rv-appointment-status,.rv-appointment-history__when').evaluateAll(items => items.map(el => el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2));
    if (width >= 1280) expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(2);
    const months = await page.locator('#rv-panel-history .rv-appointments__month').all();
    const [newer, older] = await Promise.all(months.map(month => month.boundingBox()));
    if (width >= 1206) {
      expect(newer.y).toBeCloseTo(older.y, 0);
      expect(newer.x).toBeGreaterThan(older.x + older.width);
    }
    expect(await page.locator('#rv-panel-history').evaluate(panel => panel.scrollWidth <= panel.clientWidth)).toBe(true);
    if (width === 1206) await page.screenshot({ path: 'tests/screens/phase04-appointment-feedback/history-1206.png', fullPage: true });
    const menu = await page.getByRole('navigation', { name: 'منوی مشتری' }).boundingBox();
    expect(menu.width).toBeCloseTo(221, 0);
    await go(page, '?tab=history&service=face-hair');
    const filtered = await months[0].boundingBox();
    expect(filtered.width).toBeCloseTo(newer.width, 0);
    const badge = page.locator('.rv-appointments__filter-count');
    await expect(badge).toHaveText('۱');
    const badgeBox = await badge.boundingBox();
    const filterBox = await badge.locator('..').boundingBox();
    expect(badgeBox.width).toBeCloseTo(badgeBox.height, 0);
    expect(badgeBox.x + badgeBox.width / 2).toBeGreaterThan(filterBox.x + filterBox.width / 2);
    expect(badgeBox.y).toBeLessThan(filterBox.y);
  }
});

test('Day and time use semibold, weekday is light, and desktop empty/error cards are centered at half width @visual', async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await go(page);
    const type = await page.locator('.rv-recurring-date').first().evaluate(el => {
      const styles = [...el.children].map(child => getComputedStyle(child));
      return styles.map(style => ({ weight: style.fontWeight, size: parseFloat(style.fontSize) }));
    });
    expect(type.map(style => style.weight)).toEqual(['600', '300', '600']);
    expect(type[0].size).toBeGreaterThan(type[2].size);
    expect(type[0].size).toBeGreaterThanOrEqual(26);
    expect(type[2].size).toBeGreaterThanOrEqual(14);
  }
  for (const state of ['empty', 'error']) {
    await go(page, '?state=' + state);
    const frame = await page.locator('.rv-appointments__state-card:visible').boundingBox();
    const main = await page.locator('.rv-appointments').boundingBox();
    expect(Math.abs(frame.width - main.width / 2)).toBeLessThan(1);
    expect(Math.abs(frame.x + frame.width / 2 - (main.x + main.width / 2))).toBeLessThan(1);
  }
});

test('Both Jalali calendar boundaries return focus to the common filter, validate order and persist across tabs @a11y @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go(page, '?state=filter');
  await sheet(page).getByRole('button', { name: 'حذف فیلترها' }).click();
  await sheet(page).locator('[data-rv-date-field="from"]').click();
  await expect(picker(page)).toBeVisible();
  await expect(sheet(page)).toBeVisible();
  await expect(sheet(page)).toHaveAttribute('data-rv-under-sheet', 'true');
  await expect(sheet(page)).toHaveAttribute('inert', '');
  const calendarGap = await picker(page).evaluate(el => {
    const head = el.querySelector('.rv-booking-calendar__head').getBoundingClientRect();
    const grid = el.querySelector('.rv-booking-calendar__grid').getBoundingClientRect();
    return grid.top - head.bottom;
  });
  expect(calendarGap).toBeGreaterThanOrEqual(12);
  const fiveWeekHeight = await picker(page).locator('.rv-booking-calendar__grid').evaluate(el => el.getBoundingClientRect().height);
  await picker(page).getByRole('button', { name: 'ماه بعد' }).click();
  await expect(picker(page).locator('[data-rv-month-title]')).toContainText('آبان');
  await expect.poll(() => picker(page).locator('.rv-booking-calendar__grid').evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThan(fiveWeekHeight + 40);
  await picker(page).getByRole('button', { name: 'ماه قبل' }).click();
  await expect.poll(() => picker(page).locator('.rv-booking-calendar__grid').evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(fiveWeekHeight + 1);
  await picker(page).getByRole('radio', { name: /۱۴۰۵\/۰۷\/۲۳/ }).check();
  await expect(picker(page)).toBeHidden();
  await expect(sheet(page).getByRole('button', { name: 'انتخاب از تاریخ از تقویم' })).toBeFocused();
  await expect(sheet(page).getByRole('textbox', { name: 'از تاریخ', exact: true })).toHaveValue('۱۴۰۵/۰۷/۲۳');
  await sheet(page).getByRole('button', { name: 'انتخاب تا تاریخ از تقویم' }).click();
  await picker(page).getByRole('button', { name: 'ماه بعد' }).click();
  await picker(page).getByRole('radio', { name: /۱۴۰۵\/۰۸\/۱۴/ }).check();
  await expect(sheet(page).getByRole('textbox', { name: 'تا تاریخ', exact: true })).toHaveValue('۱۴۰۵/۰۸/۱۴');
  await sheet(page).getByRole('textbox', { name: 'تا تاریخ', exact: true }).fill('۱۴۰۵/۰۷/۲۲');
  await sheet(page).getByRole('button', { name: /نمایش .* نوبت/ }).click();
  await expect(page.locator('#rv-boundary-error')).toContainText('تاریخ پایان');
  await sheet(page).getByRole('textbox', { name: 'تا تاریخ', exact: true }).fill('۱۴۰۵/۰۸/۱۴');
  await sheet(page).getByRole('button', { name: 'نمایش ۳ نوبت' }).click();
  await page.getByRole('radio', { name: /گذشته/ }).check();
  await expect(page).toHaveURL(/tab=history/);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
  await page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true }).click();
  await expect(sheet(page).getByRole('textbox', { name: 'از تاریخ', exact: true })).toHaveValue('۱۴۰۵/۰۷/۲۳');
  await expect(sheet(page).getByRole('textbox', { name: 'تا تاریخ', exact: true })).toHaveValue('۱۴۰۵/۰۸/۱۴');
});

test('Many stylists scroll with keyboard, mouse drag and focused native checkbox without document overflow @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await go(page, '?state=filter');
  const rail = sheet(page).getByRole('group', { name: 'آرایشگرها' });
  await rail.evaluate(el => {
    for (let i = 0; i < 12; i++) { const label = el.lastElementChild.cloneNode(true); label.querySelector('input').value = 'stress-' + i; el.append(label); }
  });
  await rail.focus(); await page.keyboard.press('End');
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeLessThan(-100);
  await page.keyboard.press('Home');
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBe(0);
  const box = await rail.boundingBox();
  await page.mouse.move(box.x + 40, box.y + 28); await page.mouse.down();
  await page.mouse.move(box.x + box.width - 30, box.y + 28, { steps: 8 }); await page.mouse.up();
  await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeLessThan(-100);
  await rail.getByRole('checkbox').last().focus();
  const last = await rail.locator('label').last().boundingBox();
  expect(last.x).toBeGreaterThanOrEqual(box.x - 1);
  expect(last.x + last.width).toBeLessThanOrEqual(box.x + box.width + 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('Non-date groups allow multiple choices while all remains exclusive @smoke @a11y', async ({ page }) => {
  await go(page, '?tab=history');
  await page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true }).click();
  const status = sheet(page).getByRole('group', { name: 'وضعیت' });
  const all = status.getByRole('checkbox', { name: 'همه', exact: true });
  const completed = status.getByRole('checkbox', { name: 'انجام شده' });
  const absent = status.getByRole('checkbox', { name: 'عدم حضور' });
  await expect(all).toBeChecked();
  await completed.check(); await absent.check();
  await expect(all).not.toBeChecked();
  await expect(completed).toBeChecked(); await expect(absent).toBeChecked();
  await sheet(page).getByRole('button', { name: 'نمایش ۳ نوبت' }).click();
  await expect(page.locator('[data-rv-record]:visible')).toHaveCount(3);
  await expect(page).toHaveURL(/status=completed.*status=absent/);
  await page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true }).click();
  await all.check();
  await expect(completed).not.toBeChecked(); await expect(absent).not.toBeChecked();
});

test('Filter controls animate without tap highlight and nested calendar resumes cleanly @visual @smoke', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await go(page, '?state=filter');
  const tabs = page.locator('.rv-appointments__tabs');
  expect(await tabs.evaluate(el => ({ border: getComputedStyle(el).borderTopWidth, tap: getComputedStyle(el).webkitTapHighlightColor }))).toEqual({ border: '1px', tap: 'rgba(0, 0, 0, 0)' });
  const chip = sheet(page).getByRole('checkbox', { name: 'رزرو شده' });
  expect(await chip.locator('xpath=following-sibling::span').evaluate(el => getComputedStyle(el).transitionDuration)).toContain('0.14s');
  await expect(sheet(page).getByRole('button', { name: 'بستن فیلتر نوبت‌ها' })).toHaveCount(0);
  const reset = sheet(page).getByRole('button', { name: 'حذف فیلترها' });
  expect(await reset.evaluate(el => getComputedStyle(el).borderTopWidth)).toBe('0px');
  await expect(sheet(page).getByRole('heading', { name: 'فیلتر نوبت‌ها' })).toBeFocused();
  const field = sheet(page).locator('[data-rv-date-field="from"]');
  expect(await field.getByRole('button').evaluate(el => getComputedStyle(el).borderTopWidth)).toBe('0px');
  await field.click(); await expect(picker(page)).toBeVisible();
  await page.keyboard.press('Escape'); await expect(sheet(page)).toBeVisible();
  await expect(sheet(page)).toHaveAttribute('data-rv-resuming', 'true');
  expect(await sheet(page).evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await field.click(); await page.keyboard.press('Escape'); await expect(sheet(page)).toBeVisible();
});

for (const width of [320, 390, 768, 1280]) test(`Owner feedback screenshots, common popup and nested calendar axe at ${width} @visual @a11y`, async ({ page, baseURL }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const mode = new URL(baseURL).pathname === '/' ? 'root' : 'subpath';
  const dir = `tests/screens/phase04-appointment-feedback/${mode}`;
  await fs.mkdir(dir, { recursive: true });
  for (const [name, query] of [['future', ''], ['past', '?tab=history'], ['empty', '?state=empty'], ['error', '?state=error'], ['filter', '?state=filter'], ['calendar', '?state=filter']]) {
    await go(page, query);
    if (name === 'calendar') await sheet(page).getByRole('button', { name: 'انتخاب از تاریخ از تقویم' }).click();
    await page.screenshot({ path: `${dir}/${name}-${width}.png`, fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const failures = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations;
    expect(failures).toEqual([]);
    if (name === 'calendar') {
      const sizes = await picker(page).locator('.rv-calendar-day').evaluateAll(items => items.map(el => el.getBoundingClientRect().width));
      expect(Math.min(...sizes)).toBeGreaterThanOrEqual(44);
      const padding = await picker(page).locator('.rv-booking-calendar').evaluate(el => {
        const style = getComputedStyle(el);
        return [style.paddingLeft, style.paddingRight, style.paddingBottom].map(Number.parseFloat);
      });
      expect(new Set(padding).size).toBe(1);
      expect(padding[0]).toBeGreaterThanOrEqual(2);
      const outerSpacing = await picker(page).evaluate(el => {
        const calendar = el.querySelector('.rv-booking-calendar').getBoundingClientRect();
        const layer = el.parentElement.getBoundingClientRect();
        const bounds = el.getBoundingClientRect();
        const sides = window.innerWidth < 375 ? layer : bounds;
        return {
          side: calendar.left - sides.left,
          right: sides.right - calendar.right,
          bottom: layer.bottom - calendar.bottom,
          sheetGap: layer.bottom - bounds.bottom
        };
      });
      expect(Math.abs(outerSpacing.side - outerSpacing.bottom)).toBeLessThan(1);
      expect(Math.abs(outerSpacing.right - outerSpacing.bottom)).toBeLessThan(1);
      expect(Math.abs(outerSpacing.sheetGap)).toBeLessThan(1);
      await page.keyboard.press('Escape');
      await expect(sheet(page)).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(sheet(page)).toBeHidden();
      await expect(page.getByRole('button', { name: 'فیلتر نوبت‌ها', exact: true })).toBeFocused();
    }
  }
});
