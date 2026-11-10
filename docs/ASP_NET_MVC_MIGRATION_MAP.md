# ASP.NET Core MVC Migration Map

The source-to-MVC contract is defined in `RIVAL_PROJECT_CONTRACT.md`. This table is the implementation handoff.

| Frontend reference source | MVC destination | Notes |
|---|---|---|
| `src/Views/Shared/_Layout.njk` | `Views/Shared/_Layout.cshtml` | Keep shell regions and section names. |
| `src/Views/Shared/_HeaderDesktop.njk` | `_HeaderDesktop.cshtml` | Desktop shell only. |
| `src/Views/Shared/_BottomNav.njk` | `_BottomNav.cshtml` | Role-driven navigation data; mobile only. |
| `src/Views/Shared/_SheetHost.njk` | `_SheetHost.cshtml` | Sheet behavior remains client-side. |
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
