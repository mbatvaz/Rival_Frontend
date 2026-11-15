# Skill registry

Reviewed 2026-11-14. Repository skills live only in [.agents/skills](../../.agents/skills/); no duplicate .codex skill tree, root override or global installation was created. Local additions are original project instructions, version 1 in this Git diff, governed by repository terms; no separate license is asserted.

## Local triggers and outputs

- [rival-phase-runner](../../.agents/skills/rival-phase-runner/SKILL.md): assigned PHASE_01–09; scope/dependency/desktop gates and phase report. Preserves owner phase acceptance.
- [rival-visual-qa](../../.agents/skills/rival-visual-qa/SKILL.md): changed page/shared component; browser/axe/keyboard/routes and screenshot report. Owns the common QA workflow.
- [rival-mvc-compatibility](../../.agents/skills/rival-mvc-compatibility/SKILL.md): Phase 09 or explicit MVC review only; readiness/port guide. No backend creation.
- [frontend-fidelity](../../.agents/skills/frontend-fidelity/SKILL.md): source/runtime comparison; >=5 observations and mismatch/deviation report.
- [design-system-governance](../../.agents/skills/design-system-governance/SKILL.md): shared component/token changes; reuse/ownership/magic-value findings.
- [design-source-audit](../../.agents/skills/design-source-audit/SKILL.md): evidence audit or unclear references; inventory/source map/conflicts.
- [responsive-layout](../../.agents/skills/responsive-layout/SKILL.md): responsive spec/implementation; invariant/adaptation record and reviewed desktop brief.
- [responsive-visual-qa](../../.agents/skills/responsive-visual-qa/SKILL.md): responsive validation; width/state screenshots and defect report, using common Rival QA gates.
- [frontend-testing-debugging](../../.agents/skills/frontend-testing-debugging/SKILL.md): failing route/flow or browser validation; reproduction, checked interaction, console/errors and QA report.
- [motion-interaction](../../.agents/skills/motion-interaction/SKILL.md): motion change/audit; interruption/reduced-motion/fallback/performance spec and evidence.

Dependencies: existing Node tooling, Playwright/axe and exact local design sources; browser inspection tools where available. No npm/global dependencies added. Skills link to common contracts instead of embedding copies. Use only the relevant skills for a task. Frontmatter/link checks are structural, not behavioral proof.

## External sources evaluated

GitHub tree fetches for five deep paths initially returned restricted-fetch errors; raw GitHub source retrieval then succeeded. Nothing was installed or copied. Revisions below refer to main as fetched on review date; exact commit SHAs were not verified, so vendoring is deliberately deferred. Unknown licenses are not inferred from repository owner. Candidate assessment does not activate an external skill.

### frontend-app-builder

- [Requested source](https://github.com/openai/plugins/tree/main/plugins/build-web-apps/skills/frontend-app-builder); [read SKILL](https://raw.githubusercontent.com/openai/plugins/main/plugins/build-web-apps/skills/frontend-app-builder/SKILL.md).
- Purpose/trigger: new apps or redesign with generated concepts and browser validation. Dependencies include ImageGen/browser workflows; revision main unpinned; per-skill license not verified.
- Compatibility: design-first redesign defaults conflict with Rival's immutable approved exports. Framework scaffolding must not replace static/Razor-mappable source. React/Vite applicability requires per-task review; none adopted.
- Decision: not installed. Use local fidelity/source/layout skills. Preserve existing design rather than generate replacement concepts; any future use must override concept generation and stack assumptions.

### frontend-testing-debugging

- [Requested source](https://github.com/openai/plugins/tree/main/plugins/build-web-apps/skills/frontend-testing-debugging); [read SKILL](https://raw.githubusercontent.com/openai/plugins/main/plugins/build-web-apps/skills/frontend-testing-debugging/SKILL.md).
- Purpose/trigger: rendered frontend test/debug; Browser-first routing then permitted Playwright fallback. Dependencies: Browser plugin or Playwright. Revision main unpinned; license not verified.
- Compatibility: stack-independent validation fits MVC/static HTML. Override generic server discovery with existing static build/server/basePath; retain Rival axe/keyboard/phase gates. No React/Vite installation is needed.
- Decision: not installed; original local equivalent created with explicit user-authorized Playwright fallback. Browser plugin skill is absent in this session; existing Playwright suites provide reproducible QA.

### agent-browser

- [Requested source](https://github.com/openai/plugins/tree/main/plugins/vercel/skills/agent-browser); [read SKILL](https://raw.githubusercontent.com/openai/plugins/main/plugins/vercel/skills/agent-browser/SKILL.md).
- Purpose/trigger: website navigation/interactions/screenshots via agent-browser CLI. Dependencies: its separate CLI/browser daemon. Revision main unpinned; license not verified.
- Compatibility: rendered HTML is stack-independent; Next/Vite dev-server examples are irrelevant here. Override server/CLI assumptions with existing static Playwright tooling.
- Decision: not installed; duplicates available browser/testing capability and adds unnecessary tooling. Use existing browser tools or Playwright.

### frontend-design

- [Requested source](https://github.com/dobromirdikov/codex-frontend-design-skill/tree/main/skills/frontend-design); [read SKILL](https://raw.githubusercontent.com/dobromirdikov/codex-frontend-design-skill/main/skills/frontend-design/SKILL.md).
- Purpose/trigger: design/build/polish/redesign frontend; dependencies are task-specific asset/browser tools. Revision main unpinned. Source explicitly describes Apache-2.0 derivation; full repository/per-file license not separately verified.
- Compatibility: browser/overflow/accessibility advice applies to MVC. Creative direction, generated assets and typography choices must be overridden by Rival approved references/tokens/font. No React/Vite sections were adopted.
- Decision: not installed; local source/fidelity skills enforce existing design and avoid broad redesign triggers.

### awesome-codex-skills

- [Requested collection](https://github.com/LeorickCoder/awesome-codex-skills) was opened. It is a collection, not one installable workflow; repository page displays Apache-2.0. Individual payload licenses/revisions/dependencies remain unverified; main unpinned.
- Trigger/use: discovery only. MVC/React/Vite compatibility requires inspecting a selected payload, not the collection name.
- Decision: no bulk install; seven focused local workflows cover this assignment without importing unknown dependencies or conflicting design defaults.

### Figma plugin

- [Requested source](https://github.com/openai/plugins/tree/main/plugins/figma); [read README](https://raw.githubusercontent.com/openai/plugins/main/plugins/figma/README.md).
- Purpose/trigger: Figma frame/design-system/code-connect workflows; requires connected Figma tools and URLs/node IDs. Main unpinned; README states Figma Developer Terms and per-skill licenses, not a blanket permissive grant.
- Compatibility: source inspection can inform MVC; Code Connect/framework payloads require separate review. Do not generate replacement files or assume React/Vite bindings.
- Decision: not installed/connected. Rival's local exports are authoritative and this task supplies no Figma node request; local source audit is sufficient. Future Figma usage requires its actual source and integration availability.

## Authoring references

Local skills use short name/description frontmatter and progressive references. Checked against [official skill documentation](https://developers.openai.com/plugins/concepts/skills) and [AGENTS guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md). A root AGENTS.override.md was not created because no override scope exists and duplicating/replacing root guidance would add ambiguity.
