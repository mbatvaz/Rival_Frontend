import { get } from '../booking/shared.js';
import { appointmentUrl, cutoff, currentLabel, forfeitsRefund, loadReschedules, refreshReschedulesOnRestore } from './reschedule-data.js';
import { showReschedulePicker } from './appointment-reschedule.js';
import { showRescheduleResult } from './reschedule-result.js';
import { paintChangedDetail, paintLateDetail, updateAppointmentHero } from './reschedule-detail.js';

const states = {
  'rsc': {}, 'rsc-select': { preview: true }, 'rsc-confirm': { preview: true, open: true },
  'rsc-late': { mode: 'late' }, 'rsc-warn': { mode: 'late', preview: true, open: true },
  'rsc-comp': { mode: 'compensation', preview: true }, 'rsc-comp-run': { mode: 'compensation' },
  'rsc-done': { result: true }, 'rsc-done-lt24': { result: true, mode: 'late' },
  'rsc-complete': { result: true, saved: true }
};
const used = ['rsc-used', 'rsc-used-nr', 'rsc-moved', 'rsc-moved-late'];
const compStates = ['comp', 'rsc-comp'];
const defaultSinaStates = [...compStates, 'rsc-used', 'rsc-used-nr'];

export function rescheduleAppointmentId(query, defaultId) {
  return query.get('appointment') ?? (defaultSinaStates.includes(query.get('state')) ? 'BK-48390' : defaultId);
}

export async function applyRescheduleRoute(root, current, id, state) {
  const button = get(current, 'detail-rsc');
  if (!button || state === 'inactive') return {};
  const data = await loadReschedules();
  refreshReschedulesOnRestore(data.changes);
  const view = Object.hasOwn(states, state) ? states[state] : null;
  const saved = data.changes[id];
  const activeCompensation = id === data.compensation.id && !saved?.compensationUsed && !used.includes(state);
  const mode = view?.mode ?? (state === 'lt24' ? 'late' : state === 'comp' || activeCompensation ? 'compensation' : 'standard');
  const normalSina = { ...data.compensation, ...data.compensation.panelCurrent, currentLabel: undefined };
  const compensation = view?.preview || state === 'comp' ? data.compensation : normalSina;
  let scenario = id === data.standard.id && mode !== 'compensation' ? data.standard
    : id === normalSina.id && mode !== 'late' ? (mode === 'compensation' ? compensation : normalSina) : null;
  if (scenario) scenario = {
    ...scenario, revision: view?.preview ? 0 : saved?.revision ?? 0,
    ...(!view?.preview && saved && { currentDate: saved.date, currentTime: saved.time, currentLabel: undefined }),
    refundLost: !view?.preview && Boolean(saved?.refundLost)
  };
  const sample = used.includes(state) && ((id === data.compensation.id && !state.startsWith('rsc-moved'))
    || (id === data.standard.id && state.startsWith('rsc-moved')));
  const reference = state.startsWith('rsc-moved') ? { ...data.standard.selected, from: currentLabel(data.standard) } : data.used;
  const change = sample ? { ...reference, mode: ['rsc-used-nr', 'rsc-moved-late'].includes(state) ? 'late' : 'standard' } : saved;
  if (view?.result && scenario && (view.saved ? saved : id === data.standard.id)) {
    const result = view.saved ? saved : { ...data.standard.selected, from: currentLabel(data.standard), mode };
    const detailState = view.saved ? '' : mode === 'late' ? 'rsc-moved-late' : 'rsc-moved';
    showRescheduleResult(root, current, id, result, data.cutoffDays, detailState);
    return { handled: true };
  }
  const eligible = mode === 'compensation' ? !saved?.compensationUsed : !saved?.ordinaryUsed;
  if (scenario && view && !view.result && (view.preview || eligible)) {
    showReschedulePicker(root, current, scenario, mode, data.cutoffDays, view.open, view.preview);
    return { handled: true };
  }
  if (change) paintChangedDetail(current, change, data.cutoffDays, sample, sample && id === normalSina.id);
  if (state === 'lt24' && scenario && !change) paintLateDetail(current);
  if (state === 'comp' && scenario && !change) updateAppointmentHero(current.querySelector('.rv-appointment-hero'), {
    date: scenario.currentDate, time: scenario.currentTime
  });

  const canMove = scenario && !sample && eligible;
  const move = canMove ? () => location.assign(appointmentUrl(id, mode === 'late' ? 'rsc-late' : mode === 'compensation' ? 'rsc-comp-run' : 'rsc')) : null;
  if (move) {
    button.disabled = false;
    button.removeAttribute('aria-describedby');
    if (mode === 'compensation') button.textContent = 'جابه‌جایی جبرانی';
    button.addEventListener('click', move);
  }
  return {
    move, compensation: mode === 'compensation' && eligible && Boolean(scenario),
    noRefund: mode !== 'compensation' && ((mode === 'late' && !change) || (change && forfeitsRefund(change))),
    amount: current.querySelector('.rv-appointment-detail__facts dd').textContent,
    deadline: change ? cutoff(change, data.cutoffDays) : id === data.standard.id ? 'امروز، ۱۶:۰۰'
      : scenario && cutoff({ date: scenario.currentDate, time: scenario.currentTime }, data.cutoffDays)
  };
}
