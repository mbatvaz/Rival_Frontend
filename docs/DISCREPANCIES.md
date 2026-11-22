# Discrepancies and Alignment Log

## CUS-04 Appointment Swap — 2026-11-22

Batch 3 supplies the CUS-04 detail hierarchy and an existing action Sheet. It has no Appointment Swap artboard. The review states use the existing Sheet and the CUS-03 stacked date picker as component evidence. Two controlled-customer preview entries supply future appointments and preserve the dates in the historical artboards. The swap states await owner review. [Desktop brief](../docs-work/desktop-layouts/CUS-04.md)

## CUS-04-RSC rescheduling preview — 2026-11-21

The mobile calendar and action controls use the project touch-target minimum. At desktop widths the picker and result fit inside the existing customer shell. The Batch 3 source provides a conflict description and no tracking code for the conflicting facial appointment. The linked demo detail displays the recorded facts. Availability and changes are local fixture scenarios. [Source and review brief](../docs-work/desktop-layouts/CUS-04-RSC.md).

## CUS-04 initial detail preview — 2026-11-21

The live desktop preview uses the existing customer sidebar and a two-column information layout. Mobile keeps the source reading order and uses the existing dock and shared sheet. The first pass includes full receipts for the booked and completed records with exact source snapshots. Other linked records show their recorded appointment facts. The cancellation sheet displays the source impact with confirmation disabled; the reschedule calendar and other action/confirmation states are pending. [Scope and source evidence](../docs-work/desktop-layouts/CUS-04.md).

## CUS-03 calendar layering follow-up — 2026-11-17

DEC-075 supersedes the prior nested-calendar presentation that hid the filter parent. The filter now remains visually present under an overlaid calendar but is inert and ARIA-hidden, preventing duplicate modal interaction. A space-3 separation is added between month controls and day choices. Direct owner instruction also increases card day/time from the prior token sizes 22/13px to 26/14px while preserving 600 weight and the lighter weekday. [Evidence](../docs-work/CUS_03_MOTION_2026-11-17.md).

## CUS-03 interaction overrides — 2026-11-17

DEC-074 supersedes the export's single-choice status/service/stylist behavior and visible filter close control. Direct owner instruction makes those three groups multi-select with exclusive “all”, keeps only date range single-select, opens the calendar from the full field and removes the icon/button chrome. Customer controls suppress browser tap highlight while preserving `:focus-visible`. The shared parent filter does not replay its entry after the nested calendar closes, and CUS-03 appointment entry follows source order rather than geometric sorting. [Motion and fallback record](../docs-work/CUS_03_MOTION_2026-11-17.md).

## CUS-03 owner overrides — 2026-11-17

DEC-073 supersedes export-specific tab styling, one-sided date locks/tab-specific filters and the earlier desktop row proposals. The owner image is visual evidence for glass, date/service grouping and portrait selectors; the direct request overrides its locked start date and tab-specific title. The popup now adds common status options, two editable Persian date fields/calendar buttons and a source-authorized horizontal portrait rail. [Comparisons, resulting layouts and verification](../docs-work/CUS_03_OWNER_FEEDBACK_2026-11-17.md). Mobile history keeps its existing compact layout; desktop alone uses a single information row.

## CUS-03 source fidelity and desktop review — 2026-11-17

DEC-072 permits implementing each desktop review preview before owner feedback. CUS-03 uses the exact six Batch 3 mobile boards; no missing mobile reference is inferred. Native controls use at least 44px targets, so tabs/filter choices and historical rows are slightly taller than exports. Filter adds an explicit close control, an all-status choice and a typed, validated Jalali boundary in place of a drawing-only date field. Narrow 320px choices compact without a horizontal rail or nested vertical scroll. Existing dock/sidebar supersede the export shell. [Source comparisons, geometry and review limitations](../docs-work/CUS_03_REVIEW_2026-11-17.md). No financial/booking behavior changes; detail routes remain the assigned next slice.

## MORE-CUS scroll, pinning and resize recovery — 2026-11-16

DEC-065 supersedes DEC-064's desktop radios/profile header and document-scrolling More. The owner explicitly requests restoration and list-only mobile drawer scrolling. A root test reproduced the menu remaining visible after resize; viewport pinning and shared Sheet stack dismissal correct the cause. The exception is confined to `.rv-customer-more > .rv-more-list`. [Cause and actual checks](../docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md).

## Customer shell and dashboard source corrections — 2026-11-16

DEC-064 supersedes the home-specific sidebar width, single stretched desktop rows, one payment example, bottom-attached mobile customer More, hidden active dock label and anonymous home header. The owner supplies screenshots and direct placement/motion instructions. Customer More is now an explicit left-drawer exception; other overlays retain their current ownership and alignment. [Detailed comparisons and remaining verification limits](../docs-work/PHASE_04_OWNER_FEEDBACK_2026-11-16.md).

## CUS-01 desktop rejection resolved in implementation — 2026-11-16

DEC-063 supersedes the pending horizontal-nav proposal and wide single-column fallback. The owner explicitly requests the prior desktop right-side menu and independent card composition. The accepted booking menu becomes one shared partial; home uses horizontal appointment tickets and bounded supporting cards. Mobile card geometry and source content remain. Implementation follows this direct direction; owner visual/phase acceptance is not inferred. [Brief](../docs-work/desktop-layouts/CUS-01.md), [evidence](../docs-work/PHASE_04_IMPLEMENTATION_FA.md).

## Phase 04 first slice — 2026-11-16

CUS-01 uses the final Batch 3 artboards, not the historical Batch 1 explorations. The historical Phase 04 handoff describes NFR; the current implementation package assigns Customer Panel, with page rules from Batch 3 and confirmed decisions. CUS-07 is an embedded balance and must not become a wallet/finance page. Existing contact/map/recurring route corrections apply. Canonical type tokens replace isolated 44/30/17px export sizes with 40/26/16px; mobile hierarchy, photos, 322px hero, 152px media and 44px overlap are preserved. Touch targets are at least 44px. Fixed board height becomes document scrolling and viewport-fixed navigation. These are recorded deviations pending owner visual review. Desktop composition remains gated by its [proposal](../docs-work/desktop-layouts/CUS-01.md); later customer destination screens remain placeholders. [Exact sources and verification](../docs-work/PHASE_04_IMPLEMENTATION_FA.md).

## Booking link flash — 2026-11-16

DEC-061 removes the outgoing fade/cancel and transparent incoming main that caused a bright flash during booking navigation. Native booking links and opaque entry preserve current content until the next document; centered choice navigation is unchanged. [Evidence and limits](../docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md).

## Owner adaptation: mobile choice navigation — 2026-11-16

DEC-060 supersedes the two-part dock only for BK-01/BK-02 below 768px: remove booking and center the original icon card, without new motion or changes to other pages. [Source comparisons, checked results and baseline accessibility limits](../docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md). This adaptation does not claim pixel equality with the old two-part source or promote a future page.

## Phase 03 acceptance — 2026-11-15

The owner accepted the implementation after the documented booking/device/layout/calendar review corrections (DEC-043..057) and authorized closeout only (DEC-058). [Final handoff](../docs-work/PHASE_03_CLOSEOUT_FA.md). GAP-25/26 composition and recurring alternatives are resolved by the accepted implementation and later explicit owner corrections. GAP-27 remains an intentional phase boundary: linked customer dashboards, appointment/request management and alert management are future placeholders, not completed screens. Original source gaps and unresolved OQ-01..06/OQ-08 remain; acceptance does not invent assets, real integrations or backend guarantees. Phase 04 is not started.

## Resolved: mobile selected day differed from desktop

The mobile-only black checked style and rectangular available days differed from the approved desktop white raised/inset pill treatment. DEC-057 removes the split style and shares all three calendar states plus focus. The parity test compares computed background, color, shadow, radius, weight and transform across seven widths. [Evidence](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Resolved: remaining shadow edge and over-broad desktop presentation

32px was insufficient for the faint tail of the shared card shadow; reserve 64px paint space and compensate layout by -32px. Desktop-only payment amount layout had leaked into mobile and the result heading spanned the sidebar; restrict those rules and center within the content column. The returned badge opaque background covered icon shadow; make that surface transparent. [Record](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Resolved: mobile booking clipping and duplicated payment reviews

Rail padding clipped card shadows and left dots too close to fixed navigation. Progress background looping reset visibly. Recurring-photo absolute positioning retained its grid area, compounding a 42% width to roughly 17.6% of the card. Corrected padding, a clipped transform shine, photo containing block, radio selection and requested alignment/radii. Duplicate review owners were removed while canonical states and legacy links remain. [Evidence](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Resolved: package-caption inherited the description weight

The opt-in inner span for package service names matched the generic last-child description rule and inherited weight 300. Exact BK-R01 caption evidence requires 600 with 13px type and 18px line height. Restored these values through existing type tokens and explicit inheritance. Paired-page comparison found no further recent motion-induced typography/ordinary-spacing drift in 12 routes across 7 widths. [Audit](../docs-work/TEXT_LAYOUT_FINAL_AUDIT_2026-11-15.md).

## Resolved: global single-line prose was an implementation error

The generic tag scanner incorrectly applied card label behavior to ordinary paragraphs and headings. DEC-054 replaces it with explicit per-field opt-in hooks. Reloading the rebuilt pages restores their original multiline text styles; no broad stylesheet overrides or content rewrites remain on ordinary text. Other approved booking geometry changes are preserved. [Evidence](../docs-work/OVERFLOW_CARD_SCOPE_2026-11-15.md).

## Booking image and calendar correction - 2026-11-15

The prior desktop portrait override inflated context/ticket images; it is removed in favor of the compact horizontal context and short ticket photo. Time steps now belong to the detail column to avoid grid row growth from the summary. Calendar exit animations retain completed rows until replacement and reserve six weeks. Latest owner instruction explicitly replaces wrapping with overflow text motion, with static/manual reduced-motion access. [Evidence](../docs-work/BOOKING_LAYOUT_CORRECTIONS_2026-11-15.md).

## Over-broad review revision invalidation

The old scanner hashed every CSS import and conditional template include, and all variants derived their hash from the parent. A local edit could therefore stale unrelated approvals. DEC-052 narrows dependencies and gives variants independent hashes; automatic invalidation removes only the affected final approval while retaining its platform flags. Conservative shared-consumer dependencies remain explicit. [Evidence](../docs-work/PREVIEW_REVIEW_REPORT.md).

## TextField focus / public spacing

The prior TextField implementation added an offset outline around the base border, contrary to the exact TextField specification and current owner feedback. Focus now thickens the existing border to 2px ink, with fixed outer geometry and compensating padding; native input has no inner outline. Independent review search follows the same behavior. Caption padding is intentionally reduced; mobile rules links form a native horizontal rail per explicit owner instruction. [Evidence](../docs-work/OWNER_FEEDBACK_2026-11-14.md).

## BK-REQ01 default and hidden proposal result

The previous correction hid `?state=proposed` because runtime defaulted to Proposed, while the directory parent was named generic request result. That mapping obscured the business distinction. DEC-050 makes the timeless Requested receipt the static/runtime default and restores the distinct Proposed variant in the directory. No new business rule or phase acceptance is inferred. [Fix and sources](../docs-work/BK_REQ01_RESULT_CORRECTION.md).

## Review persistence follow-up

DEC-049 supersedes the original browser-only persistence limitation for the project's local preview. Manual approvals persist in a source JSON file and survive session closure/rebuild/browser changes. Plain static hosting exports the last built snapshot but cannot write repository files; fallback is identified in the UI. Product boundaries and phase gates are unchanged. [Evidence](../docs-work/PREVIEW_REVIEW_REPORT.md).

## Owner element review - 2026-11-14

Latest owner instructions supersede raised selection, one-shot home steps, landscape desktop image crops, fixed recurring header content, explanatory-card placement and visible demo banners. Portrait imagery and scrolling recurring header content are intentional changes; only its top handle remains sticky on mobile. Product simulation boundaries remain. [Sources/fixes and pending bottom-navigation clarification](../docs-work/OWNER_FEEDBACK_2026-11-14.md). Phase 03 remains unaccepted.

Preview follow-up: oversized vertical approval controls were replaced by horizontal 44px controls. Page-only approvals now explicitly mean the default view; registered variants have independent records. Prior approvals are retained without being silently copied into states. See [follow-up evidence](../docs-work/PREVIEW_REVIEW_REPORT.md).

## Independent preview workspace

Owner-requested red/yellow/green statuses are independent from historical implementation acceptance. Red means no runtime template, not missing original artboards. Product warning/success palettes are orange/teal; preview-only yellow tokens and the existing green accent satisfy the explicit review colors without changing the canonical design export. Source-change invalidation, static build/focus polling and browser-local persistence limits are recorded in the [report](../docs-work/PREVIEW_REVIEW_REPORT.md).

## Phase 01–02 refresh — 2026-11-14

- Closed shared raw-duration debt C-05 using existing tokens; corrected the role-shell booking action from accent green to the canonical ink action in Design System v2 Navigation. No new color/token introduced.
- Restored usable carousel keyboard/manual controls and explicit autoplay pause; retained image orbit and previous removal of arrow controls. Motion respects focus/hover/hidden/inert/reduced-motion conditions.
- Cross-document transition opt-in produced InvalidStateError under the unsupported-API check; a single CSS-entry/Web-Animations-exit path now preserves ordinary navigation and passes that scenario. No global error suppression added.
- Exact source comparisons, existing source-asset limitations and automated results are in the [refresh report](../docs-work/PHASE_01_02_REFRESH_FA.md). BK-01 desktop source/brief drift remains outside this two-phase task.

## Infrastructure audit — 2026-11-14

The [source conflict register](ai/DESIGN_SOURCE_CONFLICTS.md) records eight instruction/evidence issues. Existing owner decisions resolve centered desktop gallery and mobile recurring-editor scrolling; active guidance now reflects them. Raw motion durations and BK-01 desktop brief/runtime columns remain existing review items, not silently approved changes. Full scope/results/limits: [audit report](ai/AUDIT_REPORT.md).

| ID | Finding | Resolution / handling | Status |
|---|---|---|---|
| GAP-01 | Old source docs mention Tailwind/Alpine/htmx; current owner-approved frontend contract rejects them. | Marked historical; root `AGENTS.md` and `RIVAL_PROJECT_CONTRACT.md` are authoritative. | Resolved |
| GAP-02 | Old architecture expected Express + Nunjucks runtime while owner needs cPanel static hosting and direct HTML preview. | Replaced with build-time Nunjucks → static `dist/`; no Express or Node runtime on cPanel. | Resolved |
| GAP-03 | Old setup targeted Claude Code (`CLAUDE.md`, Claude prompts). | Active instructions moved to Codex `AGENTS.md`, prompts, skills, and VS Code tasks. Old files archived. | Resolved |
| GAP-04 | Old path references no longer match a stable repository layout. | Normalized to root `docs/`, `design-export/`, `phases/`, `prompts/`, `src/`, `tools/`, `tests/`. | Resolved |
| GAP-05 | Kickstart Audit would regenerate inventories already present in Master. | Changed to read-only preflight/gap audit; existing inventories remain canonical and only missing evidence is added. | Resolved |
| GAP-06 | Phase 01 old prompt included shell components also owned by Phase 02. | Phase 01 now builds infrastructure and neutral layout skeleton; Phase 02 owns the real shell. | Resolved |
| GAP-07 | STATE-04..07 appeared in Phase 03 and generic STATE work in Phase 08. | Phase 03 owns StatePage base and booking variants; Phase 08 reuses it for remaining states. | Resolved |
| GAP-08 | ADM-09 and ADM-16 shared finance components across Phase 06/08. | Phase 06 builds canonical finance primitives; Phase 08 extends them for matching. | Resolved |
| GAP-09 | Phase 08 mentioned MVC while Phase 09 owned migration handoff. | Phase 08 is compatibility-only; actual migration guide/readiness is Phase 09. | Resolved |
| GAP-10 | Phase 01 required infrastructure IDs in Page Inventory. | DS/RULE/ARCH are traced in TRACEABILITY, not listed as product pages. | Resolved |
| GAP-11 | Multiple exported CSS bundles and legacy batch class prefixes existed. | Export bundles remain evidence only; production CSS uses tokens + `rv-*` components. | Resolved |
| GAP-12 | Font and icon references were inconsistent. | Runtime uses normal-width Yekan Bakh 300/400/600 only and local Lucide-based SVG icons with `ri` compatibility prefix. | Resolved |
| GAP-13 | Previous responsive notes disallowed all inner scrolling and described desktop as a mobile layout adjustment. | Nested vertical scroll is prohibited; documented horizontal rails are allowed. Desktop is a page-specific composition derived from mobile design language. | Resolved |
| GAP-14 | Design exports may have missing screenshots or page IDs without independent artboards. | See `design-export/MANIFEST.md`; do not invent missing files or selectors. | Audited; owner review pending |
| GAP-15 | STY-CUS derived route incorrectly included the Markdown suffix `` ` + detail ``. | Corrected registry and derived MANIFEST route to `/stylist/customers/`, following PAGE_INVENTORY. Original design files unchanged. | Fixed and route-tested in Phase 01 |
| GAP-16 | Starter preview HTML/CSS was embedded in the build tool with unlayered styling, and canonical token/API/registry implementation was absent. | Moved infrastructure rendering to restricted Nunjucks partials; generated tokens, local assets and native modules. Product templates remain unimplemented. | Fixed in Phase 01 |
| GAP-17 | Starter test harness assumed root-only links and lacked keyboard/mock/basePath coverage. | Added root/subfolder suites and a Windows-safe IPC lifecycle for the local test server. | 19 + 19 tests passed |

## Phase 01 visual review

- Reviewed neutral directory and placeholder screenshots at 320/390/768/1280; RTL, local typography, touch areas and readable content confirmed.
- No product artboard applies to these infrastructure pages. No pixel-difference score or product desktop review approval is claimed.
- Fixed geometry (320px minimum canvas, 720/1200px container limits, 768/1024px breakpoints, 150px logo, 2px focus outline and 3px offset) follows the repository responsive/accessibility scaffold; colors, typography, spaces, radii and shadows use canonical tokens.
- Stylelint preserves original token color notation inside generated `00-tokens` files only. Other CSS remains checked normally; min-width notation follows the project contract.
- Decorative asset gaps, non-independent CUS-02/CUS-07 references, and open product decisions remain unchanged for the owning phases.

## Remaining source gaps

### Phase 02 update — 2026-11-10

- **GAP-18 — old shell routes:** Source `customer/recurring`, `admin/my-schedule` and `admin/booking-rules` were not canonical registry destinations. Reused BK-REC01 preview context, `/admin/schedules/?scope=me`, and `/admin/settings/booking/` respectively. No independent recurring or personal-schedule route was invented. All More destinations pass static route checks.
- **GAP-19 — source contact placeholders (review update):** Owner supplied phone 09141452321 and authorized nonreal development links. Public fixtures now contain the phone plus titled instagram.example, telegram.example and maps.example destinations (DEC-035). Original decorative map geometry remains; final real social accounts and coordinates remain future content.
- **GAP-20 — portfolio image counts:** Only PUB-02-V provides a verified three-image detail gallery. For other cards the exported source provides one independently mapped cover image; extra photos implied by badges are not fabricated or replaced with unrelated images. The demo count reflects the images actually available. `PHASE_02_ASSET_MAP.json` records all 14 copied asset filenames.
- **GAP-21 — auth canvas synchronization (review update):** Owner comment 17 explicitly supersedes the D10-211 alternate-method presentation: two direct password/Passkey buttons, password bottom sheet above the original visible form, unsupported Passkey disabled. Five-digit OTP, shared lock and expiry remain. Static preview states seed reference scenarios; no real SMS or Passkey credential operation is claimed.
- **GAP-22 — local preview collision:** Existing preview was already listening on 4173. Tests now use isolated 4183/4184 ports (override `RIVAL_TEST_PORT`) and leave the existing preview intact. Startup port failure exits clearly instead of waiting for readiness timeout.

Phase 02 visual review: source references rendered at 390; current screens captured at 320/390/768/1280. Checked local imagery, RTL, typography, rounded/glass surfaces, filter rails, sheet behavior and the approved desktop compositions. Full pixel identity is not claimed: canonical type scale, 44px controls, fluid content height, demo notices, auth decision corrections and honest missing-photo counts produce intentional differences from the fixed export canvases. The home selected-work six-card orbital rotation is reconstructed from the source positions with native JS/CSS; pause/previous/next controls and a reduced-motion pause are added for accessibility. Owner visual acceptance remains pending.

Carousel geometry also follows the source: 260×350px cards, 372px stage, positions at ±195/±128px and six 3-second steps per cycle; transitions use canonical motion tokens.

New fixed geometries are evidence-based: 844px mobile hero; 720px desktop hero; 420/260px portfolio image frames; 312×390px gallery frames; 480px auth column; 200px staff rail; 220px rule contents column; 560px maximum sheet. Home wordmark size derives from v2 display size. No new color/radius/shadow/spacing palette is introduced.

- See `OPEN_QUESTIONS.md` for unresolved product/permission decisions.
- Manifest entries with `not-found-in-export` or `implied-no-independent-artboard` must be reviewed against the relevant handoff before implementation.
- Some design exports contain hashed decorative assets that cannot be mapped to a page by filename alone; they are retained in the batch asset directories and listed in `MANIFEST.json` at batch level.

- **GAP-22 — Phase 02 owner visual review (resolved in implementation):** All 20 review items are mapped in docs-work/PHASE_02_REVISIONS_FA.md. Desktop composition follows the direct review instructions (DEC-036). OTP keeps a single accessible native autocomplete/paste input while rendering and supporting editing in five independent visual cells. Sheet scroll preservation uses one runtime CSS custom property for the captured scroll offset; no authored inline styles or scripts are generated. Native document view transitions progressively enhance the page entrance animation; reduced motion disables both.

- **GAP-23 — second owner review (implementation resolved):** Direct comments 1–10 supersede earlier visual choices: DEC-037 authorizes only the desktop portfolio viewer to center, DEC-038 removes the password popup, and DEC-039/040 record geometry and OTP presentation changes. The shorter desktop map follows the new equal-column requirement; the former one-third overlay target yields to that explicit height instruction. No booking, payment, credential or real contact behavior was introduced. Details and evidence: docs-work/PHASE_02_REVIEW_02_FA.md.

- **GAP-24 — third home review (resolved):** DEC-041 supersedes earlier solid/bordered nav and mobile-sized desktop hero copy. Dark glass is derived from existing bg-inverse using color-mix; canonical tokens stay immutable. The exact 264×180 desktop image uses a 264px gallery column, preserving mobile styles and equal-column bottoms.

- **Phase 02 acceptance update — 2026-11-10:** Owner accepted the corrected implementation after GAP-22..24. These visual review items are closed; remaining source asset/content limitations are preserved as documented. Closeout changes only status, preview labels and handoff material; no new product flow or Phase 03 implementation.

## Phase 03 — 2026-11-11

- **GAP-25 — Desktop composition.** Batch 2 provides mobile artboards. The owner rejected the first desktop brief and approved a new task-oriented layout with a dedicated step trail, calendar and time workspace, and sticky summary (DEC-043). The approved preview and per-page briefs are under `docs-work/`.
- **GAP-26 — Recurring alternatives.** The exported variant explorations are reconciled using D10-35 and the Phase 03 handoff. Monthly timeline, five-step add sheet, locked service/stylist during edit and group hold are implemented. External service examples and dates are fixed demo fixtures.
- **GAP-27 — Linked customer destinations.** Home, request management, appointments and availability alert management already have canonical links. Their product screens are assigned to Phase 04. Phase 03 renders receipts and supports return to the booking flow and the review directory.
