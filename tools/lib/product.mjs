import path from 'node:path';
import { src, readJson, withBase } from './site.mjs';

export async function productContext(page, basePath) {
  const role = page.role.startsWith('Customer') ? 'customer' : page.role.startsWith('Stylist') ? 'stylist'
    : page.role === 'OwnerAdmin' ? 'admin' : null;
  const route = relative => withBase(basePath, relative);
  let shell = null;
  if (role) {
    shell = (await readJson(path.join(src, `MockData/nav.${role}.json`))).data;
    const map = item => {
      const [pathname, query] = item.href.split('?');
      return { ...item, href: route(pathname) + (query ? '?' + query : ''), active: pathname === page.previewPath };
    };
    shell = { ...shell, role, book: shell.book ? map(shell.book) : null,
      primary: shell.primary.map(map), more: shell.more.map(map) };
  }
  return {
    shell,
    publicTitle: page.id === 'PUB-01' ? '' : page.titleFa,
    publicPage: page.id.startsWith('PUB-'),
    isHome: page.id === 'PUB-01',
    productUrls: {
      login: route('/login/'), portfolio: route('/portfolio/'), rules: route('/booking-rules/'),
      book: route('/login/') + '?return=' + encodeURIComponent(route('/customer/book/')),
      booking: route('/customer/book/'), panel: route('/customer/'),
      complete: route('/_preview/context/auth-02/')
    }
  };
}
