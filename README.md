# Rival — Codex Starter

Current owner gate (2026-11-15): Phase 03 is accepted; only its closeout is authorized. Phase 04 has not started and requires a later explicit assignment. See the [Phase 03 final handoff](docs-work/PHASE_03_CLOSEOUT_FA.md).

Read `README_START_HERE_FA.md` for the Persian setup guide. Read root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md` before using Codex.

This is a starter and architecture-alignment package, not a completed frontend. Run the read-only preflight prompts before Phase 01.

Current workflow documentation: [project context](docs/ai/PROJECT_CONTEXT.md), [reusable prompts](PROMPTS.md), [skill registry](docs/ai/SKILL_REGISTRY.md), [design source map](docs/ai/DESIGN_SOURCE_MAP.md) and [maintenance report](docs/ai/AUDIT_REPORT.md). Current phase acceptance is tracked in [progress](PROGRESS.md); the original preflight is historical once foundation is accepted.

The `/_preview/` directory now has independent red/yellow/green review status and manual mobile/desktop/final approval. State is local to the browser, with JSON backup/import; page revisions invalidate old approvals after a build. [Usage and boundaries](preview-review/README.md).

## Git branches

`master` integrates the whole project. Frontend work uses `frontend`; backend work uses `backend`. Assigned frontend phases use separate `phase/frontend-NN-name` branches and return to `frontend` after owner acceptance. See [Git workflow](docs/GIT_WORKFLOW.md).

`stable/baseline-1` preserves the initial frontend recovery snapshot. The original GitHub history is retained; its empty `Rival.slnx` does not implement a backend or start the MVC handoff.
