# Codex Implementation Prompt — Phase 02: Shell Public Auth

Read root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md` first. Then read this phase's README, SOURCE_MAP, and handoff. Implement only this phase's scope. Do not start the next phase.

## Scope
Shared shell, role navigation, purpose-designed desktop shell, bottom sheets, public pages, authentication, and final OTP/lock decisions.

## Canonical identifiers
PUB, AUTH, SHELL, MORE, DS

## Source references
- Rival_Phase_02_AI_Handoff.md; Batch 1: F-PUB-01, PUB-01..03, AUTH-01/02, SHELL-*, MORE-*.

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
Create a page-specific desktop composition. Public and customer layouts must not be forced into a staff sidebar; staff/admin workspaces may use a right-side primary navigation rail. Write and obtain review of desktop layout briefs before implementing each page at >=1024px.

## Acceptance checklist
- [x] Shared shell is implemented once and driven by role/navigation data.
- [x] Desktop layout is reviewed as a distinct composition, not a scaled mobile canvas.
- [x] OTP, lock-all-methods, accessibility, and 390/768/1280 checks pass.
- [x] IDs are traceable through `docs/TRACEABILITY.md`; do not put infrastructure-only IDs in `PAGE_INVENTORY.md`.
- [x] No stale route is introduced (`/admin/reports`, `/admin/wallets*`, `/admin/announcements`, `/admin/transactions` are forbidden unless an owner-approved route inventory change says otherwise).
- [x] No business rule that requires server verification is implemented client-only.
- [x] Destructive/impact actions use the shared bottom-sheet + impact-preview pattern.
- [x] Shared-component regression is run after any shared component change.
- [x] Update `PROGRESS.md`, `docs/PAGE_INVENTORY.md` status, `docs/DISCREPANCIES.md`, `docs/OPEN_QUESTIONS.md`, and traceability.

## Handoff
Report changed files, IDs/states covered, tests run and results, screenshots, unresolved OQ/DEC references, desktop briefs requiring owner review, and the exact next phase gate. Stop and wait for owner approval.

## Accepted implementation — 2026-11-10

The owner explicitly accepted Phase 02 after three review rounds. Approved UI overrides and current truth are in DEC-034..041 and docs-work/PHASE_02_CLOSEOUT_FA.md. The checklist applies to the static reference: actual authentication/security enforcement remains backend-owned. No destructive domain action was introduced; logout retains confirmation. The owner authorized closeout only and explicitly prohibited starting Phase 03 until a new instruction.
