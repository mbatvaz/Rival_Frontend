import EmblaCarousel from '../../vendor/embla.js';
import { createFocusTrap } from '../../vendor/focus-trap.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

async function openPhoto(panel, links, index) {
  const opener = links[index];
  const { default: PhotoSwipe } = await import('../../vendor/photoswipe.js').catch(() => ({}));
  const layer = panel.parentElement;
  if (panel.hidden || panel.dataset.rvClosing || layer.inert) return;
  if (!PhotoSwipe) { window.location.assign(opener.href); return; }
  const viewer = new PhotoSwipe({
    dataSource: links.map(link => {
      const image = link.querySelector('img');
      return { src: link.href, width: Number(image.getAttribute('width')),
        height: Number(image.getAttribute('height')), alt: image.alt };
    }),
    index,
    loop: false,
    trapFocus: false,
    returnFocus: false,
    showHideAnimationType: reduced.matches ? 'none' : 'fade',
    closeTitle: 'بستن نمایش بزرگ',
    zoomTitle: 'بزرگ‌نمایی',
    arrowPrevTitle: 'تصویر قبلی',
    arrowNextTitle: 'تصویر بعدی',
    errorMsg: 'بارگیری تصویر ممکن نشد.'
  });

  let trap;
  viewer.on('afterInit', () => {
    viewer.element.setAttribute('aria-label', 'نمایش بزرگ تصاویر نمونه‌کار');
    viewer.element.setAttribute('aria-modal', 'true');
    viewer.element.dir = 'ltr';
    trap = createFocusTrap(viewer.element, {
      initialFocus: viewer.element.querySelector('.pswp__button--close') ?? viewer.element,
      fallbackFocus: viewer.element, delayInitialFocus: false,
      escapeDeactivates: false, returnFocusOnDeactivate: false
    });
    trap.activate();
    layer.inert = true;
  });
  viewer.on('destroy', () => {
    layer.inert = false;
    trap?.deactivate();
    if (!panel.hidden) opener.focus({ preventScroll: true });
  });
  viewer.init();
}

export function init(rail) {
  const panel = rail.closest('.rv-viewer');
  const figures = [...rail.querySelectorAll('figure')];
  if (!figures.length) return;
  const links = figures.map(figure => figure.querySelector('a'));
  const dots = panel.querySelectorAll('[data-rv-gallery-dot]');
  rail.dataset.rvCarousel = '';
  const carousel = EmblaCarousel(rail, {
    direction: 'rtl', align: 'center', containScroll: false, watchDrag: figures.length > 1,
    breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } }
  });
  const render = () => {
    const selected = carousel.selectedScrollSnap();
    figures.forEach((figure, index) => {
      figure.dataset.rvActive = String(index === selected);
      dots[index].dataset.rvActive = figure.dataset.rvActive;
    });
  };
  carousel.on('select', render).on('reInit', render);
  carousel.on('pointerUp', () => {
    if (reduced.matches) carousel.scrollTo(carousel.selectedScrollSnap(), true);
  });
  render();

  rail.addEventListener('keydown', event => {
    if (event.target !== rail) return;
    const selected = carousel.selectedScrollSnap();
    const target = { ArrowLeft: selected + 1, ArrowRight: selected - 1, Home: 0, End: figures.length - 1 }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    carousel.scrollTo(target, reduced.matches);
  });
  let wheelTime = -Infinity;
  rail.addEventListener('wheel', event => {
    if (event.ctrlKey) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? -event.deltaX : event.deltaY;
    if (!delta || (delta > 0 ? !carousel.canScrollNext() : !carousel.canScrollPrev())) return;
    event.preventDefault();
    if (event.timeStamp - wheelTime < 300) return;
    wheelTime = event.timeStamp;
    carousel.scrollTo(carousel.selectedScrollSnap() + Math.sign(delta), reduced.matches);
  }, { passive: false });
  rail.addEventListener('click', event => {
    const index = links.indexOf(event.target.closest('a'));
    if (index === -1 || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    openPhoto(panel, links, index);
  });
  let touch;
  panel.addEventListener('touchstart', event => {
    touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  panel.addEventListener('touchmove', event => {
    if (!touch || window.matchMedia('(min-width: 1024px), (prefers-reduced-motion: reduce)').matches) return;
    const finger = event.touches[0];
    const distance = finger.clientY - touch.y;
    const scroller = document.scrollingElement;
    const atEdge = distance > 0 ? scroller.scrollTop <= 0 : scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
    if (atEdge && Math.abs(distance) > Math.abs(finger.clientX - touch.x)) {
      panel.style.setProperty('--rv-viewer-stretch', Math.min(10, Math.abs(distance) / 10) + 'px');
    }
  }, { passive: true });
  for (const event of ['touchend', 'touchcancel']) panel.addEventListener(event, () => {
    touch = null;
    panel.style.removeProperty('--rv-viewer-stretch');
  });
}
