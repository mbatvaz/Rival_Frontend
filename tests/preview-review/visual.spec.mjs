import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import { loadSite } from '../../tools/lib/site.mjs';

const { basePath } = await loadSite();
const target = 'tests/screens/preview-review/' + (basePath === '/' ? 'root' : 'subpath');

for (const width of [390, 768, 1280]) {
  test('Review controls are keyboard-operable, distinct and accessible at ' + width + ' @visual @a11y', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('_preview/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    await page.evaluate(() => document.fonts.ready);
    await fs.mkdir(target, { recursive: true });
    await page.locator('[data-rv-review-id="CUS-01"]').screenshot({ path: target + '/red-' + width + '.png' });
    const row = page.locator('[data-rv-review-id="PUB-01"]');
    await row.screenshot({ path: target + '/yellow-' + width + '.png' });
    const mobile = row.locator(':scope > .rv-review__approvals > [data-rv-approval="mobile"]');
    await mobile.focus();
    await page.keyboard.press('Space');
    await expect(mobile).toHaveAttribute('aria-pressed', 'true');
    await expect(mobile).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(mobile).toHaveCSS('background-color', 'rgb(30, 106, 78)');
    await row.screenshot({ path: target + '/mobile-approved-' + width + '.png' });
    await row.locator(':scope > .rv-review__approvals > [data-rv-approval="desktop"]').focus();
    await page.keyboard.press('Enter');
    await expect(row.locator(':scope > .rv-review__approvals > [data-rv-approval="final"]')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(row).toHaveAttribute('data-status', 'green');
    await row.screenshot({ path: target + '/green-' + width + '.png' });
    await page.locator('[data-rv-review-filter]').selectOption('green');
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      small: [...document.querySelectorAll('a,button,input,select,summary')].filter(element => {
        if (!element.checkVisibility() || element.closest('[hidden]')) return false;
        const rect = element.getBoundingClientRect();
        return rect.width < 44 || rect.height < 44;
      }).map(element => element.textContent || element.getAttribute('aria-label')),
      nested: [...document.querySelectorAll('body *')].filter(element => ['auto', 'scroll']
        .includes(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight + 1).length
    }));
    expect(layout).toEqual({ overflow: false, small: [], nested: 0 });
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: target + '/directory-' + width + '.png', fullPage: true });
  });
}

test('Expanded state approvals remain compact, touch-sized and accessible @visual @a11y', async ({ page }) => {
  for (const width of [320, 375, 390, 768, 1024, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('_preview/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const parent = page.locator('[data-rv-review-id="PUB-02"]');
    const collapsedHeight = await parent.evaluate(element => element.getBoundingClientRect().height);
    expect(collapsedHeight).toBeLessThanOrEqual(160);
    const compact = await parent.evaluate(element => {
      const link = element.querySelector(':scope > a').getBoundingClientRect();
      const controls = [...element.querySelectorAll(':scope > .rv-review__approvals > button:not([hidden])')];
      return {
        besideName: controls.every(button => {
          const rect = button.getBoundingClientRect();
          return rect.top < link.bottom && rect.bottom > link.top;
        }),
        iconOnly: controls.every(button => button.innerText.trim() === ''),
        statusWidth: element.querySelector('[data-rv-review-status]').getBoundingClientRect().width,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });
    expect(compact).toEqual({ besideName: true, iconOnly: true, statusWidth: 1, overflow: false });
    await parent.locator(':scope > details > summary').click();
    const child = parent.locator('[data-rv-variant-query="?state=empty"]');
    const final = child.locator('[data-rv-approval="final"]');
    if (await final.getAttribute('aria-pressed') === 'true') await final.click();
    for (const action of ['mobile', 'desktop', 'final']) {
      await child.locator('[data-rv-approval="' + action + '"]').focus();
      await page.keyboard.press('Space');
    }
    await expect(child).toHaveAttribute('data-status', 'green');
    await expect(parent).toHaveAttribute('data-status', 'yellow');
    const sizes = await parent.locator('[data-rv-approval]:visible').evaluateAll(buttons => buttons.map(button => {
      const rect = button.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }));
    expect(sizes.every(size => size.width === 44 && size.height === 44)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()).violations).toEqual([]);
    await fs.mkdir(target, { recursive: true });
    await parent.screenshot({ path: target + '/expanded-states-' + width + '.png' });
  }
});
