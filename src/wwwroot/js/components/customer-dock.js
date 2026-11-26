import { motionTiming, startMotion } from './motion.js';

const states = new WeakMap();
const options = root => [...root.querySelectorAll('.rv-customer-dock__tabs > a, .rv-customer-dock__tabs > button')];
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export async function selectDock(root, target, animate = true) {
  const state = states.get(root);
  if (!state || !root.offsetWidth) return true;
  const sequence = ++state.sequence;
  const before = options(root).map(el => ({ el, box: el.getBoundingClientRect() }));
  const old = state.indicator.getBoundingClientRect();
  state.animations.forEach(animation => animation.cancel());
  state.animations = [];
  if (!target) {
    options(root).forEach(el => { el.dataset.rvNavActive = 'false'; });
    root.removeAttribute('data-rv-dock-ready');
    return true;
  }
  options(root).forEach(el => { el.dataset.rvNavActive = String(el === target); });
  const frame = state.tabs.getBoundingClientRect();
  const next = target.getBoundingClientRect();
  state.indicator.style.setProperty('--rv-dock-x', next.left - frame.left + 'px');
  state.indicator.style.setProperty('--rv-dock-width', next.width + 'px');
  root.dataset.rvDockReady = 'true';
  if (!animate || reduced() || !target.animate) return true;
  const timing = motionTiming('duration-base', 'ease-standard');
  const add = (el, frames, config = timing) => {
    state.animations.push(startMotion(el, frames, config));
  };
  add(state.indicator, [{ transform: `translateX(${old.left - next.left}px) scaleX(${old.width / next.width || 1})` }, { transform: 'none' }]);
  before.forEach(({ el, box }) => {
    const after = el.getBoundingClientRect();
    if (box.left !== after.left) add(el, [{ transform: `translateX(${box.left - after.left}px)` }, { transform: 'none' }]);
  });
  const fast = motionTiming('duration-fast', 'ease-standard');
  add(target.querySelector('.ri'), [{ transform: 'translateX(-6px)' }, { transform: 'none' }], { ...fast, delay: timing.duration, fill: 'backwards' });
  add(target.querySelector('.rv-customer-dock__label'), [{ opacity: 0, transform: 'translateX(4px)' }, { opacity: 1, transform: 'none' }], { ...fast, delay: timing.duration + fast.duration, fill: 'backwards' });
  const stop = () => { if (reduced()) state.animations.forEach(animation => animation.cancel()); };
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', stop);
  await Promise.allSettled(state.animations.map(animation => animation.finished));
  media.removeEventListener('change', stop);
  return state.sequence === sequence;
}

export function init(root) {
  const tabs = root.querySelector('.rv-customer-dock__tabs');
  const canonical = options(root).find(el => el.dataset.rvNavActive === 'true');
  const state = { tabs, indicator: tabs.querySelector('.rv-customer-dock__indicator'), animations: [], sequence: 0 };
  states.set(root, state);
  const reset = () => selectDock(root, canonical, false);
  reset();
  if (window.ResizeObserver) new window.ResizeObserver(reset).observe(root);
  else window.addEventListener('resize', reset);
  root.querySelector('button').addEventListener('click', event => { selectDock(root, event.currentTarget); });
  document.addEventListener('rv:sheet-close', event => { if (event.detail.id === 'rv-more') selectDock(root, canonical); });
  window.addEventListener('pageshow', reset);
  window.addEventListener('pagehide', () => state.animations.forEach(animation => animation.cancel()));
}
