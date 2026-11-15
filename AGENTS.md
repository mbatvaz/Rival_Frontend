# Rival engineering instructions

Build only the owner-assigned scope. This is a Persian RTL static frontend reference for a future ASP.NET Core MVC application. The owner accepted Phase 03 on 2026-11-15 and authorized its closeout only. Phase 04 is unassigned and must not start; never start another product phase automatically.

## Read and resolve

- Read [contract](docs/RIVAL_PROJECT_CONTRACT.md), [phase plan](docs/PHASE_PLAN.md), [progress](PROGRESS.md), [decisions](docs/DECISION_LOG.md), [questions](docs/OPEN_QUESTIONS.md), then the assigned phase package.
- Latest owner instruction wins, then architecture contract and confirmed product decisions. Within design evidence: exact page/state, component/token specification, general design system, general docs. Log [conflicts](docs/ai/DESIGN_SOURCE_CONFLICTS.md); never guess permissions or money rules.
- [Design exports](design-export/) and [original references](docs/references/) are read-only. Locate exact states in [manifest](design-export/MANIFEST.json); inspect actual HTML/screenshots and handoffs.
- Detailed workflow: [context](docs/ai/PROJECT_CONTEXT.md), [implementation procedure](docs/ai/DESIGN_IMPLEMENTATION_CONTRACT.md), [prompts](PROMPTS.md), [skills](docs/ai/SKILL_REGISTRY.md).

## Source and technology

- Source: [Views](src/Views/), [MockData](src/MockData/), [wwwroot](src/wwwroot/). Restricted build-time Nunjucks maps to Razor layouts/partials/helpers. No ASP.NET runtime exists here; Phase 09 owns MVC handoff. Preserve ordinary forms and antiforgery contracts.
- Node/npm are local build/test tools only. [Build](tools/build-static.mjs) generates dist; never edit generated output. cPanel/Apache receives only its contents. Preview uses VS Code Tasks and the local static server.
- Native CSS and ES Modules only. No React, Vue, Angular, Alpine, htmx, jQuery, Tailwind, Bootstrap, preprocessors or bundlers; no Express/runtime backend.
- Prefix every URL using [site config](src/site-config.json) basePath. Directory index routes: `/` public home, `/_preview/` page directory, `/pages.html` alias.
- [api.js](src/wwwroot/js/core/api.js) is the sole product data boundary. Fixtures/localStorage simulate writes. Never perform or imply real payments, bookings, messages or authentication.
- The owner-requested [preview review workspace](preview-review/) is independent infrastructure. Its [storage boundary](preview-review/storage.js) persists only manual approvals in [project data](preview-review/approvals.json) through the [local tooling endpoint](tools/lib/review-endpoint.mjs), and reads the static revision feed. This owner-authorized local-file exception must not change product fixtures, registry acceptance or phase gates; deployed product output remains static.

## Shared design and quality

- Reuse [components and phase ownership](docs/COMPONENT_REUSE_MATRIX.md); see [catalog](docs/ai/COMPONENT_CATALOG.md). StatePage belongs to Phase 03; finance primitives to Phase 06; Phase 08 extends both.
- Generate tokens from [v2 JSON](design-export/design-system-v2/tokens/tokens.json). Yekan Bakh normal 300/400/600 only; 71 local Lucide SVGs with `ri ri-*` compatibility; `rv-*` BEM classes. No emoji/CDN/copied batch CSS.
- Layers: tokens, base, layout, components, pages, utilities. [app.css](src/wwwroot/css/app.css) contains imports only. Target <=150 lines/CSS file, <=120 lines/JS module. No inline styles/scripts/handlers; use data-rv hooks.
- Preserve Persian copy/digits, Jalali dates, 24-hour time, RTL logical CSS, semantics, visible labels/focus, keyboard order, contrast and >=44x44px hit areas.
- Follow [responsive procedure](docs/ai/RESPONSIVE_DESIGN_CONTRACT.md): CSS first, inspect 390px source. Desktop needs a page-specific [brief](docs-work/desktop-layouts/) and owner review before implementation. An audit approves no composition.
- Bottom sheets are the default. DEC-037 permits the centered desktop PortfolioViewer from 1024px. Nested vertical scroll is allowed only in the approved mobile BK-REC01 editor with visible header. Horizontal rails need design evidence.
- Follow [motion spec](docs/ai/MOTION_SPEC.md): reduced motion, cancellation/static fallbacks, transform/opacity, no forced layout/heavy scroll handlers. Reserve image dimensions, lazy-load offscreen media and use picture/srcset when sources exist.
- Evaluate every new dependency through [policy](docs/ai/DEPENDENCY_POLICY.md) before adding it.

## Execution and completion

- Inspect Git status/evidence and present a scoped plan before broad edits. Use Plan mode when available for numbered product phases. Continue authorized infrastructure work after preflight without another approval pause.
- Use [phase runner](.agents/skills/rival-phase-runner/SKILL.md) for numbered phases and [visual QA](.agents/skills/rival-visual-qa/SKILL.md) for UI/shared changes. [MVC skill](.agents/skills/rival-mvc-compatibility/SKILL.md) applies only to Phase 09 or explicit MVC audit.
- Actual commands: `npm run build`, `npm run lint`, `npm test`, `npm run test:subpath`; focused suites: `npm run test:visual`, `npm run test:a11y`, `npm run test:smoke`. See [QA](docs/ai/QA_CHECKLIST.md). Do not invent dotnet/format commands.
- UI completion requires source-to-test traceability, route/state/console/interaction checks, screenshots and >=5 source comparisons, axe, keyboard, reduced motion and responsive review at 390/768/1280 plus affected boundary widths. Assertions alone do not prove fidelity.
- Update [progress](PROGRESS.md), [inventory](docs/PAGE_INVENTORY.md), [traceability](docs/TRACEABILITY.md), [discrepancies](docs/DISCREPANCIES.md) and questions where relevant. Report actual checked results, evidence and gaps; stop at owner phase gate.
- Preserve unrelated changes; use Git checkpoints where authorized. Never push, deploy or edit outside this repository without explicit approval.
