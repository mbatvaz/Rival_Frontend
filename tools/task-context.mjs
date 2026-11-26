import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { readJson, root } from './lib/site.mjs';

const read = file => fs.readFile(path.join(root, file), 'utf8');
const json = file => readJson(path.join(root, file));
const unique = values => [...new Set(values)];
const prose = text => text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
const section = (text, heading) => text.split(/^## /m).slice(1).find(part => part.startsWith(heading));
const firstParagraph = text => prose((text ?? '').split(/\r?\n\s*\r?\n/)[1] ?? '');

function groupedPaths(files) {
  const groups = new Map();
  for (const file of files) {
    const directory = path.posix.dirname(file);
    const current = groups.get(directory) ?? [];
    current.push(path.posix.basename(file));
    groups.set(directory, current);
  }
  return Object.fromEntries(groups);
}

async function availableFiles(files) {
  const found = await Promise.all(files.map(file => fs.access(path.join(root, file)).then(() => file, () => null)));
  return found.filter(Boolean);
}

function currentGate(plan) {
  const gate = section(plan, 'Current owner gate');
  return firstParagraph(gate).slice(0, 360);
}

function pageStatus(page) {
  return page.implementationStatus ?? (page.routeTemplate === 'embedded balance' ? 'embedded' : page.template ? 'implemented' : 'placeholder');
}

async function phaseContext(pages, phase, plan) {
  const name = 'Phase ' + phase;
  const scoped = pages.filter(page => page.phase === name);
  const folder = (await fs.readdir(path.join(root, 'phases'))).find(dir => dir.startsWith('PHASE_' + phase + '_'));
  if (!folder) throw new Error('Unknown phase: ' + phase);
  return {
    phase: name, gate: currentGate(plan),
    pages: Object.fromEntries(scoped.map(page => [page.id, pageStatus(page)])),
    package: 'phases/' + folder + '/README.md'
  };
}

function reuseContext(page, graph) {
  const edges = graph?.edges.filter(edge => edge.from === 'page:' + page.id) ?? [];
  const features = new Set(edges.filter(edge => edge.type === 'binds-feature').map(edge => edge.to));
  const modules = graph?.edges.filter(edge => edge.type === 'loads-module' && features.has(edge.from)
    && edge.to.startsWith('src/wwwroot/js/features/')).map(edge => edge.to) ?? [];
  return {
    page: page.id, route: page.previewPath, template: 'src/Views/' + page.template,
    sharedPartials: unique(edges.filter(edge => edge.type === 'uses-component'
      && edge.to.startsWith('src/Views/Shared/Components/')).map(edge => edge.to)).slice(0, 5),
    candidateModules: unique(modules).slice(0, 3)
  };
}

async function pageContext(page, plan, details, reuse) {
  const [manifest, decisions, graph] = await Promise.all([
    json('design-export/MANIFEST.json'), read('docs/DECISION_LOG.md'),
    page.template || reuse ? json('docs/ai/project-graph.json').catch(() => null) : null
  ]);
  const mapped = manifest.pages.find(item => item.id === page.id);
  const html = await availableFiles(mapped?.sourceHtml ?? []);
  const styled = html.filter(file => !file.endsWith('.dc.html'));
  // A styled export and its .dc source are the same board. Keep unmatched .dc boards visible.
  const names = new Set(styled.map(file => path.posix.basename(file, '.html')));
  const designs = details ? html : [...styled, ...html.filter(file => file.endsWith('.dc.html')
    && !names.has(path.posix.basename(file, '.dc.html')))];
  const edges = graph?.edges.filter(edge => edge.from === 'page:' + page.id) ?? [];
  const directory = page.template ? path.posix.dirname(page.template) + '/' : '';
  const tests = unique(edges.filter(edge => edge.type === 'tested-by').map(edge => edge.to));
  const views = edges.filter(edge => edge.type === 'uses-component' && edge.to.startsWith('src/Views/' + directory));
  const brief = (await availableFiles(['docs-work/desktop-layouts/' + page.id + '.md']))[0];
  const decisionMatches = decisions.split(/^## /m).slice(1).filter(part => part.startsWith('DEC-') && part.includes(page.id));
  return {
    page: page.id, phase: page.phase, status: pageStatus(page), route: page.previewPath,
    gate: currentGate(plan), decisionHeadings: decisionMatches.slice(0, 3).map(part => part.split(/\r?\n/, 1)[0]),
    ...(!page.template && { reuseMap: 'docs/COMPONENT_REUSE_MATRIX.md#implemented-reuse' }),
    ...(reuse && { reuse: reuseContext(reuse, graph) }),
    ...(page.template && { template: 'src/Views/' + page.template }),
    ...(page.mockData && { fixture: 'src/' + page.mockData }),
    ...(brief && { brief }),
    ...(tests.length && { candidateTests: { count: tests.length, paths: tests.slice(0, details ? 12 : 3) } }),
    ...(details && { localViews: views.map(edge => edge.to), variants: page.variants?.map(item => item.query) }),
    design: groupedPaths(designs),
    ...(details && mapped && { mapping: mapped.mappingStatus, artboardSelector: mapped.artboardSelector,
      relatedPages: mapped.relatedPageIds }),
    ...(mapped?.preferredSourceHtml && html.includes(mapped.preferredSourceHtml) && { preferredBoard: path.posix.basename(mapped.preferredSourceHtml) }),
    ...(mapped?.screenshots?.length && details && { screenshotCandidates: mapped.screenshots.slice(0, 8) }),
    ...(html.length !== (mapped?.sourceHtml?.length ?? 0) && { missingDesignPaths: (mapped?.sourceHtml?.length ?? 0) - html.length }),
    ...((page.template || reuse) && !graph && { map: 'unavailable' })
  };
}

try {
  const { values, positionals } = parseArgs({
    options: { phase: { type: 'string' }, details: { type: 'boolean' }, reuse: { type: 'string' } }, allowPositionals: true
  });
  if (positionals.length !== (values.phase ? 0 : 1) || (values.phase && (!/^0[1-9]$/.test(values.phase) || values.reuse))) {
    throw new Error('Usage: node tools/task-context.mjs PAGE-ID [--reuse ACCEPTED-PAGE-ID] [--details] | --phase NN');
  }
  const [{ pages }, plan] = await Promise.all([json('src/page-registry.json'), read('docs/PHASE_PLAN.md')]);
  const page = pages.find(item => item.id === positionals[0]?.toUpperCase());
  if (!values.phase && !page) throw new Error('Unknown page: ' + positionals[0]);
  const reuse = pages.find(item => item.id === values.reuse?.toUpperCase());
  if (values.reuse && (!reuse?.template || pageStatus(reuse) !== 'accepted')) {
    throw new Error('Reuse requires an accepted page with a template: ' + values.reuse);
  }
  const result = values.phase ? await phaseContext(pages, values.phase, plan) : await pageContext(page, plan, values.details, reuse);
  console.log(JSON.stringify(result));
} catch (error) {
  console.error('Task context: ' + error.message);
  process.exitCode = 1;
}
