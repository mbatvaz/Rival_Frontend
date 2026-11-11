const scenes = [...document.querySelectorAll('.scene')];
const links = [...document.querySelectorAll('[data-review]')];
function display() {
  const id = scenes.some(scene => '#' + scene.id === location.hash) ? location.hash : '#services';
  for (const scene of scenes) scene.hidden = '#' + scene.id !== id;
  for (const link of links) {
    if (link.hash === id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  scrollTo(0,0);
}
addEventListener('hashchange', display);
display();
