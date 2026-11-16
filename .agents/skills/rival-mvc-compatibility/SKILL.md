---
name: rival-mvc-compatibility
description: Audit and prepare the Rival frontend source for ASP.NET Core MVC / Razor handoff. Use only during Phase 09 or when the owner explicitly requests an MVC compatibility review.
---

# Rival MVC Compatibility

## Read first
- Resolve affected frontend paths through [navigation](../../../docs/ai/PROJECT_INDEX.md); reuse verified reads. Graph MVC destinations are planned conventions, not existing backend files. Read only the relevant mapping/contract sections before expanding to a full requested audit.
- `docs/RIVAL_PROJECT_CONTRACT.md` §3.4 and §9.
- `docs/ASP_NET_MVC_MIGRATION_MAP.md`.
- `docs/TRACEABILITY.md`, `docs/PAGE_INVENTORY.md`, `docs/COMPONENT_REUSE_MATRIX.md`.
- All relevant `src/Views/`, `src/wwwroot/`, `src/MockData/`, and API adapter contracts.

## Audit rules
- Port from source (`src/Views`, `src/wwwroot`, `src/MockData`), never from generated `dist/`.
- Verify every Nunjucks construct has an explicit Razor mapping: variables, if/else, loops, include/partial, extends/layout/sections, faDigits, jalali, antiforgery.
- Flag custom macros, unmapped filters, dynamic template execution, inline scripts/styles, hard-coded route paths, and runtime-only assumptions.
- Verify static mock writes are not mistaken for real business operations.
- Verify authorization, validation, availability, booking, payment, and transaction integrity remain server-side.
- Verify `src/wwwroot/**` can be copied into ASP.NET `wwwroot/**` without changing asset URLs.
- Identify the required Areas, Controllers, Views, ViewModels, endpoints, helpers, and antiforgery points.

## Output
Create/update `docs-work/ASP_PORT_GUIDE.md` with:
1. Area/Controller/View mapping by Page ID.
2. Shared layouts and partials.
3. ViewModel shapes derived from MockData fixtures.
4. Endpoint/API adapter replacement map.
5. Helper mappings and antiforgery requirements.
6. Authorization and server-side validation boundaries.
7. Ordered migration checklist and regression requirements.

Do not begin the actual ASP.NET application build unless the owner explicitly requests it. Phase 09 is a handoff/readiness phase, not an automatic backend implementation.

The current [architecture guide](../../../docs/ai/FRONTEND_ARCHITECTURE.md) identifies the static source and build boundaries. Do not run dotnet commands or claim Tag Helpers/server localization are implemented in a repository without a .NET project. An infrastructure/documentation audit alone does not activate Phase 09.
