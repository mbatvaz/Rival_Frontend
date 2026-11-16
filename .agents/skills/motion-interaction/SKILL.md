---
name: motion-interaction
description: Specify, implement or audit Rival animation and interaction timing when motion, interruption, reduced-motion behavior or animation performance is part of the requested change.
---

# Motion interaction

Locate the interaction via [navigation](../../../docs/ai/PROJECT_INDEX.md). Read relevant motion/component/state evidence not already verified; consult dependency policy only when proposing a dependency. Complete the [motion record](../../../docs/ai/templates/motion-spec.md) with trigger/states/timing, interruption/cancellation, navigation, reduced motion, fallback and measured performance budget. Add motion-specific checks to shared QA evidence instead of repeating identical suites.

Choose native CSS before native animation APIs; capability-detect View Transitions and retain ordinary navigation. Assess libraries only for demonstrated unmet need. Reuse existing sheet/navigation lifecycle and token names; do not add parallel handlers or reinterpret existing raw durations as approved tokens.

Test mobile/desktop, normal/reduced motion, keyboard activation, rapid repeated input, close/reopen and navigation interruption. Check static fallback preserves meaning/focus and animation uses transform/opacity without layout thrashing. Output spec, library decision, actual traces/observations/screenshots and remaining deviations; no invented performance score.
