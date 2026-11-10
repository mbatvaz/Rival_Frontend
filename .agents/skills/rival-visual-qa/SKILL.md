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
- 768px: tablet adaptation; verify no unintended overflow and no nested vertical scrolling.
- 1280px: validate against the approved desktop layout brief, not by stretching or pixel-comparing the 390px artboard.

## Checks
1. Capture full-page screenshots for every required state.
2. Check layout, typography, spacing, token use, image crop, RTL order, and visual hierarchy.
3. Verify all controls have >=44×44px interactive hit areas.
4. Verify no nested vertical scrolling; allow only evidence-backed horizontal rails/carousels.
5. Run axe and keyboard-only navigation; inspect visible focus, labels, errors, status messages, and disabled/loading states.
6. Check route links and no-dead-end navigation.
7. Check all documented state variants, including empty/loading/error/disabled/expired where applicable.
8. Run shared-component regression wherever a shared component changed.

## Reporting
- Save screenshots under `tests/screens/` (ignored by Git unless owner asks to commit selected baselines).
- Record source artboard path, viewport, state, and observed difference.
- Classify findings as blocker, major, minor, or accepted design adaptation.
- Never invent a missing screenshot or artboard selector. If no exact source exists, report the gap and use the relevant handoff.
