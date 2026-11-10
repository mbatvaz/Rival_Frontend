# 00b — Architecture Alignment and Gap Merge

```text
Read root AGENTS.md and docs/RIVAL_PROJECT_CONTRACT.md first.
Compare the current contract against:
- docs/ARCHITECTURE.md
- docs/DECISION_LOG.md
- docs/OPEN_QUESTIONS.md
- docs/DESIGN_SYSTEM_EXTRACTION.md
- docs/references/canonical/Frontend_Architecture.md
- docs/references/canonical/Design_Common.md
- docs/references/handoff/Rival_Design_Handoff_08.md
- docs/PHASE_PLAN.md
- all nine phase README/CODING_AGENT_PROMPT/SOURCE_MAP files.

Do not duplicate the existing inventories. The canonical Page Inventory,
Component Reuse Matrix, Route Graph, Traceability, Asset Audit and File Audit
already exist. Compare them, add only missing evidence, and keep one canonical
technical contract in docs/RIVAL_PROJECT_CONTRACT.md.

Specifically verify all owner decisions recorded 2026-11-09:
- Native CSS, no Tailwind/Bootstrap/preprocessors/bundlers.
- Static-first Nunjucks build output; no Express; no Node runtime on cPanel.
- Codex replaces Claude Code; AGENTS.md is authoritative.
- Final repository paths are the ones in the contract.
- Phase 01/02 boundary; StatePage Phase 03/08 ownership;
  finance component Phase 06/08 ownership; MVC migration only Phase 09.
- Correct infrastructure acceptance for DS/RULE/ARCH.
- tokens.json canonical, production rv-* classes, Yekan Bakh normal widths only,
  local Lucide SVG icons with ri compatibility prefix.
- 44px touch targets, no nested vertical scroll, evidence-backed horizontal rails.
- Purpose-designed desktop layouts derived from mobile design language and
  owner review of per-page desktop briefs.

If any source document contains older conflicting technology instructions,
mark it historical/superseded or point it to the contract. Do not rewrite
product/business rules without evidence. Report unresolved questions separately.
Stop before Phase 01 implementation.
```
