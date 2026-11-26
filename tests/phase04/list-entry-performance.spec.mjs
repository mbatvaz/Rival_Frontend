import { test, expect } from '@playwright/test';

// Run this sample with one worker; it measures this machine, not physical phones.
for (const width of [390, 1280]) {
  test(`List entry frame pacing and layout stability at ${width}px @performance`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    const samples = {};
    for (const mode of ['no-preference', 'reduce']) {
      await page.emulateMedia({ reducedMotion: mode });
      await page.goto('customer/book/');
      await expect(page.locator('html')).toHaveAttribute('data-rv-ready', 'true');
      samples[mode] = await page.evaluate(async () => {
        const gaps = [], tasks = [], shifts = [];
        const long = new window.PerformanceObserver(list => tasks.push(...list.getEntries().map(item => item.duration)));
        const layout = new window.PerformanceObserver(list => shifts.push(...list.getEntries().filter(item => !item.hadRecentInput).map(item => item.value)));
        long.observe({ type: 'longtask' }); layout.observe({ type: 'layout-shift' });
        await new Promise(resolve => {
          let start, last;
          const frame = now => {
            start ??= now;
            if (last !== undefined) gaps.push(now - last);
            last = now;
            if (now - start < 1800) requestAnimationFrame(frame); else resolve();
          };
          requestAnimationFrame(frame);
        });
        long.disconnect(); layout.disconnect();
        gaps.sort((a, b) => a - b);
        return { frames: gaps.length, p95: gaps[Math.floor(gaps.length * 0.95)], max: Math.max(...gaps),
          longTasks: tasks.length, worstTask: Math.max(0, ...tasks), cls: shifts.reduce((sum, shift) => sum + shift, 0) };
      });
    }
    console.log('List entry measurement', JSON.stringify({ width, samples }));
    await info.attach('frame-pacing', { body: JSON.stringify({ width, samples }, null, 2), contentType: 'application/json' });
    expect(samples['no-preference'].p95).toBeLessThanOrEqual(Math.max(34, samples.reduce.p95 * 1.5));
    expect(samples['no-preference'].cls).toBe(0);
  });
}
