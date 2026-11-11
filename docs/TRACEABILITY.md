# Traceability Contract

Every implementation item must be traceable through this chain:

`Phase package → Page ID / Component ID → Artboard or Handoff section → Design token/Business rule → Acceptance test`.

Examples:

- `AUTH-01 → Batch 1 AUTH-01 → D10-207/D10-210/D10-211 → OQ none → tests/auth/login-lock.spec.js`
- `ADM-09 → Batch 5 ADM-09-* → D10-171..177 + D10-205 → ADM-09 payment mode/ledger tests`
- `STATE-05 → Batch 8 STATE-05 + Batch 2 PAY-RES-REVIEW → D10-191..194 → payment-under-review state test`
- `ADM-AC → Phase 8 current truth → `/admin/action-center` → no operational failures → action-center filter test`.

Use stable prefixes `PUB`, `AUTH`, `CUS`, `BK`, `PAY`, `STY`, `ADM`, `STATE`, `SYS`, `KIT`, `DS`, `RULE`, `DEC`, `OQ`.


## Phase ownership links

- `StatePage → Phase 03 base → STATE-04..07 booking variants → Phase 08 STATE-01..03/08 + SYS recovery reuse`.
- `CreditPayments/WalletLedger/PaymentRow → Phase 06 ADM-09 canonical implementation → Phase 08 ADM-16 matching extension`.
- `DS/RULE/ARCH → Phase 01 infrastructure IDs → TRACEABILITY only; not product page rows`.

## Phase 01 implementation — 2026-11-10; accepted by owner

| ID | Source / decisions | Implementation | Acceptance evidence |
|---|---|---|---|
| DS | `design-export/design-system-v2/tokens/tokens.json`; DEC-023/024/032 | `tools/lib/design-system.mjs`, layered token/type/font/icon CSS, 71 SVGs, two local logos | `tests/structure/static-contract.spec.mjs`, `tests/visual/responsive-smoke.spec.mjs` |
| RULE | Contract §3.3 / §7; DEC-020/026; fixture-only operation | `src/wwwroot/js/core/api.js`, `config.js`, `format.js`, `src/MockData/foundation/` | `tests/runtime/api.spec.mjs`, `tests/runtime/registry.spec.mjs`, keyboard/axe tests |
| ARCH | Contract §3/4/8/9; DEC-020/028/029/030/031 | neutral `Shared/_Layout.njk`, preview partials, static build/server, lazy registry, VS Code Tasks | 19 root tests + 19 subfolder tests, structure/JS/CSS lint, 73 route checks |

Type styles map directly to `--<style-name>-size/line/weight`; token families retain canonical names. Archived fallback typefaces are removed as required by contract §4.3. No new visual token values are invented.

Infrastructure UI has no canonical product artboard; screenshots are review evidence, not pixel-match baselines. No product page is marked implemented. StatePage remains Phase 03; finance remains Phase 06; migration remains Phase 09.

## Phase 02 implementation — 2026-11-10; accepted by owner

Source prefix below: `design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/`.

| IDs / component | Exact evidence and decisions | Implementation | Tests |
|---|---|---|---|
| PUB-01 | PUB-01.html, PUB-01-IN.html; Design System v2; DEC-027 | Public/Home/Index.njk; home.json; public-session.js; home/visit CSS | public-shell.spec.mjs; responsive-a11y.spec.mjs |
| PUB-02 / PortfolioCard | PUB-02.html and PUB-02-F/E/L/X/V.html | Portfolio/Index.njk; shared card/viewer partials; portfolio.js; fixture states | public-shell.spec.mjs; responsive-a11y.spec.mjs |
| PUB-03 | PUB-03.html; current canonical booking policies | Public/Rules/Index.njk; public/rules.json | public-shell.spec.mjs; responsive-a11y.spec.mjs |
| AUTH-01 | AUTH-01/B/O/P/W/L.html; Owner_Closures D10-207/210/211; Phase 04 Current Truth | Login.njk; auth.js/auth-view.js/auth-preview.js; core/auth-demo.js; fixture policy/state | auth.spec.mjs (8 scenarios); responsive-a11y.spec.mjs |
| AUTH-02 | AUTH-02.html, AUTH-02-E.html | Complete.njk; complete-profile.js; profile-state fixtures | auth.spec.mjs; responsive-a11y.spec.mjs |
| SYS-ACC-01 | SYS-ACC-01.html | Unavailable.njk in Auth layout; no early StatePage base | responsive-a11y.spec.mjs |
| SHELL / MORE / Sheet | SHELL-CUS-01/02, SHELL-STY-01, SHELL-ADM-01..05, MORE-CUS/STY/ADM-01..03; DEC-009/019/027 | RoleLayout/MoreDrawer/LogoutSheet; nav fixtures; components/sheet.js; shell.js | public-shell.spec.mjs; 390/768/1280 axe, desktop bottom-sheet bounds and keyboard tests |
| ARCH regression | DEC-020/026/028/029/030/031/032 | build helper product.mjs; lazy feature loaders; canonical basePath; safe returns | full 45-test suite at root and subfolder; structure/JS/CSS lint |

Desktop briefs in `docs-work/desktop-layouts/{PUB-01,PUB-02,PUB-03,AUTH-01,AUTH-02,SYS-ACC-01,SHELL}.md` were approved in the chat before implementation. Full source export/reference trees remain unchanged. StatePage stays in Phase 03 and finance/MVC boundaries remain unchanged.

## Phase 02 owner-review revision — 2026-11-10

| Evidence | Covered IDs / components | Implementation / verification |
|---|---|---|
| Owner comments 1–8, 10, 12; contact/map reference image; DEC-035/036 | PUB-01/02, HeaderPublic | Home composition, animated steps, compact contact and samples, navigation spacing, half-width CTA; revisions.spec.mjs at 1920/417/471 and responsive-a11y at 320/390/768/1280 |
| Comments 3, 9, 11, 19, 20; supplied empty/error/loading images | PUB-02, Glass, PortfolioCard/Viewer | Borderless cards, DS glass, centered empty state, retry notice, animated skeleton and retained background; public-shell/revisions/responsive-a11y tests |
| Comments 13–16; icon-tile image; source PUB-03.dc.html | PUB-03, IconTile, PolicyWindow | Shared chrome tile, note icons, segmented policy and colored rows, phone contact; policy copy and axe checks |
| Comments 17/18; four supplied auth/error/code images; DEC-034 | AUTH-01/02, Otp/fields/notice | Phone limit and paste, five visual editable cells, inline error, direct methods and password overlay; auth/revisions/responsive-a11y tests |
| General owner instructions | Shared Sheet, motion, scrollbar/link utilities | Visible inert background, focus/scroll restoration, entrance and native route transition, reduced motion; no underlines or visible scrollbar; shared-shell keyboard/axe checks |

Full suites: 50 passed at root and 50 at /rival-demo/; after the final read-only paste guard, the 13 affected auth/review scenarios are rechecked at both paths. Original design-export/docs/references remain unchanged. Detailed results and 59 screenshots per mode are recorded in the review report.

## Phase 02 second owner review — 2026-11-10

| Owner evidence | IDs/components | Implementation and regression |
|---|---|---|
| Comments 1–3 | PUB-01, HeaderPublic | home-desktop.css and public.css; hero +40% total width, button radius/dark navigation, intrinsic equal-height visit columns; review02/revisions tests at 1280/1920 and responsive tests at 320/390/768 |
| Comments 4–5; DEC-037 | PUB-02, PortfolioViewer | sheets.css, gallery-rail.js, _PortfolioViewer.njk; desktop centering, mouse drag/wheel, touch swipe, same-width centered error/CTA; native touch gesture and mouse tests in review02.spec.mjs |
| Comment 6 | PUB-03 | rules.css sticky contents, document scroll/bounds test |
| Comments 7–9; DEC-040 | AUTH-01, Otp | one centered resend timer and portrait cells; auth expiry/resend tests still exercise unchanged validity rules |
| Comment 10; DEC-038 | AUTH-01 | Login.njk, auth-methods/auth-view/auth; independent method=password view, SMS switch, reload/history and shared-lock regression |

Source exports remain read-only. The second-review screenshot directory is tests/screens/phase02-review02/{root,subpath}/. Phase 03 has not started.

Second review validation: lint passed; 56 tests passed at each deployment path; root output restored. New review scenarios cover native touch swipe, mouse wheel/drag, sticky contents, balanced image/CTA bounds and password/SMS history.

Third home review: owner comments/annotations 1–4 → public.css and home-desktop.css (DEC-041); existing review02 tests now verify nav alpha/blur/no border, square hero top, 36/54px title and 264×180 image. Relevant responsive/axe/review suites: 23 per deployment path; report PHASE_02_REVIEW_03_FA.md.

## Phase 02 acceptance and closeout — 2026-11-10

Explicit owner acceptance covers PUB-01..03, AUTH-01/02, SYS-ACC-01 and shared SHELL/MORE/primitives after DEC-034..041. Six implemented registry pages use implementationStatus=accepted with ownerAcceptedAt; the preview displays the accepted label. The 67 future contexts remain placeholders. Completion work is authorized, but Phase 03 is explicitly not assigned or started. Current handoff: docs-work/PHASE_02_CLOSEOUT_FA.md.

Final accepted Phase 02 gate: npm run lint passed; npm test 56 passed; npm run test:subpath 56 passed; root output restored. docs-work/PHASE_02_CLOSEOUT_FA.md and PHASE_02_COMPONENT_GUIDE_FA.md are the current handoff.

## Phase 03 — 2026-11-11

| Source | Product paths | Evidence |
|---|---|---|
| Batch 2 BK-01/02, BK-F01/F02, D10-24..26 | CUS-02 → service → stylist → fixed availability → hold → checkout | Booking views, booking catalog/hold fixtures, fixed and expiry smoke tests |
| Batch 2 BK-P01/R01/REQ01, D10-34 | Preferred date and part-of-day, compound service request, persistent demo request receipt | Requested/proposed smoke test and receipt states |
| Batch 2 BK-REC01, D10-35/39 | Recurrence calendar, edit/remove, minimum count, grouped checkout and single hold | Recurring smoke test and route variants |
| Batch 2 BK-ALERT01, D10-37 | One demo alert per service/stylist, six days, duplicate and focus restoration | Availability alert smoke test |
| Batch 2 PAY-RES and Batch 8 STATE-04..07, D10-191..194 | Result, expired hold, bank review, slot lost, service interruptions | Shared StatePage, context fixtures, visual and axe variants |
| DEC-043, Design System v2 | Separate desktop workspace at 1024px; calendar and times together; document-sticky summaries; grouped rows; responsive results | Approved desktop briefs and prototype; desktop keyboard and breakpoint test |

Keep `design-export/` and `docs/references/` as source evidence. Visuals and review notes are linked from `docs-work/PHASE_03_REPORT_FA.md`.
