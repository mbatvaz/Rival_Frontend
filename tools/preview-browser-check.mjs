import { chromium } from '@playwright/test';

export default async function checkPreview(config) {
  const url = new URL('_preview/', config.projects[0].use.baseURL);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const response = await page.goto(url.href, { timeout: 5000, waitUntil: 'commit' });
    if (!response?.ok()) throw new Error('Preview returned HTTP ' + (response?.status() ?? 'unknown'));
  } catch (error) {
    throw new Error('Browser cannot reach ' + url.href + ' (' + error.message.split('\n')[0] + ')', { cause: error });
  } finally {
    await browser.close();
  }
}
