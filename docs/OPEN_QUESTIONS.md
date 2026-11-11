# Open Questions / Decision Gates

Questions below are genuinely unresolved in the supplied source material. Do not convert conservative defaults into owner-approved product rules.

## Still open

| ID | Question | Impact | Conservative implementation default |
|---|---|---|---|
| OQ-01 | Should ADM-21 display hours mirror ADM-15's actual weekly schedule or remain independently editable content? | Content consistency | Read from the ADM-15 fixture; no duplicate write path. |
| OQ-02 | What are the final Persian labels for ADM-24 cancellation/reschedule deadlines? | Copy only | Preserve the current approved canvas labels and isolate the copy for later change. |
| OQ-03 | Should the absence status in STY-01 use warning or danger tone? | Visual semantics | Use warning for the status; use danger for destructive actions. This remains provisional. |
| OQ-04 | May OwnerAdmin edit a customer's profile image? | Permission / audit | Hide the edit action until explicitly approved. |
| OQ-05 | Which official holiday data provider will the backend use? | Backend integration | Use a fixture/adapter interface only; do not add a provider dependency. |
| OQ-06 | Are any legacy More Drawer items beyond the already removed wallet row still intended? | Navigation / shell | Remove stale wallet routes; use the shared bottom sheet for logout confirmation. Verify remaining links against current route inventory. |
| OQ-08 | What final Instagram, Telegram and map URLs replace the approved development samples? | Operational content before launch | Owner supplied phone 09141452321 and explicitly authorized nonreal sample destinations during development (DEC-035). Store reserved .example URLs in the public fixture; do not infer coordinates or real accounts. |

## Resolved

| ID | Resolution | Source |
|---|---|---|
| OQ-07 | Desktop assumptions are resolved by the owner's 2026-11-09 instruction: desktop must be a deliberate page-specific composition derived from the mobile design language, not a direct scale-up. Use the responsive contract in `RIVAL_PROJECT_CONTRACT.md` §6 and require a desktop layout brief before implementation. | Owner instruction 2026-11-09; DEC-013 / DEC-027 |

## Owner note

Phase 01 update (2026-11-10): OQ-01..06 remain open and unchanged. None blocks infrastructure-only work. No permissions, business behavior, labels or holiday provider have been inferred or approved through this implementation. Phase 01 acceptance is tracked in `PROGRESS.md`.

Phase 02 update (2026-11-10): all desktop composition briefs were explicitly approved. OQ-06 remains subject to owner review; current More links follow canonical inventory and all resolve. OQ-08 records absent real public contact content, not a newly invented product rule. No other OQ/DEC business decision is closed by this phase.

The owner's latest message ended with `22-` but contained no text or decision for item 22. No assumption has been made for it. If item 22 was intended to add another requirement, record it here after the owner supplies its content.

Phase 02 review: phone is resolved, and sample social/map links are authorized for development. The final destinations remain content to complete later, not a blocker to these corrections. DEC-034 updates alternate-method presentation without changing authentication policy.

Second Phase 02 review: comments 4 and 10 explicitly resolve the portfolio desktop dialog position and password-page presentation (DEC-037/038). No new content or business question is required for these corrections. OQ-08 sample destinations remain authorized.

Phase 02 acceptance (2026-11-10): the visual/implementation gate is closed by explicit owner approval (DEC-042). OQ-01..06 and final content in OQ-08 retain their documented defaults; acceptance does not resolve these unrelated business/content decisions. Phase 03 start remains explicitly withheld.

Phase 03 update (2026-11-11): the owner approved the revised desktop proposal (DEC-043). The preview uses a fixed calendar fixture for holidays and availability. OQ-05 remains open for backend integration and OQ-08 retains the authorized sample map target. Phase 03 adds no real payment, booking, SMS or holiday-provider behavior.
