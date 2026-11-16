# Frontend architecture guide

Authority: [contract](../RIVAL_PROJECT_CONTRACT.md). MVC mappings: [existing migration map](../ASP_NET_MVC_MIGRATION_MAP.md). This guide routes work to actual code rather than redefining architecture.

- [Views](../../src/Views/): restricted Nunjucks layouts, shared components and pages. Variables, if/else, for, include, extends/block and mapped faDigits/jalali become Razor models, conditions, foreach, partials, layouts/sections and helpers. Retain antiforgery markers; no custom macros/runtime templating.
- [MockData](../../src/MockData/): fixtures and demo request/response shapes. [api.js](../../src/wwwroot/js/core/api.js) alone accesses fixtures/storage. Features own DOM/module state; real validation remains a future server responsibility.
- [wwwroot](../../src/wwwroot/): layered native CSS, lazy ES Modules via data-rv hooks, local fonts/icons/photos. Shared modules own sheets, rails and OTP; no duplicate handlers/global store.
- [registry](../../src/page-registry.json): route/variant metadata. Build helpers normalize models and prefix URLs using [site config](../../src/site-config.json).
- [build](../../tools/build-static.mjs): static directory index routes and labelled placeholders. [design-system helper](../../tools/lib/design-system.mjs): nine generated CSS token families and approved font/icon copies.
- [static server](../../tools/serve-static.mjs): local generated output. Apache/cPanel receives only dist contents. No bundler/Node/template runtime is deployed.
- [test runner](../../tools/run-tests.mjs): builds and owns its server; subpath mode restores root output in finally. [config](../../playwright.config.mjs): Chromium; no Storybook, formatter or pixel-baseline regression command.

No .NET project exists: dotnet build/test are inapplicable. Do not add Tag Helpers, server endpoints, localization packages or backend dependencies during maintenance. Preserve Persian fixture copy, format helpers and semantic form contracts for Phase 09 handoff.

The owner-requested [review workspace](../../preview-review/) is outside product source modules. [Build adapter](../../tools/lib/preview-review.mjs) renders it and [revision tracker](../../tools/lib/review-revision.mjs) derives page versions from source/runtime content. Its private [storage module](../../preview-review/storage.js) is the only review data boundary; product data continues through core/api.js. Local preview persists manual approvals in project data through the scoped tooling endpoint; static hosting uses a snapshot/browser fallback. Both remain independent of registry acceptance.

For source/dependency navigation use the [index](PROJECT_INDEX.md). Its graph is derived and conservative; inspect source before treating candidate dependencies as runtime behavior.
