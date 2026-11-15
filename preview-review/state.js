export function reviewState(revision, implemented, saved) {
  const current = saved?.revision === revision;
  const mobile = implemented && saved?.mobile;
  const desktop = implemented && saved?.desktop;
  const final = Boolean(current && mobile && desktop && saved.final);
  const stale = Boolean(saved && !current && (saved.mobile || saved.desktop || saved.final));
  return { mobile: Boolean(mobile), desktop: Boolean(desktop), final, stale,
    status: !implemented ? 'red' : final ? 'green' : 'yellow' };
}

export function toggleApproval(revision, implemented, saved, action) {
  if (!implemented || !['mobile', 'desktop', 'final'].includes(action)) throw new Error('این تأیید در دسترس نیست.');
  const current = reviewState(revision, implemented, saved);
  if (action === 'final' && !(current.mobile && current.desktop)) throw new Error('ابتدا موبایل و دسکتاپ را تأیید کنید.');
  const record = { revision, mobile: current.mobile, desktop: current.desktop, final: current.final };
  record[action] = !record[action];
  if (action === 'final' && current.final) record.mobile = record.desktop = false;
  if (!record.mobile || !record.desktop) record.final = false;
  return { ...record, updatedAt: new Date().toISOString() };
}
