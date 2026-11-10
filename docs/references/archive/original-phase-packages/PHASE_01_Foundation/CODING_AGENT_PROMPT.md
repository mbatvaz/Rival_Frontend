> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Coding Agent Prompt — Phase 01: Foundation

Read the Master package first. Implement only this phase's scope: Repository skeleton, token extraction, local assets, mock-server contract, ES-module registry, test harness, and MVC-shaped layout.

## Canonical identifiers
DS, RULE, ARCH

## Source references
- Rival_Phase_01_AI_Handoff.md
- Rival_ClaudeCode_Kickstart/CLAUDE.md; Rival_ClaudeCode_Kickstart/prompts/00_Audit.md; Rival_ClaudeCode_Kickstart/prompts/00a_Normalize_Export.md

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
