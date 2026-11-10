// Register lazy loaders centrally as later phases add approved features.
const loaders = new Map();
const initialized = new WeakMap();
const modules = new Map();

export function registerFeature(name, loader) {
  if (loaders.has(name)) throw new Error(`Feature already registered: ${name}`);
  loaders.set(name, loader);
}

async function initialize(element, name) {
  if (!loaders.has(name)) throw new Error(`Unknown data-rv feature: ${name}`);
  const states = initialized.get(element) ?? new Map();
  if (states.has(name)) return states.get(name);
  const pending = (async () => {
    if (!modules.has(name)) modules.set(name, Promise.resolve().then(loaders.get(name)));
    const module = await modules.get(name);
    await module.init(element);
  })();
  states.set(name, pending);
  initialized.set(element, states);
  try { await pending; }
  catch (error) {
    states.delete(name);
    modules.delete(name);
    throw error;
  }
}

export async function initializeFeatures(root = document) {
  const elements = [...root.querySelectorAll('[data-rv]')];
  if (root.matches?.('[data-rv]')) elements.unshift(root);
  const work = elements.flatMap(element => (element.dataset.rv ?? '').split(/\s+/).filter(Boolean)
    .map(name => initialize(element, name)));
  await Promise.all(work);
}
