import fs from 'node:fs/promises';
import path from 'node:path';

export const browserVendorFiles = {
  'embla.js': 'node_modules/embla-carousel/esm/embla-carousel.esm.js',
  'embla-carousel.LICENSE': 'tools/lib/embla-carousel.LICENSE',
  'motion.js': 'node_modules/framer-motion/dist/dom-mini.js',
  'motion.LICENSE': 'node_modules/motion/LICENSE.md',
  'framer-motion.LICENSE': 'node_modules/framer-motion/LICENSE.md',
  'motion-dom.LICENSE': 'node_modules/motion-dom/LICENSE.md',
  'motion-utils.LICENSE': 'node_modules/motion-utils/LICENSE.md',
  'tslib.LICENSE': 'node_modules/tslib/LICENSE.txt',
  'tslib-CopyrightNotice.txt': 'node_modules/tslib/CopyrightNotice.txt',
  'focus-trap.js': 'node_modules/focus-trap/dist/focus-trap.esm.min.js',
  'focus-trap.LICENSE': 'node_modules/focus-trap/LICENSE',
  'tabbable.js': 'node_modules/tabbable/dist/index.esm.min.js',
  'tabbable.LICENSE': 'node_modules/tabbable/LICENSE',
  'photoswipe.js': 'node_modules/photoswipe/dist/photoswipe.esm.min.js',
  'photoswipe.css': 'node_modules/photoswipe/dist/photoswipe.css',
  'photoswipe.LICENSE': 'node_modules/photoswipe/LICENSE',
  'cropper.js': 'node_modules/cropperjs/dist/cropper.esm.min.js',
  'cropper.LICENSE': 'node_modules/cropperjs/LICENSE',
  'gesture.js': 'node_modules/@use-gesture/vanilla/dist/use-gesture-vanilla.esm.js',
  'gesture.LICENSE': 'node_modules/@use-gesture/vanilla/LICENSE',
  'gesture-core.LICENSE': 'node_modules/@use-gesture/core/LICENSE',
  'gesture-core.js': 'node_modules/@use-gesture/core/dist/use-gesture-core.esm.js',
  'gesture-actions.js': 'node_modules/@use-gesture/core/actions/dist/use-gesture-core-actions.esm.js',
  'gesture-utils.js': 'node_modules/@use-gesture/core/utils/dist/use-gesture-core-utils.esm.js',
  'gesture-types.js': 'node_modules/@use-gesture/core/types/dist/use-gesture-core-types.esm.js',
  'actions-fe213e88.esm.js': 'node_modules/@use-gesture/core/dist/actions-fe213e88.esm.js',
  'maths-0ab39ae9.esm.js': 'node_modules/@use-gesture/core/dist/maths-0ab39ae9.esm.js'
};

export async function copyBrowserVendor(root, out) {
  const target = path.join(out, 'vendor');
  await fs.mkdir(target, { recursive: true });
  for (const [name, source] of Object.entries(browserVendorFiles)) {
    const bytes = await fs.readFile(path.join(root, source), 'utf8');
    // The browser loads these files directly, without a bundler or an import map.
    let local = name === 'focus-trap.js' ? bytes.replace('from"tabbable"', 'from"./tabbable.js"') : bytes;
    if (name === 'focus-trap.js' && local === bytes) throw new Error('Focus Trap browser import changed.');
    if (name.startsWith('gesture') && name.endsWith('.js')) {
      local = local.replace(/'@use-gesture\/core(?:\/(actions|utils|types))?'/g, (_, module) => `'./gesture-${module ?? 'core'}.js'`)
        .replaceAll('../../dist/', './');
    }
    if (name.startsWith('gesture') || name.startsWith('actions-')) local = local.replaceAll('process.env.NODE_ENV', '"production"');
    if (name === 'motion.js') {
      if (!bytes.includes('e(exports)')) throw new Error('Motion browser distribution changed.');
      local = `const exports = {}; const module = { exports };\n${bytes}\nexport const animateMini = module.exports.animate;\n`;
    }
    await fs.writeFile(path.join(target, name), local.replace(/^\/\/# sourceMappingURL=.*$/gm, ''));
  }
}
