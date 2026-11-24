# QA checklist and evidence

Use [visual QA](../../.agents/skills/rival-visual-qa/SKILL.md) and relevant skills from the [registry](SKILL_REGISTRY.md). Exact state sources and approved desktop briefs are required for fidelity claims.

## Verification entry point

Use `npm run -s qa:affected` once. The [routing guide](PROMPT_ROUTING.md#local-qa-for-all-phases) defines scoped checks and explicit full acceptance. Use `task:context` for design paths. Render the exact board with `node tools/screenshot-artboard.mjs PAGE-ID --source <path>` when a source comparison needs it.

No .NET project, formatter, Markdown linter or pixel-baseline suite exists. The doc validator checks links/frontmatter, not Markdown style/skill behavior. Screenshot-producing tests do not assert pixel matching.

## Navigation/tooling checks

`npm run map:check` and `npm run map:query -- PAGE-ID` are read-only. `map:update` reparses changed inputs; `map:build` rebuilds the graph. Use [navigation](PROJECT_INDEX.md) first; never dump the machine graph into context. Tool-only regression: `node --test tools/tests/project-map.test.mjs`. These checks do not prove UI fidelity.

The test runner builds before every invocation; subpath mode also restores a root build. Reuse valid checks/screenshots for unchanged revision and scope. Specialists extend the common evidence rather than triggering identical builds/suites. Run focused tests during development and full required acceptance at phase gates; docs/tooling-only changes do not automatically require product browser tests.

## Browser checklist

Record route/query, title/nonempty page, no error overlay, console/page errors and relevant failed requests. Perform a real local demo interaction and check its observable result; no real external side effects.

Capture full pages and affected sheets/states with exact width/height/DPR after fonts/UI settle. Cover 390/768/1280 and affected small/boundary/intermediate widths. Cover defined loading/empty/error/success/disabled/expired states; explain nonapplicable cases. Inspect fresh screenshots and >=5 source comparisons covering copy/layout/type/palette/spacing/assets/container/motion. Normalize source image scale; no fabricated baseline/threshold.

Check RTL/wrapping/crop, no page overflow, >=44px targets, approved scroll exceptions. Run axe and keyboard-only flow, visible focus/labels, DOM order, errors/status, Escape/focus restoration, reduced motion and unsupported-feature fallback. Check image dimensions/layout shift, offscreen lazy loading, source selection and motion traces where relevant. Distinguish physical-device retest from emulation.

DEC-065 adds the exact customer More-list exception to the recurring editor: at short mobile heights, wheel/touch/keyboard scroll only `.rv-customer-more > .rv-more-list`; window scroll and footer position stay fixed. Check x=0 pinning, 100dvh containment, normal/reduced motion and resizing across 1024 during entry, exit or nested logout. The stack must close, clear inert/closing state and allow reopening. [Reproduction and coverage](../../tests/phase04/more-recovery.spec.mjs).

For shared changes enumerate consuming routes; cover root/subpath. Attach checked output/failures/screenshots in [visual](templates/visual-qa-report.md) and [responsive](templates/responsive-qa-report.md) reports. Failed/unavailable checks remain failed/unavailable; automated passes do not establish owner acceptance.
