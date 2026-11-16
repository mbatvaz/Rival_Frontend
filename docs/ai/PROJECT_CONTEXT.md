# Project context and ownership

Current navigation: [small index](PROJECT_INDEX.md) and [graph guide](PROJECT_GRAPH.md). Query relevant paths before reading large docs. Source implementation, current contract and effective owner decisions must be checked; historical inspection notes below are dated evidence, not live environment detection. Reuse verified reads and use the index's short handoff format.

Inspected 2026-11-14. The owner attachment describes the eventual ASP.NET Core MVC product; current files establish a static frontend reference. No csproj, cshtml, Areas, Directory.Build files, .codex directory or AGENTS.override.md exist. Do not create a backend or override merely to match a generic file list.

- [Canonical contract](../RIVAL_PROJECT_CONTRACT.md): architecture, safety and implementation rules.
- [Phase plan](../PHASE_PLAN.md) and [progress](../../PROGRESS.md): assignments/acceptance. The owner accepted Phase 03 on 2026-11-15 and authorized its closeout only. Phase 04 remains unassigned and must not start. See the [handoff](../../docs-work/PHASE_03_CLOSEOUT_FA.md).
- [Source map](DESIGN_SOURCE_MAP.md), [inventory](DESIGN_EXPORT_INVENTORY.md) and machine audit: design evidence.
- [Catalog](COMPONENT_CATALOG.md): implementation ownership; [reuse matrix](../COMPONENT_REUSE_MATRIX.md) retains canonical phase ownership.
- [Implementation](DESIGN_IMPLEMENTATION_CONTRACT.md), [responsive](RESPONSIVE_DESIGN_CONTRACT.md), [motion](MOTION_SPEC.md), [dependencies](DEPENDENCY_POLICY.md), [QA](QA_CHECKLIST.md): focused procedures.
- [Conflicts](DESIGN_SOURCE_CONFLICTS.md): differences/dispositions; unresolved product questions remain in [OPEN_QUESTIONS](../OPEN_QUESTIONS.md).
- [Templates](templates/), [prompts](../../PROMPTS.md) and [skills](SKILL_REGISTRY.md): reusable workflows.

Existing reference and phase handoff copies remain historical/product evidence. Resolve older stack instructions through the contract; do not rewrite original evidence. Existing architecture/extraction docs remain compatibility entry points. New procedures link to those owners.

Initial Git status contained only the untracked owner-provided firstTest.zip, preserved outside this scope. No global settings, plugin connections or external installation is required.

Later owner assignment: the [preview-review workspace](../../preview-review/) is independent review infrastructure. Local preview persists manual mobile/desktop/final approvals in project data through the scoped local tooling endpoint; static hosting uses the exported snapshot and browser-local fallback. It reads a generated revision feed and never writes product/phase acceptance. See the current [contract §3.3](../RIVAL_PROJECT_CONTRACT.md) and its [report](../../docs-work/PREVIEW_REVIEW_REPORT.md).
