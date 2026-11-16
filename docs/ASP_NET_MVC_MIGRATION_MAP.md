# ASP.NET Core MVC Migration Map

The source-to-MVC contract is defined in `RIVAL_PROJECT_CONTRACT.md`. This table is the implementation handoff.

| Frontend reference source | MVC destination | Notes |
|---|---|---|
| `src/Views/Shared/_Layout.njk` | `Views/Shared/_Layout.cshtml` | Keep shell regions and section names. |
| Historical proposal `_HeaderDesktop.njk` (not present) | `_HeaderDesktop.cshtml` (planned) | Inspect current `src/Views/Shared/_HeaderPublic.njk` and `_RoleLayout.njk`; no direct implemented source with the proposed name. |
| Historical proposal `_BottomNav.njk` (not present) | `_BottomNav.cshtml` (planned) | Current navigation source: `src/Views/Shared/_RoleNav.njk`; destination naming remains a Phase 09 decision. |
| Historical proposal `_SheetHost.njk` (not present) | `_SheetHost.cshtml` (planned) | Current hosts are composed in layouts and `src/Views/Booking/Index.njk`; behavior is in `src/wwwroot/js/components/sheet.js`. |
| `src/Views/Shared/Components/*` | `Views/Shared/Components/*` | One partial per canonical component. |
| `src/Views/<Area>/<Controller>/<Action>.njk` | Same route path, `.cshtml` | Convert only the restricted Razor-mappable subset. |
| `src/MockData/*.json` | ViewModels / API contracts | Replace fixture loader with server model and real endpoints. |
| `src/wwwroot/**` | `wwwroot/**` | Copy without changes. |
| `dist/**` | Not ported | Static preview/deployment output only. |
| `tools/**`, Nunjucks build-time renderer, local static server | Not ported | Development tooling only. |
| `core/api.js` mock adapter | MVC endpoints / fetch adapter | Preserve URL and JSON shapes where approved. |

## Suggested Areas

`Public`, `Auth`, `Customer`, `Stylist`, `Admin`. OwnerAdmin remains one Area/shell; Scope is query/form data, not a second role.

## Required server helpers

`FaDigits`, `Jalali`, antiforgery token, permission-aware route guard, and server-side model validation. Client validation improves feedback but cannot replace server validation.

## Port order

1. Copy `src/wwwroot/**` into ASP.NET `wwwroot/**`.
2. Convert shared partials and layout.
3. Convert page Views and their ViewModels from MockData shapes.
4. Replace the static mock adapter with real MVC endpoints.
5. Move authorization, validation, availability, booking, payment, and transaction rules server-side.
6. Run visual/a11y regression at 390/768/1280 and the approved desktop compositions.

`dist/` is never the source of truth for MVC conversion. Convert from `src/Views/`, `src/wwwroot/`, and `src/MockData/`.
