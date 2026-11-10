> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Coding Agent Prompt — Phase 05: Stylist Panel

Read the Master package first. Implement only this phase's scope: Stylist dashboard, calendar, requests, appointments, manual booking, schedule, portfolio, notifications, profile and customer context.

## Canonical identifiers
STY, RULE, DS

## Source references
- Rival_Phase_05_AI_Handoff.md
- Batch4:STY-01..11,STY-CUS-*

## Implementation constraints
- HTML + CSS + native ES modules only; no React/Vue/Tailwind build/Vite/npm runtime.
- Razor-mappable templates and real anchor/form URLs.
- Use existing `rv-*` and Design System v2 tokens; promote repeated patterns rather than copying page CSS.
- Every documented loading/empty/error/disabled/expired state is explicit in MockData and query-string fixtures.
- Run visual checks at 390, 768, 1280; run axe and keyboard checks.

## Acceptance checklist
- [ ] Scope IDs all appear in `PAGE_INVENTORY.md` and `TRACEABILITY.md`.
- [ ] No stale route is introduced (`/admin/reports`, `/admin/wallets*`, `/admin/announcements`, `/admin/transactions` are forbidden).
- [ ] No business rule is implemented client-only when it requires server verification.
- [ ] All destructive/impact actions use shared bottom-sheet + preview pattern.
- [ ] Shared component regression list is run.
- [ ] PROGRESS and discrepancies updated.

## Handoff
At completion, report changed files, IDs covered, tests run, unresolved OQ/DEC references, and the exact next phase gate.
