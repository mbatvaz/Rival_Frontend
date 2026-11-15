---
name: rival-visual-qa
description: Validate Rival pages visually and functionally at mobile, tablet, and approved desktop layouts using Playwright, screenshots, axe, keyboard checks, and route/state coverage. Use after a page or shared component is implemented or changed.
---

# Rival Visual QA

## Required inputs
- Read `AGENTS.md`, `docs/RIVAL_PROJECT_CONTRACT.md`, `docs/TRACEABILITY.md`, and the relevant Page/Component handoff.
- Identify the canonical artboard and all meaningful states from `design-export/MANIFEST.json` and the handoff.
- For desktop, read the owner-approved `docs-work/desktop-layouts/<PAGE-ID>.md`.

## Viewports
- 390px: compare against the exact mobile artboard and record deviations.
- 768px: tablet adaptation; verify no unintended overflow and enforce the documented scroll exception only for the mobile BK-REC01 editor.
- 1280px: validate against the approved desktop layout brief, not by stretching or pixel-comparing the 390px artboard.
- Add 320/375/1024/1440 and intermediate/breakpoint-neighbor widths for affected responsive behavior. Record width, height and DPR; source image pixels may be 2x CSS pixels.

## Checks
1. Capture full-page screenshots for every required state.
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
- Record >=5 source-versus-runtime comparisons, not just screenshot filenames. Use the [visual report](../../../docs/ai/templates/visual-qa-report.md) and [responsive report](../../../docs/ai/templates/responsive-qa-report.md). Automated assertions are not pixel-fidelity evidence. Separate emulation from physical-device retesting.
