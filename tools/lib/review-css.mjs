// Keep only rules that can affect this page's rendered/generated class vocabulary.
function blocks(text) {
  const result = [];
  let start = 0;
  let open = -1;
  let depth = 0;
  let quote = '';
  text = text.replace(/\/\*[\s\S]*?\*\//g, '');
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (quote) { if (char === quote && text[index - 1] !== '\\') quote = ''; continue; }
    if (char === '"' || char === "'") { quote = char; continue; }
    if (char === ';' && !depth) start = index + 1;
    if (char === '{') { if (!depth++) open = index; }
    if (char === '}' && !--depth) {
      result.push([text.slice(start, open).trim(), text.slice(open + 1, index)]);
      start = index + 1;
    } else if (char === '}' && depth < 0) depth = 0;
  }
  return result;
}
function possible(selector, classes, html) {
  // Pseudo alternatives/negations are conservative; mandatory outer classes scope the rule.
  let outer = selector;
  let previous;
  do { previous = outer; outer = outer.replace(/:(?:is|where|not|has)\([^()]*\)/g, ''); } while (outer !== previous);
  const required = [...outer.matchAll(/\.((?:rv|ri)-[\w-]+)/g)].map(match => match[1]);
  const candidates = [...selector.matchAll(/\.((?:rv|ri)-[\w-]+)/g)].map(match => match[1]);
  for (const match of outer.matchAll(/\[(data-rv-(?:booking-kind|booking-id|result-view))=["']([^"']+)["']\]/g)) {
    if (!html.includes(match[1] + '="' + match[2] + '"')) return false;
  }
  return required.every(name => classes.has(name)) && (!candidates.length || candidates.some(name => classes.has(name)));
}
export function reviewCss(text, classes, html = '') {
  const keyframes = [];
  const rules = blocks(text).flatMap(([selector, body]) => {
    if (/^@(media|supports|layer|container)\b/.test(selector)) {
      const content = reviewCss(body, classes, html);
      return content ? [selector + '{' + content + '}'] : [];
    }
    if (/^@keyframes\b/.test(selector)) { keyframes.push([selector, body]); return []; }
    if (/^@(?:font-face|property)\b/.test(selector)) return [selector + '{' + body + '}'];
    return selector.split(/,(?![^()]*\))/).some(part => possible(part, classes, html)) ? [selector + '{' + body + '}'] : [];
  }).join('\n');
  return (text.match(/@layer\s+[^;{}]+;/g) || []).join('\n') + rules + keyframes.filter(([selector]) => rules.includes(selector.split(/\s+/)[1]))
    .map(([selector, body]) => selector + '{' + body + '}').join('\n');
}
