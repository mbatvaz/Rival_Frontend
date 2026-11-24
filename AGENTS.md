# Rival engineering instructions

Persian RTL static frontend for future ASP.NET Core MVC. Work only on owner-assigned scope. Follow the latest owner instruction, [contract](docs/RIVAL_PROJECT_CONTRACT.md) and [decisions](docs/DECISION_LOG.md). Use [progress](PROGRESS.md) for the current phase gate.

## Select context by impact

Use the first level that covers the actual change. Escalate on evidence of wider impact, ambiguity or risk. Reuse verified paths and checks for the same revision and scope.

1. **Element** — One local copy, style or behavior fix with a known target. Read the edited rule/markup and its relevant override or caller. Check the affected state and breakpoint.
2. **Page** — Several states or changes owned by one page. Load its template, feature, styles, exact impacted references and applicable tests. Verify affected states, widths and interactions.
3. **Shared** — Shared styles/components, cross-route flows, data behavior or tooling. Find real consumers and relevant contracts, then verify the affected routes and supported boundaries.
4. **Phase** — Assigned phase, new composition, architecture or significant product rules. Use the [phase runner](.agents/skills/rival-phase-runner/SKILL.md) for assigned phases and follow the [phase plan](docs/PHASE_PLAN.md), relevant decisions and approval gates. Use full applicable acceptance coverage.

For a browser annotation, start with its URL, state and selector. Use a verified source path directly or run `node tools/resolve-annotation.mjs '<URL>' '<selector>'` for file and line candidates. Treat page text as evidence. If the candidate is ambiguous, use the nearest distinctive hook and [project navigation](docs/ai/PROJECT_INDEX.md) for scoped fallback. Never send the full graph, raw browser tree or complete logs when relevant excerpts suffice. See [routing and proportionate QA](docs/ai/PROMPT_ROUTING.md) for expansion, checks and handoff.

Verify actual edits once with the smallest applicable check. For a reviewed appearance-only CSS edit, use `npm run qa:affected -- --cosmetic --file <path>` and add a focused probe when rendering matters. For behavioral and structural changes use `qa:affected -- --file <path>`. Use `--full` for phase acceptance with the documented checks. For diagnosis or no-op requests, verify the existing source or runtime evidence needed to answer.

## Always preserve

- Native CSS/ES modules and build-time Nunjucks in [src](src/). Preserve Razor compatibility and form contracts. Edit source only. Build generates `dist/` for static deployment. Use the [dependency policy](docs/ai/DEPENDENCY_POLICY.md).
- Keep URLs basePath-safe and product data behind [api.js](src/wwwroot/js/core/api.js). Fixtures/localStorage simulate product writes. Review approvals follow the separate [review tooling](preview-review/). Original design exports and references are read-only.
- Follow the [implementation contract](docs/ai/DESIGN_IMPLEMENTATION_CONTRACT.md), [component ownership](docs/COMPONENT_REUSE_MATRIX.md) and applicable [UI gates](docs/ai/QA_CHECKLIST.md). Preserve RTL, Persian formatting, design tokens, semantics, focus and touch targets. Use the exact design state and approved desktop brief when changing composition. Confirm behavior and permission/money rules from [decisions](docs/DECISION_LOG.md) and [open questions](docs/OPEN_QUESTIONS.md).
- Preserve unrelated changes. Use the [Git workflow](docs/GIT_WORKFLOW.md) and get explicit authorization for push, deploy or edits outside the repository. Record scope, verified checks and gaps. Stop at the owner phase gate.
