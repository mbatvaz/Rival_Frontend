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

## Phase 01 implementation — 2026-11-10; owner acceptance pending

| ID | Source / decisions | Implementation | Acceptance evidence |
|---|---|---|---|
| DS | `design-export/design-system-v2/tokens/tokens.json`; DEC-023/024/032 | `tools/lib/design-system.mjs`, layered token/type/font/icon CSS, 71 SVGs, two local logos | `tests/structure/static-contract.spec.mjs`, `tests/visual/responsive-smoke.spec.mjs` |
| RULE | Contract §3.3 / §7; DEC-020/026; fixture-only operation | `src/wwwroot/js/core/api.js`, `config.js`, `format.js`, `src/MockData/foundation/` | `tests/runtime/api.spec.mjs`, `tests/runtime/registry.spec.mjs`, keyboard/axe tests |
| ARCH | Contract §3/4/8/9; DEC-020/028/029/030/031 | neutral `Shared/_Layout.njk`, preview partials, static build/server, lazy registry, VS Code Tasks | 19 root tests + 19 subfolder tests, structure/JS/CSS lint, 73 route checks |

Type styles map directly to `--<style-name>-size/line/weight`; token families retain canonical names. Archived fallback typefaces are removed as required by contract §4.3. No new visual token values are invented.

Infrastructure UI has no canonical product artboard; screenshots are review evidence, not pixel-match baselines. No product page is marked implemented. StatePage remains Phase 03; finance remains Phase 06; migration remains Phase 09.
