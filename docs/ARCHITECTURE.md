# Architecture Entry Point

The complete, current architecture contract is maintained in [`RIVAL_PROJECT_CONTRACT.md`](RIVAL_PROJECT_CONTRACT.md).

This file intentionally does not repeat the full architecture. It exists for compatibility with older references that link to `ARCHITECTURE.md`.

**Current architecture at a glance:**

- Codex is the primary coding agent; repository instructions live in root `AGENTS.md`.
- Nunjucks templates are rendered at build time into static HTML under `dist/`.
- cPanel receives only the static `dist/` output; no Node.js or Express runtime is required there.
- Native CSS, native JavaScript ES Modules, Yekan Bakh, local Lucide-based SVG icons, and Design System v2 tokens are mandatory.
- The source tree remains Razor-compatible for the Phase 09 ASP.NET Core MVC handoff.

For all constraints, source precedence, responsive rules, phase boundaries, and migration rules, read `RIVAL_PROJECT_CONTRACT.md`.

For source entry points, use the [frontend guide](ai/FRONTEND_ARCHITECTURE.md). For task routing, use the [root instructions](../AGENTS.md).

The independent [preview-review workspace](../preview-review/) supplies the directory UI and manual approvals. A small build adapter writes its assets/HTML and static revisions into the generated preview routes. Product pages load no review controller; manual approval never mutates the page registry or product mock data. See [review documentation](../preview-review/README.md).
