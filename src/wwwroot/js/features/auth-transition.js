import { sceneTiming, startMotion } from '../components/motion.js';
import { otpEntries } from './public-motion.js';

const formFrames = form => [
  { height: form.getBoundingClientRect().height + 'px', clipPath: 'inset(0)' },
  { height: '0px', clipPath: 'inset(0 0 100%)' }
];

function collapseAuthForm(form) {
  form.dataset.rvAuthSwitching = '';
  return startMotion(form, formFrames(form), { ...sceneTiming(), id: 'rv-auth-collapse', retain: true });
}

export function expandAuthForm(form) {
  form.dataset.rvAuthSwitching = '';
  const motion = startMotion(form, formFrames(form).reverse(), { ...sceneTiming(), id: 'rv-auth-expand' });
  motion.finished.finally(() => { delete form.dataset.rvAuthSwitching; });
  return motion;
}

export function authTransition(form, view, refresh) {
  let stageRevision = 0;
  let stageMotion;
  window.addEventListener('pagehide', () => {
    stageRevision++;
    stageMotion?.cancel();
    stageMotion = null;
    delete form.dataset.rvAuthSwitching;
  });
  return async (stage, prepare) => {
    if (view.stage === stage && !stageMotion) return;
    const revision = ++stageRevision;
    stageMotion = collapseAuthForm(form);
    await stageMotion.finished;
    if (revision !== stageRevision) return;
    stageMotion.cancel();
    view.stage = stage;
    const target = prepare();
    refresh();
    const timing = sceneTiming();
    stageMotion = expandAuthForm(form);
    if (stage === 'otp') otpEntries(form, timing.duration / 2);
    await stageMotion.finished;
    if (revision !== stageRevision) return;
    stageMotion = null;
    if (!target.disabled && !target.closest('[hidden]')) target.focus({ preventScroll: true });
  };
}

export async function closeForRegistration(form, destination) {
  const motion = collapseAuthForm(form);
  window.addEventListener('pagehide', () => {
    motion.cancel();
    delete form.dataset.rvAuthSwitching;
  }, { once: true });
  await motion.finished;
  window.location.assign(destination);
}
