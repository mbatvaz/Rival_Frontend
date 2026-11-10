import { api } from '../core/api.js';
import { basePath } from '../core/config.js';

export async function init(root) {
  try {
    const query = new URLSearchParams(window.location.search);
    const session = (await api.read(query.get('state') === 'signed-in' ? 'public/session' : 'auth/session')).data;
    if (!session) return;
    const panels = { Customer: 'customer/', Stylist: 'stylist/', OwnerAdmin: 'admin/' };
    const path = panels[session.role];
    if (!path) return;
    for (const link of root.querySelectorAll('[data-rv-session-link]')) {
      link.href = basePath() + path;
      link.textContent = 'رفتن به پنل';
    }
    for (const link of root.querySelectorAll('[data-rv-book]')) link.href = basePath() + 'customer/book/';
  } catch { /* The public site stays usable without a demo session. */ }
}
