# Prompt routing and verification

Use [root instructions](../../AGENTS.md) for scope and [the current gate](../PHASE_PLAN.md#current-owner-gate) for acceptance.

## Context

- Known element or file: start there. Read the relevant selector, caller, state and active override.
- Unknown page or phase: run `npm run -s task:context -- PAGE-ID` or `npm run -s task:context -- --phase 04`. The command reads the registry and gate locally. Page lookup groups exact export paths and lists brief and test candidates. Add `--details` only for additional evidence. Resolve undecided composition against its actual mobile reference and desktop brief.
- Unknown shared consumers: use `rg` or `npm run -s map:query -- <term> --compact`. Confirm conditional consumers in source. Resolve stale candidates with scoped search.
- An annotation supplies URL, state and selector. The trusted [project hook](../../.codex/hooks.json) supplies candidates for up to four distinct targets. If needed, run `node tools/resolve-annotation.mjs '<URL>' '<selector>'` once. Verify the candidate and preserve the URL state.

Batch independent reads and cap output. Use exact headings, line ranges and source addresses rather than entire handoffs, exports, browser trees or logs. Leave screenshots on disk and inspect representative captures or a specific mismatch. Read the relevant [skills](SKILL_REGISTRY.md) once. Keep archived progress available for historical questions.

## Local QA for all phases

Run `npm run -s qa:affected` once after edits. `npm test` calls the same selector. It scopes lint and merges browser coverage. Repeat `--file <path>` when other changes are present. Use `--plan` if scope needs inspection.

- **Appearance only:** `--cosmetic --file <stylesheet>` runs scoped Stylelint and one build. Add `--url`, `--selector` and relevant `--width` values for a focused probe. For local structural CSS with one verified owner, `--element` uses the probe when graph scope agrees. `--axe` and `--screenshot` add targeted evidence.
- **Page or shared behavior:** default affected selection follows actual consumers. Literal additions to CSS imports or lazy feature registrations follow their targets when existing wiring and order are preserved. Registry notes and acceptance-only changes run root preview-variant checks. Template, fixture, variant and title changes retain page and preview coverage. Add a known dynamic consumer's spec with `--file` when needed.
- **Deployment paths:** URL-sensitive changes retain root and subpath. Scoped subpath runs keep functional tests and representative mobile/desktop visual coverage. Only audited repeat widths tagged `@root-visual` are excluded from scoped subpath runs. Tag a case only when the same states and assets have subpath coverage elsewhere in the selected suite.
- **Full acceptance or global impact:** use `--full` for both complete suites and applicable [acceptance evidence](QA_CHECKLIST.md). Unresolved consumers or missing tests require evidence before narrowing scope. Full acceptance and direct Playwright runs include all widths.

The managed runner builds each selected path and restores root output. Local tool and browser tests return concise results and store full logs locally. Reuse valid evidence and add only checks the selected suite lacks.

## Measure and hand off

Use `npm run -s task:usage -- --session <rollout.jsonl>` for the last completed turn, `--turn <id>` for a specific turn, or `--active` for the latest sample of an ongoing turn. It reads the explicit file locally and reports elapsed time, tool calls, peak sampled input and cached/uncached usage. Compare tasks with equivalent starting history and model. Keep independent work in a fresh conversation when possible and hand off only relevant references.

Record scope, verified checks, unresolved gaps and the next owner gate. Link evidence rather than copying it. Follow the [Git workflow](../GIT_WORKFLOW.md) for publication.
