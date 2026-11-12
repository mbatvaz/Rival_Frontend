import fs from 'node:fs/promises';
import path from 'node:path';
import { root } from './lib/site.mjs';

const jobs = [
  ['send', 'plum'], ['refresh', 'info'], ['hourglass', 'info'], ['hourglass', 'neutral'],
  ['check', 'success'], ['x-circle', 'danger'], ['calendar-x', 'warning'], ['wallet', 'accent'],
  ['calendar-x', 'neutral'], ['images', 'neutral'], ['users', 'neutral'], ['scissors', 'neutral']
];
const size = 56;
const frames = 24;
const output = path.join(root, 'src/wwwroot/img/icon-motion');
const tokens = await fs.readFile(path.join(root, 'src/wwwroot/css/00-tokens/color.css'), 'utf8');
const word = value => [value & 255, value >> 8];

// Reset before the code width grows beyond nine bits. The icons need just one
// opaque palette color and a transparent index.
function compress(pixels) {
  const bytes = [];
  let pending = 0;
  let bits = 0;
  const emit = code => {
    pending |= code << bits;
    bits += 9;
    while (bits >= 8) {
      bytes.push(pending & 255);
      pending >>>= 8;
      bits -= 8;
    }
  };
  const dictionary = new Map();
  let nextCode = 258;
  let previous = pixels[0];
  emit(256);
  for (const pixel of pixels.slice(1)) {
    const key = previous * 2 + pixel;
    if (dictionary.has(key)) {
      previous = dictionary.get(key);
      continue;
    }
    emit(previous);
    if (nextCode === 490) {
      emit(256);
      dictionary.clear();
      nextCode = 258;
    } else {
      dictionary.set(key, nextCode++);
    }
    previous = pixel;
  }
  emit(previous);
  emit(257);
  if (bits) bytes.push(pending);
  const blocks = [8];
  for (let offset = 0; offset < bytes.length; offset += 255) {
    const block = bytes.slice(offset, offset + 255);
    blocks.push(block.length, ...block);
  }
  return [...blocks, 0];
}

function gif(images, color) {
  const rgb = color.slice(1).match(/../g).map(hex => Number.parseInt(hex, 16));
  const bytes = [
    ...Buffer.from('GIF89a'), ...word(size), ...word(size), 0x80, 0, 0, 0, 0, 0, ...rgb,
    0x21, 0xff, 11, ...Buffer.from('NETSCAPE2.0'), 3, 1, 0, 0, 0
  ];
  for (const pixels of images) {
    bytes.push(0x21, 0xf9, 4, 9, ...word(8), 0, 0);
    bytes.push(0x2c, 0, 0, 0, 0, ...word(size), ...word(size), 0, ...compress(pixels));
  }
  return Buffer.from([...bytes, 0x3b]);
}

process.env.PLAYWRIGHT_BROWSERS_PATH ??= path.join(root, '.playwright-browsers');
const { chromium } = await import('playwright');
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await fs.mkdir(output, { recursive: true });
  for (const [icon, tone] of jobs) {
    const svg = await fs.readFile(path.join(root, 'src/wwwroot/icons', icon + '.svg'), 'utf8');
    const color = tokens.match(new RegExp('--' + tone + '-fg: (#[A-F0-9]{6})'))[1];
    const images = await page.evaluate(async ({ svg, icon, size, frames }) => {
      const source = new globalThis.Image();
      source.src = 'data:image/svg+xml,' + encodeURIComponent(svg.replace('currentColor', 'black'));
      await source.decode();
      const canvas = globalThis.document.createElement('canvas');
      canvas.width = canvas.height = size;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      const images = [];
      for (let index = 0; index < frames; index++) {
        const angle = index / frames * Math.PI * 2;
        const beat = (1 - Math.cos(angle)) / 2;
        context.clearRect(0, 0, size, size);
        context.save();
        context.translate(size / 2, size / 2);
        if (icon === 'refresh') context.rotate(angle);
        else if (icon === 'hourglass') context.rotate(Math.PI * beat);
        else if (icon === 'send') context.translate(4 * beat, -5 * beat);
        else if (icon === 'x-circle') context.rotate(Math.sin(angle * 2) * beat * .18);
        else context.scale(1 + beat * .13, 1 + beat * .13);
        context.drawImage(source, -20, -20, 40, 40);
        context.restore();
        const data = context.getImageData(0, 0, size, size).data;
        images.push(Array.from({ length: size * size }, (_, i) => Number(data[i * 4 + 3] >= 110)));
      }
      return images;
    }, { svg, icon, size, frames });
    await fs.writeFile(path.join(output, icon + '-' + tone + '.gif'), gif(images, color));
  }
} finally {
  await browser.close();
}
