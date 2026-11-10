> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Open Questions / Decision Gates

These are the remaining owner decisions found in the sources. They do not block Foundation or public/auth work. Until answered, use the conservative default in the last column.

| ID | Question | Impact | Conservative default |
|---|---|---|---|
| OQ-01 | Should ADM-21 display hours mirror ADM-15 actual weekly schedule or remain editable content? | content consistency | read from ADM-15 fixture; no duplicate write |
| OQ-02 | What final Persian labels should ADM-24 use for cancellation/reschedule deadlines? | copy only | preserve current approved canvas labels |
| OQ-03 | Should “عدم حضور” use warning or danger tone in STY-01? | visual semantics | warning state + danger action |
| OQ-04 | May OwnerAdmin edit a customer profile image? | permission | no image edit action until explicit approval |
| OQ-05 | Which holiday data provider will Backend use? | data integration | fixture/adapter interface only; no provider dependency |
| OQ-06 | Should old MORE drawers be updated in this front-end pass? | shell regression | remove stale wallet item and use shared sheet logout |
| OQ-07 | Confirm desktop assumptions (More menu contents, 560px sheet, 768/1024 breakpoints) | responsive behavior | implement architecture decision defaults and record visual review |

No critical security/permission/transaction ambiguity remains for the implementation package; OQ-04 is the only item that should gate a destructive permission UI.
