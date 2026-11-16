import path from 'node:path';
import stylelint from 'stylelint';

// Obtain the PostCSS AST through the existing direct Stylelint dependency.
export async function styleFacts(text, file) {
  const facts = { links: [], classes: [], gaps: [] };
  const plugin = stylelint.createPlugin('map/collect', () => root => {
    root.walkAtRules('import', node => {
      const target = node.params.match(/^(?:url\(\s*)?["']([^"']+)["']/)?.[1];
      if (target?.startsWith('.')) facts.links.push({ type: 'imports',
        target: file.startsWith('preview-review/') && target.startsWith('../css/')
          ? 'src/wwwroot/' + target.slice(3) : path.posix.normalize(path.posix.join(path.posix.dirname(file), target)),
        line: node.source.start.line, detail: 'CSS import.' });
      else facts.gaps.push({ line: node.source.start.line, reason: 'Unresolved or external CSS import.' });
    });
    root.walkRules(node => facts.classes.push(...(node.selector.match(/\.(?:rv|ri)-[\w-]+/g) || []).map(value => value.slice(1))));
    root.walkDecls(node => {
      if (node.prop.startsWith('--')) facts.links.push({ type: 'defines-token', target: 'token:' + node.prop,
        line: node.source.start.line, detail: node.value });
      for (const match of node.value.matchAll(/var\(\s*(--[\w-]+)/g)) facts.links.push({
        type: 'uses-token', target: 'token:' + match[1], line: node.source.start.line, detail: 'CSS custom-property reference.'
      });
      for (const match of node.value.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
        if (!/^(?:data:|https?:|#)/.test(match[1])) facts.links.push({ type: 'uses-asset',
          target: path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1])),
          line: node.source.start.line, detail: 'Literal CSS asset URL.' });
      }
    });
  });
  const result = await stylelint.lint({ code: text, codeFilename: file,
    config: { plugins: [plugin], rules: { 'map/collect': true } } });
  const failures = result.results.flatMap(item => item.parseErrors || []);
  if (failures.length) throw new Error(failures.map(item => item.text).join('; '));
  facts.classes = [...new Set(facts.classes)].sort();
  return facts;
}
