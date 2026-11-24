import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { inside, root, loadSite, readJson, src, matchPreviewRoute } from './lib/site.mjs';
import { planImpact } from './lib/qa-impact.mjs';
import { classifyInput, scopeableInput } from './lib/qa-change-scope.mjs';

const flags = {
  file: { type: 'string', multiple: true }, plan: { type: 'boolean' }, full: { type: 'boolean' },
  subpath: { type: 'boolean' }, element: { type: 'boolean' }, cosmetic: { type: 'boolean' }, url: { type: 'string' },
  selector: { type: 'string' }, width: { type: 'string', multiple: true },
  axe: { type: 'boolean' }, screenshot: { type: 'boolean' }
};
const regexLiteral = value => value.replace(/[.*+?^$\x7b\x7d()|[\]\\]/g, '\\$&');
const scopedSubpathFilter = ['--grep-invert', '@root-visual'];

function run(command, args, capture = false) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit', maxBuffer: 16 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(capture ? result.stderr.trim() || command + ' failed' : command + ' failed');
  return result.stdout;
}
const node = (args, capture) => run(process.execPath, args, capture);

function chosenFiles(explicit) {
  const git = args => run('git', args, true).split('\0').filter(Boolean);
  // Root upload archives are source evidence, outside the app's verification scope.
  const untracked = () => git(['ls-files', '--others', '--exclude-standard', '-z'])
    .filter(file => !/^[^/]+\.zip$/i.test(file));
  const files = explicit ?? [...git(['diff', '--no-renames', '--name-only', '-z', 'HEAD']),
    ...untracked()];
  return [...new Set(files.map(file => path.relative(root, inside(root, file)).replaceAll('\\', '/')))].sort();
}

async function inspectChanges(files) {
  const pairs = await Promise.all(files.filter(scopeableInput).map(async file => {
    const current = await fs.readFile(inside(root, file), 'utf8').catch(() => null);
    let previous = null;
    try { previous = run('git', ['show', 'HEAD:' + file], true); } catch { /* An unverified change stays global. */ }
    return [file, classifyInput(file, previous, current)];
  }));
  return new Map(pairs.filter(([, scope]) => scope));
}

async function graphsFor(files, full) {
  if (full || !files.some(file => /^(?:src\/|tests\/|preview-review\/)/.test(file))) return [];
  const [{ extract }, { buildGraph }] = await Promise.all([
    import('./lib/project-map/extract.mjs'), import('./lib/project-map/graph.mjs')
  ]);
  const saved = await readJson(path.join(root, 'docs/ai/project-graph.json')).catch(() => null);
  const live = await extract(root, saved?.sources);
  if (!live.changed.length && !live.removed.length && saved) return [saved];
  const current = buildGraph(live.records);
  // Keep previous consumers of removed or changed dependencies.
  return saved ? [current, saved] : [current];
}

async function evidence(values) {
  if (!values.url && !values.selector && !values.element && !values.width && !values.axe && !values.screenshot) return null;
  if (!values.url || !values.selector) throw new Error('A browser probe requires --url and --selector.');
  const [{ pages }, { basePath }] = await Promise.all([readJson(path.join(src, 'page-registry.json')), loadSite()]);
  const { page, url } = matchPreviewRoute(pages, values.url, basePath);
  if (!page?.template) throw new Error('Probe URL does not identify an implemented Rival page.');
  const widths = [...new Set((values.width ?? ['390']).map(Number))];
  if (widths.some(width => !Number.isInteger(width) || width < 240 || width > 3840)) {
    throw new Error('Use integer viewport widths between 240 and 3840.');
  }
  return { page: page.id, route: page.previewPath + url.search + url.hash, selector: values.selector,
    widths, axe: Boolean(values.axe), screenshot: Boolean(values.screenshot) };
}

function countSpecs(args) {
  const { suites } = JSON.parse(node(['tools/playwright.mjs', 'test', '--list', '--reporter=json', ...args], true));
  const count = entries => entries.reduce((total, suite) =>
    total + (suite.specs ?? []).reduce((n, spec) => n + spec.tests.length, 0) + count(suite.suites ?? []), 0);
  return count(suites);
}

async function verifyToolTests(specs) {
  const result = spawnSync(process.execPath, ['--test', '--test-reporter=tap', ...specs], {
    cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024
  });
  if (result.error) throw result.error;
  const log = 'test-results/tools-' + process.pid + '.log';
  await fs.mkdir(path.join(root, 'test-results'), { recursive: true });
  await fs.writeFile(path.join(root, log), result.stdout + result.stderr, 'utf8');
  const total = result.stdout.match(/^# tests (\d+)/m)?.[1];
  const passed = result.stdout.match(/^# pass (\d+)/m)?.[1];
  if (result.status !== 0) {
    const failure = result.stdout.match(/^not ok[^\r\n]*/m)?.[0]?.slice(0, 210);
    throw new Error([failure ?? 'Local tool checks failed', log].join(' | '));
  }
  console.log('Local tool checks passed' + (total ? ` | ${passed}/${total}` : '') + ' | ' + log);
}

async function verify(plan, files, testArgs, probe) {
  const present = await Promise.all(files.map(async file => (await fs.stat(inside(root, file)).catch(() => null))?.isFile() ? file : null));
  const js = present.filter(file => file && /\.(?:js|mjs)$/.test(file));
  const css = present.filter(file => file && file.endsWith('.css'));
  if (plan.level === 'cosmetic' && css.length !== files.length) throw new Error('A selected stylesheet does not exist.');
  const full = plan.level === 'full';
  if (full || js.length) node(['node_modules/eslint/bin/eslint.js',
    ...(full ? ['src/wwwroot/js', 'preview-review', 'tools', 'tests', 'playwright.config.mjs'] : js)]);
  if (full || css.length) node(['node_modules/stylelint/bin/stylelint.mjs',
    ...(full ? ['src/wwwroot/css/**/*.css', 'preview-review/**/*.css'] : css)]);
  if (full || plan.docs) node(['tools/validate-ai-docs.mjs']);
  if (plan.toolSpecs.length) await verifyToolTests(plan.toolSpecs);
  if (plan.level === 'cosmetic' && !probe) {
    node(['tools/build-static.mjs']);
    return;
  }
  if (['cosmetic', 'element', 'page', 'shared', 'full'].includes(plan.level)) {
    const probeOnly = ['cosmetic', 'element'].includes(plan.level);
    if (!probeOnly) node(['tools/lint-structure.mjs']);
    const args = ['tools/run-tests.mjs', '--agent', ...testArgs];
    if (probe) args.push('--probe', JSON.stringify(probe));
    if (probeOnly) args.push('--probe-only');
    if (plan.subpath) {
      // The root run rebuilds dist even if the subpath checks fail.
      try { node([...args, '--subpath', '--keep-output', ...(full ? [] : scopedSubpathFilter)]); }
      finally { node(args); }
    } else node(args);
  }
}

try {
  const { values } = parseArgs({ options: flags });
  if (values.cosmetic && !values.file) throw new Error('--cosmetic requires at least one --file.');
  const files = chosenFiles(values.file);
  const probe = await evidence(values);
  const graphs = values.cosmetic ? [] : await graphsFor(files, values.full).catch(() => []);
  const scopes = values.full || values.cosmetic ? new Map() : await inspectChanges(files);
  let plan = planImpact(files, graphs, { ...values, page: probe?.page, scopes });
  if (plan.specs.some(file => !graphs[0]?.sources[file])) {
    plan = { ...plan, level: 'full', specs: [], subpath: true, reasons: [...plan.reasons, 'A selected spec was removed or is unindexed'] };
  }
  const testArgs = plan.specs.map(file => regexLiteral(file) + '$');
  const hasSuite = ['page', 'shared', 'full'].includes(plan.level);
  if (plan.level === 'full' && !values.full && !values.plan) {
    throw new Error(plan.reasons.at(-1).slice(0, 400) + '. Use --plan to inspect or --full to run both suites.');
  }
  const rootTests = values.plan && hasSuite ? countSpecs(testArgs) : undefined;
  const subpathTests = rootTests && plan.subpath
    ? (plan.level === 'full' ? rootTests : countSpecs([...testArgs, ...scopedSubpathFilter])) : 0;
  const builds = (hasSuite || ['element', 'cosmetic'].includes(plan.level)) ? (plan.subpath ? 2 : 1) : 0;
  const { specs, reasons, ...scope } = plan;
  console.log(JSON.stringify({ ...scope, ...(values.plan ? { specs, reasons } : { specCount: specs.length, reason: reasons[0] }),
    fileCount: files.length, ...((values.plan || !hasSuite) ? {
      rootTests: rootTests ?? 0, subpathTests, browserTests: (rootTests ?? 0) + subpathTests
    } : {}), builds, probe: builds ? (probe?.widths.length ?? 0) * builds : 0 }));
  if (!values.plan) await verify(plan, files, testArgs, probe);
} catch (error) {
  console.error('Affected QA: ' + error.message);
  process.exitCode = 1;
}
