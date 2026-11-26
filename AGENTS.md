# Rival engineering instructions

Follow the owner request and [project contract](docs/RIVAL_PROJECT_CONTRACT.md). Rival is a Persian RTL static frontend for future ASP.NET Core MVC.

- Start at the supplied file, selector or route. For unknown paths run `npm run -s task:context -- PAGE-ID` once. Add `--reuse ACCEPTED-PAGE-ID` for a known reference implementation. Use the [reuse map](docs/COMPONENT_REUSE_MATRIX.md#implemented-reuse) before writing a new component.
- For shared changes find actual consumers with scoped `rg` or `map:query -- <term> --compact`. Batch reads and keep full logs, graphs and screenshots local. See [routing](docs/ai/PROMPT_ROUTING.md) for annotations and focused probes.
- For an assigned phase use the [phase runner](.agents/skills/rival-phase-runner/SKILL.md) and the [owner gate](docs/PHASE_PLAN.md#current-owner-gate). In phases 05–09, design at 390px, adapt the same structure to wider viewports, and reuse a right-hand role menu from tablet width for stylist/admin. [Responsive contract](docs/RIVAL_PROJECT_CONTRACT.md#6-responsive-and-desktop-design-contract)
- Edit `src/` with Nunjucks, CSS and ES modules. Preserve RTL, tokens, keyboard/focus, Razor/forms, base paths and the [API boundary](src/wwwroot/js/core/api.js). Read the exact affected design state. Keep exports read-only and resolve permission/money rules through the project decisions.
- Reuse the [Phase 04 loading and motion defaults](docs/RIVAL_PROJECT_CONTRACT.md#loading-and-motion-defaults) in every phase. Apply an exception when the owner explicitly asks for one.
- Run `npm run -s qa:affected` once for changed inputs. Limit verification to task-owned files and reuse valid evidence. Use `--full` for phase acceptance or verified global impact. [QA routing](docs/ai/PROMPT_ROUTING.md#local-qa-for-all-phases)
- Preserve unrelated changes and manual [review approvals](preview-review/). Follow the [Git workflow](docs/GIT_WORKFLOW.md) and obtain authorization for push, deploy or edits outside the repo. Record actual checks and stop at the owner gate.
