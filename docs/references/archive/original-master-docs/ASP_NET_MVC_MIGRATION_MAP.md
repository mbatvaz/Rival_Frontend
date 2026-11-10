> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# ASP.NET Core MVC Migration Map

| Preview source | MVC destination | Notes |
|---|---|---|
| `src/Views/Shared/_Layout.njk` | `Views/Shared/_Layout.cshtml` | keep shell regions and section names |
| `src/Views/Shared/_HeaderDesktop.njk` | `_HeaderDesktop.cshtml` | desktop only at >=1024 |
| `src/Views/Shared/_BottomNav.njk` | `_BottomNav.cshtml` | role-driven nav data |
| `src/Views/Shared/_SheetHost.njk` | `_SheetHost.cshtml` | sheets remain client behavior |
| `src/Views/Shared/Components/*` | `Views/Shared/Components/*` | one partial per component |
| `src/Views/<Area>/<Controller>/<Action>.njk` | same path `.cshtml` | mechanical syntax conversion |
| `src/MockData/*.json` | ViewModel fixtures/contracts | replace mock loader with server model |
| `src/wwwroot/**` | `wwwroot/**` | copy verbatim |
| `mock-server/**` | none | preview-only; never port |
| `js/core/api.js` mock adapter | MVC endpoints / fetch adapter | keep URL and JSON shapes stable |

## Suggested Areas

`Public`, `Auth`, `Customer`, `Stylist`, `Admin`. OwnerAdmin remains one Area shell; Scope is query/form data, not a second role.

## Required server helpers

`FaDigits`, `Jalali`, antiforgery token, permission-aware route guard, and server-side model validation. Client validation improves feedback but cannot replace server validation.

## Port order

1. Copy `wwwroot` and shared partials.
2. Convert layout and shell.
3. Convert ViewModels from MockData shapes.
4. Replace API adapter endpoints.
5. Move authorization and business rules server-side.
6. Run visual/a11y regression at 390/768/1280.
