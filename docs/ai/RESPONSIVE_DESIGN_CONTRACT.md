# Responsive procedure

Numeric policy stays in [contract §6](../RIVAL_PROJECT_CONTRACT.md): mobile below 768, tablet 768–1023 centered up to 720px, deliberate desktop from 1024 with approximately 1200px content unless an approved page exception exists. These are contract values, not tokens.json breakpoint/container tokens.

Mobile normally uses 390 CSS pixels. Verify canvas dimensions and capture scale: a 780px screenshot may be 2× mobile, not desktop.

Invariants: content/hierarchy, approved copy/assets, primary CTA, semantics/data relationships, states, identity, accessibility meaning and logical task/keyboard order.

Adaptations: columns, stacking, panel grouping, navigation, container/gutter, density, token-based type/spacing and source-backed crop. Record content problem, layout, breakpoint, tokens, reason, accessibility/performance impact and deviation. Keep required content/actions available.

Read actual desktop references where present. Otherwise infer from real content/design-system rules, record in the [decision index](RESPONSIVE_DECISION_LOG.md), and obtain owner review of the existing [page brief](../../docs-work/desktop-layouts/) before implementation. The index does not duplicate/approve briefs.

Prefer Grid/Flexbox, min-width queries, minmax, clamp, aspect-ratio and picture/srcset when sources exist. Container queries may adapt a component's available inline size; name the container, keep usable base/fallback layout, avoid a second breakpoint vocabulary. JS media queries are for interaction/capability differences only.

Forms may use columns when grouping/DOM order remain logical. Preserve table semantics; controlled horizontal overflow needs evidence, and tables must not become arbitrary cards. Card grids use minimum usable width. Navigation adapts structure while retaining route priority.

Test 390/768/1280 plus 320/375/1024/1440 and both sides of changed breakpoints; record height/DPR. Check RTL, wrapping, long Persian labels, zoom/keyboard, crop/density/whitespace, focus and overflow. Only the approved mobile BK-REC01 editor may scroll internally with visible header. Horizontal rails need evidence and accessible controls.
