# Executive Analysis — Rival (Current)

This summary follows `RIVAL_PROJECT_CONTRACT.md` as updated 2026-11-09. It supersedes the earlier architecture summary in this file.

## Product shape

Rival is a Persian RTL booking and salon-management system with three human roles: `Customer`, `Stylist`, and `OwnerAdmin`. The Master contains 8 design batches, 441 board records, 571 HTML exports, a Design System v2, and 9 implementation phases. Many board records are states, sheets, results, and empty/error variants rather than independent routes.

## Current implementation approach

- OpenAI Codex in VS Code is the primary coding agent; root `AGENTS.md` is the instruction entry point.
- Source templates are Razor-shaped Nunjucks under `src/Views/`; Nunjucks runs at build time only.
- A local build creates ordinary static HTML under `dist/`, including the public home and a central page directory at `/_preview/` (`pages.html` alias).
- Node/npm are local build/test tools only. No Express or Node runtime is required on cPanel; upload only `dist/`.
- Native CSS with Cascade Layers and Design System v2 tokens; native JavaScript ES Modules; Yekan Bakh only; local Lucide-based SVG icons with the existing `ri` compatibility prefix.
- The source tree (`src/Views`, `src/wwwroot`, `src/MockData`) remains ready for the Phase 09 ASP.NET Core MVC/Razor handoff.

## Critical execution rules

1. Follow the source hierarchy in `RIVAL_PROJECT_CONTRACT.md`; historical Tailwind/Alpine/htmx/Claude Code instructions are not active.
2. Keep Phase 01 limited to foundation/static build/preview. Phase 02 owns the actual shell and public/auth pages.
3. Phase 03 owns the reusable StatePage base and booking states STATE-04..07; Phase 08 extends it.
4. Phase 06 owns canonical finance primitives for ADM-09; Phase 08 extends them for ADM-16.
5. Phase 08 remains MVC-compatible only; Phase 09 owns the MVC handoff.
6. Desktop must be a deliberate composition derived from mobile design language, not a stretched mobile screen. Review a page-specific desktop brief before implementation.
7. No nested vertical scrolling; horizontal rails only where design evidence supports them. Interactive hit targets are at least 44×44px.

## Source and audit paths

- `design-export/MANIFEST.md` and `MANIFEST.json`: page-to-artifact lookup.
- `design-export/batches/`: immutable original HTML/CSS/assets.
- `design-export/design-system-v2/`: immutable Design System v2 source.
- `docs/PHASE_PLAN.md`, `PAGE_INVENTORY.md`, `COMPONENT_REUSE_MATRIX.md`, `TRACEABILITY.md`: execution and traceability.
- `docs/OPEN_QUESTIONS.md`: owner questions that must not be guessed.
