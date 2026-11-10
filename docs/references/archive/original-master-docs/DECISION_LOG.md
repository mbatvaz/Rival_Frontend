> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Decision Log

| ID | Decision | Status | Evidence / implication |
|---|---|---|---|
| DEC-001 | Owner decisions and Current Truth outrank stale handoff tables | Confirmed | Docs README; Phase 8 current truth |
| DEC-002 | Front-end is plain HTML/CSS/Vanilla JS with Razor-shaped templates | Confirmed | Frontend Architecture decision; kickstart CLAUDE |
| DEC-003 | Three human roles; OwnerAdmin also performs stylist work through one shell and Scope | Confirmed | Design Common §7; Phase 8 IA |
| DEC-004 | Fixed, Proposed, Requested are distinct booking flows; Requested is manager-composed multi-service | Confirmed | Phase 1/2/8 handoffs |
| DEC-005 | Manual booking Override never requires a reason; forbidden conflicts still cannot be overridden | Confirmed | Owner decision 2026-10-22 |
| DEC-006 | ADM-09 owns customer payments/ledger/adjustment/reversal sheets; ADM-16 owns payment matching | Confirmed | Owner decision D10-171..177 |
| DEC-007 | ADM-17 Reports, ADM-18 Wallet routes, ADM-22 Announcement route are removed/replaced | Confirmed | Phase 8 Current Truth; Handoff 08 |
| DEC-008 | ADM-AC is the only new independent IA route; failures are notifications, not actions | Confirmed | Phase 8-1 review |
| DEC-009 | All modals/pickers/confirmations are bottom sheets; no centered dialog | Confirmed for implementation; legacy canvases pending sync | D10-108; Handoff 08 |
| DEC-010 | OTP is 5 digits, 2 min validity, 5 attempts, resend after 60s; lock covers all login methods | Confirmed; canvas sync required | D10-207, D10-210, D10-211 |
| DEC-011 | Automatic SMS copy is immutable in UI settings | Confirmed | D10-206 |
| DEC-012 | OwnerAdmin manual booking Override is audited but no explanatory field is collected | Confirmed | D10-204/owner closure + manual booking decision |
| DEC-013 | Desktop breakpoints 768/1024, desktop More contains bottom-nav destinations, sheets stay bottom attached | Inferred/assumed | Architecture decision §2.7; validate once with owner |
| DEC-014 | ADM-21 displayed hours vs ADM-15 actual schedule | Requires User Decision | Handoff 08 §9 open item; use ADM-15 as canonical data in mock |
| DEC-015 | ADM-24 final labels | Requires User Decision | Handoff 08 §9; keep labels from current canvas and isolate copy |
| DEC-016 | Absence status tone in STY-01 | Requires User Decision | Handoff 08 §7; default to danger for destructive action, warning for state |
| DEC-017 | Customer profile image edit by admin | Requires User Decision | Handoff 08 §9; hide destructive edit until decided |
| DEC-018 | Official holiday data provider | Deferred to Backend | Handoff 08 §9; preview uses fixture, UI exposes no source detail |
| DEC-019 | Legacy MORE drawer cleanup (wallet row and centered logout dialog) | Non-blocking implementation decision | remove stale wallet route; migrate confirmation to sheet in shared shell |
