# Master Reference Index

This index replaces the need to regenerate parallel audit documents. Keep one technical contract in `RIVAL_PROJECT_CONTRACT.md`; keep inventories separate where their data models differ.

## Canonical documents

- Architecture and technology: `RIVAL_PROJECT_CONTRACT.md`.
- Page/route inventory: `PAGE_INVENTORY.md` + `ROUTE_GRAPH.md`.
- Components and reuse: `COMPONENT_REUSE_MATRIX.md`.
- Traceability: `TRACEABILITY.md`.
- Decisions/gaps: `DECISION_LOG.md`, `OPEN_QUESTIONS.md`, `DISCREPANCIES.md`.
- Phase ownership: `PHASE_PLAN.md`.
- MVC conversion: `ASP_NET_MVC_MIGRATION_MAP.md`.
- Design evidence: `design-export/MANIFEST.json` and `design-export/batches/`.

## Merge policy

The Master `ARCHITECTURE.md` and the older `Frontend_Architecture.md` were compared and consolidated into `RIVAL_PROJECT_CONTRACT.md`. `ARCHITECTURE.md` is now a short compatibility pointer. The old Kickstart `00_Audit.md` is archived; the active Codex preflight prompts perform a gap audit and update only missing evidence. Do not generate duplicate inventories or silently replace the canonical ones.

`PAGE_INVENTORY.md`, `ROUTE_GRAPH.md`, `COMPONENT_REUSE_MATRIX.md`, and `TRACEABILITY.md` remain separate because they answer different questions. They are linked from this index and governed by the single contract; they are not redundant copies.
