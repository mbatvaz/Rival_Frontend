---
name: rival-phase-runner
description: Run one approved Rival implementation phase with strict scope, source traceability, acceptance gates, and owner approval. Use when Codex is asked to start, continue, or complete a PHASE_01–PHASE_09 task.
---

# Rival Phase Runner

## Before work

Reuse the [root route](../../../AGENTS.md) and prior evidence. Use the phase README for its acceptance criteria, the manifest for exact states and the handoff for the relevant product excerpt. Confirm dependencies against the [owner gate](../../../docs/PHASE_PLAN.md#current-owner-gate).

## Execution
- Stay in the assigned phase. Use Plan mode when available and show intended files and checks before broad implementation. Infrastructure maintenance has its own scope.
- Use the read-only manifest and exports to compare mapped state candidates. Record Page IDs, shared components, decisions, copy, assets, layout and motion in the [page spec](../../../docs/ai/templates/page-spec.md).
- Follow the [implementation procedure](../../../docs/ai/DESIGN_IMPLEMENTATION_CONTRACT.md) and start from the [accepted runtime patterns](../../../docs/COMPONENT_REUSE_MATRIX.md#implemented-reuse). Check the [responsive contract](../../../docs/RIVAL_PROJECT_CONTRACT.md#6-responsive-and-desktop-design-contract) for the assigned phase.
- Preserve the static contract and canonical component ownership. Apply documented conservative defaults for open business, permission and money decisions.

## Gate
- Run one affected check for a slice and `npm run -s qa:affected -- --full` for full phase acceptance. Add required evidence missing from the selected suite using the [QA checklist](../../../docs/ai/QA_CHECKLIST.md).
- Inspect relevant screenshots and record at least five concrete source comparisons for new compositions.
- Update progress, inventory, traceability, discrepancies and open questions where applicable. Report changed files, covered states, actual checks, screenshots, gaps and the next gate. Stop for owner approval.
