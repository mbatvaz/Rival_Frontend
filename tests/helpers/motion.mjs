export function installMotionProbe({ id = 'rv-list-entry', record, selector = '*', pause = false, property = id === 'rv-list-entry' ? 'opacity' : null }) {
  const animate = window.Element.prototype.animate;
  window[record] = [];
  window.Element.prototype.animate = function (keyframes, timing) {
    const visibility = this.matches(selector) ? getComputedStyle(this).visibility : undefined;
    const animation = animate.call(this, keyframes, timing);
    window.queueMicrotask(() => {
      if (animation.id !== id || !this.matches(selector)) return;
      if (pause) animation.pause();
      if (property && !Object.hasOwn(keyframes, property)) return;
      const [first] = animation.effect.getKeyframes();
      const frames = [{ opacity: first.opacity }];
      for (const effect of this.getAnimations()) {
        if (effect.id !== id) continue;
        const [frame] = effect.effect.getKeyframes();
        if (frame?.scale) frames[0].scale = frame.scale;
        if (frame?.clipPath) frames[0].clipPath = frame.clipPath;
        if (frame?.transform) frames[0].transform = frame.transform;
        if (frame?.translate) frames[0].translate = frame.translate;
      }
      const { top, right } = this.getBoundingClientRect();
      window[record].push({ target: this, frames, options: timing, top, right, visibility });
    });
    return animation;
  };
}
