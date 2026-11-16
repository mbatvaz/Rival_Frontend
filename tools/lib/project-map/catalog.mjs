const registryPath = 'src/page-registry.json';
const manifestPath = 'design-export/MANIFEST.json';
const tokenPath = 'design-export/design-system-v2/tokens/tokens.json';
export function catalog(records, addNode, addEdge, gaps) {
  const data = file => records[file]?.facts.data;
  const pages = data(registryPath)?.pages || [];
  const designs = data(manifestPath)?.pages || [];
  for (const page of pages) {
    const id = 'page:' + page.id;
    addNode({ id, kind: 'page', label: page.id, route: page.previewPath, phase: page.phase,
      implementation: page.implementationStatus || 'placeholder', variants: page.variants || [],
      resultDefault: page.resultDefault || null, source: registryPath });
    addNode({ id: 'route:' + page.previewPath, kind: 'route', label: page.previewPath });
    addEdge(id, 'route:' + page.previewPath, 'implements-route', registryPath, 'CONFIRMED', 'Declared preview route; not a live backend endpoint.');
    if (page.template) addEdge(id, 'src/Views/' + page.template, 'renders', registryPath);
    const rendered = records[registryPath]?.facts.rendered?.[page.id];
    if (rendered?.error) gaps.push({ source: id, reason: 'In-memory default render failed: ' + rendered.error });
    if (rendered && !rendered.error) {
      addNode({ id, renderedTemplates: rendered.templates, renderedKind: rendered.kind });
      for (const template of rendered.templates) addEdge(id, template, 'uses-component', registryPath,
        'CONFIRMED', 'Observed during in-memory default static render; not browser execution.');
      for (const feature of rendered.features) addEdge(id, 'feature:' + feature, 'binds-feature', registryPath,
        'CONFIRMED', 'Observed data-rv in default static render.');
      for (const asset of rendered.assets) addEdge(id, asset, 'uses-asset', registryPath,
        'CONFIRMED', 'Local asset URL in default static render; content/visual fidelity not evaluated.');
      const classes = new Set(rendered.classes);
      for (const [file, record] of Object.entries(records).filter(([file]) => file.startsWith('src/wwwroot/') && file.endsWith('.css'))) {
        if (record.facts.classes?.some(name => classes.has(name))) addEdge(id, file, 'uses-style', registryPath,
          'INFERRED', 'Selector class appears in rendered page; cascade and state not proven.');
      }
    }
    if (page.mockData) addEdge(id, 'src/' + page.mockData, 'reads-mock-data', registryPath);
    if (page.phase === 'Phase 03' && records['tools/lib/product.mjs']) {
      for (const name of ['catalog', 'results']) addEdge(id, 'src/MockData/booking/' + name + '.json',
        'reads-mock-data', 'tools/lib/product.mjs', 'CONFIRMED', 'Explicit Phase 03 branch of productContext, called by static build.');
    }
    const phase = Object.keys(records).find(file => file.startsWith('phases/PHASE_' + page.phase.slice(-2) + '_') && file.endsWith('/README.md'));
    if (phase) addEdge(id, phase, 'belongs-to-phase', registryPath);
    const brief = 'docs-work/desktop-layouts/' + page.id + '.md';
    if (records[brief]) addEdge(id, brief, 'references-brief', brief, 'CONFIRMED', 'Brief exists; inspect its owner approval before changing composition.');
    const design = designs.find(item => item.id === page.id);
    addNode({ id, design: { preferredSourceHtml: design?.preferredSourceHtml || null,
      artboardSelector: design?.artboardSelector || null, screenshots: design?.screenshots || [],
      mappingStatus: design?.mappingStatus || 'unknown' } });
    const evidence = [...(design?.sourceHtml || []), ...(design?.screenshots || []).map(item => typeof item === 'string' ? item : item.path)];
    for (const file of evidence) {
      addNode({ id: file, kind: 'design-reference', path: file, label: file, knowledge: 'original-design-evidence' });
      addEdge(id, file, 'references-design', manifestPath, 'CONFIRMED', 'Manifest candidate, not a task-specific source selection.');
    }
    if (!design?.preferredSourceHtml) gaps.push({ source: id, reason: 'No preferred source HTML in manifest.' });
    if (!design?.artboardSelector) gaps.push({ source: id, reason: 'No artboard selector in manifest.' });
    for (const [file, record] of Object.entries(records).filter(([file]) => /^tests\/.*\.(?:js|mjs)$/.test(file))) {
      const literal = record.facts.literals?.find(item => item.value.includes(page.previewPath.replace(/^\//, ''))
        || item.value === page.id);
      if (literal) addEdge(id, file, 'tested-by', file, 'INFERRED', 'AST literal references route/ID; execution and state coverage not proven.', literal.line);
    }
  }
  for (const definition of records['docs/DECISION_LOG.md']?.facts.definitions || []) {
    const id = 'decision:' + definition.id;
    addNode({ id, kind: 'decision', label: definition.id, title: definition.title, source: 'docs/DECISION_LOG.md', line: definition.line });
    addEdge(id, 'docs/DECISION_LOG.md', 'defined-in', 'docs/DECISION_LOG.md', 'CONFIRMED', 'Decision heading.', definition.line);
  }
  for (const [file, record] of Object.entries(records).filter(([file]) => file.startsWith('docs-work/desktop-layouts/'))) {
    for (const id of record.facts.decisions || []) {
      // Some early IDs occur in prose rather than headings; they remain references to the log.
      addEdge(file, 'docs/DECISION_LOG.md', 'references-decision', file, 'CONFIRMED', 'Brief mentions ' + id + '; inspect its full decision text.');
    }
  }
  for (const [family, group] of Object.entries(data(tokenPath) || {})) {
    const define = (name, value) => {
      const id = 'token:--' + name;
      addNode({ id, kind: 'token', label: '--' + name, family, value, source: tokenPath });
      addEdge(tokenPath, id, 'defines-token', tokenPath);
    };
    for (const token of group?.tokens || []) define(token.name, token.value);
    if (family === 'type') {
      for (const [name, value] of Object.entries(group.families || {})) define('font-' + name, value);
      for (const style of (group.groups || []).flatMap(item => item.styles)) {
        for (const [suffix, field] of [['size', 'fontSize'], ['line', 'lineHeight'], ['weight', 'fontWeight']]) define(style.name + '-' + suffix, style[field]);
      }
    }
  }
  // Planned MVC targets remain symbolic. Never claim the backend files exist.
  for (const file of Object.keys(records).filter(file => file.startsWith('src/Views/') && file.endsWith('.njk'))) {
    const target = 'planned:mvc/' + file.slice('src/'.length).replace(/\.njk$/, '.cshtml');
    addNode({ id: target, kind: 'planned-mvc', label: target.slice(8), planned: true });
    addEdge(file, target, 'migrates-to', 'docs/RIVAL_PROJECT_CONTRACT.md', 'INFERRED', 'Razor mapping convention only; backend source unavailable.');
  }
}
