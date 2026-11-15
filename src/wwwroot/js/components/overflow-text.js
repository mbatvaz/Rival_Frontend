const selector = '[data-rv-overflow-text]';

// Explicit opt-in for variable text in compact cards; ordinary copy always wraps.
export function initOverflowText() {
  const tracked = new Set();
  let frame;
  const schedule = () => { frame ??= requestAnimationFrame(update); };
  const resize = window.ResizeObserver ? new window.ResizeObserver(schedule) : { observe() {}, unobserve() {} };
  const visibility = window.IntersectionObserver ? new window.IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => { target.dataset.rvTextVisible = String(isIntersecting); });
  }) : { observe() {}, unobserve() {} };
  const reset = el => {
    el.classList.remove('rv-text-line');
    delete el.dataset.rvTextOverflow;
    delete el.dataset.rvTextVisible;
    if (el.dataset.rvTextFocusable) el.removeAttribute('tabindex');
    delete el.dataset.rvTextFocusable;
    el.style.removeProperty('--rv-text-shift');
    el.style.removeProperty('--rv-text-duration');
    visibility.unobserve(el);
  };
  const register = root => {
    const candidates = root.matches?.(selector) ? [root, ...root.querySelectorAll(selector)] : root.querySelectorAll?.(selector) ?? [];
    for (const el of candidates) {
      if (tracked.has(el) || el.closest('.rv-text-line,script,style,svg,[contenteditable],.rv-booking-visually-hidden') ||
        el.children.length || !el.textContent.trim()) continue;
      tracked.add(el);
      resize.observe(el);
    }
    schedule();
  };
  function update() {
    frame = undefined;
    const changes = [];
    for (const el of tracked) {
      if (!el.isConnected) { resize.unobserve(el); visibility.unobserve(el); tracked.delete(el); continue; }
      if (!el.getClientRects().length) continue;
      if (!el.textContent.trim()) { changes.push(() => reset(el)); continue; }
      const content = el.firstElementChild;
      if (el.classList.contains('rv-text-line') && content?.classList.contains('rv-text-line__content')) {
        const computed = getComputedStyle(el);
        const available = el.clientWidth - parseFloat(computed.paddingLeft) - parseFloat(computed.paddingRight);
        const distance = content.getBoundingClientRect().width - available;
        const direction = computed.direction === 'rtl' ? 1 : -1;
        changes.push(() => {
          el.style.setProperty('--rv-text-shift', direction * Math.max(0, distance) + 'px');
          el.style.setProperty('--rv-text-duration', Math.max(6, distance / 24) + 's');
          el.dataset.rvTextOverflow = String(distance > 1);
          if (distance > 1 && !el.closest(':disabled') && !el.hasAttribute('tabindex')) {
            el.tabIndex = 0;
            el.dataset.rvTextFocusable = 'true';
          } else if (distance <= 1 && el.dataset.rvTextFocusable) {
            el.removeAttribute('tabindex');
            delete el.dataset.rvTextFocusable;
          }
        });
      } else if (!el.children.length) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()];
        const wraps = rects.some(rect => Math.abs(rect.top - rects[0]?.top) > 2);
        if (wraps || el.scrollWidth > el.clientWidth + 1) changes.push(() => {
          const span = document.createElement('span');
          span.className = 'rv-text-line__content';
          span.append(...el.childNodes);
          el.append(span);
          el.classList.add('rv-text-line');
          visibility.observe(el);
          schedule();
        });
        else if (el.classList.contains('rv-text-line')) changes.push(() => reset(el));
      }
    }
    changes.forEach(change => change());
  }
  const mutations = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') register(record.target.parentElement);
      else {
        record.addedNodes.forEach(node => { if (node.nodeType === 1) register(node); });
        register(record.target);
      }
    }
    schedule();
  });
  register(document.body);
  mutations.observe(document.body, { childList: true, subtree: true, characterData: true });
  document.fonts.ready.then(schedule);
  window.addEventListener('resize', schedule);
  document.addEventListener('visibilitychange', () => {
    document.documentElement.dataset.rvTextPaused = String(document.hidden);
  });
}
