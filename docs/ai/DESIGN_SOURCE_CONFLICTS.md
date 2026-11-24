# Design and instruction conflicts

Reviewed 2026-11-14. Latest owner instruction controls scope. Exact page evidence governs design within verified architecture and confirmed product decisions.

## CUS-08 released history pairing

Batch 3 CUS-08 names Sina for the released haircut alert. The demo catalog includes the pairing, and CUS-08 opens time selection with both values. The owner accepted this behavior under DEC-082. [Accepted brief](../../docs-work/desktop-layouts/CUS-08.md).

## C-17 — More-list scrolling is now explicitly authorized; radio/header request reversed

DEC-065 directly overrides DEC-064's desktop radios/profile header and its document-scrolling More. Restore ordinary links and the previous home header, move salon notices under the left tools, hide the mobile More header and allow vertical scrolling only in its direct list. Structure lint permits that exact selector/file alongside the existing recurring editor; no general scroll exemption is added. [Cause, evidence and focused resize/scroll checks](../../docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md).

## C-16 — Owner More/dock references supersede generic bottom-sheet and anonymous-header rules

DEC-064 explicitly requests the provided MORE-CUS left drawer and grouped options, active-label staged dock motion and profile/name/phone in the customer header. The old all-bottom-sheet description and Navigation README's identity-only-in-More statement do not govern this assigned correction. Keep other-role More, confirmation sheets and the accepted PortfolioViewer exception unchanged; reuse Sheet lifecycle and the route-motion owner. [Sources, comparisons and tests](../../docs-work/PHASE_04_OWNER_FEEDBACK_2026-11-16.md).

## C-15 — Implementation Phase 04 versus historical product-phase numbering

The current [implementation package](../../phases/PHASE_04_Customer_Panel/README.md) assigns Customer Panel, but [its linked historical handoff](../references/phases/Rival_Phase_04_AI_Handoff.md) is titled nonfunctional requirements. Use the current package for scope, [Batch 3](../references/design/Rival_Design_Batch_03_Customer_Panel.md) and exact final CUS artboards for page rules, and confirmed decisions for product invariants. Do not implement infrastructure/NFR projects or assume that the historical next phase is authorized. DEC-062 starts only current Customer Panel. [Task selections and deviations](../../docs-work/PHASE_04_IMPLEMENTATION_FA.md).

## C-01 — ASP.NET description versus current source

Owner attachment versus [contract](../RIVAL_PROJECT_CONTRACT.md), [package](../../package.json), [Views](../../src/Views/). No csproj/cshtml/Areas or .NET build exists. Preserve build-time Nunjucks/native CSS/modules and Razor mapping. The attachment asks to detect/preserve the real stack; do not create a backend.

## C-02 — All-bottom-sheets versus viewer exception

Prior root wording versus [DEC-037](../DECISION_LOG.md), [viewer](../../src/Views/Shared/Components/_PortfolioViewer.njk). Older wording could undo accepted desktop behavior. Root/QA skill now name the centered PortfolioViewer from 1024px; other overlays stay bottom sheets.

The older blanket sentence in contract §6 and active master/alignment prompts was reconciled with the contract's later device-review exception. This corrects documentation to an existing owner decision, without changing policy or runtime.

## C-03 — No nested scroll versus recurring editor

[Extraction](../DESIGN_SYSTEM_EXTRACTION.md), prior QA skill versus [owner review](../../docs-work/REVIEW_2026-11-12_FA.md), [sheet CSS](../../src/wwwroot/css/04-pages/booking-recurring-sheet.css). Permit only the approved mobile BK-REC01 editor with visible header. No generic scroll panels authorized.

The accepted recurring editor follows the narrow exception above. Phase 03 scope and acceptance are recorded in the [phase package](../../phases/PHASE_03_Customer_Booking/README.md).

## C-04 — Archived font/navigation/stack instructions

[Tokens](../../design-export/design-system-v2/tokens/tokens.json), [v2 README](../../design-export/design-system-v2/README.md) versus [contract](../RIVAL_PROJECT_CONTRACT.md)/[decisions](../DECISION_LOG.md). Archive lists extra widths/weights and legacy navigation/tools. Only normal Yekan Bakh 300/400/600, local SVGs and current routes/owner decisions apply. Keep originals read-only; no archived frameworks/wallet routes.

## C-05 — Motion literals versus token-only policy

[motion.css](../../src/wwwroot/css/05-utilities/motion.css) versus [tokens](../../design-export/design-system-v2/tokens/tokens.json)/[contract](../RIVAL_PROJECT_CONTRACT.md). 320/180/220ms are noncanonical; 380/240ms duplicate tokens. Normalizing changes existing behavior. Record debt; defer runtime changes to scoped motion correction with browser regression. No new tokens approved.

Resolved by the owner-requested Phase 01–02 refresh on 2026-11-14: shared timings now use existing tokens, with CSS entry and a token-driven Web Animations exit. The optional cross-document opt-in was removed after its skipped-transition error was reproduced in the unsupported-API check. See [motion contract](MOTION_SPEC.md) and [refresh report](../../docs-work/PHASE_01_02_REFRESH_FA.md). No new token is approved.

## C-06 — Missing independent evidence

[Manifest](../../design-export/MANIFEST.json) and [inventory](../PAGE_INVENTORY.md): CUS-02 composes booking, CUS-07 is embedded balance with no independent route. Many screenshots/selectors are null. Preserve gaps; use exact related handoff/components/rendered source, never invented pages/selectors/desktop sources. Per-state selection remains required.

## C-07 — Duplicate historical docs

[Handoffs](../references/phases/) and [packages](../../phases/) contain retained copies, with additional design-system/batch evidence. Preserve provenance; contract/decisions/source manifest establish authority. New docs link to existing owners rather than destructively merge original evidence. Byte-identical groups are in [audit data](design-audit.json); duplication does not authorize deletion.

## C-08 — BK-01 desktop brief versus current capture

[BK-01 brief](../../docs-work/desktop-layouts/BK-01.md) describes a three-column landscape-card grid. Fresh [1280 capture](../../tests/screens/phase03/root/BK-01-1280.png) shows four portrait cards in the first row and a fifth below, with repeat-booking sidebar and desktop role navigation. Later [owner review](../../docs-work/REVIEW_2026-11-12_FA.md) records portrait service/stylist cards, but this audit does not establish specific approval of four columns. Disposition: record existing brief/runtime drift for Phase 03 review; no runtime correction or new owner acceptance is inferred. Source comparisons are observations, not a blanket fidelity pass.

## C-09 - Owner element review supersedes historical presentation

DEC-048 directly replaces raised selection, one-shot home steps, landscape desktop image crops, explanatory panels, visible demo banners and the sticky recurring content header. Only the mobile editor handle stays fixed; title/description/close scroll with content. Simulation remains behind the same API boundary. [Evidence and five comparisons](../../docs-work/OWNER_FEEDBACK_2026-11-14.md). Navigation wording awaits clarification; no new navigation rule is inferred.

## C-10 - BK-REQ01 default hid the distinct proposed result

The previous review-list deduplication treated Proposed as the parent default. Exact BK-REQ01-R has no time/detail receipt; BK-REQ01-P includes preferred day and day-part. DEC-050 explicitly resolves the default as Requested and restores Proposed as an independently reviewable variant. [Source and test evidence](../../docs-work/BK_REQ01_RESULT_CORRECTION.md).


## C-11 - Compact booking photos and single-line overflow supersede prior presentation

DEC-053 directly reverses the portrait override for desktop booking context and checkout photos, removes empty-choice headings and unselected-time helper copy, and requests moving single-line overflow across product pages. Reuse horizontal mobile context cards on desktop and restore the short 3:1 checkout photo. Historical artboards and prior owner notes remain evidence, while the latest explicit request controls these differences. [Source comparisons and motion/accessibility record](../../docs-work/BOOKING_LAYOUT_CORRECTIONS_2026-11-15.md). No phase acceptance is implied.


## C-12 - Correct overly broad interpretation of overflow feedback

DEC-054 restores ordinary wrapping for prose and headings. Only variable labels in compact cards explicitly opt into motion. The earlier global treatment recorded under C-11 was an implementation error, not an approved replacement of prose layout. [Scope and evidence](../../docs-work/OVERFLOW_CARD_SCOPE_2026-11-15.md).


## C-13 - Latest booking review supersedes tight rail spacing and duplicate state entries

DEC-055 increases mobile shadow/pager/nav clearance and clarifies the right-to-left shine, image radii/mask, mobile selection and payment wrapping. PAY-RES owns the consolidated payment review states; map/OTP designs are removed. Legacy contexts remain aliases. [Source comparisons](../../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).


## C-14 - Latest owner requires desktop calendar selection on mobile

DEC-057 supersedes the mobile ink-selected interpretation with the existing approved desktop raised-white/inset-available pill states. All widths now share the same rules and native radio semantics. [Parity evidence](../../docs-work/BOOKING_REVIEW_POLISH_2026-11-15.md).
