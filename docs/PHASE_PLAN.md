# Implementation Phase Plan

This is the canonical dependency plan. The [root instructions](../AGENTS.md) govern task intake. Phase 01 acceptance includes the original foundation preparation.

## Nine implementation phases

| Phase | Package | Scope | Depends on | Gate |
|---:|---|---|---|---|
| 01 | [Foundation](../phases/PHASE_01_Foundation/README.md#phase-01-sections) | Repository skeleton, token/font/icon extraction, static build pipeline, page registry, central preview index, static mock adapter, native JS registry, test harness, MVC-shaped source folders. | — | Static HTML builds, `/_preview/` lists canonical routes, cPanel payload is static, and structure lint passes. |
| 02 | [Shell + Public + Auth](../phases/PHASE_02_Shell_Public_Auth/README.md#phase-02-sections) | Shared shell, role navigation, desktop shell, bottom sheets, public pages, authentication and final OTP/lock rules. | 01 | Mobile 390, tablet 768, approved desktop 1280 layouts; OTP/lock/accessibility and route checks. |
| 03 | [Customer Booking](../phases/PHASE_03_Customer_Booking/README.md#phase-03-sections) | Fixed, Proposed, Requested, recurring, availability alerts, payment return and hold/system-state flows. Build canonical `StatePage` base and implement booking-owned STATE-04..07. | 01–02 | Booking flow variants and hold states; StatePage component is reusable; no duplicate state markup. |
| 04 | [Customer Panel](../phases/PHASE_04_Customer_Panel/README.md#phase-04-sections) | CUS-01..10, profile, notifications, appointment/request details. | 01–03 | Customer navigation and state matrix. |
| 05 | [Stylist Panel](../phases/PHASE_05_Stylist_Panel/README.md#phase-05-sections) | STY-01..11, STY-CUS, schedule, manual booking, portfolio and notifications. | 01–04 | Stylist permissions, no “ثبت انجام شد”, schedule impact preview. |
| 06 | [Admin Daily](../phases/PHASE_06_Admin_Daily/README.md#phase-06-sections) | ADM-01..09, ADM-AC, scope, requests, appointments, customer/payment mode. Build canonical finance primitives used by ADM-09 and later ADM-16. | 01–05 | Action center vs notification separation; ledger integrity; reusable finance components. |
| 07 | [Admin Management](../phases/PHASE_07_Admin_Management/README.md#phase-07-sections) | ADM-10..15, stylists/services/mapping/pricing/schedules. | 01–06 | Impact previews, immutable service type, BookableFrom. |
| 08 | [Finance + Content + System](../phases/PHASE_08_Finance_Content_System/README.md#phase-08-sections) | ADM-16/20/21/23/24/25, ADM-NOT, remaining STATE/SYS/KIT patterns, promotion of shared patterns. Extend Phase 06 finance primitives for payment matching; reuse Phase 03 StatePage. MVC compatibility only; no migration. | 01–07 | Payment matching, notification rules, recovery/system states; no duplicated shared components. |
| 09 | [Regression + MVC Handoff](../phases/PHASE_09_Regression_MVC_Handoff/README.md#phase-09-sections) | Full visual/a11y/structure QA, route audit, ASP_PORT_GUIDE, ViewModel/API mapping, migration readiness. | 01–08 | All gates green; no dead ends or stale routes; final MVC handoff ready. |

## Non-duplication rules

1. Phase 01 builds infrastructure and a neutral layout skeleton only. Phase 02 builds the real shell and navigation.
2. Phase 03 builds `StatePage` once and owns booking-specific STATE-04..07. Phase 08 adds other state variants without rebuilding the base.
3. Phase 06 builds the canonical `CreditPayments`, `WalletLedger`, `PaymentRow`, and balance-summary primitives for ADM-09. Phase 08 extends them for ADM-16 payment matching.
4. Phase 08 may enforce MVC compatibility but must not begin actual ASP.NET migration. Phase 09 owns the migration guide.
5. Infrastructure IDs (`DS`, `RULE`, `ARCH`) belong in TRACEABILITY, not PAGE_INVENTORY.

## Execution workflow

Use serialized Workflow B. Each phase starts and closes on an explicit owner instruction. Any change to tokens, shared components, navigation, or shell triggers its reuse regression list.

For phases 05–09 apply DEC-087. Start with an [accepted implementation](COMPONENT_REUSE_MATRIX.md#implemented-reuse) and use the [mobile-first contract](RIVAL_PROJECT_CONTRACT.md#6-responsive-and-desktop-design-contract) for new work.

### Phase sections

Use the hierarchy **Project → Phase → Section → Page** for all nine phases (DEC-092 and DEC-093). Record section order, page IDs, dependencies, and status in each phase README. Group several pages that share a user journey, data or components. Bring the pages in an active section to preview together and address their feedback in a single review round. Each section has its own start and acceptance decisions.

Phase 01 sections group foundation deliverables. Phase 09 sections group existing pages for regression and MVC handoff. For phases accepted before this workflow, record historical phase acceptance as the evidence for the mapped scope. Page implementation and page acceptance are tracked in the registry. Reserve «تکمیل شد» for a section with an explicit section-level owner approval and a recorded closeout.

| Section status | Trigger and record |
|---|---|
| شروع نشده | List the planned pages and dependencies in the phase README. |
| در دست توسعه | When the owner explicitly assigns the section or tells us to start the next section, update its status and record the date and scope in [Progress](../PROGRESS.md) before implementation. Keep this status during preview and feedback. |
| تکمیل شد | When the owner explicitly accepts the section's development, run the closeout for its scope. Verify the assigned pages and their connected flows, run affected QA, record checks and remaining follow-ups, and update the phase README and Progress with the completion date and acceptance evidence. |

Section closeout follows the phase review and documentation procedure at section scope. Use the [Git workflow](GIT_WORKFLOW.md) for its commit and any authorized publication. Wait for the owner's explicit start instruction after each section closeout. Closing all sections brings the phase to its separate final acceptance gate.

## Current owner gate

The owner accepted Phase 04 on 2026-11-26 under DEC-086. Phase 05 is in development on `web/phase-05-stylist-panel`. Section 1 is **در دست توسعه** and awaits explicit section acceptance under DEC-093. Its two pages, STY-01 and STY-02, have implementation and page-level acceptance records under DEC-089 and DEC-091. Sections 2–4 are **شروع نشده**. [Phase 05 sections](../phases/PHASE_05_Stylist_Panel/README.md#phase-05-sections)
