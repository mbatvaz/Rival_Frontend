# Implementation Phase Plan

This is the canonical dependency plan. It preserves the nine owner-defined implementation phases while adding a Codex preflight step that is preparation, not a numbered implementation phase.

## Preflight (before Phase 01; not counted as a product phase)

- Read root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.
- Validate `design-export/MANIFEST.json` against actual export files and the Page Inventory.
- Resolve path references and mark superseded Claude/Tailwind/Alpine/htmx instructions as inactive.
- Confirm the static build pipeline and cPanel deployment boundary.
- Do not implement product screens during preflight.

## Nine implementation phases

| Phase | Package | Scope | Depends on | Gate |
|---:|---|---|---|---|
| 01 | Foundation | Repository skeleton, token/font/icon extraction, static build pipeline, page registry, central preview index, static mock adapter, native JS registry, test harness, MVC-shaped source folders. No Express and no finished product shell. | Preflight | `npm run build` produces static HTML; `/_preview/` lists canonical routes; cPanel payload is static; structure lint passes. |
| 02 | Shell + Public + Auth | Shared shell, role navigation, desktop shell, bottom sheets, public pages, authentication and final OTP/lock rules. | 01 | Mobile 390, tablet 768, approved desktop 1280 layouts; OTP/lock/accessibility and route checks. |
| 03 | Customer Booking | Fixed, Proposed, Requested, recurring, availability alerts, payment return and hold/system-state flows. Build canonical `StatePage` base and implement booking-owned STATE-04..07. | 01–02 | Booking flow variants and hold states; StatePage component is reusable; no duplicate state markup. |
| 04 | Customer Panel | CUS-01..10, profile, notifications, appointment/request details. | 01–03 | Customer navigation and state matrix. |
| 05 | Stylist Panel | STY-01..11, STY-CUS, schedule, manual booking, portfolio and notifications. | 01–04 | Stylist permissions, no “ثبت انجام شد”, schedule impact preview. |
| 06 | Admin Daily | ADM-01..09, ADM-AC, scope, requests, appointments, customer/payment mode. Build canonical finance primitives used by ADM-09 and later ADM-16. | 01–05 | Action center vs notification separation; ledger integrity; reusable finance components. |
| 07 | Admin Management | ADM-10..15, stylists/services/mapping/pricing/schedules. | 01–06 | Impact previews, immutable service type, BookableFrom. |
| 08 | Finance + Content + System | ADM-16/20/21/23/24/25, ADM-NOT, remaining STATE/SYS/KIT patterns, promotion of shared patterns. Extend Phase 06 finance primitives for payment matching; reuse Phase 03 StatePage. MVC compatibility only; no migration. | 01–07 | Payment matching, notification rules, recovery/system states; no duplicated shared components. |
| 09 | Regression + MVC Handoff | Full visual/a11y/structure QA, route audit, ASP_PORT_GUIDE, ViewModel/API mapping, migration readiness. | 01–08 | All gates green; no dead ends or stale routes; final MVC handoff ready. |

## Non-duplication rules

1. Phase 01 builds infrastructure and a neutral layout skeleton only. Phase 02 builds the real shell and navigation.
2. Phase 03 builds `StatePage` once and owns booking-specific STATE-04..07. Phase 08 adds other state variants without rebuilding the base.
3. Phase 06 builds the canonical `CreditPayments`, `WalletLedger`, `PaymentRow`, and balance-summary primitives for ADM-09. Phase 08 extends them for ADM-16 payment matching.
4. Phase 08 may enforce MVC compatibility but must not begin actual ASP.NET migration. Phase 09 owns the migration guide.
5. Infrastructure IDs (`DS`, `RULE`, `ARCH`) belong in TRACEABILITY, not PAGE_INVENTORY.

## Execution workflow

Use serialized Workflow B. One phase at a time; each phase ends with a review gate and owner approval. Parallel work is allowed only inside a phase after shared contracts are frozen. Any change to tokens, shared components, navigation, or shell triggers its reuse regression list.

## Current owner gate — 2026-11-17

DEC-072 accepts the implemented CUS-01 slice and embedded CUS-07 balance, and authorizes remaining Phase 04 work on the existing branch. CUS-03 is implemented at live desktop owner review; continue after that feedback, preserving earlier structures and requesting a screenshot only when an exact mobile source is missing/unreadable. Port 8183 is owner-selected. [Current review](../docs-work/CUS_03_REVIEW_2026-11-17.md). This is not full Phase 04 acceptance or Phase 05 authorization.

### Prior gate — 2026-11-15

**Superseded assignment status, 2026-11-16:** the owner explicitly assigned Phase 04 (DEC-062). Work starts on local `phase/04-customer-panel`; Phase 03 remains accepted/closed. Exact mobile sources and the existing desktop review gate apply. [Current execution](../docs-work/PHASE_04_IMPLEMENTATION_FA.md). The unassigned statements below describe the earlier gate.

Phases 01 and 02 are accepted. The owner explicitly accepted Phase 03 on 2026-11-15 and authorized only its completion work (DEC-058). The [Phase 03 closeout](../docs-work/PHASE_03_CLOSEOUT_FA.md) records final validation and handoff. Phase 04 is unassigned and must not start without a later explicit owner instruction. Manual review-platform approvals remain independent of phase acceptance.
