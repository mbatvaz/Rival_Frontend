import fs from 'node:fs/promises';
import path from 'node:path';
import { root, src, readJson, write } from './site.mjs';

// DS / DEC-023,024,032: preserve JSON token names; no legacy CSS bundles.
export async function prepareDesignSystem() {
  const ds = path.join(root, 'design-export/design-system-v2');
  const target = path.join(src, 'wwwroot');
  const tokens = await readJson(path.join(ds, 'tokens/tokens.json'));
  const wrap = declarations => `/* Generated from Design System v2 tokens.json. */\n@layer tokens {\n  :root {\n${declarations.map(d => `    ${d}`).join('\n')}\n  }\n}\n`;
  for (const family of ['color', 'spacing', 'radius', 'shadow', 'blur', 'duration', 'easing', 'size']) {
    const declarations = tokens[family].tokens.map(token => {
      const value = typeof token.value === 'object' ? token.value.light : token.value;
      return `--${token.name}: ${value.replace(/\{([\w-]+)\}/g, 'var(--$1)')};`;
    });
    await write(path.join(target, 'css/00-tokens', `${family}.css`), wrap(declarations));
  }
  // Contract §4.3 removes archived fallback families and expanded fonts.
  const type = Object.keys(tokens.type.families).map(name => `--font-${name}: "Yekan Bakh", sans-serif;`);
  for (const group of tokens.type.groups) for (const style of group.styles) {
    type.push(`--${style.name}-size: ${style.fontSize};`, `--${style.name}-line: ${style.lineHeight};`,
      `--${style.name}-weight: ${style.fontWeight};`);
  }
  await write(path.join(target, 'css/00-tokens/type.css'), wrap(type));
  const fontRules = [];
  await fs.mkdir(path.join(target, 'fonts'), { recursive: true });
  for (const [index, name] of ['Light', 'Regular', 'SemiBold'].entries()) {
    const file = `YekanBakh-${name}.woff2`;
    await fs.copyFile(path.join(ds, 'fonts', file), path.join(target, 'fonts', file));
    fontRules.push(`  @font-face {\n    font-family: "Yekan Bakh";\n    src: url("../../fonts/${file}") format("woff2");\n    font-weight: ${[300, 400, 600][index]};\n    font-style: normal;\n    font-display: swap;\n  }`);
  }
  await write(path.join(target, 'css/01-base/fonts.css'), `/* Generated local font faces. */\n@layer base {\n${fontRules.join('\n\n')}\n}\n`);
  const icons = (await fs.readdir(path.join(ds, 'assets/icons'))).filter(file => file.endsWith('.svg')).sort();
  if (icons.length !== 71) throw new Error(`Expected 71 canonical icons, got ${icons.length}.`);
  await fs.mkdir(path.join(target, 'icons'), { recursive: true });
  for (const file of icons) await fs.copyFile(path.join(ds, 'assets/icons', file), path.join(target, 'icons', file));
  const masks = icons.map(file => `  .ri-${path.basename(file, '.svg')} { --ri: url("../../icons/${file}"); }`);
  await write(path.join(target, 'css/03-components/icon-map.css'), `/* Generated local Lucide compatibility names. */\n@layer components {\n${masks.join('\n')}\n}\n`);
  await fs.mkdir(path.join(target, 'img'), { recursive: true });
  for (const file of ['rival-logo.png', 'rival-mark.png']) {
    await fs.copyFile(path.join(ds, 'assets/logo', file), path.join(target, 'img', file));
  }
}
