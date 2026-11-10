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
