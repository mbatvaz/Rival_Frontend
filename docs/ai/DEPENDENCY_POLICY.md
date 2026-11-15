# Dependency decisions

The [contract](../RIVAL_PROJECT_CONTRACT.md) forbids frontend frameworks/UI kits, preprocessors/bundlers and hosting runtimes. Assessment does not override prohibitions; stack exceptions need explicit owner instruction.

Before adding a compatible package record exact need/pages, native alternative, package/pinned revision, license/transitives, compressed size and measurement source, performance, accessibility, testability, maintenance/docs, browser support, MVC/Razor/static compatibility, fallback/removal plan and checks. Unknown license/size stays unknown and blocks vendoring.

Motion order: CSS, Web Animations, supported View Transitions, then justified Motion or GSAP/ScrollTrigger assessment. Do not add smooth-scroll/carousel/chart/utility libraries without task evidence. Native rail/sheet/OTP modules already exist.

## Existing packages

All are dev dependencies in [package](../../package.json), resolved by [lockfile](../../package-lock.json): Nunjucks build-time rendering; Playwright/axe browser QA; ESLint/Stylelint with existing configs. No production JS dependency or CSS bundler.

## 2026-11-14 decision

Phase 01–02 refresh also adds no dependencies. CSS animations plus the native Web Animations API satisfy the demonstrated interactions. The cross-document View Transition opt-in is disabled after a skipped-transition error in fallback validation; no library is required to preserve navigation. See the [refresh evidence](../../docs-work/PHASE_01_02_REFRESH_FA.md).

No npm dependencies, external skill code, global installs or plugin connections added. Audit/validation helpers use Node built-ins. External sources and local replacements are documented in [registry](SKILL_REGISTRY.md); unverified licenses/revisions are not invented.
