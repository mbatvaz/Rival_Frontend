# Skill registry

This registry covers the active local skills. The original external evaluation is available in Git history. Repository skills live in [.agents/skills](../../.agents/skills/); no duplicate .codex tree, override or global installation was created. Local instructions are project-authored and governed by repository terms; no separate third-party license is asserted.

## Local triggers and outputs

- [rival-context](../../.agents/skills/rival-context/SKILL.md): unclear task paths/ownership, map maintenance or concise handoff. Uses the [navigation index](PROJECT_INDEX.md); unnecessary when relevant paths are already verified.

- [rival-phase-runner](../../.agents/skills/rival-phase-runner/SKILL.md): assigned PHASE_01–09; scope/dependency/desktop gates and phase report. Preserves owner phase acceptance.
- [rival-visual-qa](../../.agents/skills/rival-visual-qa/SKILL.md): changed page/shared component; browser/axe/keyboard/routes and screenshot report. Owns the common QA workflow.
- [rival-mvc-compatibility](../../.agents/skills/rival-mvc-compatibility/SKILL.md): Phase 09 or explicit MVC review only; readiness/port guide. No backend creation.
- [frontend-fidelity](../../.agents/skills/frontend-fidelity/SKILL.md): source/runtime comparison; >=5 observations and mismatch/deviation report.
- [design-system-governance](../../.agents/skills/design-system-governance/SKILL.md): shared component/token changes; reuse/ownership/magic-value findings.
- [design-source-audit](../../.agents/skills/design-source-audit/SKILL.md): evidence audit or unclear references; inventory/source map/conflicts.
- [responsive-layout](../../.agents/skills/responsive-layout/SKILL.md): mobile composition, wider adaptation and existing desktop approvals where applicable.
- [responsive-visual-qa](../../.agents/skills/responsive-visual-qa/SKILL.md): responsive validation; width/state screenshots and defect report, using common Rival QA gates.
- [frontend-testing-debugging](../../.agents/skills/frontend-testing-debugging/SKILL.md): failing route/flow or browser validation; reproduction, checked interaction, console/errors and QA report.
- [motion-interaction](../../.agents/skills/motion-interaction/SKILL.md): motion change/audit; interruption/reduced-motion/fallback/performance spec and evidence.

Dependencies: existing Node tooling, Playwright/axe and exact local design sources; browser inspection tools where available. No npm/global dependencies added. Skills link to common contracts instead of embedding copies. Use only the relevant skills for a task. Frontmatter/link checks are structural, not behavioral proof.

## Context-efficient activation — 2026-11-16

Discovery uses names/descriptions; bodies load only when selected. Read relevant sections once per unchanged context, not every linked document. The root router and [index](PROJECT_INDEX.md) select inputs; the graph is derived navigation, not authority. Do not load its entire JSON into a conversation.

Common UI QA belongs to rival-visual-qa. Fidelity adds exact-source analysis; responsive QA adds affected widths; debugging reproduces actual failures; motion adds lifecycle checks. Reuse valid evidence for the same revision/scope and rerun only invalidated checks. Full phase gates remain required. Source audit regenerates reports only for an authorized refresh. These changes preserve all ten previous skills and add one navigation entry point; no external skill is installed.

External map/tool evaluation and validation are in the [context report](../../docs-work/CONTEXT_OPTIMIZATION_REPORT_FA.md). Local instructions are project-authored; no third-party code was copied. The following evaluation is historical evidence from 2026-11-14, not a statement of current plugin availability.


## Authoring references

Local skills use short name/description frontmatter and progressive references. Checked against [official skill documentation](https://developers.openai.com/plugins/concepts/skills) and [AGENTS guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md). A root AGENTS.override.md was not created because no override scope exists and duplicating/replacing root guidance would add ambiguity.
