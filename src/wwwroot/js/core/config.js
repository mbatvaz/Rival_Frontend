export function basePath() {
  const value = document.documentElement.dataset.rvBasePath;
  if (!value || !value.startsWith('/') || !value.endsWith('/')) throw new Error('Missing static basePath.');
  return value;
}

export function localUrl(relative) {
  if (!relative.split('/').every(part => /^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*$/.test(part))) {
    throw new Error('Expected a relative local asset path.');
  }
  return basePath() + relative;
}
