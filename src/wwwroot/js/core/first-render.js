(() => {
  const root = document.documentElement;
  const home = location.pathname === root.dataset.rvBasePath || location.pathname === root.dataset.rvBasePath + 'index.html';
  if (!home) root.dataset.rvLoading = 'boot';
  document.addEventListener('error', event => {
    if (event.target.matches?.('[data-rv-app-script]') && root.dataset.rvLoading === 'boot') delete root.dataset.rvLoading;
  }, true);
  if (window.Element.prototype.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.dataset.rvEntry = 'pending';
    window.setTimeout(() => {
      if (root.dataset.rvEntry === 'pending') root.dataset.rvEntry = 'static';
    }, 1400);
  }
  if (!document.fonts?.load) return;
  root.dataset.rvFont = 'pending';
  const finish = state => {
    if (root.dataset.rvFont !== 'pending') return;
    root.dataset.rvFont = state;
    document.dispatchEvent(new Event('rv:font-ready'));
  };
  const deadline = home ? window.setTimeout(() => finish('fallback'), 800) : undefined;
  Promise.all([300, 400, 600].map(weight => document.fonts.load(`${weight} 1em "Yekan Bakh"`, 'ریوال ۱۲۳')))
    .then(faces => finish(faces.every(weight => weight.length > 0) ? 'ready' : 'fallback'), () => finish('fallback'))
    .finally(() => window.clearTimeout(deadline));
})();
