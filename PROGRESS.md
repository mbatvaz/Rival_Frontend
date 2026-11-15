# Rival Progress

## Phase 03 owner acceptance and closeout — 2026-11-15

The owner explicitly accepted Phase 03 and authorized its completion work only (DEC-058). All 15 Phase 03 registry contexts and their 33 current variant entries are accepted and dated; other phase entries, manual preview approvals and the entire review revision feed are unchanged. Current scope is 21 accepted contexts and 52 future placeholders. [Final handoff](docs-work/PHASE_03_CLOSEOUT_FA.md) consolidates state ownership, component reuse, five source comparisons and remaining gaps. Final validation: build and lint passed; full root 148/148 and subpath 148/148 passed; root output restored. Phase 03 closeout is complete. Phase 04 is unassigned and must not start. Earlier dated pending-review notes below are historical.

## Shared mobile/desktop calendar selection - 2026-11-15

Owner requests the same selected-day presentation on mobile as desktop. Removed the separate mobile ink selection; moved the desktop available/selected/focus rules into the shared calendar stylesheet. Selected days are raised white pills, available days inset muted pills, and keyboard focus remains explicit. [Parity regression](tests/phase03/calendar-parity.spec.mjs) compares actual computed states at 320/390/568/768/1023/1024/1280, with calendar-scoped axe and keyboard selection. Root visual/axe regression 13/13 and focused subpath regression 12/12 passed. Lint and whitespace checks passed; root output restored. No product state or phase gate changed.

## Shadow and responsive-alignment follow-up - 2026-11-15

Owner clarifies four review details: extend rail shadow paint space without increasing the card-to-pager gap, restore original mobile payment layout, center the desktop payment heading within its content column, and remove the returned badge surface clipping the icon shadow. [Record](docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md). Canonical source CSS and targeted regression were updated; product states, manual approvals and Phase 03 gate are unchanged. Final root polish/visual/axe 19/19 and subpath polish/visual/typography 26/26 passed. Lint and whitespace checks passed; root output restored.

## Booking review polish and payment-state consolidation - 2026-11-15

Implemented owner annotations for mobile rail shadow/dots/nav clearance, seamless RTL progress shine, long payment wrapping, matched package corners, correct recurring-photo sizing/mask, native calendar selection and centered desktop state titles. PAY-RES owns returned-credit and SMS-failure variants; duplicate/system review rows and removed map/OTP designs are omitted, with old links resolving to canonical flows. [Scope, sources and QA](docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md). Final focused root visual/axe regression 18/18 passed; final subpath booking/review/smoke 45/45 passed. Lint and whitespace checks passed; root output restored. Phase 03 acceptance remains pending.

## Final typography and text-layout audit - 2026-11-15

Owner requested a final regression audit after correcting text-motion scope. Compared 12 routes with the motion module enabled/disabled across 7 widths (84 paired cases), plus source/visual checks. Fixed package-caption drift from 12/24/300 to source 13/18/600 using existing tokens and inherited label weight. Root 35/35 and subpath 20/20 passed; lint passed and root output restored. [Report](docs-work/TEXT_LAYOUT_FINAL_AUDIT_2026-11-15.md). Phase 03 acceptance remains pending.

## Compact-card overflow scope correction - 2026-11-15

Corrected the overly broad text-motion implementation: only explicitly marked variable labels inside compact service, stylist, portfolio and appointment cards can scroll. Ordinary page copy, headings, rules, status messages and descriptions wrap naturally again. [Implementation and regression](docs-work/OVERFLOW_CARD_SCOPE_2026-11-15.md). Other booking layout corrections and Phase 03 gate are unchanged. Validation: focused root 8/8 and full root 133/133 passed; lint passed. Affected subpath checks 32/32 passed. The final exclusion of the expandable checkout detail card was verified by 15/15 focused root tests; checkout prose also wraps normally.

## Booking layout and shared overflow correction - 2026-11-15

Owner element feedback is implemented in canonical sources: mobile side-card scale/dots/dock clearance, empty headings, filled-progress shine, independent desktop steps, compact context/ticket photos, left-aligned date rows and stable month replacement. Shared overflowing text now moves on one line with keyboard/manual reduced-motion access. [Scope, motion and source comparisons](docs-work/BOOKING_LAYOUT_CORRECTIONS_2026-11-15.md). Phase 03 acceptance remains pending. Validation: full root regression 129/129 passed; subpath 128/129 passed with one random browser-unsafe port in the isolated project-file test, then all 37 affected subpath regressions passed, including that test. Lint and whitespace checks passed; root output restored.

## Scoped final-approval invalidation

- Owner requests that file edits revoke only the affected page/state final approval. Replaced global CSS/raw-template dependency hashing with context-scoped rendered content, CSS and active fixture/module fingerprints; variants no longer derive their version from the parent version.
- Automatic invalidation preserves mobile/desktop flags and other records. Manual revocation behavior and product phase gates remain separate. Verified and rebased 23 current owner records for this fingerprint-only upgrade without changing their flags.
- [Regression](tests/preview-review/revisions.spec.mjs) and [report](docs-work/PREVIEW_REVIEW_REPORT.md); 25 review tests passed in root and subpath; 30 broader subpath checks passed. Full regression was 124/125 with an unrelated desktop alignment failure; its focused rerun passed 2/2. Lint passed; root output and 23 valid finals preserved.

## Public spacing, rules rail and text-entry focus correction

- Owner requests compact portfolio captions at mobile/desktop sizes, a horizontal mobile rules TOC and one thicker ink focus border on every current keyboard-entry control.
- Corrected canonical [portfolio styles](src/wwwroot/css/04-pages/portfolio.css), [rules layout](src/wwwroot/css/04-pages/rules.css), [TextField](src/wwwroot/css/03-components/fields.css) and independent review search. Reused the native drag rail; desktop rules sidebar stays sticky. No product phase, business copy or dependency change.
- [Focused regression](tests/phase02/spacing-focus.spec.mjs): 3 passed, with screenshots at 390/768/1280 and rules boundaries at 320/1023/1024. Full root regression: 122/122; related subpath regression: 52/52; lint and diff checks passed, root output restored. [Review report](docs-work/OWNER_FEEDBACK_2026-11-14.md).

## BK-REQ01 result distinction correction

- Owner identifies Requested (no time) versus Proposed (preferred day/day-part). Corrected the prior review-list default: BK-REQ01 now defaults to Requested in generated HTML and runtime; Proposed has its own visible directory variant. No new route or phase is introduced.
- Actual request type still selects the receipt; morning/noon preferences survive submission and reload. [Regression](tests/phase03/request-results.spec.mjs) and [visual/source record](docs-work/BK_REQ01_RESULT_CORRECTION.md). Existing approval data is preserved; changed revisions require re-review. Validation: 10 focused flow/result tests, 34 shared root regressions and 50 subpath tests passed; lint passed and root output restored.

## Project-file review persistence - owner follow-up

- Owner requests cross-browser approval persistence directly in project files. Local preview now writes only manual approvals to [approvals.json](preview-review/approvals.json), with serialized atomic writes and migration of missing legacy browser records. Build exports a static snapshot and never overwrites the source file.
- [Local endpoint](tools/lib/review-endpoint.mjs) is an explicitly authorized development-tool exception; product APIs, fixtures, registry acceptance and phase gates stay unchanged. Static hosting identifies browser-local fallback honestly.
- [Integration tests](tests/preview-review/project-file.spec.mjs) exercise isolated browsers, concurrency, migration/revocation, restart, invalid requests, write failure and build snapshot. Full root regression: 114 passed; final scoped subpath regression: 27 passed. Lint passed; root output restored and live port 4173 confirmed project-file mode. [Report](docs-work/PREVIEW_REVIEW_REPORT.md).

## Owner element feedback - 2026-11-14

- Public carousel/steps, portrait desktop imagery, booking selection motion, checkout and progressive recurring editor corrected within owner-assigned scope. Phase 03 acceptance remains pending; no later phase started.
- Duplicate CUS-02 review row, BK-F01 SMS state and BK-REQ01 proposed default duplicate omitted from review. Working routes and independent approval storage remain intact.
- [Report and five source comparisons](docs-work/OWNER_FEEDBACK_2026-11-14.md). Lint passed; full root and subpath regressions 110/110 passed, with additional final gallery/API regressions 11/11 root and 15/15 subpath. Root output restored. Bottom-navigation clarification remains pending; all other annotated corrections are implemented.

## Preview staged approval controls

- Owner requested no controls for unimplemented entries; mobile/desktop are replaced by final after both approvals. Revoking final resets both platform approvals and restores them. Applies independently to default pages and states.
- Confirmed controls now use white icons on solid green, with focus transferred when controls change. Stable storage/backups and product phase gates remain unchanged. [Report](docs-work/PREVIEW_REVIEW_REPORT.md).
- Final checks: 19 root and 19 subpath review tests passed; root output restored; lint and diff check passed. Includes stage/revoke/reload, focus, color, keyboard/axe and responsive checks at 320/375/390/768/1024/1280.

## Preview icon-only follow-up

- Owner requested icon-only approvals next to each page/state name and color instead of row status text. Implemented with 44px hit areas, accessible labels/tooltips and unchanged approval storage.
- Review suite: 19 root and 19 subpath passed; root output restored; lint passed. Screenshots and layout/axe/keyboard checks cover 320/375/390/768/1024/1280. [Report](docs-work/PREVIEW_REVIEW_REPORT.md).

## Preview density and per-state approvals

- Owner requested smaller review controls and approval for each child state. Controls are now horizontal/touch-sized; long help and state lists are collapsed by default.
- All 55 registered variants have stable independent mobile/desktop/final records, separate from the 73 default-page records. Existing page approvals and v1 backups remain supported; no approval cascades to children. [Report](docs-work/PREVIEW_REVIEW_REPORT.md).
- Final checks: 106 root tests and 106 subpath tests passed; root output restored; lint passed. Expanded state controls, keyboard/axe and <=48px control heights were verified at 390/768/1280. One pre-existing animation/geometry test race was synchronized without changing product behavior or weakening its layout assertions.

## Independent preview approvals — 2026-11-14

- Owner requested a separate review workspace for the directory. [preview-review/](preview-review/) owns mobile/desktop/final toggles, red/yellow/green status, search/filter and JSON backups; product registry/phase acceptance is unchanged.
- Content revisions invalidate old approvals after build. An open tab reads the static revision feed on return and every 15 seconds while visible; no backend or package added.
- Source/behavior boundaries, screenshot comparisons and checked results: [report](docs-work/PREVIEW_REVIEW_REPORT.md). Phase 03 acceptance remains pending; Phase 04 remains unassigned.
- Final gate: lint passed; full root 100 passed; full subpath 100 passed, root output restored. Review images/axe/keyboard checked at 390/768/1280; manual approval fixtures existed only in isolated test browsers.

## Phase 01–02 refresh — 2026-11-14

- Owner explicitly requested re-audit/correction of both accepted phases using the updated infrastructure, including suitable animation. Scope and motion records: [plan](docs-work/PHASE_01_02_REFRESH_PLAN.md); findings, comparisons and final checked results: [report](docs-work/PHASE_01_02_REFRESH_FA.md).
- Foundation build/data/token/asset boundaries retained; maintained-doc/skill validation is now part of lint and exposed through a VS Code task.
- Shared page/sheet/navigation motion uses existing tokens with cancellation/fallback; home carousel has accessible keyboard/indicator/pause control; steps play once on visibility; loading uses transform shimmer. Role-shell booking action corrected to canonical ink and an accessible name.
- Historical Phase 01/02 acceptance persists; this refresh is submitted for owner review. Phase 03 acceptance remains pending and Phase 04 remains unassigned.
- Final code validation: full root 87 passed; full subpath 87 passed, then root output restored. Eleven new scenarios cover motion, accessibility, unsupported APIs and responsive boundaries. Detailed limitations and source comparisons are in the refresh report.

## Infrastructure maintenance — 2026-11-14

- Owner-authorized instruction/documentation/skill audit completed independently of numbered product phases; see [audit report](docs/ai/AUDIT_REPORT.md).
- Root guidance, focused contracts, source inventory/map, seven local skills, seven templates and audit/link-validation tooling added; three existing skills and active docs reconciled with approved exceptions.
- Build/lint passed; full root suite: 76 passed; subpath suite: 76 passed, root output restored. Fresh responsive samples reviewed; source/brief differences and validator limitations are recorded honestly in the report.
- Original exports/references and runtime pages unchanged; no dependency/global install/push/deployment. Phase 03 acceptance remains pending; Phase 04 remains unassigned.

## Current status

- [x] Codex starter package and canonical contract aligned.
- [x] Original design exports preserved read-only and indexed in `design-export/MANIFEST.json`.
- [x] Static-first repository scaffold and local preview tooling prepared.
- [x] Preflight report approved by owner (2026-11-10, current chat).
- [x] Phase 01 implemented and automated gates passed (2026-11-10).
- [x] Phase 01 accepted by owner instruction to start the next phase (2026-11-10).
- [x] Phase 02 assigned and started (2026-11-10).
- [x] Phase 02 desktop layout briefs approved by owner (2026-11-10, current chat).
- [x] Phase 02 implementation and automated checks completed (2026-11-10).
- [x] Phase 02 implementation accepted by explicit owner instruction (2026-11-10).
- [x] Phase 03 assigned by explicit owner instruction (2026-11-11).
- [x] Phase 03 purpose-designed desktop revision approved by owner before desktop implementation (2026-11-11).
- [x] Phase 03 mobile and approved desktop implementation; 74 root and 74 subpath tests passed (2026-11-11).
- [ ] Phase 03 final implementation acceptance.

## Current gate

Phase 03 was assigned after Phase 02 closeout. Its desktop briefs and six-view preview were revised and approved before desktop implementation. Phase 03 implementation is at owner review. Phase 04 requires separate authorization.

## Review of phases 02–03 — 2026-11-12

- Restored persistent field labels, added smooth keyboard avoidance, and documented the source-artboard comparison workflow (DEC-046/047).
- Applied desktop menu and heading corrections, aligned selection steps, and used the Batch 2 time and checkout artboards for controls, states, and payment visual hierarchy. See `docs-work/REVIEW_2026-11-12_FA.md`.

## Third booking review — 2026-11-12

- Updated booking stages by service, linked suggested times to calendar and time choices, and adapted the recurring editor, alerts, payment breakdowns and result states to the owner review.
- Added the recurring sheet's mobile scroll exception and lightweight, reduced-motion-aware icon animations. See `docs-work/REVIEW_2026-11-12_FA.md`.

## Second booking review — 2026-11-12

- Reworked the recurring list, new appointment and edit sheets using the Batch 2 artboards. The shared month picker now uses native radios, and the mobile date strip selects the date in its fixed center frame.
- Aligned desktop stage and workspace widths, made service and stylist cards portrait, and consolidated checkout in one card. The home portfolio carousel now advances automatically.
- Reference mapping and responsive decisions are recorded in `docs-work/REVIEW_2026-11-12_FA.md`.

## Phase 02–03 physical-device feedback

- Applied the owner's Galaxy S20 FE observations and desktop annotations to public pages, auth, and booking. DEC-044/045 record the reusable rules and the 30-day Tehran calendar window.
- The booking menu, step placement, service and stylist rails, availability, checkout, and result layouts follow the revised references. Mobile gallery entry/exit and horizontal drag use shared components.
- The desktop hero uses the existing landscape salon photo. The two-image OwnerAdmin upload requirement is recorded for the settings phase.
- See `docs-work/DEVICE_REVIEW_FA.md` for verification and the review entry points.

## Phase 03 implementation review — 2026-11-11

- 15 contexts and 38 states now use the booking views. Fixed, proposed, requested, recurring, alert, hold, and result workflows are connected with local demo data.
- DEC-043 records the approved desktop revision. Calendar, time selection and sticky summary share one workspace; recurring items use aligned rows and month links. Mobile retains its rails and bottom sheets.
- `npm run build` and `npm run lint` passed. Playwright passed 74 tests on each deployment path. Output restored to the root base path.
- 83 Phase 03 screenshots per deployment mode are under `tests/screens/phase03/`. See `docs-work/PHASE_03_REPORT_FA.md` for scope, sources, results and review links.

## Phase 02 acceptance and closeout — 2026-11-10

- Owner explicitly accepted Phase 02 and authorized completion work; Phase 03 remains unassigned and unstarted.
- Six product contexts marked accepted in the registry and preview; shared shell acceptance is recorded separately because remaining role pages are placeholders owned by later phases.
- Final checklist, shared-component reuse notes, approved visual overrides and remaining development content consolidated in the closeout report.
- Final closeout gate: lint passed; 56 root tests and 56 subpath tests passed; root output restored. Mandatory Phase 02 completion work is closed.

## Phase 02 third home review — 2026-11-10

- Four home changes completed: shared borderless black glass desktop nav, square hero top corners, desktop headline/body/action scale and 264×180 third salon image. Mobile sizing remains unchanged.
- lint passed; relevant responsive/axe/review suites: 23 passed per path. Current home screenshots reviewed under tests/screens/phase02-review02/{root,subpath}/.
- DEC-041 and the PUB-01 desktop brief record responsive and token choices. Phase 02 acceptance is still pending.

## Phase 02 second owner-review corrections — 2026-11-10

- Ten new comments completed; desktop hero max 1612.8px (+20% previous width each side), dark rounded navigation, intrinsic balanced visit columns, sticky rule contents and matching error/CTA widths.
- DEC-037: desktop portfolio viewer is centered, mobile stays bottom attached; native touch plus mouse drag/wheel horizontal rail. Other sheets remain bottom attached.
- DEC-038/040: full password login view with SMS switch and history/reload, one centered resend timer, portrait five-cell OTP. Existing shared locks and code validity preserved.
- npm run lint passed. Full root suite: 56 passed; subpath suite: 56 passed, root output restored. New screenshot directory: tests/screens/phase02-review02/{root,subpath}/.
- Original export/reference trees unchanged. Phase 02 acceptance is pending; Phase 03 has not started.

## Phase 02 owner-review corrections — 2026-11-10

- All 20 owner comments addressed against nine supplied reference images; desktop-only revisions are scoped from 1024px. DEC-034..036 record the direct owner instructions.
- PUB-01 responsive hero/about/carousel/map/CTA composition, glass navigation/captions, animated steps and contact/social links. PUB-02 borderless cards, overlay details, empty/error/shimmer and half-width desktop CTA. PUB-03 IconTile/policy/contact composition.
- AUTH-01/02: 11-digit phone with Persian formatting/paste and read-only guard, five editable visual OTP cells with native autocomplete, red invalid fields, notice icons, direct methods and password bottom sheet with retained background.
- Shared sheet background remains visible/inert, with focus/scroll restoration. Link/scrollbar utilities and reduced-motion-aware page/sheet/native route transitions are reusable in later phases.
- Full checks: lint passed; root 50 passed; subpath 50 passed. After the final read-only paste guard, affected auth/review suites: 13 passed per path. Root output restored. 59 screenshots per deployment mode in tests/screens/phase02-revision/{root,subpath}/.
- Scope unchanged: Phase 03 has not started; Phase 02 owner acceptance remains pending.

## Phase 02 evidence

- Implemented PUB-01..03, AUTH-01/02 and SYS-ACC-01; 6 templates and 67 clearly labelled future-page placeholders.
- Shared Public/Auth/Role layouts, fixture-driven navigation for Customer/Stylist/OwnerAdmin, More and logout sheets.
- D10-207/210/211: five-digit demo OTP, 120-second validity, 60-second resend, old-code invalidation, five failures in 15 minutes and a shared 15-minute lock across methods. Safe local return routes; no stored password.
- Passkey capability detection and OTP fallback only; no platform credential request or real backend identity claim.
- Home six-card orbital carousel with pause, swipe/keyboard controls and reduced-motion handling. Portfolio service/stylist filtering, URL filter persistence, empty/loading/error/retry and bottom-sheet viewer.
- `npm run lint`: passed. `npm test`: 45 passed. `npm run test:subpath`: 45 passed, then root output restored.
- Layout/touch/overflow checks at 320/390/768/1280; axe at 390/768/1280 and state/sheet checks.
- 54 screenshots per deployment mode in `tests/screens/phase02/{root,subpath}/`; six rendered source references in `tests/screens/design-reference/`.
- Immutable export/reference sources unchanged. Asset provenance: `docs-work/PHASE_02_ASSET_MAP.json`.
- Existing local preview on port 4173 verified to serve the new home and opened in Codex. Owned test servers on 4183/4184 closed normally.
- Source gaps: real contact/social/map destinations and additional portfolio photos are not invented. See GAP-18..21 and the report.

## Phase 01 evidence

- `DS`: nine generated token families, three normal-width Yekan Bakh weights, 71 local SVGs, local logos.
- `RULE`: demo-only static fixture reads/localStorage writes through `core/api.js`; no product business behavior.
- `ARCH`: restricted build-time Nunjucks, 73 placeholder contexts, preview directory and alias, cPanel `.htaccess`, deployment basePath support.
- `npm run build`: passed; 0 product templates and 73 explicitly labelled placeholders; 75 HTML files including directory/alias.
- `npm run lint`: passed (structure, ESLint, Stylelint).
- `npm test`: 19 passed; `npm run test:subpath`: 19 passed at `/rival-demo/`, then restored root output.
- Playwright: 320/390/768/1280, keyboard, routes, assets, mock failures/persistence, registry lazy initialization.
- axe: no WCAG A/AA violations on directory/placeholder at 390/768/1280.
- Screenshots: eight per deployment mode, under `tests/screens/foundation/{root,subpath}/`.
- No pixel match or product desktop approval is claimed for these neutral infrastructure pages.
- Original exports and reference documents unchanged; only derived STY-CUS route metadata corrected.

## Notes

- This starter package is not the completed application. Pages remain placeholders until their implementation phases are executed.
- cPanel deployment is only from `dist/` after a successful build.
