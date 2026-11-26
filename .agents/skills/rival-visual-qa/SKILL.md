---
name: rival-visual-qa
description: Validate Rival pages visually and functionally at mobile, tablet, and approved desktop layouts using Playwright, screenshots, axe, keyboard checks, and route/state coverage. Use after a page or shared component is implemented or changed.
---

# Rival Visual QA

## Required inputs
- Reuse active instructions and verified reads. Resolve the page/consumers through [navigation](../../../docs/ai/PROJECT_INDEX.md); inspect relevant contract/traceability/handoff sections only.
- Identify the canonical artboard and all meaningful states from `design-export/MANIFEST.json` and the handoff.
- Use the [responsive contract](../../../docs/ai/RESPONSIVE_DESIGN_CONTRACT.md). Read a desktop brief when the task affects an accepted Phase 01–04 desktop composition.

## Scope and viewports

Use the [affected QA route](../../../docs/ai/PROMPT_ROUTING.md#local-qa-for-all-phases) once. An element change needs its affected state and width. A page change needs the changed states and affected widths. Shared changes follow actual consumers. The phase checklist governs full acceptance.
- 390px: compare against the exact mobile artboard and record deviations.
- 768px: tablet adaptation; verify no unintended overflow and enforce the documented scroll exception only for the mobile BK-REC01 editor.
- 1280px: verify fit and navigation for the Phase 05–09 layout or compare an existing Phase 01–04 desktop composition to its approved brief.
- Add a boundary or intermediate width when the change affects it. Record width, height and DPR.

## Checks
Run shared checks once per affected revision/scope. Fidelity, responsive and debugging skills add specialist observations to this evidence; they do not require another identical suite/build. Recheck after changes invalidate the relevant evidence. Full phase acceptance remains mandatory.
1. Reuse captures from the selected suite. Inspect representative captures or a mismatch and capture remaining required states only when the evidence is missing.
2. Check layout, typography, spacing, token use, image crop, RTL order, and visual hierarchy.
3. Verify all controls have >=44×44px interactive hit areas.
4. Verify no nested vertical scrolling except the approved mobile BK-REC01 editor with visible header; allow only evidence-backed horizontal rails/carousels. DEC-037 permits the centered desktop PortfolioViewer from 1024px; other overlays remain bottom sheets.
5. Run axe and keyboard-only navigation; inspect visible focus, labels, errors, status messages, and disabled/loading states.
6. Check route links and no-dead-end navigation.
7. Check all documented state variants, including empty/loading/error/disabled/expired where applicable.
8. Run shared-component regression wherever a shared component changed.
9. Check route/title/nonempty content, console/page errors and failed relevant requests. Exercise the main local demo interaction; verify normal/reduced motion and unsupported-feature fallback. Cover root and subpath where relevant.

## Reporting
- Save screenshots under `tests/screens/` (ignored by Git unless owner asks to commit selected baselines).
- Record source artboard path, viewport, state, and observed difference.
- Classify findings as blocker, major, minor, or accepted design adaptation.
- Never invent a missing screenshot or artboard selector. If no exact source exists, report the gap and use the relevant handoff.
- Record at least five source-versus-runtime comparisons for new or changed compositions. Reuse documented comparisons for unchanged layouts. Use the [visual report](../../../docs/ai/templates/visual-qa-report.md) and [responsive report](../../../docs/ai/templates/responsive-qa-report.md). Separate emulation from physical-device retesting.
