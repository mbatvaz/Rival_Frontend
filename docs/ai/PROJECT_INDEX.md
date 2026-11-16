# Rival project navigation

Derived navigation, never an architecture or acceptance authority. Read the relevant source after lookup.

- [Graph guide](PROJECT_GRAPH.md): scope, certainty, update rules and diagrams.
- [Contract](../RIVAL_PROJECT_CONTRACT.md), [phase gate](../PHASE_PLAN.md#current-owner-gate--2026-11-15), [decisions](../DECISION_LOG.md), [open questions](../OPEN_QUESTIONS.md).
- [Registry](../../src/page-registry.json): 73 contexts, 21 accepted; placeholders are not implementations.

## Find only the relevant context

1. QUERY checks freshness itself; do not run a redundant CHECK first. Use `npm run map:check` independently for maintenance/CI. Both write nothing.
2. Run `npm run map:query -- BK-REQ01`, or use an exact repository-relative path, `feature:booking`, or `--accent-500`. Default: 20 evidence edges plus grouped navigation; `--limit=120` expands only when needed.
3. Inspect direct references first, then dependencies and possible consumers. INFERRED means candidate, not runtime proof. Never load the full JSON into the conversation.
4. Read only relevant contract headings, DEC/OQ entries, exact design states, source and tests. Reuse verified reads already in this conversation.
5. Missing/stale map: use direct scoped search. For authorized writes, refresh with `npm run map:update`; read-only audits report drift without updating.

## Task routing

- Page/UI: query Page ID; inspect template, fixture, feature, style candidates, design candidates, desktop brief and test references.
- Shared component/token: query its path/name; reverse results list possible consumers. Validate conditions before selecting regression scope.
- Git/tooling/docs: inspect affected config/tool and [Git workflow](../GIT_WORKFLOW.md); UI handoffs are conditional.
- Assigned phase: read current phase gate and package, with [phase runner](../../.agents/skills/rival-phase-runner/SKILL.md). No automatic next phase.
- MVC: [migration guidance](../ASP_NET_MVC_MIGRATION_MAP.md); targets are planned. Backend source is unavailable.

## Canonical entry points

- [Templates](../../src/Views/), [CSS](../../src/wwwroot/css/app.css), [features](../../src/wwwroot/js/app.js), [mock boundary](../../src/wwwroot/js/core/api.js).
- [Design manifest](../../design-export/MANIFEST.json), [canonical tokens](../../design-export/design-system-v2/tokens/tokens.json), [generator](../../tools/lib/design-system.mjs), [component ownership](../COMPONENT_REUSE_MATRIX.md).
- [Tests](../../tests/), [QA gates](QA_CHECKLIST.md), [desktop briefs](../../docs-work/desktop-layouts/).

Session handoff: authorized scope; Page IDs/paths; effective DEC/OQ and approvals; verified reads/checks; unresolved gaps; next action. Link evidence instead of copying histories.
