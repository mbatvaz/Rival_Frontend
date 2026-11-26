import { sceneTiming, startMotion } from './motion.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const batches = new Map();
const media = '[data-rv-card-media]';

const entryFrames = {
  cardSlide: [{ translate: '-12px 0' }, { translate: '0 0' }],
  left: [{ opacity: 0, translate: '-24px 0' }, { opacity: 1, translate: '0 0' }],
  rise: [{ opacity: 0, translate: '0 16px' }, { opacity: 1, translate: '0 0' }],
  zoom: [{ opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1 }],
  fade: [{ opacity: 0 }, { opacity: 1 }],
  right: [{ clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0)' }],
  image: [{ clipPath: 'inset(100% 0 0)' }, { clipPath: 'inset(0)' }],
  bottom: [{ translate: '0 100%' }, { translate: '0 0' }],
  digit: [{ scale: 0.78 }, { scale: 1.08 }, { scale: 1 }]
};

export function visibleEntries(root, selector) {
  return [...root.querySelectorAll(selector)].filter(el => !el.closest('[hidden]') && el.getClientRects().length);
}

export function cancelEntries(scope) {
  const batch = batches.get(scope);
  batches.delete(scope);
  batch?.abort();
}

export function motionBatch(scope, arrange, { exit = false } = {}) {
  if (!window.Element.prototype.animate || reduced.matches || scope.closest('[inert]')) {
    cancelEntries(scope);
    return Promise.resolve();
  }

  const controller = new AbortController();
  const { signal } = controller;
  const settings = new Map();
  const entries = [];
  const total = [];
  const step = sceneTiming('duration-fast').duration / 2;
  const timing = duration => {
    if (!settings.has(duration)) settings.set(duration, sceneTiming(duration));
    return settings.get(duration);
  };
  function add(el, type = 'left', delay = 0, duration = 'duration-base') {
    if (!el) return delay;
    const options = timing(duration);
    entries.push({ el, type, delay, options });
    return delay + options.duration;
  }
  const list = (nodes, type, delay = 0, duration) => nodes.reduce((end, el, i) => add(el, type, delay + i * step, duration), delay);
  arrange({ add, list, step, items: selector => visibleEntries(scope, selector) });
  const departing = exit ? entries.map(({ el, type }) => {
    const computed = getComputedStyle(el);
    const destination = entryFrames[type][0];
    const source = Object.fromEntries(Object.keys(destination).map(key => [key, computed[key]]));
    return [source, destination];
  }) : [];
  cancelEntries(scope);
  if (!entries.length) return Promise.resolve();
  batches.set(scope, controller);

  for (const [index, { el, type, delay, options }] of entries.entries()) {
    const frames = departing[index] ?? entryFrames[type];
    const play = () => {
      if (signal.aborted || !el.isConnected || el.closest('[hidden]') || scope.closest('[inert]')) return;
      if (el.matches('img[data-rv-media-failed]')) return;
      if (!exit && el.contains(document.activeElement)) return;
      const animation = startMotion(el, frames, {
        ...options, delay, id: exit ? 'rv-entry-exit' : 'rv-list-entry', retain: exit
      });
      signal.addEventListener('abort', animation.cancel, { once: true });
      if (!exit) {
        // Pointer focus can land before pointerup. Only keyboard-visible focus should jump to the settled position.
        const revealForFocus = event => { if (event.target.matches(':focus-visible')) animation.cancel(); };
        el.addEventListener('focusin', revealForFocus);
        animation.finished.finally(() => el.removeEventListener('focusin', revealForFocus));
      }
      return animation.finished;
    };
    const card = el.closest(media);
    if (!exit && document.documentElement.hasAttribute('data-rv-media') && card && !card.hasAttribute('data-rv-media-ready')) {
      total.push(new Promise(resolve => {
        const ready = () => resolve(play());
        const cancel = () => resolve();
        card.addEventListener('rv:card-media-ready', ready, { signal, once: true });
        signal.addEventListener('abort', cancel, { once: true });
      }));
    } else total.push(play());
  }
  return Promise.all(total).finally(() => {
    if (!exit && batches.get(scope) === controller) batches.delete(scope);
  });
}

export function initEntryCleanup(page) {
  const clear = () => { for (const scope of batches.keys()) cancelEntries(scope); };
  new MutationObserver(() => {
    if (page.inert) clear();
  }).observe(page, { attributes: true, attributeFilter: ['inert'] });
  reduced.addEventListener('change', clear);
  window.addEventListener('pagehide', clear);
}
