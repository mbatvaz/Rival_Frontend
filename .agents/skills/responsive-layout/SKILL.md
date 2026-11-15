---
name: responsive-layout
description: Specify or implement Rival responsive behavior for an assigned page, separating mobile reference fidelity from desktop composition and CSS adaptation.
---

# Responsive layout

Read [responsive procedure](../../../docs/ai/RESPONSIVE_DESIGN_CONTRACT.md), exact mobile evidence and current page brief. Use the [responsive spec](../../../docs/ai/templates/responsive-page-spec.md) to record invariants, tablet/desktop/wide layouts, container, gutter, order/visibility, crop, interaction, focus and RTL.

Distinguish an actual desktop source from inference. Record content problem, layout choice, tokens/breakpoint, reason and accessibility/performance effect in the decision index by linking the single page brief. Owner review of a new desktop composition remains required before implementation; existing approval persists.

Use CSS Grid/Flexbox and existing min-width policy; container queries require named containment and base fallback. Never branch JS solely for layout. Check RTL, long-label wrapping, overflow, source-backed rails, intermediate widths and breakpoint neighbors. Output spec, source/approval evidence, scoped changes and responsive checks without assigning a new product phase.
