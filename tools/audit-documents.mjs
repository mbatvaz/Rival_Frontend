import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { root, write } from './lib/site.mjs';

async function walk(dir = '') {
  const entries = await fs.readdir(path.join(root, dir), { withFileTypes: true });
  const ignored = new Set(['.git', 'node_modules', 'dist', '.playwright-browsers', '.npm-cache',
    'tests/screens', 'test-results', 'playwright-report', 'screens']);
  return (await Promise.all(entries.filter(e => !ignored.has(e.name)).map(e => {
    const file = dir ? dir + '/' + e.name : e.name;
    return e.isDirectory() ? walk(file) : file;
  }))).flat();
}
const files = (await walk()).filter(file => /\.mdx?$/.test(file)).sort();
const records = [];
for (const file of files) {
  const text = await fs.readFile(path.join(root, file), 'utf8');
  records.push({ path: file, lines: text.split(/\r?\n/).length,
    sha256: createHash('sha256').update(text).digest('hex'),
    headings: [...text.matchAll(/^#{1,6}\s+(.+)$/gm)].map(match => match[1]),
    instructionCandidates: text.split(/\r?\n/).filter(line =>
      /Tailwind|Alpine|htmx|Claude|Express|centered|nested vertical|Plan mode|owner approval|MVC/i.test(line)) });
}
await write(path.join(root, 'docs/ai/document-audit.json'), JSON.stringify({
  scope: 'All Markdown/MDX content read for headings, hashes and instruction candidates; historical evidence is not rewritten.',
  records }, null, 2) + '\n');
const components = (await fs.readdir(path.join(root, 'design-export/design-system-v2/components'),
  { withFileTypes: true })).filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
const link = file => `[${path.basename(file)}](<../../${file}>)`;
const runtime = {
  Button: ['02', 'src/wwwroot/css/03-components/controls.css'],
  TextField: ['02', 'src/wwwroot/css/03-components/fields.css'],
  GlassMaterial: ['02', 'src/wwwroot/css/03-components/materials.css'],
  OtpInput: ['02', 'src/Views/Shared/Components/_Otp.njk'],
  Overlays: ['02', 'src/wwwroot/js/components/sheet.js'],
  PortfolioCard: ['02', 'src/Views/Shared/Components/_PortfolioCard.njk'],
  Navigation: ['02', 'src/Views/Shared/_RoleNav.njk'],
  ShellBars: ['02', 'src/Views/Shared/_HeaderPublic.njk'],
  StatePage: ['03', 'src/Views/Shared/Components/_StatePage.njk'],
  BookingFlow: ['03', 'src/Views/Booking'],
  RecurringBooking: ['03', 'src/wwwroot/js/features/booking/recurring.js'],
  HoldTimer: ['03', 'src/wwwroot/js/features/booking/holds.js'],
  Iconography: ['01', 'src/wwwroot/icons'], Logo: ['01', 'src/wwwroot/img'],
  MotionSpecimens: ['02', 'src/wwwroot/css/05-utilities/motion.css']
};
const planned = { CreditPayments: '06', WalletLedger: '06', PricingRules: '07', SettingsFinance: '08',
  StaffDashboard: '05', StylistSchedule: '05', WorkSchedule: '05', ScreensAdmin: '06–08',
  ScreensCustomer: '04', CustomerProfile: '04', AppointmentHero: '04', NotificationItem: '04–08' };
const entries = ['# Component catalog', '',
  'Generated source index: `node tools/audit-documents.mjs`. Design groups are not proof of runtime implementation. Ownership stays in the [reuse matrix](../COMPONENT_REUSE_MATRIX.md); approved source variants/states are in each linked README/preview.', '',
  '## Runtime owners and contracts', '',
  '- Phase 01: token/font/icon generation and native registry/API adapter.',
  '- Phase 02: Public/Auth/Role layouts, navigation/More/logout, Sheet, OTP, PortfolioViewer/Card, fields/controls/materials.',
  '- Phase 03: StatePage, booking choices/calendar/time, hold/checkout/result/recurring composition. STATE-04..07 reuse the one StatePage.',
  '- Phase 06: CreditPayments/WalletLedger/PaymentRow/balance; currently planned, not implemented by this audit.',
  '- Phase 08: extends existing finance/StatePage; no duplicate implementation.', '',
  'Current implementation entry points:', '',
  ...['src/Views/Shared', 'src/Views/Shared/Components', 'src/Views/Booking',
    'src/wwwroot/js/components/sheet.js', 'src/wwwroot/js/components/otp.js',
    'src/wwwroot/js/components/rail.js', 'src/wwwroot/js/features/booking',
    'src/wwwroot/css/03-components', 'src/wwwroot/css/04-pages']
    .map(file => '- ' + link(file)), '',
  'Sheet owns open/closing/focus/inert/scroll lifecycle; OTP owns editable five-cell entry; Rail owns drag/touch/keyboard behavior. Reuse their data-rv hooks and input configuration. StatePage model carries key/title/description/tone/icon/context/reference/notice/lines/actions. Public card/viewer and booking partials configure state from fixtures.', '',
  'For every use: name exact variants/states, token names, accessible names/focus/errors/targets and responsive brief in the page spec. Common requirements: semantic HTML, visible labels/focus, >=44px hit targets, RTL, reduced motion, logical order. Do not use a component outside its documented role, invent a permission or copy a role-specific version. Planned groups keep their phase gate.', '',
  '## Design group evidence', ''];
for (const name of components) {
  const base = 'design-export/design-system-v2/components/' + name;
  const sourceFiles = await fs.readdir(path.join(root, base));
  const readme = sourceFiles.includes('README.md')
    ? await fs.readFile(path.join(root, base, 'README.md'), 'utf8') : '';
  const preview = sourceFiles.includes('preview.html')
    ? await fs.readFile(path.join(root, base, 'preview.html'), 'utf8') : '';
  const lines = readme.split(/\r?\n/).filter(line => line.trim() && !/^[>#|]/.test(line));
  const summary = lines[0] ?? 'Read source anatomy and states.';
  const tokenNames = [...new Set([...(readme + preview).matchAll(/(?:--|`)((?:bg|text|line|space|radius|shadow|duration|ease|size|font|tone|accent)-[a-z0-9-]+)/g)]
    .map(match => match[1]))];
  entries.push(`### ${name}`, '', sourceFiles.filter(file => ['README.md', 'preview.html'].includes(file))
    .map(file => link(base + '/' + file)).join(' · ') || 'No README/preview present; source gap.', '',
    summary, '', 'Source token references (not new definitions): ' + (tokenNames.join(', ') || 'none extracted; inspect specification') + '.', '',
    runtime[name] ? `Runtime: Phase ${runtime[name][0]}; ${link(runtime[name][1])}.`
      : planned[name] ? `Planned owner: Phase ${planned[name]}; no canonical runtime implementation asserted.`
        : 'Owner/use: reuse matrix and assigned phase. This index makes no claim that the entire design group is implemented.', '',
    'Variants/states, anatomy, usage and exclusions: source above. For each assigned consumer, record selected variant/state, accessible names/focus/error behavior and mobile/desktop rule in the page spec. Common runtime constraints above apply; design preview markup is evidence, not reusable production code.', '');
}
await write(path.join(root, 'docs/ai/COMPONENT_CATALOG.md'), entries.join('\n'));
console.log(`Read ${records.length} Markdown/MDX files; indexed ${components.length} design component groups.`);
