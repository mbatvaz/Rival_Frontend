# Traceability Contract

## Customer More recovery and restored chrome — 2026-11-16

DEC-065 → [plain shared desktop menu](../src/Views/Shared/_CustomerDesktopNav.njk), [restored home header](../src/Views/Customer/Home/Index.njk), [support-column composition](../src/wwwroot/css/04-pages/customer-review-layout.css), [viewport/list-scrolling More](../src/wwwroot/css/03-components/customer-more-mobile.css) and [shared Sheet interruption cleanup](../src/wwwroot/js/components/sheet.js) → [reproduction/regression](../tests/phase04/more-recovery.spec.mjs), existing customer/shell/booking/motion/root/subpath tests → [actual evidence](../docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md). Prior radio/header decisions below are superseded; no role, money or backend permission changes.

## Customer owner feedback — 2026-11-16

DEC-064 and supplied More/dock screenshots → [shared native navigation](../src/Views/Shared/_CustomerDesktopNav.njk), [customer identity](../src/Views/Shared/_CustomerIdentity.njk), [More](../src/Views/Shared/_MoreDrawer.njk), [dock motion](../src/wwwroot/js/components/customer-dock.js), [responsive cards](../src/wwwroot/css/04-pages/customer-review-layout.css) and CUS-05's second pending-payment example → [owner-feedback regression](../tests/phase04/owner-feedback.spec.mjs) plus booking/shell/motion/axe/root/subpath checks. [Evidence](../docs-work/PHASE_04_OWNER_FEEDBACK_2026-11-16.md). Actual radios replace desktop-only page selection; fallback hrefs remain in static HTML. No financial/backend authorization is introduced.

## CUS-01 desktop revision — 2026-11-16

DEC-063 → [revised desktop brief](../docs-work/desktop-layouts/CUS-01.md), accepted booking menu → [shared menu partial](../src/Views/Shared/_CustomerDesktopNav.njk) reused by booking/home, [desktop composition](../src/wwwroot/css/04-pages/customer-home-desktop.css) and [appointment ticket layout](../src/wwwroot/css/04-pages/customer-appointment-desktop.css) → [desktop geometry, state, menu and keyboard tests](../tests/phase04/desktop.spec.mjs), mobile home/booking/choice/shared-shell regressions. [Actual results and comparisons](../docs-work/PHASE_04_IMPLEMENTATION_FA.md). Same source copy/data/routes; no permission or backend change.

## Phase 04 first slice — 2026-11-16

DEC-062 → Batch 3 CUS-01-A/EMPTY/INACTIVE and AppointmentHero/ScreensCustomer → [home template](../src/Views/Customer/Home/Index.njk), [canonical hero](../src/Views/Shared/Components/_AppointmentHero.njk), [fixture](../src/MockData/customer/home.json), [home feature](../src/wwwroot/js/features/customer/home.js) and existing shell/sheet/rail owners → [state, timer, readonly, keyboard, responsive and axe tests](../tests/phase04/home.spec.mjs). CUS-07 is only the embedded balance in [tools partial](../src/Views/Customer/Home/_Tools.njk). [Sources, comparisons and remaining phase work](../docs-work/PHASE_04_IMPLEMENTATION_FA.md); [desktop proposal](../docs-work/desktop-layouts/CUS-01.md) awaits review. No backend authorization or finance implementation is claimed.

## Booking flash correction — 2026-11-16

DEC-061 → [booking-link fade bypass](../src/wwwroot/js/components/navigation-motion.js) and [opaque booking entry](../src/wwwroot/css/05-utilities/motion.css) → [first-frame and real navigation regression](../tests/phase03/choice-navigation-flash.spec.mjs), choice-layout/booking/shared-motion tests → [report](../docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md). No route/data/acceptance changes.

## BK-01/BK-02 mobile dock — 2026-11-16

DEC-060 → [scoped CSS](../src/wwwroot/css/04-pages/booking-choice-navigation.css) → [choice navigation tests](../tests/phase03/choice-navigation.spec.mjs), existing review-polish/shared-motion regressions → [source comparisons and limits](../docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md). Two existing IDs only; no templates, JS or acceptance changes.

## Context navigation infrastructure — 2026-11-16

Owner context-optimization request → [map CLI](../tools/project-map.mjs), [extractors/query/validation](../tools/lib/project-map/), [read-only graph check](ai/PROJECT_GRAPH.md), [navigation](ai/PROJECT_INDEX.md) and [context skill](../.agents/skills/rival-context/SKILL.md) → [tool regression](../tools/tests/project-map.test.mjs). [Report](../docs-work/CONTEXT_OPTIMIZATION_REPORT_FA.md) distinguishes static render evidence, inferred consumers/tests, unknown sources and planned MVC targets. No product Page ID, acceptance, behavior or source was changed.

## Phase 03 acceptance — 2026-11-15

Owner approval -> DEC-058 -> [registry](../src/page-registry.json): 15 Phase 03 contexts accepted and dated 2026-11-15. [Closeout](../docs-work/PHASE_03_CLOSEOUT_FA.md) maps implemented states, exact source comparisons, full root/subpath regression and component reuse. CUS-02, BK-01/02, BK-F01/F02, BK-P01/R01/REQ01/REC01/ALERT01, PAY-RES and STATE-04..07 retain their routes, fixtures and existing design ownership. StatePage remains a single Phase 03 base for Phase 08 extension. Other phase registry entries and manual review approvals are preserved; Phase 04 has not started. Earlier dated review gates are historical.

## Calendar selection parity

Owner mobile comparison -> [shared calendar states](../src/wwwroot/css/04-pages/booking-calendar-review.css), removal of [desktop-only duplication](../src/wwwroot/css/04-pages/desktop-refinement.css) and [mobile override](../src/wwwroot/css/04-pages/booking-review-polish.css) -> [cross-width parity/keyboard/calendar axe](../tests/phase03/calendar-parity.spec.mjs). [Record](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Shadow and responsive alignment clarification

Owner follow-up -> [rail paint space](../src/wwwroot/css/04-pages/owner-booking.css), [responsive payment/header and returned badge](../src/wwwroot/css/04-pages/booking-review-polish.css) -> [polish regression](../tests/phase03/review-polish.spec.mjs) and visual/axe/typography suites. [Scope and evidence](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Booking review polish

Owner element annotations -> [polish CSS](../src/wwwroot/css/04-pages/booking-review-polish.css), [progress markup](../src/Views/Booking/Index.njk), [canonical result routing](../src/wwwroot/js/features/booking/result.js), [review directory](../tools/lib/preview-review.mjs) and [state data](../src/MockData/booking/results.json) -> [geometry/motion/state regression](../tests/phase03/review-polish.spec.mjs) plus existing visual/axe, smoke and review-persistence suites. [Source comparisons and scope](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Final text typography audit

Owner regression request -> [package caption typography](../src/wwwroot/css/04-pages/booking-cards.css) -> [paired-page typography audit](../tests/phase03/typography-audit.spec.mjs) and existing public/booking/axe/overflow regressions. Canonical BK-R01 label source is 13px/18px/600; inner text now inherits its card weight. [Sources, findings and results](../docs-work/TEXT_LAYOUT_FINAL_AUDIT_2026-11-15.md).

## Compact-card text scope correction

Latest owner feedback -> explicit data-rv-overflow-text hooks in compact card templates -> [opt-in text module](../src/wwwroot/js/components/overflow-text.js) -> [scope regression](../tests/phase03/overflow-scope.spec.mjs). Rules, home introduction and request-result prose are asserted to wrap even after receiving longer dynamic content. Long/short card names and reduced-motion access are checked separately. [Evidence](../docs-work/OVERFLOW_CARD_SCOPE_2026-11-15.md).

## Booking geometry and overflowing text

Owner annotated elements -> [shared text motion](../src/wwwroot/js/components/overflow-text.js), [text utility](../src/wwwroot/css/05-utilities/overflow-text.css), [booking corrections](../src/wwwroot/css/04-pages/booking-layout-corrections.css), [time markup](../src/Views/Booking/_Time.njk), [calendar motion](../src/wwwroot/js/features/booking/selection-motion.js) -> [focused regression](../tests/phase03/layout-corrections.spec.mjs) plus existing public/booking/axe/keyboard suites. [Exact evidence and motion record](../docs-work/BOOKING_LAYOUT_CORRECTIONS_2026-11-15.md).

## Scoped preview invalidation

Owner request -> [scoped fingerprint](../tools/lib/review-revision.mjs), [CSS scope](../tools/lib/review-css.mjs), [state/module projection](../tools/lib/review-scope.mjs), [independent variant revisions](../tools/lib/review-entries.mjs) and [final-only state](../preview-review/state.js) -> actual source mutation tests for page CSS, state fixture and separate Requested/Proposed content, plus UI stale-final/reconfirmation tests. [Evidence](../docs-work/PREVIEW_REVIEW_REPORT.md). No product acceptance is inferred.

## Public spacing and shared input focus

Latest element feedback -> [portfolio caption](../src/wwwroot/css/04-pages/portfolio.css), [rules rail](../src/wwwroot/css/04-pages/rules.css), [shared TextField](../src/wwwroot/css/03-components/fields.css), [independent search](../preview-review/layout.css) -> [spacing/focus regression](../tests/phase02/spacing-focus.spec.mjs), existing auth/OTP/portfolio/axe/keyboard suites. Exact sources/comparisons and responsive evidence are in the [review report](../docs-work/OWNER_FEEDBACK_2026-11-14.md). Product fixtures and phase gates remain unchanged.

## BK-REQ01 Requested / Proposed distinction

Owner correction -> exact Batch 2 BK-REQ01-R/P HTML/screenshots -> [registry default](../src/page-registry.json), [static StatePage adapter](../tools/lib/product.mjs), [runtime selection](../src/wwwroot/js/features/booking/result.js) and [directory variant](../tools/lib/preview-review.mjs) -> [result/flow tests](../tests/phase03/request-results.spec.mjs). Requested has no time receipt; Proposed carries the actual preferred date and day-part. [Source comparisons](../docs-work/BK_REQ01_RESULT_CORRECTION.md).

## Owner-requested project-file review persistence

Cross-browser persistence request -> [review data](../preview-review/approvals.json), [shared validation](../preview-review/format.js), [browser boundary](../preview-review/storage.js), [serialized file store](../tools/lib/review-file-store.mjs), [local-only tooling endpoint](../tools/lib/review-endpoint.mjs) -> [integration regression](../tests/preview-review/project-file.spec.mjs) and existing approval/backup/axe/keyboard/static suites. No product context, API contract or phase acceptance changes.

## Owner element feedback - 2026-11-14

PUB-01/02 and Phase 03 annotations -> [scope/source report](../docs-work/OWNER_FEEDBACK_2026-11-14.md) -> shared [selection motion](../src/wwwroot/js/features/booking/selection-motion.js), [calendar](../src/wwwroot/js/features/booking/calendar.js), [editor](../src/wwwroot/js/features/booking/recurring-edit.js), native CSS and partials -> [owner regression](../tests/phase03/owner-feedback.spec.mjs), [carousel regression](../tests/phase02/carousel-motion.spec.mjs), existing route/axe/keyboard and root/subpath suites. Alias suppression is a [review-build concern](../tools/lib/preview-review.mjs); it does not mutate acceptance.

Preview follow-up: owner feedback → [compact controls](../preview-review/controls.njk), [state rows](../preview-review/variant.njk), [stable query identities](../tools/lib/review-entries.mjs), schema-v1 import/schema-v2 export → [variant regression](../tests/preview-review/variants.spec.mjs) and expanded keyboard/axe screenshots. Default-page acceptance never implies child-state approval; no product Page IDs or phase gates changed.

## ARCH — Independent review workspace

Owner request 2026-11-14 → [standalone UI/storage](../preview-review/) + [build adapter](../tools/lib/preview-review.mjs) + [content revisions](../tools/lib/review-revision.mjs) → [review tests](../tests/preview-review/) + existing static/route/axe/keyboard gates. Manual review is independent of product registry acceptance. [Report](../docs-work/PREVIEW_REVIEW_REPORT.md) records exact limits and results; no new product Page ID or business rule is introduced.

## Phase 01–02 owner-requested refresh — 2026-11-14

- ARCH / DS: [lint integration](../package.json), [VS Code task](../.vscode/tasks.json), [motion timing](../src/wwwroot/js/components/motion.js); existing build/structure/token/API/registry tests retain basePath and static-only guarantees.
- PUB-01: Batch 1 PUB-01 + MotionSpecimens + approved desktop brief → [carousel](../src/wwwroot/js/features/home-carousel.js), [visible step sequence](../src/wwwroot/js/features/home-steps.js) → [carousel behavior tests](../tests/phase02/carousel-motion.spec.mjs).
- PUB-02 / AUTH / SHELL / MORE: exact phase sources, DEC-037/038/044..047 → shared sheet/navigation motion, transform loading, canonical ink role-booking action → [motion/fallback tests](../tests/phase02/shared-motion.spec.mjs), existing auth/shell/axe/keyboard suites and Phase 03 consumer regression.
- Responsive: [boundary suite](../tests/phase02/refresh.spec.mjs), existing 390/768/1280 suites and [review evidence](../docs-work/PHASE_01_02_REFRESH_FA.md). No business rule, backend operation or next-phase assignment added.

## Infrastructure maintenance — 2026-11-14

- ARCH: [project context](ai/PROJECT_CONTEXT.md), [frontend guide](ai/FRONTEND_ARCHITECTURE.md), root workflow prompts and ten local skills preserve static/Razor compatibility and phase gates.
- DS: [export inventory](ai/DESIGN_EXPORT_INVENTORY.md), [source map](ai/DESIGN_SOURCE_MAP.md), [catalog](ai/COMPONENT_CATALOG.md), [conflicts](ai/DESIGN_SOURCE_CONFLICTS.md) derive from immutable source evidence and existing owner decisions.
- RULE: [implementation](ai/DESIGN_IMPLEMENTATION_CONTRACT.md), [responsive](ai/RESPONSIVE_DESIGN_CONTRACT.md), [motion](ai/MOTION_SPEC.md), [dependency](ai/DEPENDENCY_POLICY.md), [QA](ai/QA_CHECKLIST.md) and seven evidence templates govern later assigned work.
- Acceptance evidence: [maintenance report](ai/AUDIT_REPORT.md), existing root/subpath suites (76 passed each), full lint/build and maintained-doc structural checks. This is maintenance evidence, not new PAGE_INVENTORY product rows or Phase 03 acceptance.

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

## Mobile device review amendments

- DEC-044 applies the owner references for PUB-01/02, AUTH-01/02, SYS-ACC-01, CUS-02, BK-01/02, BK-F01/F02 and PAY-RES. BK-02 uses the existing Batch 2 BK-02-DEF and BK-02-EMPTY exports for the mobile views.
- DEC-045 maps the 30-day rule to the Tehran date window and the shared Persian calendar. Demo scenarios retain the source sample day labels. The calendar exposes distinct available, selected, closed, pending and out-of-window states.
- ADM-21 featured-image editing must accept landscape and portrait files. Reference PUB-01 and its two image fixture fields when that phase starts.
