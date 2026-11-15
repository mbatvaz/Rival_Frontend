---
name: motion-interaction
description: Specify, implement or audit Rival animation and interaction timing when motion, interruption, reduced-motion behavior or animation performance is part of the requested change.
---

# Motion interaction

Read [motion contract](../../../docs/ai/MOTION_SPEC.md), exact component/state evidence and [dependency policy](../../../docs/ai/DEPENDENCY_POLICY.md). Complete the [motion record](../../../docs/ai/templates/motion-spec.md) with trigger/states/timing, interruption/cancellation, navigation, reduced motion, fallback and measured performance budget.

Choose native CSS before native animation APIs; capability-detect View Transitions and retain ordinary navigation. Assess libraries only for demonstrated unmet need. Reuse existing sheet/navigation lifecycle and token names; do not add parallel handlers or reinterpret existing raw durations as approved tokens.

Test mobile/desktop, normal/reduced motion, keyboard activation, rapid repeated input, close/reopen and navigation interruption. Check static fallback preserves meaning/focus and animation uses transform/opacity without layout thrashing. Output spec, library decision, actual traces/observations/screenshots and remaining deviations; no invented performance score.
