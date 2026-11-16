import nunjucks from 'nunjucks';

// Nunjucks AST proves template references, not that a conditional include executes.
export function templateFacts(text, file = 'src/Views/unknown.njk') {
  const facts = { links: [], classes: [], features: [], gaps: [] };
  function visit(node, conditional = false) {
    if (!node || typeof node !== 'object') return;
    conditional ||= ['If', 'IfAsync', 'For', 'AsyncEach', 'AsyncAll'].includes(node.typename);
    if (['Extends', 'Include', 'Import', 'FromImport'].includes(node.typename)) {
      if (node.template?.typename === 'Literal' && typeof node.template.value === 'string') facts.links.push({
        type: node.typename.toLowerCase(), target: (file.startsWith('preview-review/') ? 'preview-review/' : 'src/Views/') + node.template.value,
        line: node.lineno + 1, detail: conditional ? 'Conditional template reference; execution not proven.' : 'Literal template reference.'
      });
      else facts.gaps.push({ line: node.lineno + 1, reason: 'Dynamic template reference.' });
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(child => visit(child, conditional));
      else if (value && typeof value === 'object') visit(value, conditional);
    }
  }
  visit(nunjucks.parser.parse(text));
  const markup = text.replace(/\{#[\s\S]*?#\}|<!--[\s\S]*?-->/g, '');
  for (const match of markup.matchAll(/\bclass="([^"]*)"/g)) {
    facts.classes.push(...(match[1].match(/\b(?:rv|ri)-[a-zA-Z0-9_-]+/g) || []));
  }
  for (const match of markup.matchAll(/\bdata-rv="([^"]*)"/g)) {
    facts.features.push(...match[1].split(/\{[{%]/)[0].trim().split(/\s+/).filter(Boolean));
    if (match[1].includes('{')) facts.gaps.push({ reason: 'Conditional feature binding; only the literal prefix is indexed.' });
  }
  if (/class="[^"\n]*\{[{%]/.test(text)) facts.gaps.push({ reason: 'Dynamic class fragments; class index is partial.' });
  facts.classes = [...new Set(facts.classes)].sort();
  facts.features = [...new Set(facts.features)].sort();
  return facts;
}
