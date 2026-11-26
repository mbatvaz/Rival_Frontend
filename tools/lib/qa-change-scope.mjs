import { isDeepStrictEqual } from 'node:util';

export const reviewVariantsSpec = 'tests/preview-review/variants.spec.mjs';
const registry = 'src/page-registry.json';
const styles = 'src/wwwroot/css/app.css';
const bootstrap = 'src/wwwroot/js/app.js';
const scopedKeys = new Set(['notes', 'implementationStatus', 'template', 'mockData', 'variants', 'titleFa']);
const reviewKeys = new Set(['notes', 'implementationStatus']);

export const scopeableInput = file => [registry, styles, bootstrap].includes(file);

function registryScope(before, after) {
  const { pages: oldPages, ...oldDefaults } = JSON.parse(before);
  const { pages: newPages, ...newDefaults } = JSON.parse(after);
  if (!isDeepStrictEqual(oldDefaults, newDefaults) || oldPages.length !== newPages.length) return null;
  const pages = [];
  for (const [index, page] of newPages.entries()) {
    const old = oldPages[index];
    const modified = [...new Set([...Object.keys(old), ...Object.keys(page)])]
      .filter(key => !isDeepStrictEqual(old[key], page[key]));
    if (modified.some(key => !scopedKeys.has(key))) return null;
    if (modified.length) pages.push({ id: page.id, reviewOnly: modified.every(key => reviewKeys.has(key)) });
  }
  return { paths: [], pages };
}

function wiringScope(file, before, after) {
  const previous = before.trimEnd().split(/\r?\n/);
  const paths = new Set();
  const names = new Set(previous.map(line => line.match(/^registerFeature\('([^']+)'/)?.[1]).filter(Boolean));
  let index = 0;
  for (const line of after.trimEnd().split(/\r?\n/)) {
    if (line === previous[index]) {
      index++;
      continue;
    }
    // Scope only literal additions that leave existing statements and their order intact.
    const registration = file === bootstrap
      ? line.match(/^registerFeature\('([\w-]+)', \(\) => import\('\.\/((?:features|components)\/(?:[\w-]+\/)*[\w-]+\.js)'\)\);$/)
      : null;
    const relative = file === styles
      ? line.match(/^@import url\("\.\/((?:03-components|04-pages)\/[\w-]+\.css)"\);$/)?.[1]
      : registration?.[2];
    if (!relative) return null;
    if (registration) {
      if (names.has(registration[1])) return null;
      names.add(registration[1]);
    }
    paths.add(file.slice(0, file.lastIndexOf('/') + 1) + relative);
  }
  return index === previous.length && paths.size ? { paths: [...paths], pages: [] } : null;
}

export function classifyInput(file, before, after) {
  if (!before || !after || !scopeableInput(file)) return null;
  if (file === registry) {
    try {
      const scope = registryScope(before, after);
      return scope?.pages.length ? scope : null;
    } catch {
      return null;
    }
  }
  return wiringScope(file, before, after);
}
