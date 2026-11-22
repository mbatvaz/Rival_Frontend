# Decision Log

## DEC-080 — CUS-04 detail acceptance and final corrections

The owner accepted the CUS-04 detail slice with its rescheduling and swap views and authorized publishing the finalized slice to the existing Phase 04 branch. The live demo shows appointment time remaining, uses equal management-action spacing and blocks redemption while the same appointment has an active offer. The fixed-date design snapshots display swap entry actions when cancellation is present and retain their reference dates. This closes the CUS-04 slice within Phase 04.

## DEC-079 — Shared Sheet scrim, entry and focus

The swap Sheets use the cancellation scrim and shared Sheet entry animation. Creation and direct previews prepare their content before opening. Automatic focus keeps keyboard interaction available, with a visible focus indicator during keyboard use and no initial ring on pointer or direct-preview entry. [CUS-04 review brief](../docs-work/desktop-layouts/CUS-04.md)

## DEC-078 — Swap review shortcuts, eligibility and presentation

CUS-04 exposes both swap actions across appointment details. The active future swap fixtures enable the actions. Inactive accounts, past records and ineligible statuses display the disabled actions with an explanation. The preview directory links directly to create, code, entry, confirmation and success. The code uses the customer payment timer presentation, and swap Sheets lift the appointment summary over a dark scrim. Customers own their decision and agreement to swap. The salon's legal and service obligations continue to apply. [Feature contract](features/APPOINTMENT_SWAP.md)

## DEC-077 — Review both appointments before swapping

The owner requested a confirmation view and a distinct success view inside the CUS-04 redemption Sheet. Checking a valid code displays both appointment dates and times. The final confirmation revalidates and redeems the offer. [Feature contract](features/APPOINTMENT_SWAP.md)

## DEC-076 — Appointment Swap in CUS-04

The owner assigned the appointment-swap workflow in Phase 04 on 2026-11-22. Exchange only current attendee/management ownership, using a ten-minute, single-use, date-only code. Preserve the reserved slots, original payer/creator, payment history and rescheduling quota. An eligible refund follows the original payer. Implement the browser-local preview under the existing CUS-04 composition. Implementation acceptance and publication require a separate owner decision. [Feature contract](features/APPOINTMENT_SWAP.md)

## DEC-075 — Calendar overlays the retained filter and appointment dates grow

On 2026-11-17 the owner keeps the CUS-03 filter visible beneath its Jalali calendar instead of hiding/replacing it, requests more separation between the calendar heading and day grid, and slightly larger appointment day/time text. The date picker uses the existing Sheet stack with an explicit visible-but-inert parent mode; the calendar is positioned over the same filter surface, restores the parent and opener on close, and adds a space-3 grid gap. Appointment day grows from 22px to 26px and time from 13px to 14px at both mobile and desktop widths. [Motion/interaction record](../docs-work/CUS_03_MOTION_2026-11-17.md), [owner evidence](../docs-work/CUS_03_OWNER_FEEDBACK_2026-11-17.md). No route, filter semantics or phase acceptance changes.

## DEC-074 — Appointment filter multi-selection and corrected motion

On 2026-11-17 the owner revises CUS-03: future/history radios need a distinct container and selection motion; the filter header replaces its close icon with an unbordered clear action; tapping either date field opens its borderless-icon Jalali calendar. Date range remains single-select, while status, service and stylist become native multi-select groups where “all” is exclusive. Nested calendar return must not replay the parent sheet, appointment entry follows fixture/DOM order starting with the first record, and customer touch controls suppress persistent browser tap highlighting without removing keyboard focus. [Motion record](../docs-work/CUS_03_MOTION_2026-11-17.md), [updated owner evidence](../docs-work/CUS_03_OWNER_FEEDBACK_2026-11-17.md). CUS-03 and full Phase 04 acceptance remain pending.

## DEC-073 — Appointment owner annotations and one common filter

On 2026-11-17 the owner supplies seven browser comments and a local popup screenshot. In CUS-03, desktop tools move immediately to the right of the top-left notification bell; use the existing native-radio appearance. Future rows contain one month only, with at most three cards per row. Day/time use normal-width semibold (time smaller), weekday uses weight 300. Desktop history is a single horizontal information row. Empty and error use centered half-width cards. Both views share the same filter and preserve selections; both Jalali date boundaries are selectable, stylists can scroll horizontally when numerous, and the popup uses glass. This supersedes the previous one-sided/tab-specific filter and two-column desktop proposal. [Current brief](../docs-work/desktop-layouts/CUS-03.md), [feedback implementation and checks](../docs-work/CUS_03_OWNER_FEEDBACK_2026-11-17.md). No phase acceptance or new business permission is implied.

## DEC-072 — Phase 04 continuation and live desktop review

On 2026-11-17 the owner accepts Phase 04 work implemented so far (CUS-01 default/empty/inactive and embedded CUS-07 balance) and authorizes remaining Phase 04 work. This is slice acceptance, not full-phase acceptance or Phase 05 assignment. Preserve prior page structure; stop at a missing/unreadable mobile source and request the owner screenshot. For each next desktop slice, implement a concrete preview first, show it in the live browser, apply owner feedback, then continue. This direct instruction supersedes approval-before-implementation for those review previews; it does not approve their final composition. Use local port 8183, explicitly selected by the owner. [CUS-03 brief](../docs-work/desktop-layouts/CUS-03.md) and [review evidence](../docs-work/CUS_03_REVIEW_2026-11-17.md).

## DEC-071 — List entry runs on initial document load only

Owner feedback on 2026-11-17 forbids entry replay after closing a portfolio popup and limits entry to the initial page load. Animate the initial visible data batch after feature initialization once; popup inertness, filtering, inserted records and bfcache restoration must not start a new sequence. Opening a modal cancels pending entry without replaying on close. This supersedes DEC-069's new/revealed-record observation while preserving DEC-070's fast RTL row order and reduced-motion/focus fallback. [Reproduction and checks](../docs-work/VARIABLE_LIST_MOTION_2026-11-17.md).

## DEC-070 — Faster variable-record entry in visual row order

Owner feedback on 2026-11-17 accelerates entry and changes column-wise appearance to visual row order. Use duration-base=240ms with a 170ms start step (base minus fast/2); sort visible pending records by top then right-to-left within a space-1 row tolerance. Geometry is read once per new batch, never per frame; DOM/tab order, fixed-component exclusions and reduced-motion/focus cleanup remain. [Updated motion/QA record](../docs-work/VARIABLE_LIST_MOTION_2026-11-17.md).

## DEC-069 — Animate variable records only; remove page-navigation fade

On 2026-11-17 the owner narrows entry motion to actual variable-count records (services, stylists, appointments, bookings, requests, notifications and available times), excluding home, fixed titles/steps, navigation and constant-count controls. Each next item starts near the preceding item's end. Remove whole-page whitening/fade during navigation and evaluate correctness and smoothness. This supersedes DEC-067/068's section-level entry and the earlier active-sidebar entry animation. Native data-list sequencing uses the existing 380ms duration and a derived 310ms step; static/reduced-motion/keyboard fallbacks remain immediate. [Implementation and measurements](../docs-work/VARIABLE_LIST_MOTION_2026-11-17.md).

## DEC-068 — Reuse section entry on implemented pages and preserve mobile rail shadows

On 2026-11-17 the owner extends DEC-067's entry motion to the other implemented pages and requests the customer dashboard rail-shadow clipping fix. Reuse the same local-left mobile/tablet entry and desktop fade, with explicit variable-section markers; keep headers, navigation, booking steps and fixed payment actions static. Preserve ordinary navigation and immediate reduced-motion/focus fallback. Public, authentication, booking and result templates are included; unimplemented placeholders remain unassigned. Reserve shadow space inside both customer horizontal scrollports without moving cards or replacing native horizontal scrolling. [Scope and verification](../docs-work/SHARED_SECTION_ENTRY_2026-11-17.md).

## DEC-067 — Reveal customer content in sequence and expand the desktop active bar

Owner feedback on 2026-11-16 replaces simultaneous customer-card fades with sequential variable-section entry: desktop opacity only; mobile/tablet a short physical-left offset fading into the section's own position. Shared header/sidebar/dock stay static. The customer desktop active background expands from the right without moving its link. Reduced motion shows final content immediately. This supersedes DEC-064's card-level entry; DEC-061's opaque booking-main navigation remains. [Motion record and QA](../docs-work/PHASE_04_SECTION_MOTION_2026-11-16.md).

## DEC-066 — Simplify salon notice and adjust mobile sizing

Owner feedback on 2026-11-16 removes the salon announcement clock tile at every width, narrows customer More to a 320px maximum with its small-screen gutter, and enlarges the mobile header wordmark to 90×30px below 768px. DEC-065's fixed-left drawer, internal list scrolling and breakpoint recovery remain. [Verification](../docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md).

## DEC-065 — Restore customer chrome and constrain/recover the mobile More drawer

Owner feedback on 2026-11-16 explicitly restores the previous home header and plain desktop menu links, moves salon notices below availability in the left support column, removes the entire customer More header row on mobile, and requires only the More list to scroll. This is a second narrow vertical-scroll exception alongside the accepted recurring editor: only `.rv-customer-more > .rv-more-list` below 1024px. Pin the overlay to the viewport/physical left with balanced standard timing and close the entire customer More stack when crossing the desktop boundary, including interrupted entry/exit and nested logout. This supersedes DEC-064's radio/header and document-scrolling drawer details; the paired cards, two payments and dock selection remain. [Cause, scope and QA](../docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md).

## DEC-064 — Customer dashboard, shared navigation and left More drawer

Owner element feedback and eight attached screenshots on 2026-11-16 direct: match the Phase 03 menu dimensions; use native radio selection/styles for the current desktop page; wider appointment images and shared responsive two/one-card rows; two independent payment cards below appointments on desktop and a horizontal mobile rail; stack credit/recurring/availability in that order in the desktop support column; add customer identity to the header. MORE-CUS is grouped and opens from the physical left on mobile, an explicit exception to the older all-bottom-sheet rule for this drawer only. The customer mobile dock shows the active label, slides without spring motion, then moves the icon right and reveals the label; cards fade without throwing the whole page. Preserve DEC-060's BK-01/BK-02 booking-button exception, shared sheet focus/scroll lifecycle, reduced motion, ordinary-link fallback and all product permissions. [Implementation and QA](../docs-work/PHASE_04_OWNER_FEEDBACK_2026-11-16.md).

## DEC-063 — Customer dashboard desktop revision follows the prior right menu

On 2026-11-16 the owner rejects the dashboard desktop presentation and directs implementation using previous desktop phases, especially the right-side navigation list, with distinct desktop card compositions instead of stretched mobile cards. This supersedes the pending horizontal-menu proposal in DEC-062 and the generic customer top-navigation preference for CUS-01. Reuse the actual Phase 03 customer menu and destinations; use compact horizontal appointment tickets, bounded payment/support cards and preserve mobile layouts. The direct instruction authorizes this revision without another approval pause; final visual/phase acceptance remains pending. [Revised brief](../docs-work/desktop-layouts/CUS-01.md).

## DEC-062 — Assign Phase 04 on a new local branch

On 2026-11-16 the owner explicitly assigns Phase 04 and requests a fresh local branch before implementation. Follow readable exact mobile references; if a mobile reference is missing or unreadable, ask for the owner's screenshot before inventing that screen. Existing desktop composition/review rules remain in force. This supersedes the previous unassigned status, not Phase 03 acceptance or product permissions. [Execution record](../docs-work/PHASE_04_IMPLEMENTATION_FA.md).

## DEC-061 - Remove the booking navigation flash

On 2026-11-16 the owner reports a brief white flash when selecting links on the choice pages and requests removing it. Keep booking content opaque until native document navigation and remove the booking main's transparent entry; do not change the centered BK-01/BK-02 dock, layout, routes or fixture behavior. Public/other-role and sheet/viewer motion remain as before. [Cause and checked results](../docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md).

## DEC-060 - Center only BK-01/BK-02 mobile icon card without booking

On 2026-11-16 the owner specifies BK-01 and BK-02: hide the separate booking action on mobile and center the existing right-hand icon card. Apply below 768px; preserve its width/height/style, other page visibility and tablet/desktop composition. No new animation or JavaScript behavior is requested. This is a scoped maintenance change, not phase assignment or acceptance. [Implementation and QA](../docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md).

## DEC-059 - Frontend-only repository and phase branches from master

On 2026-11-16 the owner explicitly requests local and GitHub cleanup: rename `mbatvaz/Rival` to `mbatvaz/Rival_Frontend`, keep frontend files and the final stable version on `master`, remove permanent backend/frontend branches and the empty backend solution, and replace stable branches with annotated tags. Preserve the old baseline tip with `stable/baseline-1`; mark the accepted current version with `stable/phase-03`. Future explicitly assigned phases branch from `master`, return after owner acceptance and closeout, and receive a fresh stable tag. Preserve published history and frontend reference contracts; do not start Phase 04. [Git workflow](GIT_WORKFLOW.md).

## DEC-058 - Phase 03 acceptance and closeout only

On 2026-11-15 the owner explicitly accepted completion of Phase 03 and authorized the necessary closeout work, while explicitly forbidding starting Phase 04. Acceptance covers CUS-02, BK-01/02, BK-F01/F02, BK-P01, BK-R01, BK-REQ01, BK-REC01, BK-ALERT01, PAY-RES, STATE-04..07 and their implemented variants, including the reusable StatePage base. Record acceptance in the registry and current handoff; preserve independent manual preview approvals and unresolved product decisions. Phase 04 remains unassigned. [Closeout evidence](../docs-work/PHASE_03_CLOSEOUT_FA.md).

## DEC-057 - Calendar selection uses one responsive visual state

Latest owner clarification requires mobile selection to match the existing desktop calendar. Share selected white raised pill, available inset pill, disabled flat appearance and keyboard focus across widths; remove the mobile black selected-state override introduced under DEC-055. [Evidence](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## DEC-056 - Payment alignment is responsive and column-relative

Latest owner clarification: left-aligned wrapped amounts apply only on desktop; mobile keeps its original stacked RTL summary. Center the PAY-RES desktop heading within its own content column, not across the sidebar. Extend rail shadow paint clearance without widening the visible pager gap and prevent the returned-credit badge from covering icon shadows. This supersedes those portions of DEC-055. [Evidence](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## DEC-055 - Booking polish and canonical payment review ownership

Owner requests more mobile shadow/pager clearance, seamless right-to-left filled-progress shine, wrapped long payment label/amount, matching image corners, preserved recurring-photo area, clear mobile calendar radios and centered desktop state headings. PAY-RES is the single review owner for checking/lost/returned/SMS results; remove independent STATE-05/06/07 review rows, map/OTP designs and duplicate gateway review. Preserve old registered links as compatibility aliases and keep manual review records. [Record](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## DEC-054 - Overflow motion is opt-in for compact cards only

Owner correction: the previous broad interpretation was wrong. Moving single-line text applies only to variable labels/metadata in compact cards where wrapping disrupts their layout. Restore ordinary multiline prose, headings, explanatory panels and messages everywhere else. Explicit data-rv-overflow-text hooks define consumers; short labels remain still. This corrects only the overflow-text portion of DEC-053. [Record](../docs-work/OVERFLOW_CARD_SCOPE_2026-11-15.md).

## DEC-053 - Shared overflow motion and compact booking layout

Owner instruction 2026-11-15: keep overflowing text on one moving line across current product pages; shrink off-center mobile booking cards, compact pager/dock spacing, remove redundant empty-state headings and unselected-time help, clip progress shine to its fill, stabilize calendar replacement, use compact horizontal context photos on desktop and a short checkout photo, and left-align the three date/time rows. This supersedes conflicting portrait/wrapping presentation notes; phase acceptance is unchanged. [Record](../docs-work/BOOKING_LAYOUT_CORRECTIONS_2026-11-15.md).

## DEC-052 - Revoke final approval only for changed review contexts

Owner explicitly requests scope-limited final invalidation after file edits. Default pages and registered variants receive independent content/dependency fingerprints; only changed possible consumers become stale. Automatic version invalidation preserves mobile/desktop flags; explicit manual revocation retains its prior reset behavior. Preserve unchanged current owner approvals during this fingerprint scheme upgrade, without promoting stale records. Shared-component changes may affect multiple actual consumers; unrelated pages/states remain approved. [Evidence](../docs-work/PREVIEW_REVIEW_REPORT.md).

## DEC-051 - Compact captions, mobile rules rail and single input border

Owner explicitly requests smaller internal portfolio-caption spacing on mobile and desktop; rules links must scroll horizontally rather than wrap on mobile; typing-input focus must thicken the existing border and turn it ink instead of adding an outline. Reuse TextField and native rails; preserve keyboard focus visibility, input geometry, error feedback and the approved desktop rules sidebar. [Evidence](../docs-work/OWNER_FEEDBACK_2026-11-14.md).

## DEC-050 - Distinguish requested and proposed request results

Owner clarifies that Requested has no time selection, while Proposed includes a preferred day and day-part such as morning/noon. BK-REQ01 default must show Requested; the Proposed result must be independently reachable for review. Both remain canonical variants of the same source context; real stored request type determines which appears after submission. This supersedes the earlier default/duplicate suppression interpretation in DEC-048. [Evidence](../docs-work/BK_REQ01_RESULT_CORRECTION.md).

## DEC-049 - Persist manual review approvals in the project

The owner explicitly requests `_preview` approvals in project files so another browser sees the same state. Authorize only the local development-preview review endpoint and [approval JSON](../preview-review/approvals.json), with an exported static snapshot. Browser migration fills missing records; explicit import may replace the imported records; unchanged IDs/revisions retain approval semantics. No product backend, dependency, real transaction or phase acceptance is authorized. [Implementation evidence](../docs-work/PREVIEW_REVIEW_REPORT.md).

## DEC-048 - Owner element corrections, 2026-11-14

The owner directly assigns the public/booking corrections recorded in the [review report](../docs-work/OWNER_FEEDBACK_2026-11-14.md): looping home steps, removal of carousel toggle, portrait desktop assets, smooth calendar/gallery/selection motion, progressive recurring editor with only its mobile handle sticky, revised copy placement, removal of demo-facing copy except default login credentials, and omission of duplicate review entries. Existing local simulation and phase gates remain. The ambiguous bottom-navigation sentence is awaiting clarification and is not recorded as a new navigation decision.

| ID | Decision | Status | Evidence / implication |
|---|---|---|---|
| DEC-001 | Owner decisions and Current Truth outrank stale handoff tables | Confirmed | Docs README; Phase 8 current truth |
| DEC-002 | Front-end is plain HTML/CSS/Vanilla JS with Razor-shaped templates | Confirmed | `RIVAL_PROJECT_CONTRACT.md`; owner clarification 2026-11-09 |
| DEC-003 | Three human roles; OwnerAdmin also performs stylist work through one shell and Scope | Confirmed | Design Common §7; Phase 8 IA |
| DEC-004 | Fixed, Proposed, Requested are distinct booking flows; Requested is manager-composed multi-service | Confirmed | Phase 1/2/8 handoffs |
| DEC-005 | Manual booking Override never requires a reason; forbidden conflicts still cannot be overridden | Confirmed | Owner decision 2026-10-22 |
| DEC-006 | ADM-09 owns customer payments/ledger/adjustment/reversal sheets; ADM-16 owns payment matching | Confirmed | Owner decision D10-171..177 |
| DEC-007 | ADM-17 Reports, ADM-18 Wallet routes, ADM-22 Announcement route are removed/replaced | Confirmed | Phase 8 Current Truth; Handoff 08 |
| DEC-008 | ADM-AC is the only new independent IA route; failures are notifications, not actions | Confirmed | Phase 8-1 review |
| DEC-009 | All modals/pickers/confirmations are bottom sheets; no centered dialog | Confirmed for implementation; legacy canvases pending sync | D10-108; Handoff 08 |
| DEC-010 | OTP is 5 digits, 2 min validity, 5 attempts, resend after 60s; lock covers all login methods | Confirmed; canvas sync required | D10-207, D10-210, D10-211 |
| DEC-011 | Automatic SMS copy is immutable in UI settings | Confirmed | D10-206 |
| DEC-012 | OwnerAdmin manual booking Override is audited but no explanatory field is collected | Confirmed | D10-204/owner closure + manual booking decision |
| DEC-013 | Responsive thresholds remain 768px tablet / 1024px desktop; desktop is a purpose-designed composition derived from the mobile product language, not a stretched mobile screen. Public/customer/staff navigation adapts by role; sheets remain bottom-attached. | Confirmed by owner 2026-11-09 | Replaces the earlier inferred desktop-only assumptions; see `RIVAL_PROJECT_CONTRACT.md` §6. |
| DEC-014 | ADM-21 displayed hours vs ADM-15 actual schedule | Requires User Decision | Handoff 08 §9 open item; use ADM-15 as canonical data in mock |
| DEC-015 | ADM-24 final labels | Requires User Decision | Handoff 08 §9; keep labels from current canvas and isolate copy |
| DEC-016 | Absence status tone in STY-01 | Requires User Decision | Handoff 08 §7; default to danger for destructive action, warning for state |
| DEC-017 | Customer profile image edit by admin | Requires User Decision | Handoff 08 §9; hide destructive edit until decided |
| DEC-018 | Official holiday data provider | Deferred to Backend | Handoff 08 §9; preview uses fixture, UI exposes no source detail |
| DEC-019 | Legacy MORE drawer cleanup (wallet row and centered logout dialog) | Non-blocking implementation decision | remove stale wallet route; migrate confirmation to sheet in shared shell |

## Owner decisions recorded 2026-11-09

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-020 | Static-first preview/deployment: Nunjucks renders at build time to ordinary HTML in `dist/`; cPanel serves static files only. | Confirmed | No Express or Node runtime on hosting; central directory at `/_preview/`; cPanel deploys `dist/` only. |
| DEC-021 | Codex is the primary coding agent. | Confirmed | Root `AGENTS.md`, `.agents/skills/`, Codex prompts, and VS Code tasks replace active Claude Code instructions. |
| DEC-022 | Native CSS remains the only styling approach. | Confirmed | No Tailwind, Bootstrap, preprocessors, or CSS bundler; canonical `rv-*` classes and v2 tokens. |
| DEC-023 | Only Yekan Bakh is used for application typography. | Confirmed | Normal-width Light/Regular/SemiBold files only (300/400/600); no other typeface or expanded variants. |
| DEC-024 | Existing local icon assets are Lucide-based SVGs; keep `ri` class compatibility prefix. | Confirmed | No Remix Icon package, CDN, emoji, or new icon dependency. |
| DEC-025 | No nested vertical scrolling; horizontal rails/carousels are allowed only where design evidence supports them. | Confirmed | ADM-14 documented horizontal snap rail remains valid; no generic nested vertical panels. |
| DEC-026 | Visual controls may be 40px where required, but interactive hit areas must be at least 44×44px. | Confirmed | Use hit-area wrappers/pseudo-elements without distorting visible component geometry. |
| DEC-027 | Desktop requires page-specific composition, not direct scaling of mobile artboards. | Confirmed | Write owner-reviewable desktop layout briefs before desktop implementation; preserve content and product meaning. |
| DEC-028 | Phase 03 owns the reusable StatePage base and booking states STATE-04..07; Phase 08 extends it with remaining system states. | Confirmed | Do not rebuild StatePage in Phase 08. |
| DEC-029 | Phase 06 owns canonical finance primitives for ADM-09; Phase 08 extends them for ADM-16 payment matching. | Confirmed | Do not duplicate CreditPayments/WalletLedger/PaymentRow. |
| DEC-030 | Actual ASP.NET MVC migration is reserved for Phase 09. | Confirmed | Earlier phases remain MVC-compatible but do not port/build backend MVC code. |
| DEC-031 | Phase 01 acceptance for DS/RULE/ARCH is recorded in TRACEABILITY, not PAGE_INVENTORY. | Confirmed | Do not require infrastructure IDs to appear as product pages. |
| DEC-032 | Canonical CSS is generated from `tokens.json`; export CSS bundles are evidence only; production classes use `rv-*`. | Confirmed | Legacy batch prefixes are mapped, not copied into production. |
| DEC-033 | The 2026-11-09 owner instruction supersedes active Claude Code setup documents. | Confirmed | `AGENTS.md` and Codex workflows are authoritative; legacy files are archived and marked inactive. |

## Phase 02 owner review — 2026-11-10

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-034 | Direct adjacent password/Passkey buttons replace Other method; password opens above the current page. | Confirmed by owner comment 17 and supplied auth images | Supersedes D10-211 presentation only. Shared lock, OTP defaults and safe returns remain. Unsupported Passkey is visibly disabled; supported static demo provides OTP fallback. |
| DEC-035 | Use phone 09141452321; social/map links may be nonreal samples until development supplies real destinations. | Confirmed in current chat | Phone and reserved .example destinations live in public fixtures. Sample links are titled as samples. Decorative map has no coordinate claim. |
| DEC-036 | Desktop review changes: full-image bounded hero, about/carousel columns, map/CTA left and hall right, half-width portfolio CTA, glass navigation. | Confirmed by owner comments 1–12 | Updated page desktop briefs; mobile order preserved where the instruction is desktop-specific. |

## Phase 02 second owner review — 2026-11-10

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-037 | Portfolio viewer is centered on desktop; mobile remains bottom attached. | Confirmed by second-review comment 4 | Explicit exception to the older all-bottom-sheets rule, scoped to PortfolioViewer from 1024px. Mouse drag/wheel and native touch swipe scroll its horizontal image rail. Other dialogs are unchanged. |
| DEC-038 | Password login is an independent full login view, with phone and password inputs and an SMS switch. | Confirmed by second-review comment 10 | Supersedes the password-sheet portion of DEC-034. Query route login/?method=password supports reload/back/forward and preserves return; shared lock/expiry rules stay intact. |
| DEC-039 | Desktop hero grows by 20% of its previous width on each side; dark rounded navigation; shorter map aligns contact/CTA and salon images; error card half-width; sticky rules contents. | Confirmed by second-review comments 1–6 | Desktop briefs updated. Hero max 1612.8px with viewport gutters; layout remains responsive and mobile composition unchanged. |
| DEC-040 | Remove the separate OTP validity countdown, center resend countdown/action, and use portrait OTP cells. | Confirmed by second-review comments 7–9 | One visible resend timer; 120-second code validity remains enforced in the adapter. Five centered cells are at most 52px wide and 64px high. |

## Phase 02 third home review — 2026-11-10

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-041 | Third home review: borderless black glass desktop nav; hero top corners square; desktop hero type hierarchy; third salon image 264×180 only on desktop. | Confirmed by four current owner comments | Reuse shared desktop nav and 1024px breakpoint; 1440px scales headline; gallery adapts its second column. Mobile geometry and canonical tokens remain unchanged. |

## Phase 02 acceptance — 2026-11-10

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-042 | Owner explicitly accepts Phase 02 and authorizes its completion work only; Phase 03 must not start until a later explicit instruction. | Confirmed in current chat | Close checklists, mark accepted product contexts, consolidate handoff and final regression. Keep future route placeholders; do not implement or prepare Phase 03 product flows. |

## Phase 03 desktop composition — 2026-11-11

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-043 | Owner starts Phase 03 and approves the second desktop proposal after requesting a layout designed for desktop use with Design System v2. | Confirmed in current chat | Activate dedicated desktop composition at 1024px, with horizontal booking steps, monthly calendar and time workspace, sticky summary, monthly recurring rows and side-by-side result detail. Reuse the shared Sheet for alerts and editing. Phase acceptance is separate. |

## Device review of phases 02 and 03

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-044 | Owner reported physical Galaxy S20 FE results and approved the annotated changes to public, auth and booking surfaces. | Owner instruction | Use the device-review rules in the project contract for present and future phases. The annotated booking menu and step placement supersede the earlier desktop brief where they differ. |
| DEC-045 | Fixed booking shows Tehran today through 30 days ahead. | Owner instruction | Normal demo navigation rolls the availability window daily. Explicit artboard states keep their fixture dates so closed, pending and taken cases can be reviewed reliably. |

## Review corrections — 2026-11-12

| ID | Decision | Status | Implementation consequence |
|---|---|---|---|
| DEC-046 | Field labels remain above inputs and placeholders show examples. Keyboard avoidance scrolls smoothly. | Owner instruction | Supersedes the floating-label portion of DEC-044. |
| DEC-047 | Inspect the exact exported design and Design System states for each affected page, including variants. Adapt the same structure for desktop. | Owner instruction | Follow the design-evidence checklist in the project contract and record source paths in QA. |
