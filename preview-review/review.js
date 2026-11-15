import { reviewState, toggleApproval } from './state.js';
import { initReviewStorage, projectStorage, readReview, updateReview, storageKey } from './storage.js';
import { initBackup } from './backup.js';
import { initFilters } from './filters.js';
import { initRevisionFeed } from './revision-feed.js';
import { renderRow, renderVariantCount } from './render-row.js';

const rows = [...document.querySelectorAll('[data-rv-review-id]')];
const applyFilters = initFilters(rows);
const message = document.querySelector('[data-rv-review-message]');
let records = {};
let available = false;
let saving = false;
let generation = 0;
function notify(text, error = false) {
  message.textContent = text;
  message.dataset.error = String(error);
}
function render() {
  for (const control of document.querySelectorAll('[data-rv-export], [data-rv-import]')) control.disabled = !available || saving;
  const counts = { red: 0, yellow: 0, green: 0 };
  for (const row of rows) {
    const implemented = row.dataset.rvImplemented === 'true';
    const state = reviewState(row.dataset.rvRevision, implemented, records[row.dataset.rvReviewId]);
    renderRow(row, state, available && !saving);
    if (row.hasAttribute('data-rv-page-row')) counts[state.status]++;
  }
  rows.filter(row => row.hasAttribute('data-rv-page-row')).forEach(renderVariantCount);
  for (const [status, count] of Object.entries(counts)) {
    document.querySelector('[data-rv-count="' + status + '"]').textContent = count.toLocaleString('fa-IR');
  }
  applyFilters();
}
async function load() {
  if (saving) return;
  const version = generation;
  try {
    const loaded = await readReview();
    if (version !== generation || saving) return;
    records = loaded;
    available = true;
  } catch (error) { if (version !== generation) return; available = false; notify(error.message, true); }
  render();
}
document.addEventListener('click', async event => {
  const button = event.target.closest('[data-rv-approval]');
  if (!button || button.disabled || saving || !available) return;
  const row = button.closest('[data-rv-review-id]');
  try {
    saving = true;
    generation++;
    render();
    records = await updateReview(row.dataset.rvReviewId, saved => toggleApproval(row.dataset.rvRevision,
      row.dataset.rvImplemented === 'true', saved, button.dataset.rvApproval),
    { revision: row.dataset.rvRevision, action: button.dataset.rvApproval });
    saving = false;
    render();
    notify('تأییدهای «' + row.dataset.rvReviewTitle + '» ' + (projectStorage() ? 'در فایل پروژه' : 'در این مرورگر') + ' ذخیره شد.');
  } catch (error) { notify(error.message, true); }
  finally { saving = false; render(); }
});
window.addEventListener('storage', event => {
  if (event.key !== storageKey && event.key !== null) return;
  load();
  if (available) notify('تأییدها با تغییرات برگهٔ دیگر همگام شدند.');
});
initBackup(saved => { generation++; records = saved; available = true; render(); }, notify);
render();
try { await initReviewStorage(); await load(); }
catch (error) { available = false; notify(error.message, true); render(); }
initRevisionFeed(rows, () => { render(); notify('نسخهٔ جدید شناسایی شد؛ فقط تأیید نهایی موارد تغییرکرده نیازمند بازبینی است.'); });
if (available) notify(projectStorage() ? 'تأییدها در فایل پروژه ذخیره می‌شوند و بین مرورگرها مشترک‌اند.' : 'این میزبان فقط ذخیره در همین مرورگر را پشتیبانی می‌کند؛ برای ذخیره مشترک، پیش‌نمایش محلی پروژه را اجرا کنید.');

if (projectStorage()) {
  let timer = window.setInterval(() => { if (!document.hidden) load(); }, 3000);
  window.addEventListener('focus', load);
  window.addEventListener('pagehide', () => window.clearInterval(timer));
  window.addEventListener('pageshow', event => { if (event.persisted) { timer = window.setInterval(load, 3000); load(); } });
}
document.documentElement.dataset.rvReady = 'true';
