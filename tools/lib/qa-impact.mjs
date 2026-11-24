import { focusedStyles } from './qa-coverage.mjs';
import { queryGraph } from './project-map/graph.mjs';

const structural = new Set(['renders', 'uses-component', 'extends', 'include', 'import', 'fromimport',
  'binds-feature', 'loads-module', 'imports', 'reads-mock-data', 'uses-asset']);
const globalInputs = [
  /^(?:package(?:-lock)?\.json|playwright\.config\.mjs|src\/(?:page-registry|site-config)\.json)$/,
  /^design-export\/design-system-v2\//,
  /^src\/wwwroot\/css\/(?:app\.css$|00-tokens\/|01-base\/)/,
  /^src\/wwwroot\/js\/(?:app\.js$|core\/)/,
  /^tools\/(?:build-static|run-tests|serve-static|playwright|preview-browser-check|dev)\.mjs$/,
  /^tools\/lib\/(?:site|registry|format|design-system|product|customer(?:-requests)?|preview-review|review-[^/]+|preview-options)\.mjs$/
];

const isDoc = file => /\.md$/.test(file) || file.startsWith('docs/ai/project-graph.json');
const isSpec = file => /^tests\/.*\.spec\.[cm]?js$/.test(file);
const localTool = /^(?:\.codex\/hooks\.json$|tools\/(?:tests\/|lib\/(?:project-map\/|qa-)|project-map\.mjs$|resolve-annotation\.mjs$|annotation-context-hook\.mjs$|qa-(?:affected|probe)\.mjs$))/;

function toolTests(files) {
  const selected = new Set();
  for (const file of files.filter(file => localTool.test(file))) {
    if (file.startsWith('tools/tests/') && file.endsWith('.test.mjs')) selected.add(file);
    else if (file.includes('qa-')) selected.add('tools/tests/qa-impact.test.mjs');
    else if (file.includes('annotation') || file === '.codex/hooks.json') selected.add('tools/tests/annotation-context.test.mjs');
    else selected.add('tools/tests/project-map.test.mjs');
  }
  return [...selected].sort();
}

function linkedPages(graph, file) {
  const incoming = new Map();
  for (const edge of graph.edges) {
    if (!structural.has(edge.type) || edge.from === 'src/wwwroot/js/app.js') continue;
    const sources = incoming.get(edge.to) ?? [];
    sources.push(edge.from);
    incoming.set(edge.to, sources);
  }
  const visited = new Set([file]);
  const pages = [];
  for (const item of visited) {
    if (item.startsWith('page:')) pages.push(item.slice(5));
    else for (const source of incoming.get(item) ?? []) visited.add(source);
  }
  if (!file.endsWith('.js') || !visited.has('src/wwwroot/js/features/booking/index.js')) return pages;
  // Booking views share a dispatcher with route-specific imports.
  const rendered = graph.sources['src/page-registry.json']?.facts.rendered ?? {};
  return pages.filter(id => !rendered[id]?.kind || queryGraph(graph, 'page:' + id, 1).navigation?.modules.includes(file));
}

function cssPages(graph, file) {
  const facts = graph.sources[file]?.facts;
  const rendered = graph.sources['src/page-registry.json']?.facts.rendered ?? {};
  if (!facts?.anchors?.length || facts.links.some(edge => edge.type === 'imports')) return null;
  const pages = new Set();
  for (const anchors of facts.anchors) {
    if (!anchors.length) return null;
    const contains = (page, anchor) => {
      if (anchor[0] === '.') return page.classes?.includes(anchor.slice(1));
      if (anchor[0] === '#') return page.ids?.includes(anchor.slice(1));
      return page.hooks?.includes(anchor);
    };
    let matches = Object.entries(rendered).filter(([, page]) => anchors.every(anchor => contains(page, anchor)));
    const staticHooks = anchors.filter(anchor => !anchor.startsWith('data-rv-'));
    if (!matches.length && staticHooks.length) {
      // The runtime may add state attributes after the default render.
      matches = Object.entries(rendered).filter(([, page]) => staticHooks.every(anchor => contains(page, anchor)));
    }
    if (!matches.length) {
      // Conditional/dynamic selectors need source inspection or wider coverage.
      const possible = graph.edges.filter(edge => edge.to === file && edge.type === 'uses-style' && edge.from.startsWith('page:'));
      if (!possible.length) return null;
      possible.forEach(edge => pages.add(edge.from.slice(5)));
    }
    matches.forEach(([id]) => pages.add(id));
  }
  return [...pages];
}

export function planImpact(files, graphs, { full = false, subpath = false, element = false, cosmetic = false, page } = {}) {
  const result = { level: 'none', pages: [], specs: [], docs: files.some(isDoc),
    tools: files.some(file => localTool.test(file)), toolSpecs: toolTests(files), subpath, reasons: [] };
  const product = files.filter(file => !isDoc(file) && !localTool.test(file));
  const broad = reason => ({ ...result, level: 'full', subpath: true, reasons: [...result.reasons, reason] });
  if (cosmetic) {
    if (full || subpath || element || !files.length ||
      files.some(file => !/^src\/wwwroot\/css\/(?:03-components|04-pages)\/[^/]+\.css$/.test(file))) {
      throw new Error('--cosmetic requires explicit component or page stylesheets and root-only verification.');
    }
    return { ...result, level: 'cosmetic', pages: page ? [page] : [],
      reasons: ['Scoped CSS check for a reviewed appearance-only change'] };
  }
  if (full) return broad('Explicit full acceptance');
  if (!product.length) return { ...result, level: files.length ? 'static' : 'none' };
  const globals = product.filter(file => globalInputs.some(pattern => pattern.test(file)));
  if (globals.length) return broad('Global inputs: ' + globals.join(', '));
  if (!graphs.length) return broad('Dependency map unavailable');

  const affected = new Set();
  const ownership = new Map();
  const specs = new Set(product.filter(isSpec));
  const source = product.filter(file => !isSpec(file));
  for (const file of source) {
    const known = graphs.filter(graph => graph.sources[file] || graph.edges.some(edge => edge.to === file));
    const related = known.map(graph => file.endsWith('.css') ? cssPages(graph, file) : linkedPages(graph, file));
    const owners = related.flatMap(pages => pages ?? []);
    if (!owners.length || related.includes(null)) {
      return broad('Unresolved scope: ' + file);
    }
    result.reasons.push(file + ' → ' + [...new Set(owners)].sort().join(', '));
    for (const id of new Set(owners)) {
      affected.add(id);
      ownership.set(id, [...(ownership.get(id) ?? []), file]);
    }
  }
  result.pages = [...affected].sort();

  const onlyCss = source.length && source.every(file => file.endsWith('.css'));
  result.subpath ||= Boolean(source.length && (!onlyCss || source.some(file => graphs.some(graph =>
    graph.sources[file]?.facts.links.some(edge => edge.type === 'uses-asset')))));
  if (element && onlyCss && !specs.size && !result.subpath && affected.size === 1 && affected.has(page)) {
    return { ...result, level: 'element' };
  }
  for (const id of affected) {
    const focused = ownership.get(id).map(file => focusedStyles[file]?.[id]);
    if (focused.every(Boolean)) {
      focused.forEach(file => specs.add(file));
      continue;
    }
    const related = graphs.flatMap(graph => graph.edges.filter(edge => edge.from === 'page:' + id && edge.type === 'tested-by'));
    if (!related.length) return broad('No linked browser coverage for ' + id);
    related.forEach(edge => specs.add(edge.to));
  }
  return { ...result, level: affected.size > 1 ? 'shared' : 'page', specs: [...specs].sort() };
}
