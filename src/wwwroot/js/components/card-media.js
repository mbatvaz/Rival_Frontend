const mediaCard = '[data-rv-card-media]';

export function initCardMedia() {
  const revisions = new WeakMap();
  const images = new WeakMap();
  const pendingCards = new WeakMap();

  function settled(image) {
    const src = image.currentSrc || image.src;
    const previous = images.get(image);
    if (previous?.src === src) return previous.pending;
    delete image.dataset.rvMediaFailed;
    const pending = (image.complete ? Promise.resolve() : new Promise(resolve => {
      const listeners = new AbortController();
      const done = () => { listeners.abort(); resolve(); };
      image.addEventListener('load', done, { signal: listeners.signal });
      image.addEventListener('error', done, { signal: listeners.signal });
      image.addEventListener('rv:media-source-change', done, { signal: listeners.signal });
    })).then(async () => {
      if (images.get(image)?.pending !== pending) return;
      if (image.naturalWidth) await image.decode?.().catch(() => {});
      if (images.get(image)?.pending === pending && !image.naturalWidth) image.dataset.rvMediaFailed = '';
    });
    images.set(image, { src, pending });
    return pending;
  }

  function watch(card) {
    const revision = {};
    revisions.set(card, revision);
    card.removeAttribute('data-rv-media-ready');
    const pending = [...card.querySelectorAll('img')].filter(image => !image.closest('[hidden]')).map(settled);
    pendingCards.set(card, Promise.all(pending).then(() => {
      if (revisions.get(card) === revision) {
        card.dataset.rvMediaReady = '';
        card.dispatchEvent(new Event('rv:card-media-ready'));
      }
    }));
  }

  document.querySelectorAll(mediaCard).forEach(watch);
  document.documentElement.dataset.rvMedia = '';
  new MutationObserver(records => {
    const cards = new Set();
    for (const { target, type, attributeName, addedNodes, removedNodes } of records) {
      if (type === 'childList' && ![...addedNodes, ...removedNodes].some(node => node.nodeType === 1)) continue;
      if (type === 'attributes' && attributeName !== 'hidden' && target.matches('img')) {
        images.delete(target);
        target.dispatchEvent(new Event('rv:media-source-change'));
      }
      const owner = target.closest(mediaCard);
      if (owner) cards.add(owner);
      if (type === 'attributes' && !target.hidden) target.querySelectorAll(mediaCard).forEach(card => cards.add(card));
      for (const node of addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches(mediaCard)) cards.add(node);
        node.querySelectorAll(mediaCard).forEach(card => cards.add(card));
      }
    }
    cards.forEach(watch);
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden', 'src', 'srcset'] });

  return checkout => {
    if (checkout) {
      const cards = [...checkout.querySelectorAll(mediaCard)].filter(card => !card.closest('[hidden]'));
      return Promise.all(cards.map(card => pendingCards.get(card)));
    }
    const visible = [...document.querySelectorAll(mediaCard)].filter(card => {
      if (card.closest('[hidden]')) return false;
      const bounds = card.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight && bounds.right > 0 && bounds.left < window.innerWidth;
    });
    return Promise.race([
      Promise.all(visible.map(card => pendingCards.get(card))),
      new Promise(resolve => window.setTimeout(resolve, 120))
    ]);
  };
}
