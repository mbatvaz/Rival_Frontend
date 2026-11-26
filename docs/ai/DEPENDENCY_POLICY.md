# Dependency decisions

The [contract](../RIVAL_PROJECT_CONTRACT.md) forbids frontend frameworks/UI kits, preprocessors/bundlers and hosting runtimes. Assessment does not override prohibitions; stack exceptions need explicit owner instruction.

Before adding a compatible package record exact need/pages, native alternative, package/pinned revision, license/transitives, compressed size and measurement source, performance, accessibility, testability, maintenance/docs, browser support, MVC/Razor/static compatibility, fallback/removal plan and checks. Unknown license/size stays unknown and blocks vendoring.

Motion order: CSS, Web Animations, supported View Transitions, then justified Motion or GSAP/ScrollTrigger assessment. Do not add smooth-scroll/carousel/chart/utility libraries without task evidence. Native rail/sheet/OTP modules already exist.

## Existing packages

Nunjucks is build-time only. Playwright, axe, ESLint and Stylelint are dev dependencies. Runtime dependencies below are pinned in [package.json](../../package.json) and resolved by [the lockfile](../../package-lock.json). The static build uses browser ES modules and CSS directly.

## Owner-approved browser libraries

| Package | Scope and native alternative | Bytes in `dist/vendor` (gzip / Brotli) |
| --- | --- | ---: |
| `embla-carousel@8.6.0` ([MIT / source](https://github.com/davidjerleke/embla-carousel/tree/v8.6.0)) | PUB-02 PortfolioViewer and mobile/tablet BK-01/BK-02 choice rails. Replaces native horizontal scroll measurement, mouse-drag tracking and scroll settling. CSS transitions image opacity from 0.8 to 1 when centered. Booking retains the approved desktop grid from 1024px. | 11,131 / 9,850 |
| `focus-trap@7.6.5` + `tabbable@6.5.2` ([Focus Trap](https://github.com/focus-trap/focus-trap), [tabbable](https://github.com/focus-trap/tabbable), both MIT) | Shared Sheet and expanded PortfolioViewer. Replaces manual tabbable discovery and wrap-around. Sheet controls initial focus, Escape, background inertness and restoration. Both browser modules are copied locally. | 6,133 / 5,420 |
| `photoswipe@5.4.4` ([MIT / documentation](https://photoswipe.com/getting-started/)) | PUB-02 expands the selected image with pan, zoom and image navigation. The original image URL is the native link fallback. CSS loads on PUB-02 and JS loads on the first expand action. | 18,820 / 16,697 |
| `motion@14.14.0` ([MIT / JavaScript documentation](https://motion.dev/docs/quick-start)) | Mini browser build for record entrances, booking calendar and selections, confirmation progress, authentication panels, sheet/scrim/card transitions and the customer dock. Lockfile dependencies are `framer-motion@14.14.0`, `motion-dom@14.14.0`, `motion-utils@14.7.0` (MIT) and `tslib@2.9.1` (0BSD). | 5,126 / 4,700 |
| `cropperjs@2.3.1` ([MIT / source](https://github.com/fengyuanchen/cropperjs)) | Profile only. The browser bundle loads on photo selection. Replaces the unconditional downscale with interactive square cropping, keyboard pan and explicit confirmation. The previous JPEG data URL contract stays in place. The bundled custom elements are distributed under MIT. | 14,988 / 13,135 |
| `@use-gesture/vanilla@10.3.1` + `@use-gesture/core@10.3.1` ([MIT / source](https://github.com/pmndrs/use-gesture)) | Replaces manual pointer tracking for sheets and adds directional dismissal for sheets and the More drawer. Native scroll stays enabled on the orthogonal axis. Buttons, Escape and focus restoration use the existing Sheet lifecycle. The static copy resolves exact local ESM imports and sets the production guard. | 15,350 / 13,481 |

Cropper uses Custom Elements and canvas on the modern browser baseline. An unreadable or rejected photo leaves the previous draft available. Removing Cropper requires restoring a photo processor and removing the crop controls and vendor entries. Removing Use Gesture leaves tap and keyboard access via Sheet and requires removing its gesture bindings and vendored modules.

WebOTP is a native API with no package. The login and profile phone flows use one abortable SMS request per challenge and retain manual entry and `autocomplete="one-time-code"`. A production sender must use the origin-bound SMS format on HTTPS. [Chrome integration reference](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/sms-otp-form).

Sizes are per-file sums measured by Node `gzipSync` and `brotliCompressSync` on emitted assets. The build copies pinned artifacts and license notices without a CDN or bundler. Keep the `vendor/` directory alongside `js/` and `css/` when moving static assets into Razor `wwwroot`. The supported baseline is the project's modern browser baseline for modules, observers, Pointer Events and `inert`. Existing carousel and dialog tests cover RTL navigation, reduced motion, Escape and focus return. The native rail styling and image links provide the gallery fallback. To remove a library, restore the corresponding native adapter or keep the image-link fallback, then remove its manifest entry, build mapping and lockfile dependency.

Motion uses the upstream DOM Mini distribution through a local ES module export. The app needs no React peer. Entrance and sheet effects use transform and opacity. Browsers without Web Animations render final states and the hold timer remains usable with touch, mouse or keyboard. To roll back Motion, restore the previous animation adapter and keep the shared hold timer.

## 2026-11-14 decision

Phase 01–02 refresh also adds no dependencies. CSS animations plus the native Web Animations API satisfy the demonstrated interactions. The cross-document View Transition opt-in is disabled after a skipped-transition error in fallback validation; no library is required to preserve navigation. See the [refresh evidence](../../docs-work/PHASE_01_02_REFRESH_FA.md).

No npm dependencies, external skill code, global installs or plugin connections added. Audit/validation helpers use Node built-ins. External sources and local replacements are documented in [registry](SKILL_REGISTRY.md); unverified licenses/revisions are not invented.
