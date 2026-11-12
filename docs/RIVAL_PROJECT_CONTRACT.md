# Rival Project Contract — Canonical Source of Truth

**Status:** Owner-approved implementation contract, updated 2026-11-09.  
**Applies to:** Codex-driven frontend reference implementation across Phases 01–09.  
**This document consolidates:** the Master `ARCHITECTURE.md`, the 2026-11-02 `Frontend_Architecture.md`, confirmed owner decisions, the Design System v2 extraction rules, and the execution clarifications recorded on 2026-11-09.

If an older technical instruction conflicts with this contract, this contract wins. Product/business rules remain grounded in the canonical decisions and handoffs listed below; this document does not authorize inventing new business behavior.

## 1. Product goal

Build a backend-independent, Persian (`fa-IR`), RTL, responsive frontend reference for Rival. It must:

1. Let the owner inspect and interact with every implemented page in a browser.
2. Provide one central page directory for navigating all product screens and shared states.
3. Produce plain static HTML/CSS/JavaScript that can be uploaded to a normal cPanel/Apache host without Node.js, Express, or another application runtime.
4. Preserve a source structure that can be ported with minimal changes to ASP.NET Core MVC / Razor.
5. Follow the existing mobile designs and Design System v2 without inventing product rules.

The owner reviews pages in the browser and requests changes through Codex. Edit the source templates/CSS/JS under `src/`; `dist/` is generated output and must not be edited manually because the next build overwrites it.

## 2. Source-of-truth hierarchy

When sources disagree, use this order:

1. The owner's latest direct instruction in the current conversation or a later owner-approved decision.
2. This `RIVAL_PROJECT_CONTRACT.md`.
3. `DECISION_LOG.md`, `OPEN_QUESTIONS.md`, and the confirmed owner-closure documents in `references/canonical/`.
4. `PAGE_INVENTORY.md`, `PHASE_PLAN.md`, `COMPONENT_REUSE_MATRIX.md`, `ROUTE_GRAPH.md`, `TRACEABILITY.md`, and `ASP_NET_MVC_MIGRATION_MAP.md`.
5. Current handoffs in `references/handoff/`, canonical product/design guidance in `references/canonical/`, and the batch briefs in `references/design/`.
6. `design-export/MANIFEST.json` plus the exact source HTML/CSS/screenshots in `design-export/batches/` and Design System v2 in `design-export/design-system-v2/`.
7. Historical kickstart prompts and older phase handoffs. They remain useful for product context only where not superseded; their old coding-agent and technology instructions are not active.

Never silently resolve a business-rule conflict. Use the conservative default in `OPEN_QUESTIONS.md` and ask the owner when the decision affects permissions, money, bookings, cancellation, or customer-facing commitments.

## 3. Approved technology stack

### 3.1 Source templates and static output

- Author page templates in `src/Views/` using the restricted Nunjucks subset that maps to Razor.
- Nunjucks is a **build-time renderer only**. It must not run on cPanel or in production.
- `tools/build-static.mjs` renders all page templates and mock data into `dist/` as ordinary HTML files.
- Never hand-edit generated `dist/**/*.html`; make changes in `src/Views/`, `src/wwwroot/`, or `src/MockData/`, then rebuild.
- The generated output mirrors routes using directory indexes: `/customer/appointments/` becomes `dist/customer/appointments/index.html`.
- The public home route `/` becomes `dist/index.html`.
- The developer navigation directory is generated at `dist/_preview/index.html` and served at `/_preview/`; `dist/pages.html` is a convenient alias. It links to all canonical page contexts and implemented variants. It does not replace the public home page.
- A missing page template may produce a clearly marked development placeholder in `dist/`; it must never be reported as implemented in `PAGE_INVENTORY.md`.

### 3.2 Node.js and preview

- Node.js/npm are permitted **locally for build, test, and developer tooling only**. The owner does not need to manage Node commands manually; expose the workflow through VS Code Tasks and Codex instructions.
- Do not use Express or create a persistent backend server.
- `tools/serve-static.mjs` may provide a tiny local static-file server for preview/tests. It serves only the already generated `dist/` folder.
- VS Code Live Server may be used as an optional alternative for serving `dist/`.
- `dist/` is the only deployment payload for cPanel. Upload its contents to the target document root. Do not upload `node_modules/`, `src/`, `tools/`, `package.json`, tests, or source references.
- cPanel must serve `index.html` for directories. Include a minimal `.htaccess` with `DirectoryIndex index.html` and directory listing disabled.
- `src/site-config.json` controls the deployment `basePath` (default `/`). If deploying into a subfolder, set it to that folder (for example `/rival-demo/`) and rebuild; the generated page, asset, and preview links are prefixed consistently.
- Every template asset URL, navigation URL, and mock-fixture fetch must use the configured `basePath`; do not hard-code root-only `/css`, `/js`, or `/mock-data` paths.
- No Node.js, Express, Nunjucks, build process, or API server is required on cPanel.

### 3.3 Mock data and interactions

- `src/MockData/` contains page fixtures and JSON response shapes.
- The build copies the fixtures to `dist/mock-data/`.
- The mock adapter resolves fixture URLs through the configured `basePath`.
- `src/wwwroot/js/core/api.js` is the only data boundary. Reads use static JSON fixtures; demo writes are simulated through a mock adapter and browser `localStorage` where appropriate.
- No real booking, payment, identity, authorization, or financial operation is performed by the static reference. UI simulations must be labelled and must not imply a real transaction.
- Preserve stable request/response shapes so the adapter can later be replaced with ASP.NET endpoints.
- State variants are selected through documented query parameters (for example `?state=empty`) and fixtures, not through a server-side Express route.

### 3.4 Razor-compatible template subset

Allowed template features only:

- `{{ variable }}`
- `{% if %}` / `{% else %}`
- `{% for %}`
- `{% include %}`
- `{% extends %}` / `{% block %}`
- The explicitly mapped helpers/filters `faDigits`, `jalali`, and the antiforgery placeholder.

Mapping:

| Nunjucks | ASP.NET Core MVC |
|---|---|
| `{{ model.title }}` | `@Model.Title` |
| `if/else` | `@if` / `else` |
| `for` | `@foreach` |
| `include` | `Html.PartialAsync` |
| `extends` + `block` | `_Layout.cshtml` + `@section` |
| `faDigits` | `@Html.FaDigits(...)` |
| `jalali` | `@Html.Jalali(...)` |
| literal `<!-- MVC:ANTIFORGERY -->` marker in a form | `@Html.AntiForgeryToken()`; no token is emitted in the static demo |

Do not add custom macros, arbitrary filters, dynamic template execution, or Nunjucks-only constructs without owner approval and an explicit MVC mapping.

## 4. Frontend rules

### 4.1 HTML

- Semantic HTML; RTL and Persian copy throughout.
- Real anchor URLs follow the future MVC route shape (`/Area/Controller/Action/`).
- Forms are ordinary forms with clear method/action contracts; static demo submissions are intercepted by the mock adapter.
- No inline `<script>`, `<style>`, `onclick`, or other inline event handlers.
- Use `data-rv="feature-name"` hooks for JavaScript behavior.

### 4.2 CSS

- Native modern CSS only. No Tailwind, Bootstrap, Bulma, Sass/Less, CSS-in-JS, Vite, Webpack, or CSS bundler.
- CSS Cascade Layers are mandatory: `@layer tokens, base, layout, components, pages, utilities;`.
- `src/wwwroot/css/app.css` is only the ordered import entry point.
- `design-export/design-system-v2/tokens/tokens.json` is the canonical machine-readable token source. Generate CSS custom properties from it; do not invent a parallel token vocabulary.
- Production CSS is organized by concern: `00-tokens`, `01-base`, `02-layout`, `03-components`, `04-pages`, `05-utilities`.
- One concern per file; target maximum 150 lines per CSS file. Split files when the limit is exceeded rather than hiding complexity.
- Use logical RTL properties (`margin-inline-*`, `padding-inline-*`, `inset-inline-*`). Use `min-width` media queries.
- No raw color, radius, shadow, font-size, or spacing literals outside the token layer unless a documented exception is approved.
- All implementation classes use the `rv-` namespace and a consistent BEM-style pattern. Batch/export prefixes such as `b2-`, `b3-`, `b4-`, `b5-`, `b6-`, `b7-`, and `f-` are legacy source-evidence classes, not production naming conventions. Map their behavior to canonical `rv-*` components; do not carry batch prefixes into production.
- Repeated UI patterns must be promoted to one shared component; pages configure data/state rather than copying component CSS.

### 4.3 Fonts

- The only approved typeface is **Yekan Bakh**.
- Use the normal-width local files and weights 300, 400, and 600: `YekanBakh-Light.woff2`, `YekanBakh-Regular.woff2`, and `YekanBakh-SemiBold.woff2`.
- Expanded and SemiExpanded files remain archived source assets only. Do not load or use them in the application.
- Do not introduce another font family. A generic `sans-serif` fallback is permitted only as a browser fallback if the local font fails to load.

### 4.4 Icons

- Use the 71 local SVG icons in `design-export/design-system-v2/assets/icons/`.
- These icons are Lucide-based (ISC) with stroke 1.75. The historical CSS compatibility prefix `ri ri-*` is retained because it is used by the approved design exports; it does **not** mean the Remix Icon library is installed.
- Use the local SVG/mask implementation and `currentColor`; no CDN, icon font, emoji, or additional icon package.

### 4.5 JavaScript

- Native JavaScript ES Modules only; no React, Vue, Angular, Alpine.js, htmx, jQuery, or frontend bundler.
- One feature per module; target maximum 120 lines per JS file. Shared components each have a reusable module.
- `core/registry.js` discovers `data-rv` hooks and lazy-loads only the feature needed by the page.
- `core/api.js` is the sole data access boundary. No hard-coded business data in feature modules and no global application store.
- State lives in DOM/data attributes or within the feature module that owns it.

## 5. Design System and visual fidelity

Use Yekan Bakh weight 300 for supporting descriptions and metadata such as service duration. Use looping GIFs derived from the local SVGs for large icons, with the static SVG for reduced motion.

- Design System v2 is the visual authority. Use its approved tokens, component behavior, icon set, and Yekan Bakh typography.
- Original batch HTML/CSS is evidence, not production code. Do not load the old batch bundles (`tokens.css`, `bundle.css`, `rv-fixes.css`, `rv-final.css`, `rv-b2.css`, `rv-b3.css`, `rv-b4.css`, `rv-b6.css`, `rv-b7.css`) together in the app. Rebuild approved patterns into the canonical layered CSS system.
- Legacy class names are mapped to shared `rv-*` components. Record uncertain mappings in `docs/DISCREPANCIES.md`.
- Pressed/raised visual feedback is implemented as reusable component states, not page-specific overrides. Examples: `.rv-btn.is-pressed` and `.rv-nav-item.is-raised`, with values sourced from approved tokens where available.
- Visual button/control size may be 40px where the design requires it, but the interactive hit target must be at least 44×44px. Use a hit-area wrapper/pseudo-element or equivalent without distorting the visible design.
- No dark theme. No emoji.

## 6. Responsive and desktop design contract

The 390px mobile artboards are the primary visual reference, but desktop is **not** a stretched or enlarged mobile page.

| Range | Contract |
|---|---|
| `<768px` | Mobile-first layout; match the 390px artboards and remain usable down to 320px. Bottom navigation is present where the role uses it. |
| `768–1023px` | Tablet adaptation; centered content up to 720px, preserve mobile information architecture, use two columns only where content naturally supports it. |
| `>=1024px` | A deliberate desktop composition derived from the mobile product design language. Use a max content width around 1200px, desktop header, and role-appropriate navigation/layout. Bottom navigation is hidden. |

Desktop-specific rules:

- Preserve the mobile design's product meaning, information architecture, copy, visual language, component semantics, and action hierarchy. Desktop may reorganize the same information into columns, workspaces, side navigation, wider tables/cards, and contextual panels. It must not merely scale the mobile canvas or invent new product functionality.
- Public pages use a desktop top header and centered content; use a two-column composition only when the existing content supports it.
- Customer pages use a compact desktop header/navigation and a clear primary booking action; do not force a staff-style admin sidebar onto the customer experience.
- Stylist and OwnerAdmin workspaces may use a persistent right-side navigation rail (RTL) for primary work areas, with secondary destinations in a More menu. Reuse the exact mobile navigation destinations; do not create new routes.
- Booking flows may use a main form/step column plus a contextual summary column when that summary exists in the approved mobile flow.
- Before implementing any page at desktop width, write `docs-work/desktop-layouts/<PAGE-ID>.md` describing the desktop composition, columns, navigation, ordering, and which existing mobile components move. The owner reviews/approves the brief before desktop implementation.
- All dialogs, pickers, and confirmations remain bottom sheets; no centered modal dialogs. On desktop, a sheet remains bottom-attached and centered with a maximum width of 560px.
- Nested vertical scrolling is prohibited outside the owner-approved mobile BK-REC01 editor. Its sheet scrolls within the viewport and keeps the header visible. Intentional horizontal rails/carousels with design evidence may scroll horizontally (including documented snap rails such as ADM-14). Do not introduce arbitrary horizontal scrolling for whole pages or tables.

## 7. Accessibility and QA

- RTL, visible focus, keyboard operation, meaningful labels, semantic headings, and reduced-motion handling are required.
- Interactive hit targets are at least 44×44px.
- Use `aria-invalid` for field errors and `role="alert"` / `role="status"` for feedback.
- Run Playwright at 390, 768, and 1280px. Compare 390px against the matching source artboard with tolerance recorded. Desktop 1280px is reviewed against its approved desktop layout brief, not falsely pixel-compared to a 390px canvas.
- Run axe, keyboard-path checks, state coverage, route/no-dead-end checks, and structure lint after each phase and after any shared-component change.
- A page is not done merely because it renders without a JavaScript error.

## 8. Phase ownership and non-duplication

- **Phase 01:** build/static preview foundation, tokens, local assets, page registry, mock adapter, JS registry, test harness, and MVC-shaped source folders. No product screens or finished shell.
- **Phase 02:** shared shell, role navigation, desktop shell, sheets, public pages, and authentication.
- **Phase 03:** customer booking flows. Build the canonical reusable `StatePage` base component here because booking states use it first; implement booking-owned `STATE-04..07` variants here.
- **Phase 04:** customer panel; reuse the shell and shared components.
- **Phase 05:** stylist panel; reuse the shell, schedule, cards, and booking components.
- **Phase 06:** admin daily. Build the canonical reusable finance primitives (`CreditPayments`, `WalletLedger`, `PaymentRow`, and balance summary) needed by ADM-09; they must be designed for reuse by ADM-16.
- **Phase 07:** admin management; reuse the shared schedule, service, pricing, and impact-preview patterns.
- **Phase 08:** finance/content/system. Extend the Phase 06 finance primitives for ADM-16 payment matching; do not rebuild them. Reuse the Phase 03 `StatePage` base and add remaining system-state variants (`STATE-01..03`, `STATE-08`) plus SYS/KIT patterns. This phase must remain MVC-compatible but must not begin the actual ASP.NET migration.
- **Phase 09:** full regression and ASP.NET Core MVC handoff. This is the only phase that creates the final port guide and performs the migration-readiness audit.

Phase boundaries are strict. A later phase may extend a canonical shared component but must not recreate it.

## 9. ASP.NET Core MVC migration boundary

- `src/Views/**` is the source of Razor-shaped page templates.
- `src/wwwroot/**` is the source of static assets and should copy to ASP.NET `wwwroot/**` without changes.
- `src/MockData/**` defines fixture/ViewModel and API JSON shapes; it is replaced by server ViewModels and real endpoint responses later.
- `tools/**`, `dist/**`, the static preview server, Nunjucks build-time renderer, and the mock adapter are not ported.
- Preserve real route paths and request/response shapes. Keep business rules, authorization, validation, payment, booking availability, and transaction integrity server-side in the eventual MVC application.
- Phase 09 produces `docs-work/ASP_PORT_GUIDE.md` with Views/Areas, ViewModels, endpoints, helpers, antiforgery, authorization boundaries, and the exact conversion order.

## 10. Repository layout

```text
rival-frontend/
├── AGENTS.md
├── README_START_HERE_FA.md
├── package.json
├── .vscode/
├── .agents/skills/
├── docs/
│   ├── RIVAL_PROJECT_CONTRACT.md
│   ├── PAGE_INVENTORY.md
│   ├── COMPONENT_REUSE_MATRIX.md
│   ├── TRACEABILITY.md
│   ├── PHASE_PLAN.md
│   ├── OPEN_QUESTIONS.md
│   ├── DECISION_LOG.md
│   └── references/              # original product/design evidence
├── design-export/
│   ├── MANIFEST.json
│   ├── MANIFEST.md
│   ├── batches/                 # original exports, read-only
│   └── design-system-v2/        # original Design System v2, read-only
├── prompts/                    # Codex preflight/normalization prompts
├── phases/                      # PHASE_01 through PHASE_09
├── src/
│   ├── page-registry.json
│   ├── site-config.json
│   ├── Views/                   # Razor-shaped Nunjucks source
│   ├── MockData/
│   └── wwwroot/{css,js,fonts,icons,img,lib}/
├── tools/                       # build, local static server, lint, export lookup
├── tests/{visual,a11y,structure}/
├── docs-work/                   # progress, desktop briefs, discrepancies
└── dist/                        # generated static output; never edit manually
```

## 11. Required owner decisions still open

Use `OPEN_QUESTIONS.md` for unresolved items. The desktop strategy in OQ-07 is resolved by the owner's 2026-11-09 instruction and is replaced by Section 6 above. Do not treat unresolved content/permission questions as approved.

## 12. Definition of done for every phase

A phase is complete only when its IDs and states are traceable, its acceptance checklist passes, 390/768/1280 reviews are recorded, desktop briefs are owner-approved where applicable, axe and keyboard checks pass, no dead-end routes exist, shared-component regression passes, `PROGRESS.md`/`DISCREPANCIES.md`/`OPEN_QUESTIONS.md` are updated, and the agent stops for owner review. Never auto-start the next phase.

## Owner mobile-device review rules

- Treat owner comments marked mobile as observations from a physical Samsung Galaxy S20 FE. Reproduce in the browser at the reported width and record separately whether physical-device retesting occurred.
- Keep compact labels and aligned card metadata on one line. Let flexible children shrink with `min-inline-size: 0`. Expose the full text via the associated detail view or an accessible reveal when it overflows. Preserve wrapping for prose and long status messages.
- Give every horizontally scrolling rail native touch scrolling, pointer drag on desktop, and keyboard access. Reuse `components/rail.js` and suppress activation only after a drag crosses the movement threshold.
- Use brief native CSS motion, primarily transform and opacity. Page entry, supported route exit, and overlay entry/exit must respect reduced motion. Bottom sheets animate from and back to the bottom edge, retaining background inertness and restoring scroll and focus after closing. Centered desktop gallery remains the approved desktop exception. The mobile gallery stays anchored to the viewport when the viewport can contain it. On short viewports, allow the document to scroll for access to the full gallery details.
- Keep real labels visible above inputs in both empty and filled states. Use the placeholder only for an example. When the keyboard opens, scroll the field into view smoothly and honor reduced motion. Animate invalid color and border without changing control dimensions.
- Use a viewport-height layout for phone login and account states where content fits. Permit document scrolling with a keyboard, short screen, large text, or expanded messages.
- When implementing the OwnerAdmin featured-image settings, provide separate uploads for portrait mobile and landscape desktop hero images. PUB-01 selects the source with `picture` at the existing 1024px desktop breakpoint. The current landscape demo uses the existing salon-wide photo.

## Design evidence before implementation

- For each Page ID and state, locate the exact artboard in `design-export/MANIFEST.json`, open its screenshot and export HTML, and check the matching Design System component and handoff. Record the paths in the phase review notes.
- Reproduce the mobile artboard’s hierarchy, grouping, control states, and spacing before adapting its layout for desktop. Use the same hierarchy and component states at desktop widths. Record justified responsive changes and resolve conflicts using the latest owner feedback.
- Compare screenshots of the implemented default and affected states to their source artboards before submitting for owner review. Include the owner’s reported viewport when available.
