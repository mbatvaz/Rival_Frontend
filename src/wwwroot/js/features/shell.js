import { api } from '../core/api.js';
import { basePath } from '../core/config.js';

export function init(root) {
  const logout = document.querySelector('[data-rv-logout]');
  logout?.addEventListener('click', async () => {
    logout.disabled = true;
    try {
      await api.reset('auth/session');
      const state = (await api.read('auth/state')).data;
      state.verified = null;
      await api.write('auth/state', state);
      window.location.assign(basePath());
    } catch (error) {
      document.querySelector('[data-rv-logout-error]').textContent = error.message;
      logout.disabled = false;
    }
  });
  root.dataset.rvReady = 'true';
}
