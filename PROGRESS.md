# Rival Progress

## Phase 04 worktree integration

`vivid-zebra` supplied an alternate CUS-06 stylesheet on the same base commit. The request page retains the latest owner-directed centered column, timeline, and Sheet scroll fix. The integration carries over the response grid and next-step card treatment, scoped to CUS-06. Generated stylesheet line endings do not change the tracked token values.

## CUS-05/06 desktop Sheet scroll gap

In the desktop request filter, freezing the entry animation at 1 ms exposed 618px of extra document scroll. The transformed Sheet extended below its containing layer. The request pages now clip overflow at the desktop Sheet layer so the entry and exit animations cannot add document scroll. The layer still sizes to its content. The request regression checks scrim coverage during entry for both the filter and cancellation.

## CUS-06 desktop layout and package timeline — 2026-11-23

Owner feedback puts the request detail in a centered desktop column and connects consecutive package date markers from center to center. [Desktop brief](docs-work/desktop-layouts/CUS-06.md).

## CUS-05 tab rename and appointment radio style — 2026-11-23

Per the owner's live-browser annotations, the completed group tab reads “تکمیل” instead of “تکمیل شده” (fixture group and preview variant labels), and the three status tabs use the CUS-03 appointment radio treatment: the shared glass strip, muted inset unselected pill, white raised selected pill and the scale transition replace the earlier transparent/ink selection. Count bubbles and the compact three-tab spacing down to 320px remain. [DEC-081](docs/DECISION_LOG.md#dec-081)

Build, lint and the focused requests suite passed 13/13 at root, including the 320/390/768/1023/1024/1280 visual and axe checks. Live preview updated on port 4173. CUS-05/06 desktop review remains open under DEC-072.

## CUS-05 and CUS-06 fidelity review — 2026-11-23

Rechecked the sixteen Batch 3 boards after the interrupted implementation. Restored the integrated hold cards, three tab states, fixed upper date and Jalali picker, the two detail layouts for single services and packages, and per-part appointment links. Existing booking submissions now reach their own customer detail and list entry. Payment returns through PAY-RES and cancellation updates the demo list and dashboard. [List review](docs-work/desktop-layouts/CUS-05.md), [detail review](docs-work/desktop-layouts/CUS-06.md). Desktop review remains open under DEC-072.

Final CUS-05/06 suite: 13/13 at root and 13/13 under `/rival-demo/`. All sixteen states were captured at 320, 390, 768, 1023, 1024 and 1280px, with axe across the 390/1280 state matrices and focused axe checks at the other widths. The broader booking/customer regression passed 56/56 under the subpath. The earlier root run recorded two Chromium `ERR_NETWORK_CHANGED` failures during the 768/1023 request checks, which passed in the final root run. Build, lint and map freshness passed.

## CUS-05 and CUS-06 requests preview — 2026-11-22

The owner started the next Phase 04 slice after accepting CUS-04. CUS-05 provides the payment, review and completed groups, filtering and an empty view. CUS-06 provides single-service and package details, inactive and terminal states, and cancellation impact previews. Cancellation and payment use browser-local demo data and the existing payment-result path. The [request list](docs-work/desktop-layouts/CUS-05.md) and [request detail](docs-work/desktop-layouts/CUS-06.md) desktop previews await owner review under DEC-072.

## CUS-04 Appointment Swap — 2026-11-22

The owner accepted CUS-04 and authorized publication on the Phase 04 branch after the final corrections in DEC-080. The rest of Phase 04 remains open.

The targeted detail, swap, rescheduling and dashboard checks passed 56/56 under `/rival-demo/`. At root, 55 passed in the combined run and the remaining layout assertion passed after waiting for the entry animation to settle. Lint passed and the test runner restored root output.

DEC-079 aligns swap dimming and entry with cancellation and adjusts shared Sheet focus visuals. [Visual and interaction brief](docs-work/desktop-layouts/CUS-04.md#swap-visual-evidence)

DEC-078 adds five directory shortcuts, status-aware actions, the dashboard-style timer, centered success and shared appointment lift. [Feature contract](docs/features/APPOINTMENT_SWAP.md)

DEC-077 adds the outgoing and incoming schedule review before final consent and a distinct success view within the redemption Sheet. [Feature contract](docs/features/APPOINTMENT_SWAP.md)

DEC-076 assigns the appointment-swap slice. [Feature contract](docs/features/APPOINTMENT_SWAP.md) and [desktop brief](docs-work/desktop-layouts/CUS-04.md) define the shared Sheet states, mock ownership and review entry points. Owner review is pending.

The root and subpath full Playwright runs each reported 269 passing tests and three failing tests. The same booking calendar animation assertion and two preview-directory count assertions also failed on an isolated build of the original HEAD, `bbd837a`. The 19 swap cases passed in both configurations. The subpath runner restored the root build. [Checks and changed files](docs/features/APPOINTMENT_SWAP.md#verification)

## CUS-04 rescheduling preview — 2026-11-21

The owner assigned the appointment rescheduling screens and provided the mobile references. The preview directory includes the eight CUS-04-RSC variants and the late-window detail entry under CUS-04. The calendar, confirmation, result and updated appointment run through the local demo data boundary. [Sources and review brief](docs-work/desktop-layouts/CUS-04-RSC.md).

## CUS-04 preview accepted — 2026-11-21

The owner accepted the implemented CUS-04 preview and requested closeout and publication on the Phase 04 branch. Cancellation submission, rescheduling and other CUS-04 variants remain pending. Further product work awaits owner instruction.

## CUS-04 first detail preview — 2026-11-21

After accepting CUS-03 on 2026-11-19, the owner asked to start the next Phase 04 slice. CUS-04 now opens from the customer home and appointment list, with the default and completed receipts, inactive account, a cancellation impact preview, and an unknown-record fallback. The [desktop review brief](docs-work/desktop-layouts/CUS-04.md) is pending owner feedback under DEC-072. Cancellation submission, rescheduling, and the remaining CUS-04 action variants are still pending.

Static build and lint passed. Focused CUS-04, home, desktop and appointment-list regressions passed 36/36 at root and 36/36 under `/rival-demo/`. Root output was restored and the live detail was opened on port 8183. The [review brief](docs-work/desktop-layouts/CUS-04.md#source-comparisons) records the screenshot comparisons.

## CUS-03 retained-filter calendar follow-up — 2026-11-17

DEC-075 keeps the filter popup visibly in place while its calendar opens as an overlaid Sheet; the underlying filter is inert/ARIA-hidden until the calendar closes, then focus returns to the originating date control. The calendar header/day grid now has a space-3 gap. Appointment day/time typography is 26px/14px for improved readability without changing card grouping or desktop columns. [Interaction record](docs-work/CUS_03_MOTION_2026-11-17.md). CUS-03 remains at owner review; no next page has started.

## CUS-03 filter interaction follow-up — 2026-11-17

DEC-074 adds a bounded glass container and token-based selection motion to the view radios, makes non-date filter groups multi-select with exclusive “all”, opens the existing Jalali calendar from the whole date field, removes the visible close control and calendar-icon chrome, and suppresses customer-only mobile tap highlighting. Nested Sheet return is static instead of replaying entry; initial appointment motion now follows source/DOM order. [Motion and interruption record](docs-work/CUS_03_MOTION_2026-11-17.md). CUS-03 remains at owner review and no next Phase 04 page has started.

## CUS-03 owner feedback — 2026-11-17

DEC-073 implements all seven annotated changes and the supplied glass-popup reference: desktop tools beside the bell, native radios, maximum three same-month cards per row, semibold day/time with light weekday, single-row history, and centered half-width empty/error frames. One shared filter preserves selections across views; both date boundaries accept Persian input and open the existing Jalali calendar, with shared nested-sheet focus restoration. The stylist rail supports native touch, keyboard and mouse dragging. [Scope, source comparisons and actual validation](docs-work/CUS_03_OWNER_FEEDBACK_2026-11-17.md). CUS-03 remains at owner review; remaining Phase 04 destinations and the overall phase gate are unchanged.

## Phase 04 accepted slice and appointment-list review — 2026-11-17

DEC-072 records owner acceptance of the existing CUS-01 slice (including embedded CUS-07 balance) and authorization to continue remaining Phase 04 work. CUS-01 is marked accepted; manual review approvals remain independent and untouched. CUS-03 now implements future/history lists, actual source-date/service/stylist/status filters, no-result/empty/loading/error states, keyboard navigation and shared initial-only record motion. Desktop reuses the accepted sidebar and is at the owner-requested live review gate on port 8183. [Specification](docs-work/CUS_03_SPEC.md), [brief](docs-work/desktop-layouts/CUS-03.md), [source comparisons and actual checks](docs-work/CUS_03_REVIEW_2026-11-17.md).

Next action: review CUS-03 desktop, apply feedback, then implement CUS-04 and the remaining customer pages. Detail destinations CUS-04/06 and CUS-05/08/09/10 are still placeholders. Full Phase 04 acceptance/closeout and full regression remain pending; Phase 05 has not started. Earlier pending/unassigned statements below are historical.

## Initial-load-only record entry — 2026-11-17

DEC-071 removes list-animation replay on popup close, filter changes and inserted records. Initial data enters once per document; modal opening cancels pending entry, while reloading starts a fresh sequence. The pre-fix portfolio regression reproduced 7 initial calls becoming 13 after closing its viewer; corrected root lifecycle/motion/canvas checks passed 16/16. [Scope and verification](docs-work/VARIABLE_LIST_MOTION_2026-11-17.md). Phase acceptance is unchanged.

## Mobile entry canvas stability — 2026-11-17

Reproduced a transient 8px document overflow in mobile portfolio entry. Replaced late body-level clipping with stable public/booking/workspace canvas clipping below 1024px. Per-item motion and native rails remain intact; root 24/24 responsive, axe, motion and canvas checks passed. [Cause and frame-by-frame evidence](docs-work/VARIABLE_LIST_MOTION_2026-11-17.md). Phase acceptance remains unchanged.

## Faster row-order motion and preview CLI — 2026-11-17

DEC-070 uses 240ms entry and 170ms staggering in visual RTL row order, preserving static chrome and native data-list behavior. The preview dev command now forwards --host/--port directly through a Node build/start wrapper; the static server parses/validates CLI values with environment fallback and actionable port errors. [Motion/measurements](docs-work/VARIABLE_LIST_MOTION_2026-11-17.md) and [preview command](README_START_HERE_FA.md). No OS port reservations or unrelated approval data were changed.

## Variable-record motion correction — 2026-11-17

DEC-069 replaces section entry with per-record list sequencing; home, titles, steps, right navigation, balance/tools, auth forms and result facts stay static. Whole-main route fading is removed. New/revealed records join their list sequence, focus/reduced motion cancels entry, and detached records are cleaned up. [Scope, tests and frame-pacing measurements](docs-work/VARIABLE_LIST_MOTION_2026-11-17.md). Phase 04 remains in progress.

## Shared section entry and customer rail shadows — 2026-11-17

DEC-068 extends entry motion to implemented public/auth/booking/result templates through explicit variable-section hooks. Shared headers, navigation, booking steps and fixed payment actions remain static. Customer mobile rails reserve full shadow space without changing card positions or native scrolling. [Implementation and actual checks](docs-work/SHARED_SECTION_ENTRY_2026-11-17.md). No placeholder implementation or phase acceptance is included.

## Customer section entry motion — 2026-11-16

DEC-067 implements the owner's desktop active-bar expansion and staggered home variable sections: desktop fade, mobile/tablet local-left fade/slide. Shared chrome stays static; reduced motion is immediate. [Scope, timing and verification](docs-work/PHASE_04_SECTION_MOTION_2026-11-16.md). Phase 04 remains in progress.

## Customer desktop canvas and sidebar alignment — 2026-11-16

Fixed the capped gradient exposing side seams beyond 1600px and the dashboard's extra 24px horizontal inset moving the shared sidebar relative to booking. Existing composition/mobile scope preserved. The actual navigation regression failed before the fix, then root 39/39 and subpath 39/39 passed, including 1024–2560px alignment, current home states, axe/keyboard, drawer recovery and dock behavior. [Cause, source comparisons and checks](docs-work/PHASE_04_SHELL_ALIGNMENT_2026-11-16.md). Phase 04 remains in progress.

## Customer sizing follow-up — 2026-11-16

DEC-066 removes the salon notice clock tile, caps More at 320px and enlarges the mobile wordmark to 90×30px. Build/lint passed; focused home/recovery checks passed root 19/19 and subpath 19/19. Fresh mobile, desktop and drawer screenshots were inspected. Phase 04 remains in progress. [Evidence](docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md).

## Customer chrome restoration and More recovery — 2026-11-16

DEC-065 restores the previous dashboard header/plain desktop links, moves salon notices below the left support tools, hides the mobile More header and constrains scrolling to its list. More is pinned to the viewport/physical left with 240ms standard timing. The existing Sheet lifecycle now dismisses the customer More stack on breakpoint crossing, including interrupted animation/nested logout; inert/focus/scroll are restored. The precise More-list scroll exception is owner-authorized and narrowly allowed in structure lint. [Reproduction, current scope, comparisons and checks](docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md). Existing paired cards, payment data, dock motion and manual approvals are preserved; Phase 04 remains in progress.

Final scoped QA: build/lint/whitespace passed; root 74/74 and subpath 74/74 passed, including scroll/resize recovery and affected shared consumers. Root output restored; fresh screenshots and six comparisons recorded. This is not full-phase acceptance or a physical-device retest.

## Phase 04 owner element feedback — 2026-11-16

DEC-064 implements the supplied More/dock screenshots and selected-element corrections: Phase 03-sized native-radio desktop navigation, responsive two/one-card appointment/payment grids, two independent payment entries and mobile payment rail, stacked credit/recurring/availability, shared identity header, grouped left-opening customer More and staged non-spring dock selection. Card entry fades without translating main. [Sources, motion contract, comparisons and QA](docs-work/PHASE_04_OWNER_FEEDBACK_2026-11-16.md). Current phase remains in progress; prior acceptance and concurrent manual review data are preserved.

Validation: build/lint passed; related subpath suite 66/66, final root owner-feedback suite 9/9, and additional subpath fallback/card checks 3/3 passed. The broad root run's stale global input-count assertion was scoped to the actual booking main and its focused booking/feedback rerun passed 12/12. Fresh desktop/mobile/drawer screenshots and seven comparisons are recorded; root deployment output restored. Full-phase acceptance remains pending.

## Phase 04 desktop revision — 2026-11-16

DEC-063 directs the customer dashboard redesign using previous desktop phases and the right navigation list. Booking and home now share one customer desktop menu; CUS-01 has horizontal appointment tickets, bounded payment/support cards, and a separate empty-state composition from 1024px. Mobile/tablet remain source-based. The previous pending horizontal-menu proposal is superseded by the direct owner instruction; this is not Phase 04 acceptance. [Revised brief](docs-work/desktop-layouts/CUS-01.md) and [scope/QA](docs-work/PHASE_04_IMPLEMENTATION_FA.md). Existing unrelated/manual approval changes remain preserved.

Validation: build/lint passed; Phase 04 root 18/18 and related subpath 35/35 passed. Additional desktop/shared accessibility/motion checks passed after updating the stale desktop menu-name expectation; the corrected booking-action check passed in both modes. Fresh screenshots and six visual comparisons are recorded. Final output uses root basePath; this is a scoped revision, not full-phase closeout.

## Phase 04 assignment and first implementation — 2026-11-16

Owner explicitly starts Phase 04 on a new local branch (DEC-062), superseding earlier unassigned notes. `phase/04-customer-panel` was created from clean, synchronized master. The first slice implements CUS-01 default/empty/inactive and embedded CUS-07 balance from exact Batch 3 artboards, reusing shared role navigation, More/logout sheets and rail behavior. [Scope, source comparisons, verification and remaining work](docs-work/PHASE_04_IMPLEMENTATION_FA.md). Desktop brief awaits owner review; remaining Phase 04 pages are still placeholders. No Phase 04 acceptance or Phase 05 start. Concurrent manual review approval edits are preserved.

## Booking navigation flash correction — 2026-11-16

Owner reports a bright flash when selecting choice-page links (DEC-061). Booking anchors now use native navigation without the outgoing 1→0.35 fade; booking main content has no transparent entry. The centered choice dock and product data/routes remain unchanged. [Cause, first-frame checks and results](docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md). Root targeted choice/flash/booking/shared-motion **19/19** passed; first-frame opacity=1, no JS exit fade, Back and reduced motion checked at 390/1280. No phase assignment or acceptance change.

Final subpath flash **2/2**, lint and map CHECK passed; root output restored. Full browser suites were not repeated for this targeted motion correction.

## BK-01/BK-02 mobile navigation — 2026-11-16

Owner narrows the navigation request to mobile BK-01/BK-02 (DEC-060): hide booking and center the existing four-icon glass card below 768px, with its previous dimensions/tokens. CSS only; no template/JS/fixture or other route behavior change. Root focused navigation/review-polish/shared-motion **19/19**, subpath focused navigation **6/6** passed; root output restored. Screenshots, keyboard, overflow, hit areas and WCAG checks were reviewed, with a baseline 320px carousel accessibility issue explicitly retained in the [report](docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md). No new phase or acceptance; previous context infrastructure preserved.

## Context navigation infrastructure — 2026-11-16

Owner approved the context project and continuing remaining stages without repeated approval pauses. Added local evidence graph/index and BUILD/UPDATE/CHECK/QUERY commands; in-memory default rendering narrows template consumers without writing product output. Root routing and all ten existing skills select relevant context/reuse valid QA evidence; one rival-context skill added. No external dependencies, product source, original design/reference, registry acceptance, approvals, phase package, branch or history changes. Phase 04 remains unassigned. [Report, actual checks and limits](docs-work/CONTEXT_OPTIMIZATION_REPORT_FA.md); [navigation](docs/ai/PROJECT_INDEX.md). Six tool tests and six real navigation scenarios passed, as did lint and graph freshness checks. Browser/subpath/product builds were unnecessary for this infrastructure-only scope and were not run.

## Frontend-only Git workflow — 2026-11-16

Owner authorizes repository cleanup and GitHub rename to `Rival_Frontend` (DEC-059). The frontend already exists on `master`; all permanent frontend/backend branch tips equal its pre-cleanup tip. Remove the empty backend solution and replace stable branches with annotated tags, preserving published history. Future assigned phases start from `master`, merge back after acceptance/closeout and receive stable tags; [workflow](docs/GIT_WORKFLOW.md). No product source, manual approval, registry acceptance or phase gate changes. Phase 04 remains unassigned. Validation: static build, all lint checks and diff whitespace checks passed. No UI change; browser suites were not rerun. GitHub rename and local origin update are verified; publication and branch/tag parity are verified separately after committing.

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
