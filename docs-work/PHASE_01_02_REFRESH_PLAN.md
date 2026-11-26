# Phase 01–02 refresh — 2026-11-14

Owner scope: re-audit accepted foundation and shell/public/auth against the new infrastructure, correct demonstrated gaps, and implement appropriate motion. Existing acceptance/desktop decisions persist. This does not assign Phase 04 or accept Phase 03.

## Plan before implementation

1. Foundation: recheck build/registry/basePath/fixture boundaries and token/font/icon extraction. Connect maintained-doc/skill checks to lint and expose a VS Code task; preserve package dependencies/static-only payload.
2. Phase 02: inspect exact Batch 1 public/auth/shell HTML, Design System MotionSpecimens/Button/Overlays and owner DEC-034..047. Preserve layouts, role permissions, OTP policy and real asset/copy provenance.
3. Normalize shared motion to existing duration/easing tokens. Reuse the sheet/navigation lifecycle; add cancellation and unsupported-API fallbacks. Desktop gallery uses a small fade/scale instead of a bottom-edge slide; other sheets retain bottom-edge motion.
4. Restore keyboard/manual selection and an explicit pause for the auto-advancing home carousel, respecting hover/focus, hidden/inert pages and reduced motion. Retain the approved image orbit, decorative indicators and swipe behavior; no return of removed arrow controls.
5. Make loading shimmer a transform animation; preserve static feedback under reduced motion. Add state-driven feedback transitions where source evidence supports them, with no layout shift or invented illustrations.
6. Add targeted behavioral tests for pause/manual operation, dynamic reduced motion, sheet cancellation/focus and normal/reduced/fallback motion. Validate fresh screenshots at 390/768/1280 and relevant boundaries. Run full lint/build and both root/subpath suites, including shared Phase 03 regression.

## Evidence and invariants

- [Phase 01 scope](../phases/PHASE_01_Foundation/README.md): DS/RULE/ARCH; no product screenshots claimed for neutral foundation pages.
- [Phase 02 package](../phases/PHASE_02_Shell_Public_Auth/README.md), [manifest](../design-export/MANIFEST.json), [MotionSpecimens](../design-export/design-system-v2/components/MotionSpecimens/README.md), [Button](../design-export/design-system-v2/components/Button/README.md), [Overlays](../design-export/design-system-v2/components/Overlays/README.md).
- Existing [desktop briefs](desktop-layouts/) remain reviewed compositions. New work changes interactions/timing, not their grid/navigation/crop hierarchy. Small accessible carousel controls stay inside the existing caption block.
- Existing source/brief BK-01 drift is outside this two-phase scope. Shared motion consumers in booking require regression, not redesign.

## Motion records

- Page entry: document navigation; opacity/one space-3 vertical offset to visible; duration-slow/ease-standard. Exit: duration-fast/ease-exit via Web Animations, cancellation on reduced motion, ordinary navigation without the API. Cross-document View Transition opt-in was removed after the unsupported-API test exposed a skipped-transition InvalidStateError; the new single path passed that test. No global error filtering was added.
- Sheet: open from bottom; duration-slow/ease-standard. Close reverses to bottom with duration-base/ease-exit, scrim duration-base then duration-fast. Repeated close is idempotent; stack restore/focus/inert/scroll ownership stays in sheet.js. Reduced motion/fallback completes immediately.
- Desktop viewer: >=1024px; opacity and scale .98 to 1, reversed on close; same token timing and lifecycle. Mobile stays bottom-attached. Scale is a component gesture, not a new token.
- Carousel: user selection/swipe/autoplay updates existing orbit transforms with duration-slow and caption fade duration-base. Dots use transform/opacity; pause/focus/hover/inert/hidden/reduced motion stop advancement. Manual selection resets the timer; no catch-up burst. Keyboard and static controls remain usable without motion.
- Loading/auth feedback: transform shimmer/spinner, durations from existing deliberate/base tokens; text remains the state source. Reduced motion: static skeleton/icon. No layout animation or scroll handler added.
- Performance acceptance: changed entry/exit and shimmer animate transform/opacity; no per-frame JS loop/DOM geometry read. Exact stylesheet timings are asserted in browser; no fabricated FPS/Lighthouse claim. Browser assertions and manual screenshot review are separate evidence.

## Final audit addition

Manual shell screenshot review exposed an accent-green booking button conflicting with Design System v2's ink booking action. The existing role-nav rule was corrected to bg-inverse, its accessible name set to «رزرو نوبت», and a mobile/desktop regression added. This is a source-backed Phase 02 correction, not a new desktop composition. Final results are in the [refresh report](PHASE_01_02_REFRESH_FA.md).
