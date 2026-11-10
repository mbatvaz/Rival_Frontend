# Traceability Contract

Every implementation item must be traceable through this chain:

`Phase package → Page ID / Component ID → Artboard or Handoff section → Design token/Business rule → Acceptance test`.

Examples:

- `AUTH-01 → Batch 1 AUTH-01 → D10-207/D10-210/D10-211 → OQ none → tests/auth/login-lock.spec.js`
- `ADM-09 → Batch 5 ADM-09-* → D10-171..177 + D10-205 → ADM-09 payment mode/ledger tests`
- `STATE-05 → Batch 8 STATE-05 + Batch 2 PAY-RES-REVIEW → D10-191..194 → payment-under-review state test`
- `ADM-AC → Phase 8 current truth → `/admin/action-center` → no operational failures → action-center filter test`.

Use stable prefixes `PUB`, `AUTH`, `CUS`, `BK`, `PAY`, `STY`, `ADM`, `STATE`, `SYS`, `KIT`, `DS`, `RULE`, `DEC`, `OQ`.


## Phase ownership links

- `StatePage → Phase 03 base → STATE-04..07 booking variants → Phase 08 STATE-01..03/08 + SYS recovery reuse`.
- `CreditPayments/WalletLedger/PaymentRow → Phase 06 ADM-09 canonical implementation → Phase 08 ADM-16 matching extension`.
- `DS/RULE/ARCH → Phase 01 infrastructure IDs → TRACEABILITY only; not product page rows`.

## Phase 01 implementation — 2026-11-10; accepted by owner

| ID | Source / decisions | Implementation | Acceptance evidence |
|---|---|---|---|
| DS | `design-export/design-system-v2/tokens/tokens.json`; DEC-023/024/032 | `tools/lib/design-system.mjs`, layered token/type/font/icon CSS, 71 SVGs, two local logos | `tests/structure/static-contract.spec.mjs`, `tests/visual/responsive-smoke.spec.mjs` |
| RULE | Contract §3.3 / §7; DEC-020/026; fixture-only operation | `src/wwwroot/js/core/api.js`, `config.js`, `format.js`, `src/MockData/foundation/` | `tests/runtime/api.spec.mjs`, `tests/runtime/registry.spec.mjs`, keyboard/axe tests |
| ARCH | Contract §3/4/8/9; DEC-020/028/029/030/031 | neutral `Shared/_Layout.njk`, preview partials, static build/server, lazy registry, VS Code Tasks | 19 root tests + 19 subfolder tests, structure/JS/CSS lint, 73 route checks |

Type styles map directly to `--<style-name>-size/line/weight`; token families retain canonical names. Archived fallback typefaces are removed as required by contract §4.3. No new visual token values are invented.

Infrastructure UI has no canonical product artboard; screenshots are review evidence, not pixel-match baselines. No product page is marked implemented. StatePage remains Phase 03; finance remains Phase 06; migration remains Phase 09.

## Phase 02 implementation — 2026-11-10; owner acceptance pending

Source prefix below: `design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/`.

| IDs / component | Exact evidence and decisions | Implementation | Tests |
|---|---|---|---|
| PUB-01 | PUB-01.html, PUB-01-IN.html; Design System v2; DEC-027 | Public/Home/Index.njk; home.json; public-session.js; home/visit CSS | public-shell.spec.mjs; responsive-a11y.spec.mjs |
| PUB-02 / PortfolioCard | PUB-02.html and PUB-02-F/E/L/X/V.html | Portfolio/Index.njk; shared card/viewer partials; portfolio.js; fixture states | public-shell.spec.mjs; responsive-a11y.spec.mjs |
| PUB-03 | PUB-03.html; current canonical booking policies | Public/Rules/Index.njk; public/rules.json | public-shell.spec.mjs; responsive-a11y.spec.mjs |
| AUTH-01 | AUTH-01/B/O/P/W/L.html; Owner_Closures D10-207/210/211; Phase 04 Current Truth | Login.njk; auth.js/auth-view.js/auth-preview.js; core/auth-demo.js; fixture policy/state | auth.spec.mjs (8 scenarios); responsive-a11y.spec.mjs |
| AUTH-02 | AUTH-02.html, AUTH-02-E.html | Complete.njk; complete-profile.js; profile-state fixtures | auth.spec.mjs; responsive-a11y.spec.mjs |
| SYS-ACC-01 | SYS-ACC-01.html | Unavailable.njk in Auth layout; no early StatePage base | responsive-a11y.spec.mjs |
| SHELL / MORE / Sheet | SHELL-CUS-01/02, SHELL-STY-01, SHELL-ADM-01..05, MORE-CUS/STY/ADM-01..03; DEC-009/019/027 | RoleLayout/MoreDrawer/LogoutSheet; nav fixtures; components/sheet.js; shell.js | public-shell.spec.mjs; 390/768/1280 axe, desktop bottom-sheet bounds and keyboard tests |
| ARCH regression | DEC-020/026/028/029/030/031/032 | build helper product.mjs; lazy feature loaders; canonical basePath; safe returns | full 45-test suite at root and subfolder; structure/JS/CSS lint |

Desktop briefs in `docs-work/desktop-layouts/{PUB-01,PUB-02,PUB-03,AUTH-01,AUTH-02,SYS-ACC-01,SHELL}.md` were approved in the chat before implementation. Full source export/reference trees remain unchanged. StatePage stays in Phase 03 and finance/MVC boundaries remain unchanged.
