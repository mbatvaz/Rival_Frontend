# Customer section entry and active desktop navigation

## Authority and scope

DEC-067 follows the owner's attached active-home link and direct motion instructions. It extends the accepted dashboard composition; no new page is invented. Source: [customer motion](../src/wwwroot/css/05-utilities/customer-motion.css), [home template](../src/Views/Customer/Home/Index.njk), [shared desktop links](../src/Views/Shared/_CustomerDesktopNav.njk). The active background applies to this shared customer sidebar; staggered variable content currently applies to implemented CUS-01. Booking's accepted opaque main/navigation behavior remains unchanged.

## Motion record

- Trigger: document entry, including keyboard link activation. No extra route handler, navigation wait or runtime dependency.
- Desktop active link: unchanged anchor geometry, icon and label; a decorative isolated pseudo-element scales X from 0 to 1 with physical-right transform origin. Standard easing and duration-slow (380ms), no overshoot.
- Variable sections: personal notice first, then upcoming appointments, waiting payments, balance, recurring, availability, salon announcement. Delay increments duration-fast (140ms), last starts at 840ms; duration-slow (380ms). Appointment/payment cards no longer animate independently inside their entering section.
- At 1024px and above: opacity 0→1 only. Below 1024px: opacity 0→1 and translateX(-space-6)→none, a local 24px offset, not viewport-width displacement. Header, desktop sidebar, mobile dock and entire main do not translate or fade.
- Reduced motion: disable all new animations, show final content/bar immediately, including a live preference change. Static CSS and ordinary links remain usable without JavaScript/animation APIs.
- Interruption: CSS owns entry; replacing the document discards it, with no pending navigation promises or per-frame JavaScript. Resize selects the current desktop/mobile animation. Existing More cancellation/focus lifecycle and dock latest-selection behavior remain.
- Budget: only opacity/transform animate; no layout reads/writes or scroll handler added in production. No FPS, frame-time or physical-device performance claim. Deterministically paused native CSS animations inspect start/mid/end frames; screenshots at DPR 1 cover 390×900, 768×900 and 1280×900.

## Verification and comparisons

Compared with the owner's motion request and the existing accepted static layout:

1. Desktop bar begins at its right edge and widens without translating the link, icon or label.
2. Desktop upcoming/payment sections have distinct ordered delays and no transform keyframes; card geometry stays as in the accepted brief.
3. Mobile/tablet section start frames are translucent at a -24px local X offset, rather than bringing the whole page from outside the viewport.
4. Header/sidebar/dock/main have no own entry animation; existing right-menu alignment across actual home/booking navigation is preserved through 2560px.
5. Reduced-motion end frames preserve the same text, photos, sections, mobile rails and navigation, with opacity 1 and transform none immediately.

Tests: [motion frames](../tests/phase04/section-motion.spec.mjs), [updated owner-feedback behavior](../tests/phase04/owner-feedback.spec.mjs), home states/axe/keyboard, shell alignment and booking no-flash regression. Initial new test failures were test instrumentation: floating-point delay precision and pseudo-element animation enumeration; corrected by rounding milliseconds and including pseudo-element descendants. The production CSS passed the frame checks. Root related suites passed in focused runs; subpath results and final screenshots are recorded in the completion note. Full-phase acceptance and physical-device testing remain pending. Screenshot directory: tests/screens/phase04-motion/{root,subpath}/.

Completion: final root suite 32/32 passed; subpath broad suite 32/32 passed, followed by 16/16 home/motion checks after constraining the transient mobile horizontal overflow. Mobile home now clips only the overflow outside its canvas during entry; native rails retain their own horizontal scrolling. Final lint and build passed. Root output restored. Fresh mobile/desktop entry and reduced-motion screenshots were opened and inspected: fixed chrome stays visible, incoming content is staged, the active background grows from the right, and final layout matches the accepted static view. No production per-frame script or new dependency was added.
