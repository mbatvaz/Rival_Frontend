import { expect } from '@playwright/test';

export async function holdAction(button) {
  const page = button.page();
  const { mouse } = page;
  await button.hover();
  await mouse.down();
  try {
    await expect(button).toHaveAttribute('data-rv-confirm-holding');
    await expect(page.locator('[data-rv-confirm-holding]')).toHaveCount(0);
  } finally {
    await mouse.up();
  }
}
