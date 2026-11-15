import { readRevisions } from './storage.js';

export function initRevisionFeed(rows, onChanged) {
  let busy = false;
  let timer;
  const byId = new Map(rows.map(row => [row.dataset.rvReviewId, row]));
  const check = async () => {
    if (busy || document.hidden) return;
    busy = true;
    try {
      const pages = await readRevisions();
      if (!pages) return;
      let changed = false;
      for (const page of pages) {
        const row = byId.get(page.id);
        if (!row) continue;
        if (row.dataset.rvRevision !== page.revision || row.dataset.rvImplemented !== String(page.implemented)) {
          row.dataset.rvRevision = page.revision;
          row.dataset.rvImplemented = String(page.implemented);
          changed = true;
        }
      }
      if (changed) onChanged();
    } finally { busy = false; }
  };
  const start = () => { window.clearInterval(timer); timer = window.setInterval(check, 15000); };
  window.addEventListener('focus', check);
  document.addEventListener('visibilitychange', check);
  window.addEventListener('pagehide', () => window.clearInterval(timer));
  window.addEventListener('pageshow', event => { if (event.persisted) { start(); check(); } });
  start();
}
