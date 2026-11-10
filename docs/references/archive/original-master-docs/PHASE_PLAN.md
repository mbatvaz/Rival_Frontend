> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Implementation Phase Plan

This is a dependency plan, not a copy of the eight design batches. Shared foundation and cross-cutting patterns are built once, then vertical slices reuse them.

| Phase | Package | Scope | Depends on | Gate |
|---:|---|---|---|---|
| 01 | Foundation | repo skeleton, tokens, fonts/icons, mock server, registry/api, test harness, MVC-shaped layout | none | static preview boots; structure lint |
| 02 | Shell + Public + Auth | desktop/mobile shell, nav, More, sheets, PUB-01..03, AUTH-01/02, SYS-ACC-01 | 01 | OTP/lock/accessibility and 390/1280 review |
| 03 | Customer Booking | BK-01/02/F01/F02/P01/R01/REQ01/REC01/ALERT01, PAY-RES | 01-02 | fixed/proposed/requested/recurring flows and Hold states |
| 04 | Customer Panel | CUS-01..10, profile, notifications, appointment/request details | 01-03 | customer navigation and state matrix |
| 05 | Stylist Panel | STY-01..11, STY-CUS, schedule, manual booking, portfolio | 01-04 | stylist permissions, no “ثبت انجام شد”, schedule impact preview |
| 06 | Admin Daily | ADM-01..09, ADM-AC, scope, requests, appointments, customer/payment mode | 01-05 | action center vs notification separation, ledger integrity |
| 07 | Admin Management | ADM-10..15, stylists/services/mapping/pricing/schedules | 01-06 | impact previews, immutable service type, BookableFrom |
| 08 | Finance + Content + System | ADM-16/20/21/23/24/25, ADM-NOT, STATE/SYS patterns, KIT promotion | 01-07 | payment matching, notification rules, recovery/system states |
| 09 | Regression + MVC Handoff | full visual/a11y/structure QA, route audit, ASP_PORT_GUIDE, migration review | 01-08 | all gates green; no dead ends or stale routes |

## Recommended execution workflow

Workflow B is recommended: one serialized Foundation/Shell gate, then vertical slices in dependency order, with visual/a11y regression after every shared-component change. Parallel work is safe only inside a phase after its shared contracts are frozen; do not let agents edit shared tokens or shell concurrently.
