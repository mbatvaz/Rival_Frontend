import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('central page directory has no serious axe violations @a11y', async ({ page }) => {
  await page.goto('_preview/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(results.violations.filter(v => ['critical','serious'].includes(v.impact))).toEqual([]);
});
