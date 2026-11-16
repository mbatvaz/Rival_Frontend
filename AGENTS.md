# Rival engineering instructions

Persian RTL static frontend reference for future ASP.NET Core MVC. Phase 03 is accepted/closed (DEC-058); Phase 04 is unassigned. Work only within owner-assigned scope; never start the next product phase automatically.

## Context router

- Start with [navigation](docs/ai/PROJECT_INDEX.md). Query a Page ID, exact path or token: `npm run map:query -- BK-REQ01`; it checks freshness without writing. Use `map:check` independently for maintenance. Stale/missing maps require scoped source inspection; update only during authorized writes. Never load the whole graph into context.
- Reuse verified reads/results for unchanged scope. Read relevant headings/matches before large files; expand only for real dependencies. Bound output and exclude dependencies, generated output, caches and archives from broad discovery.
- UI/shared: exact state/design, source, approved desktop brief, DEC/OQ and affected consumer QA. Git/tooling/docs: affected config and [Git workflow](docs/GIT_WORKFLOW.md), not all UI handoffs. Assigned phase: current [plan](docs/PHASE_PLAN.md), [progress](PROGRESS.md) gate and package via [phase runner](.agents/skills/rival-phase-runner/SKILL.md).
- Authority: latest owner instruction, [contract](docs/RIVAL_PROJECT_CONTRACT.md), confirmed [decisions](docs/DECISION_LOG.md). Within design: exact page/state, component/token spec, design system, general docs. Consult relevant [questions](docs/OPEN_QUESTIONS.md); never invent permission/money rules. Log [conflicts](docs/ai/DESIGN_SOURCE_CONFLICTS.md). Graph consumers/test references are candidates, not runtime proof or acceptance.

## Permanent boundaries

- Source: [Views](src/Views/), [MockData](src/MockData/), [wwwroot](src/wwwroot/). Restricted build-time Nunjucks maps to Razor; preserve forms/antiforgery contracts. No ASP.NET runtime exists; Phase 09 owns [MVC handoff](docs/ASP_NET_MVC_MIGRATION_MAP.md), not backend authorization.
- Native CSS/ES Modules only; no frameworks/UI kits, preprocessors/bundlers or runtime backend (contract §3–4). Node/npm are local tools. [Build](tools/build-static.mjs) generates dist; never edit it. cPanel/Apache receives its contents only. Apply [dependency policy](docs/ai/DEPENDENCY_POLICY.md) before additions.
- Prefix URLs with [basePath](src/site-config.json): `/` home, `/_preview/` directory, `/pages.html` alias. [api.js](src/wwwroot/js/core/api.js) alone owns product data; fixtures/localStorage simulate writes, never real payments/bookings/messages/authentication.
- [Review infrastructure](preview-review/): [storage](preview-review/storage.js) persists manual [approvals](preview-review/approvals.json) through the [local tooling endpoint](tools/lib/review-endpoint.mjs), with revision feed/static snapshot/browser fallback. This exception changes no product fixtures, registry acceptance or phase gates; deployment stays static.
- [Exports](design-export/) and [original references](docs/references/) are read-only. Use the [manifest](design-export/MANIFEST.json) to locate actual HTML/screenshots/handoffs; candidate paths do not select exact states.

## UI gates

- Follow [implementation](docs/ai/DESIGN_IMPLEMENTATION_CONTRACT.md), contract §4–7 and [reuse ownership](docs/COMPONENT_REUSE_MATRIX.md). StatePage: Phase 03; finance primitives: Phase 06; Phase 08 extends both. Use [v2 tokens](design-export/design-system-v2/tokens/tokens.json), Yekan Bakh normal 300/400/600, 71 local Lucide SVGs (`ri ri-*`), `rv-*` BEM/data-rv hooks. No emoji/CDN/copied batch CSS or inline styles/scripts/handlers. [app.css](src/wwwroot/css/app.css) imports only; retain native layers and <=150 CSS/<=120 JS line targets.
- Preserve Persian copy/digits, Jalali dates, 24-hour time, RTL/logical CSS, semantics, labels/focus, keyboard order, contrast and >=44x44px targets. [Responsive](docs/ai/RESPONSIVE_DESIGN_CONTRACT.md): CSS first, 390px source; new desktop composition needs an owner-reviewed [brief](docs-work/desktop-layouts/). Existing approvals persist; audits approve no composition.
- Bottom sheets by default; DEC-037 permits centered desktop PortfolioViewer from 1024px. Nested vertical scroll only in approved mobile BK-REC01 editor with visible header; horizontal rails need evidence. Follow [motion](docs/ai/MOTION_SPEC.md): reduced motion, cancellation/static fallback, transform/opacity, no forced layout/heavy scroll handlers. Reserve image dimensions; lazy-load offscreen media and use picture/srcset when available.

## Execution and handoff

- Inspect Git status/evidence and show scoped files/checks before broad edits. Plan mode when available for numbered phases; authorized infrastructure work continues after preflight. Follow [Git workflow](docs/GIT_WORKFLOW.md): master is stable; assigned phase branches, acceptance/closeout, no-ff merge, annotated stable tag and retirement after authorized publication. No permanent frontend/backend/stable branches. Preserve unrelated changes; never push/deploy or edit outside this repository without explicit approval.
- Use relevant [skills](docs/ai/SKILL_REGISTRY.md); [visual QA](.agents/skills/rival-visual-qa/SKILL.md) owns shared gates, specialists extend evidence. MVC skill only for Phase 09/explicit MVC review. Docs/tooling-only changes use focused checks; full phase gates remain required.
- [QA commands](docs/ai/QA_CHECKLIST.md): `npm run build`, `npm run lint`, `npm test`, `npm run test:subpath`; focused `test:visual`, `test:a11y`, `test:smoke`. No invented dotnet/format commands. UI completion requires traceability, route/state/console/interaction checks, fresh screenshots, >=5 source comparisons, axe, keyboard, reduced motion, 390/768/1280 and affected boundaries. Assertions alone prove no fidelity; do not repeat unchanged checks/builds.
- Update [progress](PROGRESS.md), [inventory](docs/PAGE_INVENTORY.md), [traceability](docs/TRACEABILITY.md), [discrepancies](docs/DISCREPANCIES.md) and questions where relevant. Report checked results/gaps; stop at owner phase gate. Handoff: scope, paths/IDs, decisions/approvals, verified reads/checks, gaps, next action. Link histories instead of copying them.
