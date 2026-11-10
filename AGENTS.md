# AGENTS.md — Rival Codex Engineering Rules

## Mission
You are the senior frontend engineer and implementation agent for Rival. Build only the phase explicitly assigned by the owner. Preserve product truth, visual design, accessibility, and the ASP.NET Core MVC migration path.

## Read first
1. `docs/RIVAL_PROJECT_CONTRACT.md` — the canonical architecture contract.
2. `docs/PHASE_PLAN.md` — phase dependencies and ownership.
3. `docs/PAGE_INVENTORY.md`, `docs/COMPONENT_REUSE_MATRIX.md`, `docs/TRACEABILITY.md`.
4. `docs/DECISION_LOG.md` and `docs/OPEN_QUESTIONS.md`.
5. The assigned phase's README, `CODING_AGENT_PROMPT.md`, `SOURCE_MAP.md`, and handoff.
6. `design-export/MANIFEST.md` and the exact source evidence referenced by it.

## Project skills
- Use `.agents/skills/rival-phase-runner/SKILL.md` for phase planning/execution and phase gates.
- Use `.agents/skills/rival-visual-qa/SKILL.md` for screenshot, responsive, accessibility, and route regression work.
- Use `.agents/skills/rival-mvc-compatibility/SKILL.md` only for Phase 09 MVC-readiness and handoff.

## Source precedence
The latest owner instruction wins, then `docs/RIVAL_PROJECT_CONTRACT.md`, then confirmed decisions and canonical product handoffs. Old Claude Code Kickstart and old Tailwind/Alpine/htmx references are historical only. Never guess a business rule or permission.

## Technology — non-negotiable
- Primary coding agent: OpenAI Codex.
- Templates: restricted Razor-mappable Nunjucks in `src/Views/`, rendered at build time only.
- Build: Node/npm local development tooling only. Static output goes to `dist/`.
- Hosting: cPanel/Apache serves `dist/` as static files. No Express, no Node runtime, no Nunjucks runtime, and no backend service on hosting.
- Preview: local static server only; use VS Code Tasks so the owner does not need to manage Node commands.
- CSS: Native CSS only; no Tailwind, Bootstrap, Sass/Less, CSS-in-JS, Vite, Webpack, or CSS bundler.
- JS: Native ES Modules only; no React, Vue, Angular, Alpine.js, htmx, jQuery, or frontend framework.
- Fonts: Yekan Bakh only; normal width; weights 300/400/600.
- Icons: 71 local Lucide-based SVGs, retaining `ri ri-*` compatibility names. No Remix Icon package, CDN, or emoji.
- Tokens: `design-export/design-system-v2/tokens/tokens.json` is canonical.
- Production class names: `rv-*` BEM-style. Do not carry `b2-`..`b7-` or `f-` export classes into app code.

## Static-first output contract
- `src/Views/` + `src/MockData/` + `src/wwwroot/` are source of truth.
- `tools/build-static.mjs` renders pages into `dist/`.
- `dist/` is generated; never edit it manually. Edit `src/` and rebuild.
- Use `src/site-config.json` `basePath` for all asset, route, and fixture URLs; do not hard-code root-only paths.
- `dist/index.html` is the public home route `/`.
- `dist/_preview/index.html` is the central page directory at `/_preview/`; `dist/pages.html` is an alias.
- Static routes use directory `index.html` files and MVC-shaped URLs.
- `src/MockData/` is copied as JSON fixtures; demo writes are simulated through `core/api.js` and localStorage. Never imply a real payment or booking.
- cPanel receives only the contents of `dist/`. Never upload `src/`, `tools/`, `node_modules/`, docs, or phase archives.

## Design and accessibility
- Follow Design System v2 and the exact Page ID artboard/handoff evidence.
- RTL, Persian copy, Persian digits, Jalali dates, and 24-hour time are mandatory.
- CSS Cascade Layers: `tokens, base, layout, components, pages, utilities`.
- `app.css` contains imports only. Target <=150 lines per CSS file and <=120 lines per JS module; split when needed.
- No inline scripts/styles/event handlers. Use `data-rv` hooks and shared modules.
- Use logical RTL CSS properties and min-width breakpoints.
- All interactive hit targets >=44×44px even when the visible control is smaller.
- No nested vertical scrolling. Horizontal rails/carousels are allowed only with design evidence.
- All dialogs/pickers/confirmations are bottom sheets, never centered dialogs.
- Desktop is a purpose-designed composition based on the mobile design language, not a scaled mobile screen. Write `docs-work/desktop-layouts/<PAGE-ID>.md` and obtain owner review before desktop implementation.
- Run Playwright at 390, 768, and 1280; run axe and keyboard checks.

## Phase ownership
- Phase 01: static build foundation, token/assets, page registry, central preview, mock adapter, test harness; no product shell/screens.
- Phase 02: actual shared shell, navigation, public/auth, desktop shell.
- Phase 03: canonical StatePage base + booking STATE-04..07.
- Phase 06: canonical CreditPayments/WalletLedger/PaymentRow/balance primitives for ADM-09.
- Phase 08: extend finance for ADM-16 and StatePage for remaining states; do not rebuild either.
- Phase 08 remains MVC-compatible only. Actual MVC handoff belongs to Phase 09.
- Infrastructure IDs DS/RULE/ARCH go in TRACEABILITY, not PAGE_INVENTORY.

## Working protocol
1. Start every assigned phase in Plan mode. Inspect files and present a plan before broad edits.
2. Confirm the requested phase and dependencies are complete. Never start the next phase automatically.
3. Implement only the assigned scope. Do not opportunistically refactor unrelated areas.
4. Keep `design-export/` and original source references read-only. Add derived notes only where allowed.
5. Use Git checkpoints; never push, deploy, or change files outside the repository without explicit owner approval.
6. Run the phase acceptance checklist, `npm run lint`, visual tests, axe, keyboard tests, and route checks.
7. Update `PROGRESS.md`, `docs/PAGE_INVENTORY.md`, `docs/TRACEABILITY.md`, `docs/DISCREPANCIES.md`, and `docs/OPEN_QUESTIONS.md` as relevant.
8. Report changed files, tests/results, screenshots, open questions, and the next phase gate. Stop for owner approval.

## Safety and honesty
- Never claim a test passed unless it was actually run and its output checked.
- Never invent missing assets, business rules, API contracts, or artboard selectors.
- Never perform a real payment, booking, message send, or external deployment from the static reference.
- If the source evidence is incomplete, record the gap and ask the owner when it changes product behavior.
