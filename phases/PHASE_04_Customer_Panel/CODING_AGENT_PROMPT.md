# Codex Implementation Prompt — Phase 04: Customer Panel

Read root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md` first. Then read this phase's README, SOURCE_MAP, and handoff. Implement only this phase's scope. Do not start the next phase.

## Scope
Customer dashboard, appointments, requests, availability alerts, notifications, profile, and read-only/disabled variants.

## Canonical identifiers
CUS, DS, STATE

## Source references
- Rival_Phase_04_AI_Handoff.md; Batch 3: CUS-01..10; Batch 2: checkout reuse.

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
Reuse Phase 02 shell and Phase 03 booking/state components. Do not create customer-specific copies of shared components.

## Acceptance checklist
- [ ] Customer navigation and state matrix are complete.
- [ ] Shared component regression passes at 390/768/1280 and approved desktop layout.
- [ ] IDs are traceable through `docs/TRACEABILITY.md`; do not put infrastructure-only IDs in `PAGE_INVENTORY.md`.
- [ ] No stale route is introduced (`/admin/reports`, `/admin/wallets*`, `/admin/announcements`, `/admin/transactions` are forbidden unless an owner-approved route inventory change says otherwise).
- [ ] No business rule that requires server verification is implemented client-only.
- [ ] Destructive/impact actions use the shared bottom-sheet + impact-preview pattern.
- [ ] Shared-component regression is run after any shared component change.
- [ ] Update `PROGRESS.md`, `docs/PAGE_INVENTORY.md` status, `docs/DISCREPANCIES.md`, `docs/OPEN_QUESTIONS.md`, and traceability.

## Handoff
Report changed files, IDs/states covered, tests run and results, screenshots, unresolved OQ/DEC references, desktop briefs requiring owner review, and the exact next phase gate. Stop and wait for owner approval.
