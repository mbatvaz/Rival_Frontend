import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { installMotionProbe } from '../helpers/motion.mjs';

for (const width of [320, 390, 768]) {
  test(`Mobile entry never moves the RTL page canvas at ${width}px @visual`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(installMotionProbe, { record: 'canvasEntries', pause: true });
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

for (const width of [390, 1280]) {
  test(`Dashboard cards and shadows stay fixed during content entry at ${width}px @visual`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(installMotionProbe, { record: 'dashboardEntries', pause: true });
    await page.goto('customer/');
    await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
    const rail = page.locator('[data-rv-home-appointments]');
    const first = rail.locator('article').first();
    const inner = first.locator('.rv-appointment-hero__media > img');
    await expect.poll(() => inner.evaluate(el => el.getAnimations().some(effect => effect.id === 'rv-list-entry'))).toBe(true);
    const setTime = instant => page.evaluate(time => {
      for (const effect of document.getAnimations().filter(animation => animation.id === 'rv-list-entry')) {
        effect.currentTime = time;
      }
    }, instant);
    const surface = () => first.evaluate(el => {
      const card = el.getBoundingClientRect();
      const rail = el.parentElement;
      const panel = getComputedStyle(el.querySelector('.rv-appointment-hero__panel'));
      return {
        x: card.x, scrollLeft: rail.scrollLeft, snapWidth: rail.scrollWidth,
        opacity: getComputedStyle(el).opacity, shadow: getComputedStyle(el).boxShadow,
        filter: panel.backdropFilter, fill: panel.backgroundColor
      };
    });
    await setTime(0);
    const initial = await surface();
    expect(initial.opacity).toBe('1');
    expect(initial.shadow).not.toBe('none');
    expect(initial.filter).not.toBe('none');
    const samples = [];
    for (const time of [0, 100, 200, 310, 399, 2000]) {
      await setTime(time);
      expect(await surface()).toEqual(initial);
      samples.push((await inner.boundingBox()).x);
      if (time === 200 || time === 2000) {
        await page.screenshot({ path: info.outputPath(`dashboard-${time}.png`) });
      }
    }
    expect(samples[0]).toBeLessThan(samples.at(-1));
    samples.slice(1).forEach((x, i) => {
      expect(x).toBeGreaterThanOrEqual(samples[i] - 0.1);
      expect(x).toBeLessThanOrEqual(samples.at(-1) + 0.1);
    });
  });
}
