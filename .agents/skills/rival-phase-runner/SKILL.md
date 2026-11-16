---
name: rival-phase-runner
description: Run one approved Rival implementation phase with strict scope, source traceability, acceptance gates, and owner approval. Use when Codex is asked to start, continue, or complete a PHASE_01–PHASE_09 task.
---

# Rival Phase Runner

## Before work
1. Reuse the active root instructions; inspect relevant contract sections only if not already verified in this conversation.
2. Use [navigation](../../../docs/ai/PROJECT_INDEX.md) for assigned IDs. Read the current phase README/acceptance, SOURCE_MAP and relevant handoff sections; consult CODING_AGENT_PROMPT for phase-specific additions, not another copy of common rules.
3. Verify the current gate in `docs/PHASE_PLAN.md` and the latest applicable `PROGRESS.md` entry; earlier entries are history. If a prerequisite is not accepted, stop and report it.
4. Identify exact Page IDs, Component IDs, RULE/DEC references, and source export paths before editing.

## Execution
- Work on one phase only. Never start the next phase automatically.
- Use Plan mode when available and show intended file changes/tests before broad implementation. Authorized infrastructure maintenance is separate from numbered product phases and continues after its preflight.
- Keep original files under `design-export/` and `docs/references/` read-only.
- Use `design-export/MANIFEST.json` to locate evidence. If a page has multiple variants, read the handoff and compare all candidates; do not select the first filename blindly.
- Do not invent business behavior. If a business/permission/money decision is unresolved, use the conservative default in `docs/OPEN_QUESTIONS.md` and report it.
- Build reusable components once according to `docs/COMPONENT_REUSE_MATRIX.md` and the phase ownership in `RIVAL_PROJECT_CONTRACT.md`.
- Use the [implementation procedure](../../../docs/ai/DESIGN_IMPLEMENTATION_CONTRACT.md) and [page spec](../../../docs/ai/templates/page-spec.md) to record exact state sources, copy/assets, reuse, invariants, responsive and motion decisions.
- Reuse the existing approved `docs-work/desktop-layouts/<PAGE-ID>.md`. A new or changed desktop composition needs a brief and owner review before implementation; do not request the same approval again.
- Keep the static-first contract: build-time Nunjucks only, no Express, no Node runtime on cPanel.

## Gate
- Run the exact phase acceptance list.
- Run `npm run build`, `npm run lint`, relevant root/subpath Playwright tests, axe, keyboard, reduced-motion, route and shared-component regressions. Follow the [QA checklist](../../../docs/ai/QA_CHECKLIST.md); inspect fresh screenshots and record at least five concrete source comparisons.
- Record results honestly; do not claim tests that were not run.
- Update `PROGRESS.md`, `docs/PAGE_INVENTORY.md`, `docs/TRACEABILITY.md`, `docs/DISCREPANCIES.md`, and `docs/OPEN_QUESTIONS.md` where applicable.
- Return changed files, covered IDs/states, tests/results, screenshots, unresolved questions, and the next gate.
- Stop and wait for explicit owner approval.
