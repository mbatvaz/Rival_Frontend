# Motion contract and current audit

Authority: [contract](../RIVAL_PROJECT_CONTRACT.md), [MotionSpecimens](../../design-export/design-system-v2/components/MotionSpecimens/README.md), [tokens](../../design-export/design-system-v2/tokens/tokens.json).

Durations: fast 140ms, base 240ms, slow 380ms, deliberate 700ms. Easings: ease-standard, ease-exit, ease-spring. Use existing tokens for new motion. Motion explains change, never blocks a task or conveys meaning alone.

For every animation complete the [record](templates/motion-spec.md): purpose/source, trigger, initial/final state, duration/delay/easing/stagger, interruption/reversal/cancellation, navigation cleanup, reduced motion, browser fallback, performance budget and evidence. Include keyboard activation and rapid repeated interaction.

Prefer CSS, then Web Animations; View Transitions need ordinary-navigation fallback. Motion/GSAP/ScrollTrigger require native-alternative assessment, MVC/static compatibility, license and authorized dependency change; none is installed. Prefer transform/opacity; batch reads/writes, avoid heavy scroll handlers/layout thrashing. Define a task-specific measured budget before complex motion; do not invent frame-time scores.

## Current implementation

Owner follow-up 2026-11-16 (DEC-061): booking pages keep their main content opaque during document navigation. Booking links bypass the shared pre-navigation fade and `.rv-booking[data-rv-page] > main` has no entry animation; this removes the dim/restore/blank-entry flash reported from BK-01/BK-02. Other page and sheet/viewer motion remains unchanged. [Regression evidence](../../tests/phase03/choice-navigation-flash.spec.mjs) and [report](../../docs-work/BOOKING_CHOICE_NAVIGATION_2026-11-16.md).

- [motion.css](../../src/wwwroot/css/05-utilities/motion.css): page/sheet entry duration-slow (380ms), sheet exit duration-base (240ms), scrim entry base/exit fast (140ms). Desktop PortfolioViewer uses fade/scale; mobile sheets keep bottom-edge motion. Reduced motion disables entry and closing states; content remains usable.
- [sheet.js](../../src/wwwroot/js/components/sheet.js): closing lifecycle, inert background, focus/scroll restoration. Test close/reopen, Escape, scrim and navigation interruption before changes.
- [navigation motion](../../src/wwwroot/js/components/navigation-motion.js): existing route interception; do not duplicate handlers.
- [icon generator](../../tools/generate-icon-motion.mjs): animated local icons; static SVG reduced-motion fallback is part of the approved contract.

The 2026-11-14 owner-requested Phase 01–02 refresh resolved C-05: raw shared timing values were replaced by canonical tokens. [motion.js](../../src/wwwroot/js/components/motion.js) reads CSS token timing for the short route exit and cancels on live reduced-motion changes. Routes use CSS entry and Web Animations exit; without animation APIs they navigate normally. Cross-document View Transition opt-in is currently disabled: the fallback test exposed a skipped-transition InvalidStateError. This optional enhancement is not required to preserve navigation or the visual design. See [MDN ready rejection behavior](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/ready).

Home carousel keeps its image orbit and supports keyboard, labelled >=44px indicator buttons, hover/focus suspension and reduced motion. Manual changes are announced while focused/paused; automatic changes are not live announcements. Autoplay pauses on hidden/inert pages and its timer is cleared/restarted for pagehide/bfcache.

The booking explanation plays one 6×duration-deliberate sequence when it enters view, then stays in its final static state. Reduced motion or missing IntersectionObserver keeps all labels visible without animation. Portfolio loading uses a 2×duration-deliberate transform shimmer; auth busy uses a deliberate-duration rotating local icon. Both become static with reduced motion.

Task-specific trigger/initial/final/interruption/fallback/performance records: [refresh plan](../../docs-work/PHASE_01_02_REFRESH_PLAN.md). Behavioral evidence: [carousel tests](../../tests/phase02/carousel-motion.spec.mjs), [shared motion tests](../../tests/phase02/shared-motion.spec.mjs) and [responsive boundaries](../../tests/phase02/refresh.spec.mjs). No new library or token family was introduced; no FPS score is claimed.

DEC-048 selection/calendar/gallery changes use native CSS/Web Animations/scrolling. Exact triggers, timing, stagger, cancellation, fallback and measured/unmeasured limits are in the [owner motion record](../../docs-work/OWNER_FEEDBACK_2026-11-14.md).
