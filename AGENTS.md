# Rival engineering instructions

Start directly from the owner's request. This file is the repository entry point. Rival ships a Persian RTL static frontend for future ASP.NET Core MVC. Follow the latest owner instruction, [project contract](docs/RIVAL_PROJECT_CONTRACT.md) and applicable [decisions](docs/DECISION_LOG.md).

## Start small

- **Element** with a known target: read its rule or markup, active override and affected state. For an annotation, reuse its supplied address or run `node tools/resolve-annotation.mjs '<URL>' '<selector>'`.
- **Page** with unknown paths: run `npm run -s task:context -- PAGE-ID` once. Read only the implicated template, rule, behavior, exact design state and test. Reuse verified context.
- **Shared**: find actual consumers with scoped `rg` or `map:query -- <term> --compact`. Expand only for a changed contract or unresolved ownership.
- **Phase**: use the [phase runner](.agents/skills/rival-phase-runner/SKILL.md) and `npm run -s task:context -- --phase NN`. Follow the current [owner gate](docs/PHASE_PLAN.md#current-owner-gate). Read specific requirements and handoff sections as needed.

Batch independent reads and cap output. Keep full logs, graphs, history and screenshots on disk. Retrieve relevant excerpts on ambiguity or failure. Use [routing](docs/ai/PROMPT_ROUTING.md) for details.

## Verify once

Run `npm run -s qa:affected` once after edits. Add `--file <path>` for each task-owned file if other work is present. For an appearance-only edit use `--cosmetic --file <stylesheet>` and add a focused browser probe when rendering matters. Reserve `--plan` for ambiguous selection and `--full` for full acceptance or established global impact. Reuse checks for the same inputs.

## Preserve

- Edit `src/` using native CSS/ES modules and build-time Nunjucks. Preserve Razor/form contracts, base paths and product writes through [api.js](src/wwwroot/js/core/api.js). Keep design exports and references read-only. Review approvals use [separate tooling](preview-review/).
- Follow [design implementation](docs/ai/DESIGN_IMPLEMENTATION_CONTRACT.md), [reuse](docs/COMPONENT_REUSE_MATRIX.md) and [QA](docs/ai/QA_CHECKLIST.md). Preserve RTL, Persian formatting, tokens, focus and touch targets. Composition changes need the exact state and applicable desktop approval. Resolve permission or money behavior through DEC/OQ.
- Follow the [Git workflow](docs/GIT_WORKFLOW.md), preserve unrelated changes and obtain explicit authorization for push, deploy or edits outside the repo. Record actual checks and gaps. Stop at the owner gate.
