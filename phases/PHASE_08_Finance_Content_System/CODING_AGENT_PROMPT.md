# Codex Implementation Prompt — Phase 08: Finance Content System

Read root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md` first. Then read this phase's README, SOURCE_MAP, and handoff. Implement only this phase's scope. Do not start the next phase.

## Scope
ADM-16/20/21/23/24/25, ADM-NOT, remaining STATE/SYS/KIT patterns, and promotion of shared patterns. Extend Phase 06 finance primitives for ADM-16 matching and reuse Phase 03 StatePage.

## Canonical identifiers
ADM, STATE, SYS, NOT, MVC

## Source references
- Rival_Phase_08_AI_Handoff.md; Batch 7: ADM-16, ADM-NOT, ADM-20/21/23/24/25; Batch 8: STATE-*, SYS-*, KIT-*.

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
Do not rebuild CreditPayments, WalletLedger, PaymentRow, or StatePage. Add remaining state variants STATE-01..03 and STATE-08 and SYS recovery patterns by composition. MVC means compatibility only in this phase; actual ASP migration belongs to Phase 09.

## Acceptance checklist
- [ ] ADM-16 matching extends the Phase 06 finance primitives.
- [ ] Remaining system states reuse the Phase 03 StatePage base.
- [ ] Notification rules and recovery/system states are correct.
- [ ] No ASP.NET migration is started.
- [ ] IDs are traceable through `docs/TRACEABILITY.md`; do not put infrastructure-only IDs in `PAGE_INVENTORY.md`.
- [ ] No stale route is introduced (`/admin/reports`, `/admin/wallets*`, `/admin/announcements`, `/admin/transactions` are forbidden unless an owner-approved route inventory change says otherwise).
- [ ] No business rule that requires server verification is implemented client-only.
- [ ] Destructive/impact actions use the shared bottom-sheet + impact-preview pattern.
- [ ] Shared-component regression is run after any shared component change.
- [ ] Update `PROGRESS.md`, `docs/PAGE_INVENTORY.md` status, `docs/DISCREPANCIES.md`, `docs/OPEN_QUESTIONS.md`, and traceability.

## Handoff
Report changed files, IDs/states covered, tests run and results, screenshots, unresolved OQ/DEC references, desktop briefs requiring owner review, and the exact next phase gate. Stop and wait for owner approval.
