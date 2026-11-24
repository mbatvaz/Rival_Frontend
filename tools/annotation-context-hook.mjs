function targets(prompt) {
  const comments = prompt.split(/^## User Comment \d+\s*$/m).slice(1);
  const pairs = new Map();
  for (const comment of comments) {
    const metadata = comment.split(/^Comment:\s*$/m, 1)[0];
    const url = metadata.match(/^Page URL: (https?:\/\/[^\s]+)\s*$/m)?.[1];
    const selector = metadata.match(/^Target selector: ([^\r\n]+)$/m)?.[1].trim();
    if (url && selector && url.length <= 1024 && selector.length <= 1024) {
      pairs.set(JSON.stringify([url, selector]), [url, selector]);
    }
    if (pairs.size === 4) break;
  }
  return [...pairs.values()];
}

try {
  let input = '';
  for await (const chunk of process.stdin.setEncoding('utf8')) input += chunk;
  const { hook_event_name: event, prompt } = JSON.parse(input);
  const annotations = event === 'UserPromptSubmit' && typeof prompt === 'string' && prompt.includes('# Browser comments:')
    ? targets(prompt) : [];
  if (annotations.length) {
    const { resolveAnnotation } = await import('./resolve-annotation.mjs');
    const results = await Promise.allSettled(annotations.map(([url, selector]) => resolveAnnotation(url, selector)));
    const candidates = results.flatMap(result => {
      if (result.status !== 'fulfilled' || result.value.status !== 'candidates') return [];
      const { page, entry, markup, styles } = result.value;
      return [{ page, entry, markup: markup?.files ?? [], styles: styles?.files ?? [] }];
    });
    if (candidates.length) console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: 'Rival source candidates for browser annotations (verify rule and consumers): ' + JSON.stringify(candidates)
      }
    }));
  }
} catch {
  // The prompt can continue with the normal repository routing.
}
