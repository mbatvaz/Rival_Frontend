# Canonical Page Inventory

## CUS-08 availability alerts

CUS-08 was accepted by the owner on 2026-11-24 under DEC-082. It includes an active list, finished records and add, duplicate and cancellation Sheets. CUS-09 and CUS-10 are the remaining customer routes. [Desktop brief and sources](../docs-work/desktop-layouts/CUS-08.md).

## CUS-05 tab annotation — 2026-11-23

DEC-081 renames the CUS-05 completed tab to “تکمیل” and applies the CUS-03 appointment radio treatment to the status tabs. No page, route or variant addition; the done variant label follows the new tab name.

## Phase 04 request previews — 2026-11-23

CUS-05 and CUS-06 are implemented for review. CUS-05 owns the list, status groups, filter and empty view. CUS-06 owns details, inactive and terminal views, and cancellation impact. The payment result remains PAY-RES. This leaves CUS-08/09/10 pending. [List brief](../docs-work/desktop-layouts/CUS-05.md), [detail brief](../docs-work/desktop-layouts/CUS-06.md).

## CUS-03 interaction revision — 2026-11-17

DEC-073/074 revise existing CUS-03 views and states, without adding a page or changing phase acceptance. The two filter-preview query aliases show the same popup; appointment-date selection reuses the shared booking calendar. Range is single-select; status/service/stylist are multi-select with exclusive “all”, and their repeated query parameters survive reload/history. CUS-01 remains accepted and CUS-03 remains in progress. [Sources and checks](../docs-work/CUS_03_OWNER_FEEDBACK_2026-11-17.md), [motion record](../docs-work/CUS_03_MOTION_2026-11-17.md).

## Phase 04 status — 2026-11-21

DEC-072 accepts the CUS-01 default/empty/inactive slice and embedded CUS-07 balance. The owner accepted CUS-03 on 2026-11-19 and the first CUS-04 detail preview on 2026-11-21. CUS-04-RSC is available under CUS-04 for owner review. The registry has 73 contexts, with 24 product templates, 23 accepted contexts and 49 placeholders. CUS-07 stays embedded. CUS-05/06/08/09/10 remain placeholders. [CUS-04 brief](../docs-work/desktop-layouts/CUS-04.md), [rescheduling brief](../docs-work/desktop-layouts/CUS-04-RSC.md).

## Customer chrome recovery — 2026-11-16

DEC-065 changes existing CUS-01 chrome and shared More behavior only: restored header/links, left-column salon notice and viewport-contained list scrolling with resize dismissal. Registry contexts and acceptance remain unchanged. [Scope and QA](../docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md).

## CUS-01 owner element revision — 2026-11-16

DEC-064 revises the three existing home states and shared customer chrome. Two local pending-payment items reuse CUS-05 source examples; no new page/route or accepted context is added. [Scope, sources and actual checks](../docs-work/PHASE_04_OWNER_FEEDBACK_2026-11-16.md). Other Phase 04 destinations remain placeholders until their assigned implementation.

## CUS-01 desktop correction — 2026-11-16

DEC-063 authorizes the owner-directed desktop revision: existing Phase 03 right menu, horizontal appointment tickets and bounded supporting cards. All three CUS-01 states now have deliberate desktop compositions; mobile/tablet references and registry acceptance status remain unchanged. The former pending horizontal-menu proposal below is superseded. [Brief and scope](../docs-work/desktop-layouts/CUS-01.md).

## Phase 04 starts — 2026-11-16

DEC-062 assigns Phase 04, superseding earlier unassigned statements. CUS-01 now has mobile/tablet default, empty and inactive implementations under review; desktop composition is pending. CUS-07 remains an embedded balance without an independent route or financial primitives. Current registry: 21 accepted contexts, one in-progress implementation, 51 labelled placeholders. Other customer contexts retain their existing ownership/status. [Execution and gaps](../docs-work/PHASE_04_IMPLEMENTATION_FA.md).

## Mobile choice-page chrome — 2026-11-16

DEC-060: BK-01/BK-02 hide the separate booking action below 768px and center the existing icon card. No route/variant or acceptance change; CUS-02 and all other contexts retain their previous behavior. [QA](../docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md).

## Current acceptance — 2026-11-15

The owner accepted Phase 03 (DEC-058): CUS-02, BK-01/02, BK-F01/F02, BK-P01, BK-R01, BK-REQ01, BK-REC01, BK-ALERT01, PAY-RES and STATE-04..07, including their implemented variants. All 15 registry contexts now carry `implementationStatus=accepted` and `ownerAcceptedAt=2026-11-15`. Together with Phase 02 this is 21 accepted contexts; 52 future contexts remain placeholders. STATE-05/06/07 preserve compatibility URLs and route to their canonical payment/checkout owners; manual review controls remain independent. Earlier dated pending-review entries below are historical. [Closeout](../docs-work/PHASE_03_CLOSEOUT_FA.md). Phase 04 is unassigned and must not start.

## Calendar selection follow-up

BK-REC01 editor now shares selected/available/focus calendar styling with desktop. No route, fixture, phase or acceptance change. [Evidence](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Review follow-up: existing contexts only

BK-01/BK-02, BK-F02 and PAY-RES receive the owner shadow/alignment clarification. No route, state or phase acceptance changes. [Evidence](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Owner review consolidation - 2026-11-15

Independent review listing now has 69 parent rows and 45 states. STATE-05/06/07 are compatibility contexts, not separate review designs; PAY-RES contains returned-credit and SMS-confirmation failure. Map/OTP external designs were removed and gateway reuses BK-F02. All 73 registered static contexts remain reachable. [Details](../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).

## Text-layout regression review

Owner final review covers current public/auth/booking consumers without adding routes or changing acceptance. BK-R01 package captions were corrected; ordinary text remains multiline. [Audit and evidence](../docs-work/TEXT_LAYOUT_FINAL_AUDIT_2026-11-15.md).

## Compact-card text correction

Existing service/stylist/appointment/portfolio card consumers explicitly opt into overflow motion; ordinary PUB-01/PUB-03 and booking receipt descriptions return to multiline layout. No route or acceptance changed. [Record](../docs-work/OVERFLOW_CARD_SCOPE_2026-11-15.md).

Owner correction 2026-11-15: existing BK-01/BK-02 empty/default, BK-F01/BK-P01 and BK-F02 contexts use the [updated booking layout](../docs-work/BOOKING_LAYOUT_CORRECTIONS_2026-11-15.md). Shared overflowing text applies to current product consumers. No route, phase or acceptance status changed.

Owner spacing/focus follow-up: PUB-02 caption density, PUB-03 mobile TOC and shared auth/profile TextField focus corrected without adding contexts, changing content rules or accepting a phase. [Evidence](../docs-work/OWNER_FEEDBACK_2026-11-14.md).

Owner feedback 2026-11-14: CUS-02 remains a working alias of identical BK-01 service selection; only BK-01 is listed for review. BK-F01 SMS is omitted; BK-REQ01 default is requested (without time); its distinct proposed result is listed as a separate variant with preferred date and day-part. Canonical 73 contexts and phase acceptance remain unchanged. [Evidence](../docs-work/OWNER_FEEDBACK_2026-11-14.md).

The independent `/_preview/` manual review statuses are documented in the [review report](../docs-work/PREVIEW_REVIEW_REPORT.md); they do not rewrite this product inventory or owner phase acceptance. No product route/context was added by the review UI.

Phase 01–02 refresh (2026-11-14): PUB-01..03, AUTH-01/02, SYS-ACC-01 and shared shell were reviewed against current sources/approved briefs. Motion/accessibility corrections are recorded in the [refresh report](../docs-work/PHASE_01_02_REFRESH_FA.md). Routes and historical acceptance statuses remain; the incremental refresh awaits owner review. DS/RULE/ARCH remain traceability-only IDs.

2026-11-14 maintenance: [generated source map](ai/DESIGN_SOURCE_MAP.md) indexes the existing 73 contexts and source candidates. No route, implementation status or acceptance changed. Infrastructure/tooling IDs remain in [TRACEABILITY](TRACEABILITY.md).

`Artboard` با `Page/Context` یکی نیست. جدول زیر route/page contextهای canonical را نگه می‌دارد؛ variantها در ستون state و source mapping دنبال می‌شوند.

## Public / Auth

| ID | Route | Role | Status | Source | States |
|---|---|---|---|---|---|
| PUB-01 | `/` | Public | Fully Designed | Batch 1 | signed-out / signed-in |
| PUB-02 | `/portfolio` | Public | Fully Designed | Batch 1 | default/filter/viewer/empty/loading/error |
| PUB-03 | `/booking-rules` | Public | Fully Designed | Batch 1 | default |
| AUTH-01 | `/login` | All | Fully Designed + canvas sync required | Batch 1 | OTP/password/passkey/lock/wrong code |
| AUTH-02 | post-OTP step | New user | Fully Designed | Batch 1 | default/field error |
| SYS-ACC-01 | `/account-unavailable` | All | Fully Designed | Batch 1 | soft-deleted account |

## Customer + booking

| ID | Route/Context | Role | Status | Source |
|---|---|---|---|---|
| CUS-01 | `/customer` | Customer | Fully Designed / reused final ref | Batch 3 |
| CUS-02 | `/customer/book` | Customer | Fully Designed | Batch 2 |
| CUS-03 | `/customer/appointments` | Customer | Fully Designed | Batch 3 |
| CUS-04 | `/customer/appointments/{id}` | Customer | Accepted with rescheduling and [Appointment Swap](features/APPOINTMENT_SWAP.md) under DEC-080. | Batch 3 and DEC-076–080 |
| CUS-05 | `/customer/requests` | Customer | Fully Designed | Batch 3 |
| CUS-06 | `/customer/requests/{id}` | Customer | Fully Designed | Batch 3 + Batch 2 payment reuse |
| CUS-07 | embedded balance | Customer | Implied / no route | Batch 3, DS |
| CUS-08 | `/customer/availability-alerts` | Customer | Fully Designed | Batch 3 |
| CUS-09 | `/customer/notifications` | Customer | Fully Designed | Batch 3 |
| CUS-10 | `/customer/profile` | Customer | Fully Designed | Batch 3 |
| BK-01 | booking step: service | Customer | Fully Designed | Batch 2 |
| BK-02 | booking step: stylist | Customer | Fully Designed | Batch 2 |
| BK-F01 | booking step: fixed availability | Customer | Fully Designed | Batch 2 |
| BK-F02 | booking step: fixed summary/payment | Customer | Fully Designed | Batch 2 |
| BK-P01 | booking step: proposed request | Customer | Fully Designed | Batch 2 |
| BK-R01 | booking step: requested request | Customer | Fully Designed | Batch 2 |
| BK-REQ01 | request result | Customer | Fully Designed | Batch 2 |
| BK-REC01 | recurring fixed booking | Customer | Fully Designed | Batch 2 |
| BK-ALERT01 | availability alert sheet | Customer | Fully Designed | Batch 2/3 |
| PAY-RES | payment return/result | Customer | Fully Designed | Batch 2 |

## Stylist

| ID | Route/Context | Role | Status | Source |
|---|---|---|---|---|
| STY-01 | `/stylist` | Stylist/OwnerAdmin scope=me | Fully Designed | Batch 4 |
| STY-02 | `/stylist/calendar` | Stylist | Fully Designed | Batch 4 |
| STY-03 | `/stylist/requests` | Stylist | Fully Designed | Batch 4 |
| STY-04 | request response | Stylist | Fully Designed | Batch 4 |
| STY-05 | `/stylist/appointments` | Stylist | Fully Designed | Batch 4 |
| STY-06 | `/stylist/appointments/{id}` | Stylist | Fully Designed | Batch 4 |
| STY-07 | `/stylist/manual-booking` | Stylist | Fully Designed | Batch 4 |
| STY-08 | `/stylist/schedule` | Stylist | Fully Designed | Batch 4 |
| STY-09 | `/stylist/portfolio` | Stylist | Fully Designed | Batch 4 |
| STY-10 | `/stylist/notifications` | Stylist | Fully Designed | Batch 4 |
| STY-11 | `/stylist/profile` | Stylist | Fully Designed | Batch 4 |
| STY-CUS | `/stylist/customers` + detail | Stylist | Fully Designed | Batch 4 |

## OwnerAdmin

| ID | Route/Context | Role | Status | Source |
|---|---|---|---|---|
| ADM-01 | `/admin` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-02 | `/admin/calendar` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-03 | `/admin/requests` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-04 | `/admin/requests/{id}` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-05 | `/admin/appointments` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-06 | `/admin/appointments/{id}` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-07 | `/admin/manual-booking` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-08 | `/admin/customers` | OwnerAdmin | Fully Designed | Batch 5 |
| ADM-09 | `/admin/customers/{id}` | OwnerAdmin | Fully Designed + payment mode | Batch 5 |
| ADM-10 | `/admin/stylists` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-11 | `/admin/stylists/{id}` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-12 | `/admin/services` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-13 | `/admin/services/{id}` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-14 | `/admin/pricing` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-15 | `/admin/schedules` | OwnerAdmin | Fully Designed | Batch 6 |
| ADM-16 | `/admin/payments` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-AC | `/admin/action-center` | OwnerAdmin | Fully Designed; one added route | Batch 5/8 IA |
| ADM-NOT | `/admin/notifications` | OwnerAdmin | Fully Designed; replaces ADM-22 | Batch 7 |
| ADM-20 | `/admin/portfolio` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-21 | `/admin/settings` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-23 | `/admin/sms` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-24 | `/admin/settings/booking` | OwnerAdmin | Fully Designed | Batch 7 |
| ADM-25 | `/admin/profile` | OwnerAdmin | Fully Designed | Batch 7 |

## System patterns (no independent product route)

`STATE-01..08`, `SYS-SESSION`, `SYS-RO`, `SYS-OFFLINE` are shared state contexts rendered by the source page; `KIT-01` is a pattern book, not product navigation.

## Page status summary

- **Implementation status (2026-11-10):** Phase 01 accepted. Phase 02 is accepted by the owner (2026-11-10): PUB-01, PUB-02, PUB-03, AUTH-01, AUTH-02 and SYS-ACC-01. Shared role shells are implemented, while the other 67 registry contexts retain explicit placeholders for their owning phases. `Fully Designed` describes design-source coverage, not implementation acceptance. Desktop briefs for this phase were explicitly approved by the owner.

### Phase 02 implemented states (accepted by owner 2026-11-10)

- PUB-01: signed-out / signed-in demo.
- PUB-02: default, service/stylist filter, viewer, empty, loading, error/retry.
- PUB-03: canonical reservation/payment/cancellation/salon-change copy and section anchors.
- AUTH-01: phone, OTP, wrong/expired code, resend, password, Passkey fallback, shared lock, loading/error recovery, new-user path.
- AUTH-02: verified demo completion, required-name errors, direct-entry return to login.
- SYS-ACC-01: account unavailable and home recovery.
- SHELL/MORE: shared Customer/Stylist/OwnerAdmin navigation, focus trap, bottom-attached logout confirmation, cancel/restore focus. These component IDs are not new product-page rows.

- **Fully Designed:** all canonical route/context IDs above have at least one authoritative artboard or explicit handoff spec.
- **Reused:** CUS-01, STY-01, ADM-05 references in Batch 1 are historical/preview references; final source lives in Batches 3/4/5.
- **Implied/no route:** CUS-07, bottom sheets, confirmations, toasts, and system patterns.
- **Removed/replaced:** ADM-17 Reports, ADM-18 Wallet, ADM-22 Announcements, ADM-19 standalone wallet detail.

Phase 02 owner-review revision (2026-11-10): PUB-01..03 and AUTH-01/02 updated against the 20 comments and nine supplied images; shared Sheet/Glass/IconTile/fields/motion corrections also apply to existing shells and SYS-ACC-01. Acceptance remains pending. See `docs-work/PHASE_02_REVISIONS_FA.md`; no new route or Phase 03 page was introduced.

Second owner review (2026-11-10): PUB-01 hero/visit/nav, PUB-02 desktop viewer and input rail/error, PUB-03 sticky contents, AUTH-01 timer/cells/password page corrected. Existing login context uses method=password; no registry route or phase ownership added. Latest report: docs-work/PHASE_02_REVIEW_02_FA.md.

Third owner review: PUB-01 hero/typography/gallery and shared public desktop nav adjusted per four comments; same routes and implementation scope. See docs-work/PHASE_02_REVIEW_03_FA.md.

Acceptance update (2026-11-10): owner accepted all Phase 02 work after the three review rounds. Previous pending-review notes are historical. Six implemented product pages are marked accepted; 67 future page contexts remain placeholders. Shared shells are accepted as components, not complete future role pages. Phase 03 is not authorized to start.

Phase 03 implementation (2026-11-11): CUS-02, BK-01/02, BK-F01/F02, BK-P01, BK-R01, BK-REQ01, BK-REC01, BK-ALERT01, PAY-RES and STATE-04..07 now have booking templates and linked preview variants. They remain in review. The canonical directory contains 21 product contexts and 52 future placeholders. Customer dashboard, appointments, requests and alert management destinations remain assigned to Phase 04.
