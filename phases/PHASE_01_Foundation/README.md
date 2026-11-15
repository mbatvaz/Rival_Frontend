# Phase 01 — Foundation

This package is executed by **OpenAI Codex** from the VS Code workspace. It follows root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

## Scope
Repository skeleton, token/font/icon extraction, static build pipeline, page registry, central preview index, static mock adapter, native ES-module registry, Playwright/a11y/structure test harness, and MVC-shaped source folders. No product screens and no finished shell.

## Required input
- Root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.
- Master docs: Page Inventory, Phase Plan, Component Reuse Matrix, Traceability, Decision Log, Open Questions.
- `design-export/MANIFEST.json` and exact source evidence for the IDs in this phase.
- This package's Source Map and `references/Rival_Phase_01_AI_Handoff.md`.

## Rules
- Do not invent business behavior. Cite Page ID, Component ID, RULE/DEC in code comments or PROGRESS.
- Keep shared components single-source. Run their reuse regression list after changes.
- Preserve RTL, Persian copy, fa-digits/Jalali helpers, bottom sheets, Yekan Bakh, 44px touch targets, and the approved scroll policy.
- Desktop is a page-specific composition based on the mobile design language, not a stretched mobile page.
- Node/npm are local build/test tools only; cPanel receives static `dist/` files.

## Done when
- [x] `npm run build` produces plain static HTML under `dist/`.
- [x] `dist/_preview/index.html` links to every canonical page/context in `src/page-registry.json`.
- [x] `dist/` can be served by a simple static server and contains no runtime dependency on Node/Express/Nunjucks.
- [x] `src/wwwroot` assets and mock JSON are copied into the static output with stable URLs.
- [x] DS/RULE/ARCH IDs are recorded in TRACEABILITY, not PAGE_INVENTORY.
- [x] Phase 01 itself adds no product shell or page-specific feature; retain later accepted phase implementations during a retrospective audit.
- 390/768/1280 checks, axe, keyboard, structure and no-dead-end checks pass.
- `PROGRESS.md`, `DISCREPANCIES.md`, and traceability are updated.
- The agent stops for owner review.

## Accepted foundation and 2026-11-14 refresh

Phase 01 was accepted on 2026-11-10; the completed checklist is retrospective foundation evidence, not an instruction to delete Phase 02/03 screens. The owner explicitly requested a Phase 01?02 re-audit on 2026-11-14. Maintained-document checks now run inside lint and through a VS Code task. Token-based shared motion and regression evidence are in the [refresh report](../../docs-work/PHASE_01_02_REFRESH_FA.md). No next phase is assigned by this maintenance.
