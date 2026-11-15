# Codex Implementation Prompt — Phase 03: Customer Booking

Read root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md` first. Then read this phase's README, SOURCE_MAP, and handoff. Implement only this phase's scope. Do not start the next phase.

## Scope
Fixed, Proposed, Requested, recurring, availability alerts, payment return, and hold/system-state flows. Build the canonical reusable StatePage base and booking-owned STATE-04..07 variants.

## Canonical identifiers
BK, PAY, STATE, RULE

## Source references
- Rival_Phase_03_AI_Handoff.md; Batch 2: BK-*, PAY-RES-*; Batch 8: STATE-04..07.

## Implementation constraints
- Follow the root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`; they supersede all older technology instructions.
- HTML + Native CSS + native ES modules only. No Tailwind, Bootstrap, React, Vue, Angular, Alpine.js, htmx, Sass/Less, Vite, Webpack, or CSS bundler.
- Nunjucks is build-time only; the deliverable is static HTML in `dist/`. No Express or production Node runtime.
- Preserve Razor-compatible template syntax and real MVC-shaped route anchors/forms.
- Use Design System v2 tokens, Yekan Bakh only, local Lucide-based SVG icons, and canonical `rv-*` classes.
- Keep `design-export/` and source references read-only. Locate exact source evidence through `design-export/MANIFEST.json`.
- Every documented loading/empty/error/disabled/expired state must have explicit mock fixtures and be addressable through documented query parameters.
- Write `docs-work/desktop-layouts/<PAGE-ID>.md` for each desktop page before implementing its desktop composition; obtain owner review. Do not simply stretch the mobile artboard.
- Interactive hit targets must be at least 44×44px. No nested vertical scrolling; horizontal rails only when supported by design evidence.
- Run Playwright at 390, 768, and 1280; run axe and keyboard checks.

## Phase-specific clarification
StatePage is created once here because the booking flows are its first use. Phase 08 must reuse/extend it and must not recreate the base. Static demo behavior must never claim real payment/booking completion.

## Acceptance checklist
- [x] Fixed/Proposed/Requested/recurring flows and hold states are covered.
- [x] StatePage base is reusable; STATE-04..07 are explicit variants.
- [x] Booking/payment are fixture/localStorage simulations only. DEC-048 supersedes the earlier visible demo-notice requirement; no real transaction is performed.
- [x] IDs are traceable through `docs/TRACEABILITY.md`; do not put infrastructure-only IDs in `PAGE_INVENTORY.md`.
- [x] No stale route is introduced (`/admin/reports`, `/admin/wallets*`, `/admin/announcements`, `/admin/transactions` are forbidden unless an owner-approved route inventory change says otherwise).
- [x] Server security, authorization and financial verification remain backend responsibilities; current behavior is a static simulation.
- [x] Destructive/impact actions use the shared bottom-sheet + impact-preview pattern.
- [x] Shared-component regression is run after any shared component change.
- [x] Update `PROGRESS.md`, `docs/PAGE_INVENTORY.md` status, `docs/DISCREPANCIES.md`, `docs/OPEN_QUESTIONS.md`, and traceability.

## Handoff
The owner accepted Phase 03 on 2026-11-15 and authorized closeout only (DEC-058). See the [closeout](../../docs-work/PHASE_03_CLOSEOUT_FA.md) for current results, component reuse and remaining source gaps. Phase 04 must not start without a later explicit assignment.
