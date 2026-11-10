# 00 — Codex Read-only Preflight

Run this prompt in Codex Plan mode from the repository root before Phase 01.

```text
Read root AGENTS.md and docs/RIVAL_PROJECT_CONTRACT.md completely.
Then inspect docs/PAGE_INVENTORY.md, docs/PHASE_PLAN.md,
docs/COMPONENT_REUSE_MATRIX.md, docs/TRACEABILITY.md,
docs/DECISION_LOG.md, docs/OPEN_QUESTIONS.md,
docs/ASSET_AUDIT.md, docs/FILE_AUDIT.md,
docs/ASP_NET_MVC_MIGRATION_MAP.md, and design-export/MANIFEST.md.

This is READ-ONLY. Do not create, edit, delete, move, install, or rename files.
Do not implement product screens.

Validate:
1. Source-of-truth hierarchy and any remaining contradictions.
2. Repository paths referenced by all phase SOURCE_MAP files.
3. Page Inventory IDs against the design export manifest.
4. Phase 01/02 boundary and all later phase ownership boundaries.
5. Static-first pipeline: build-time Nunjucks only, no Express, cPanel receives dist only.
6. Codex/AGENTS instructions; identify any active Claude Code instruction.
7. Native CSS, Yekan Bakh-only typography, local Lucide-based icons, rv-* naming,
   touch targets, scroll policy, and desktop layout review gates.
8. Any open business or permission question that must not be guessed.

Return a concise preflight report with blockers, non-blocking issues, and the exact
Phase 01 checklist. Stop and wait for owner approval.
```
