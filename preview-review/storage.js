// Independent review persistence; never product fixtures or phase acceptance.
import { parseReview, serializeReview, validId } from './format.js';
export { parseReview, serializeReview } from './format.js';
export const storageKey = 'rival:preview-review:v1:' + document.documentElement.dataset.rvBasePath;
const endpoint = document.documentElement.dataset.rvBasePath + '_preview/approvals.json';
let project = false;
let seed = {};
export const projectStorage = () => project;

function readLocal() {
  let text;
  try { text = localStorage.getItem(storageKey); }
  catch { throw new Error('مرورگر اجازهٔ خواندن تأییدها را نمی‌دهد. پیوندهای صفحات همچنان قابل استفاده‌اند.'); }
  return text ? parseReview(text) : {};
}
async function request(command) {
  let response;
  try {
    response = await fetch(endpoint, command ? { method: 'POST', cache: 'no-store',
      headers: { 'Content-Type': 'application/json', 'X-Rival-Review': '1' }, body: JSON.stringify(command)
    } : { cache: 'no-store' });
  } catch { throw new Error('تأیید ذخیره نشد؛ ارتباط با فایل پروژه برقرار نیست.'); }
  const body = await response.text();
  if (!response.ok) {
    let message;
    try { message = JSON.parse(body).error; } catch { /* Preserve an explicit save failure. */ }
    throw new Error(message || 'تأیید ذخیره نشد؛ فایل پروژه در دسترس نیست.');
  }
  return { records: parseReview(body), project: response.headers.get('X-Rival-Review-Storage') === 'project' };
}
export async function initReviewStorage() {
  const initial = await request();
  project = initial.project;
  seed = initial.records;
  if (project) {
    let legacy = {};
    try { legacy = readLocal(); } catch { /* Project persistence works without browser storage. */ }
    const missing = Object.fromEntries(Object.entries(legacy).filter(([id]) => !Object.hasOwn(seed, id)));
    if (Object.keys(missing).length) await request({ type: 'migrate', records: missing });
  }
}
export async function readReview() {
  return project ? (await request()).records : { ...seed, ...readLocal() };
}
export async function writeReview(records) {
  const text = serializeReview(records);
  parseReview(text);
  if (project) return (await request({ type: 'merge', records })).records;
  try { localStorage.setItem(storageKey, text); }
  catch { throw new Error('تأیید ذخیره نشد؛ فضای ذخیرهٔ مرورگر در دسترس نیست.'); }
  return records;
}
export async function updateReview(id, change, command) {
  if (project) return (await request({ type: 'toggle', id, ...command })).records;
  const records = await readReview();
  records[id] = change(records[id]);
  return writeReview(records);
}
export async function readRevisions() {
  try {
    const response = await fetch(document.documentElement.dataset.rvBasePath + '_preview/revisions.json', { cache: 'no-store' });
    if (!response.ok) return null;
    const result = await response.json();
    if (result.schemaVersion !== 1 || !Array.isArray(result.pages) || result.pages.length > 500) return null;
    if (!result.pages.every(page => validId(page.id)
      && /^[a-f0-9]{64}$/.test(page.revision) && typeof page.implemented === 'boolean')) return null;
    return result.pages;
  } catch { return null; /* Build/offline: preserve approvals and retry later. */ }
}
