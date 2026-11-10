> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Route / Navigation Graph

```mermaid
flowchart TD
  PUB["PUB-01 /"] --> AUTH["AUTH-01 /login"]
  PUB --> PORT["PUB-02 /portfolio"]
  PUB --> RULES["PUB-03 /booking-rules"]
  AUTH --> CUS["CUS-01 /customer"]
  AUTH --> STY["STY-01 /stylist"]
  AUTH --> ADM["ADM-01 /admin"]
  CUS --> BOOK["CUS-02 /customer/book"]
  BOOK --> BK1["BK-01 service"]
  BK1 --> BK2["BK-02 stylist"]
  BK2 --> BKF["BK-F01 availability"]
  BKF --> PAY["BK-F02 + PAY-RES"]
  BK1 --> BKR["BK-R01 requested"]
  BK1 --> BKP["BK-P01 proposed"]
  CUS --> CUSLIST["CUS-03 appointments / CUS-05 requests"]
  STY --> STYWORK["STY-02..11"]
  ADM --> ADMCORE["ADM-02..16"]
  ADM --> ADMAC["ADM-AC action center"]
  ADM --> ADMNOT["ADM-NOT notifications"]
```

## Navigation rules

- Mobile bottom navigation is role-specific but generated from one `MockData/nav.<role>.json`; desktop moves those destinations into the header “More” menu at >=1024.
- OwnerAdmin has one account/session/shell. Scope (`me / stylist / all`) changes data, never Role or impersonation.
- Every destructive or impact-bearing action stays in the source page and opens a bottom sheet; no independent modal route.
- `ADM-AC` is the only new independent route introduced by the final Mobile IA review. Operational failures go to `ADM-NOT`, never to Action Center.
- `ADM-09` payment mode owns wallet/ledger adjustment and reversal sheets; `/admin/wallets*`, `/admin/transactions`, `/admin/reports`, `/admin/announcements` are not canonical routes.
