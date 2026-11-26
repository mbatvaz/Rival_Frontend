---
name: responsive-visual-qa
description: Review Rival mobile, tablet and desktop screenshots, intermediate widths and layout defects after responsive behavior changes or during a responsive audit.
---

# Responsive visual QA

Use [navigation](../../../docs/ai/PROJECT_INDEX.md) for the page and affected consumers. Read relevant QA/page-spec/brief sections not already verified. Extend the [shared visual workflow](../rival-visual-qa/SKILL.md) with affected width/boundary observations; reuse valid captures and checks for the unchanged revision instead of running identical suites again.

Use the widths and source evidence in the [responsive and QA contracts](../../../docs/ai/RESPONSIVE_DESIGN_CONTRACT.md). Add neighbors of changed breakpoints, record width/height/DPR, and verify Phase 05–09 layouts at desktop width for fit and usability.

Inspect overflow, wrapping, crop, alignment, density, whitespace, RTL, focus order and all meaningful states. Respect only documented rail/scroll exceptions. Save fresh screenshots and complete the [responsive report](../../../docs/ai/templates/responsive-qa-report.md), clearly separating tested/unrun dimensions, adaptations, defects and acceptance. Include root/subpath results where URLs are affected.
