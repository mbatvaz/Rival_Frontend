# Responsive procedure

Use [contract §6](../RIVAL_PROJECT_CONTRACT.md#6-responsive-and-desktop-design-contract). For phases 05–09, verify the 390px composition at small widths, switch the Stylist/OwnerAdmin navigation to the right-hand list at 768px, and let the same content and tablet shell expand at desktop widths. Preserve DOM order and reuse layout CSS and components across widths.

Mobile normally uses 390 CSS pixels. Verify canvas dimensions and capture scale: a 780px screenshot may be 2× mobile, not desktop.

Invariants: content/hierarchy, approved copy/assets, primary CTA, semantics/data relationships, states, identity, accessibility meaning and logical task/keyboard order.

Adapt using widths, gutters, wrapping and source-backed crop. Preserve content, actions and component order. Record evidence for the adaptations the task changes.

For an existing Phase 01–04 desktop composition, use its [approved brief](../../docs-work/desktop-layouts/) and the [decision index](RESPONSIVE_DECISION_LOG.md) when the task touches that composition.

Prefer Grid/Flexbox, min-width queries, minmax, clamp, aspect-ratio and picture/srcset when sources exist. Container queries may adapt a component's available inline size; name the container, keep usable base/fallback layout, avoid a second breakpoint vocabulary. JS media queries are for interaction/capability differences only.

Preserve form grouping and table semantics. Controlled horizontal overflow needs evidence. Navigation retains role permissions, route priority, active state and keyboard access.

Test 390/768/1280 plus 320/375/1024/1440 and both sides of changed breakpoints; record height/DPR. Check RTL, wrapping, long Persian labels, zoom/keyboard, crop/density/whitespace, focus and overflow. Only the approved mobile BK-REC01 editor may scroll internally with visible header. Horizontal rails need evidence and accessible controls.
