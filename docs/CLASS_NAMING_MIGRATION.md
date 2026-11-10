# Legacy Export Class → Rival Production Component Mapping

Production CSS uses the `rv-*` namespace. Export batch prefixes identify where a pattern was authored, not the final application component name.

| Legacy evidence class | Production concept | Canonical direction |
|---|---|---|
| `b2-res`, `b2-res__act` | State page / state actions | `rv-state-page`, `rv-state-page__actions` |
| `b3-empty` | Empty state | `rv-empty-state` |
| `b4-rq` | Closed request row | `rv-request-row` with state modifier |
| `b4-tabrow` | Tabs | `rv-tabs` |
| `b4-seg-full` | Segmented control | `rv-segmented-control` |
| `b4-fcard` | Filter card | `rv-filter-card` |
| `b5-balc` | Balance summary | `rv-balance-card` |
| `b5-pay` | Payment row | `rv-payment-row` |
| `b5-led` | Wallet ledger | `rv-wallet-ledger` / `rv-wallet-ledger__row` |
| `b6-pk`, `b7-pk` | Choice card | `rv-choice-card` |
| `b7-ph` | Media placeholder | `rv-media-placeholder` |
| `f-*` | Feature-specific legacy layout/pattern | Map case-by-case to semantic `rv-*`; never perform a blind prefix replacement. |

These are semantic starting points, not permission to ignore the handoff. Verify the exact appearance and behavior in the source artboard before promoting a pattern. When a legacy class has multiple meanings, record the mapping in `docs/DISCREPANCIES.md` and keep the implementation component-specific.

The original `rv-b2.css`, `rv-b3.css`, `rv-b4.css`, `rv-b6.css`, `rv-b7.css`, `rv-fixes.css`, `rv-final.css`, and `bundle.css` remain source evidence only. Do not import them as production bundles.
