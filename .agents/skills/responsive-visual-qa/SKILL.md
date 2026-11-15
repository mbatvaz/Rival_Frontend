---
name: responsive-visual-qa
description: Review Rival mobile, tablet and desktop screenshots, intermediate widths and layout defects after responsive behavior changes or during a responsive audit.
---

# Responsive visual QA

Read [QA checklist](../../../docs/ai/QA_CHECKLIST.md), responsive page spec and approved desktop brief. Use the existing [Rival visual workflow](../rival-visual-qa/SKILL.md) for shared browser/accessibility gates rather than recreating tests.

Run mobile 390, tablet 768 and desktop 1280; add 320/375/1024/1440 and neighbors of changed breakpoints. Record actual width/height/DPR. Compare mobile against exact state evidence and desktop against its reference/approved decision; never stretch the mobile image to assert desktop fidelity.

Inspect overflow, wrapping, crop, alignment, density, whitespace, RTL, focus order and all meaningful states. Respect only documented rail/scroll exceptions. Save fresh screenshots and complete the [responsive report](../../../docs/ai/templates/responsive-qa-report.md), clearly separating tested/unrun dimensions, adaptations, defects and acceptance. Include root/subpath results where URLs are affected.
