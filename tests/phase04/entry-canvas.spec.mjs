import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';

for (const width of [320, 390, 768]) {
  test(`Mobile entry never moves the RTL page canvas at ${width}px @visual`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      const animate = window.Element.prototype.animate;
      window.Element.prototype.animate = function (frames, options) {
        const animation = animate.call(this, frames, options);
        if (options?.id === 'rv-list-entry') animation.pause();
        return animation;
      };
    });
    for (const route of ['portfolio/', 'customer/book/', 'customer/']) {
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      const frames = await page.evaluate(async () => {
        const animations = document.getAnimations().filter(animation => animation.id === 'rv-list-entry');
        window.entryCanvasAnimations = animations;
        await Promise.all(animations.map(animation => animation.ready));
        const canvas = document.querySelector('[data-rv-page]');
        const fixed = document.querySelector('.rv-public-header, .rv-booking__top, .rv-workspace__header');
        const result = [];
        for (const time of [0, 80, 170, 240, 400, 10000]) {
          animations.forEach(animation => { animation.currentTime = time; });
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          result.push({ time, scroll: window.scrollX, overflow: document.documentElement.scrollWidth - window.innerWidth,
            left: canvas.getBoundingClientRect().left, width: canvas.getBoundingClientRect().width, header: fixed.getBoundingClientRect().left });
        }
        return result;
      });
      for (const frame of frames) {
        expect(frame.overflow, route + ' ' + JSON.stringify(frames)).toBeLessThanOrEqual(0);
        expect(frame.scroll).toBe(0);
        expect(frame.left).toBeCloseTo(frames.at(-1).left, 2);
        expect(frame.width).toBeCloseTo(frames.at(-1).width, 2);
        expect(frame.header).toBeCloseTo(frames.at(-1).header, 2);
      }
      if (route === 'portfolio/') {
        const mode = info.project.use.baseURL.includes('/rival-demo/') ? 'subpath' : 'root';
        const dir = `tests/screens/entry-canvas/${mode}`;
        await fs.mkdir(dir, { recursive: true });
        await page.evaluate(() => window.entryCanvasAnimations.forEach(animation => { animation.currentTime = 80; }));
        await page.screenshot({ path: `${dir}/portfolio-enter-${width}.png`, fullPage: true });
        await page.evaluate(() => window.entryCanvasAnimations.forEach(animation => { animation.currentTime = 10000; }));
        await page.screenshot({ path: `${dir}/portfolio-${width}.png`, fullPage: true });
      }
    }
  });
}
