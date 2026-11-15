# Design source map

Generated from the immutable manifest and current registry. Each page section lists all candidates, not an invented canonical state selection. Read the matching handoff before choosing a variant.

Common tokens: [design-export/design-system-v2/tokens/tokens.json](<../../design-export/design-system-v2/tokens/tokens.json>). Component sources and ownership: [COMPONENT_CATALOG.md](COMPONENT_CATALOG.md).

Common rules: [implementation](DESIGN_IMPLEMENTATION_CONTRACT.md), [responsive](RESPONSIVE_DESIGN_CONTRACT.md), [motion](MOTION_SPEC.md), [accessibility and QA](QA_CHECKLIST.md). Copy/assets come from the selected exact state HTML and its handoff, never the filename alone.

## PUB-01

Route/context: /. Preview: /. Mapping: mapped.
Implementation: accepted. Template: [src/Views/Public/Home/Index.njk](<../../src/Views/Public/Home/Index.njk>).
Default mobile candidate: [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-01.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-01.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=signed-in.
Fixture: [src/MockData/public/home.json](<../../src/MockData/public/home.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-01-IN.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-01-IN.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-01.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-01.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-01-IN.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-01-IN.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-01.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-01.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## PUB-02

Route/context: /portfolio. Preview: /portfolio/. Mapping: mapped.
Implementation: accepted. Template: [src/Views/Public/Portfolio/Index.njk](<../../src/Views/Public/Portfolio/Index.njk>).
Default mobile candidate: [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=filter, ?state=viewer, ?state=empty, ?state=loading, ?state=error.
Fixture: [src/MockData/public/portfolio.json](<../../src/MockData/public/portfolio.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-E.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-E.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-F.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-F.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-L.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-L.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-V.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-V.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-X.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02-X.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-02.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-E.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-E.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-F.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-F.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-L.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-L.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-V.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-V.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-X.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02-X.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-02.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## PUB-03

Route/context: /booking-rules. Preview: /booking-rules/. Mapping: mapped.
Implementation: accepted. Template: [src/Views/Public/Rules/Index.njk](<../../src/Views/Public/Rules/Index.njk>).
Default mobile candidate: [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-03.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-03.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: [src/MockData/public/rules.json](<../../src/MockData/public/rules.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-03.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/PUB-03.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-03.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/PUB-03.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## AUTH-01

Route/context: /login. Preview: /login/. Mapping: mapped.
Implementation: accepted. Template: [src/Views/Auth/Account/Login.njk](<../../src/Views/Auth/Account/Login.njk>).
Default mobile candidate: [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=otp, ?state=wrong, ?state=expired, ?state=locked, ?state=password, ?state=passkey, ?state=new, ?state=loading, ?state=error.
Fixture: [src/MockData/auth/policy.json](<../../src/MockData/auth/policy.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-B.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-B.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-L.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-L.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-O.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-O.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-P.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-P.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-W.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01-W.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-01.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-B.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-B.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-L.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-L.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-O.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-O.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-P.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-P.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-W.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01-W.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-01.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## AUTH-02

Route/context: post-OTP step. Preview: /_preview/context/auth-02/. Mapping: mapped.
Implementation: accepted. Template: [src/Views/Auth/Account/Complete.njk](<../../src/Views/Auth/Account/Complete.njk>).
Default mobile candidate: [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-02.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-02.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=default, ?state=field-error.
Fixture: [src/MockData/auth/profile.json](<../../src/MockData/auth/profile.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-02-E.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-02-E.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-02.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/AUTH-02.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-02-E.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-02-E.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-02.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/AUTH-02.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## SYS-ACC-01

Route/context: /account-unavailable. Preview: /account-unavailable/. Mapping: mapped.
Implementation: accepted. Template: [src/Views/Auth/Account/Unavailable.njk](<../../src/Views/Auth/Account/Unavailable.njk>).
Default mobile candidate: [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/SYS-ACC-01.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/SYS-ACC-01.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: [src/MockData/auth/profile.json](<../../src/MockData/auth/profile.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/SYS-ACC-01.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/SYS-ACC-01.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/SYS-ACC-01.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/SYS-ACC-01.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-01

Route/context: /customer. Preview: /customer/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-01-A.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-01-A.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-01-EMPTY.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-01-EMPTY.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-01-INACTIVE.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-01-INACTIVE.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-01-A.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-01-A.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-01-EMPTY.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-01-EMPTY.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-01-INACTIVE.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-01-INACTIVE.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/CUS-01-A.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/CUS-01-A.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/CUS-01-EMPTY.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/CUS-01-EMPTY.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/CUS-01-A.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/CUS-01-A.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/CUS-01-EMPTY.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/CUS-01-EMPTY.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-02

Route/context: /customer/book. Preview: /customer/book/. Mapping: composed-from-related-flow.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=loading, ?state=empty, ?state=inactive.
Fixture: [src/MockData/booking/views/cus-02.json](<../../src/MockData/booking/views/cus-02.json>).

Source HTML candidates:


Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-03

Route/context: /customer/appointments. Preview: /customer/appointments/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-EMPTY.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-EMPTY.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-FILTER-PAST.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-FILTER-PAST.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-FILTER.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-FILTER.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-NORESULT.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-NORESULT.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-PAST.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03-PAST.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-03.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-EMPTY.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-EMPTY.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-FILTER-PAST.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-FILTER-PAST.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-FILTER.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-FILTER.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-NORESULT.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-NORESULT.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-PAST.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03-PAST.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-04

Route/context: /customer/appointments/{id}. Preview: /customer/appointments/demo/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-COMP.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-COMP.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-DONE.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-DONE.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-GT24.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-GT24.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-LT24.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-LT24.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-LT3.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-LT3.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-PROP.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-CAN-PROP.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-COMP.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-COMP.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-DONE.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-DONE.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-INACTIVE.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-INACTIVE.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-LT24.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-LT24.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-LT3.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-LT3.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-NOSHOW.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-NOSHOW.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-PKG.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-PKG.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-PROP.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-PROP.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-COMP.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-COMP.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-CONFIRM.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-CONFIRM.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-DONE-LT24.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-DONE-LT24.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-DONE.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-DONE.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-USED-NR.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-USED-NR.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-USED.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-USED.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-WARN.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC-WARN.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-RSC.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-SCXL.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-SCXL.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-STARTED.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04-STARTED.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-04.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-COMP.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-COMP.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-DONE.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-DONE.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-GT24.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-GT24.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-LT24.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-LT24.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-LT3.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-LT3.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-PROP.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-CAN-PROP.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-COMP.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-COMP.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-DONE.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-DONE.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-INACTIVE.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-INACTIVE.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-LT24.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-LT24.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-LT3.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-LT3.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-NOSHOW.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-NOSHOW.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-PKG.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-PKG.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-PROP.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-PROP.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-COMP.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-COMP.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-CONFIRM.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-CONFIRM.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-DONE-LT24.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-DONE-LT24.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-DONE.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-DONE.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-USED-NR.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-USED-NR.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-USED.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-USED.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-WARN.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC-WARN.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-RSC.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-SCXL.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-SCXL.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-STARTED.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04-STARTED.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-04.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-05

Route/context: /customer/requests. Preview: /customer/requests/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05-DONE.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05-DONE.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05-EMPTY.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05-EMPTY.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05-FILTER.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05-FILTER.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05-WAIT.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05-WAIT.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-05.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05-DONE.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05-DONE.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05-EMPTY.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05-EMPTY.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05-FILTER.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05-FILTER.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05-WAIT.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05-WAIT.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-05.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-06

Route/context: /customer/requests/{id}. Preview: /customer/requests/demo/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-B.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-B.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-BOOKED.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-BOOKED.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-CAN-PAY.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-CAN-PAY.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-CAN-REVIEW.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-CAN-REVIEW.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-CXL.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-CXL.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-EXP.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-EXP.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-INACTIVE.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-INACTIVE.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-P-PAY.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-P-PAY.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-P-REVIEW.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-P-REVIEW.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-R-REVIEW.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-R-REVIEW.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-REJ.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-06-REJ.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-B.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-B.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-BOOKED.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-BOOKED.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-CAN-PAY.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-CAN-PAY.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-CAN-REVIEW.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-CAN-REVIEW.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-CXL.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-CXL.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-EXP.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-EXP.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-INACTIVE.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-INACTIVE.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-P-PAY.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-P-PAY.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-P-REVIEW.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-P-REVIEW.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-R-REVIEW.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-R-REVIEW.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-REJ.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-06-REJ.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-07

Route/context: embedded balance. Preview: /_preview/context/cus-07/. Mapping: implied-no-independent-artboard.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:


Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-08

Route/context: /customer/availability-alerts. Preview: /customer/availability-alerts/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-08-ADD-DUP.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-08-ADD-DUP.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-08-ADD.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-08-ADD.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-08-CAN.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-08-CAN.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-08.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-08.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08-ADD-DUP.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08-ADD-DUP.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08-ADD.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08-ADD.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08-CAN.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08-CAN.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-08.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-09

Route/context: /customer/notifications. Preview: /customer/notifications/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-09.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-09.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-09-EMPTY.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-09-EMPTY.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-09-READ.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-09-READ.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-09.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-09.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-09-EMPTY.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-09-EMPTY.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-09-READ.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-09-READ.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-09.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-09.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## CUS-10

Route/context: /customer/profile. Preview: /customer/profile/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-EDIT.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-EDIT.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-PASS.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-PASS.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-PH1.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-PH1.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-PH2.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-PH2.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-PK-DEL.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10-PK-DEL.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10.dc.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/source/CUS-10.dc.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-EDIT.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-EDIT.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-PASS.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-PASS.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-PH1.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-PH1.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-PH2.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-PH2.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-PK-DEL.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10-PK-DEL.html>)
- [design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10.html](<../../design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-10.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-01

Route/context: booking step: service. Preview: /_preview/context/bk-01/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=loading, ?state=empty, ?state=inactive.
Fixture: [src/MockData/booking/views/bk-01.json](<../../src/MockData/booking/views/bk-01.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-01-A.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-01-A.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-01-EMPTY.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-01-EMPTY.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-01-INACTIVE.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-01-INACTIVE.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-01-LOAD.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-01-LOAD.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-A.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-A.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-LOAD.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-LOAD.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-INACTIVE.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-INACTIVE.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-EMPTY.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-01-EMPTY.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-02

Route/context: booking step: stylist. Preview: /_preview/context/bk-02/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=empty.
Fixture: [src/MockData/booking/views/bk-02.json](<../../src/MockData/booking/views/bk-02.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-02-DEF.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-02-DEF.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-02-EMPTY.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-02-EMPTY.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-02-EMPTY.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-02-EMPTY.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-02-DEF.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-02-DEF.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-F01

Route/context: booking step: fixed availability. Preview: /_preview/context/bk-f01/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=closed, ?state=not-yet, ?state=conflict, ?state=taken, ?state=none, ?state=sms.
Fixture: [src/MockData/booking/views/bk-f01.json](<../../src/MockData/booking/views/bk-f01.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-CLOSED.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-CLOSED.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-CONFLICT.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-CONFLICT.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-D.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-D.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-NONE.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-NONE.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-NOTYET.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-NOTYET.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-SMS.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-SMS.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-TAKEN.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F01-TAKEN.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-SMS.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-SMS.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-CONFLICT.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-CONFLICT.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-D.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-D.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-TAKEN.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-TAKEN.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-CLOSED.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-CLOSED.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-NONE.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-NONE.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-NOTYET.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F01-NOTYET.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-F02

Route/context: booking step: fixed summary/payment. Preview: /_preview/context/bk-f02/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=expired, ?state=low, ?state=full-credit, ?state=no-credit, ?state=gateway.
Fixture: [src/MockData/booking/views/bk-f02.json](<../../src/MockData/booking/views/bk-f02.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-A.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-A.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-EXPIRED.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-EXPIRED.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-FULL.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-FULL.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-LT1.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-LT1.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-NOCREDIT.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-F02-NOCREDIT.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-FULL.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-FULL.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-NOCREDIT.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-NOCREDIT.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-LT1.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-LT1.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-EXPIRED.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-EXPIRED.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-A.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-F02-A.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-P01

Route/context: booking step: proposed request. Preview: /_preview/context/bk-p01/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=range.
Fixture: [src/MockData/booking/views/bk-p01.json](<../../src/MockData/booking/views/bk-p01.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-P01-DEF.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-P01-DEF.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-P01-RANGE.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-P01-RANGE.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-P01-RANGE.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-P01-RANGE.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-P01-DEF.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-P01-DEF.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-R01

Route/context: booking step: requested request. Preview: /_preview/context/bk-r01/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: [src/MockData/booking/views/bk-r01.json](<../../src/MockData/booking/views/bk-r01.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-R01-DEF.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-R01-DEF.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-R01-DEF.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-R01-DEF.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-REQ01

Route/context: request result. Preview: /_preview/context/bk-req01/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=proposed, ?state=requested.
Fixture: [src/MockData/booking/views/bk-req01.json](<../../src/MockData/booking/views/bk-req01.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REQ01-P.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REQ01-P.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REQ01-R.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REQ01-R.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REQ01-R.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REQ01-R.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REQ01-P.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REQ01-P.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-REC01

Route/context: recurring fixed booking. Preview: /_preview/context/bk-rec01/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=short, ?state=invalid, ?state=new, ?state=edit, ?state=checkout.
Fixture: [src/MockData/booking/views/bk-rec01.json](<../../src/MockData/booking/views/bk-rec01.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-BAD.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-BAD.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-DA.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-DA.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-DB.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-DB.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-DC.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-DC.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-EDIT.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-EDIT.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-LIST.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-LIST.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-LT3.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-LT3.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-NEW.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-NEW.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-PAY.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-PAY.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-SHEET.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-SHEET.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-V1.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-V1.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-V2.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-REC01-V2.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-V2.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-V2.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-PAY.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-PAY.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-EDIT.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-EDIT.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-DB.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-DB.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-BAD.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-BAD.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-V1.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-V1.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-DC.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-DC.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-NEW.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-NEW.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-SHEET.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-SHEET.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-LT3.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-LT3.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-LIST.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-LIST.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-DA.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-REC01-DA.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## BK-ALERT01

Route/context: availability alert sheet. Preview: /_preview/context/bk-alert01/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=done, ?state=duplicate.
Fixture: [src/MockData/booking/views/bk-alert01.json](<../../src/MockData/booking/views/bk-alert01.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-ALERT01-DEF.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-ALERT01-DEF.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-ALERT01-DONE.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-ALERT01-DONE.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-ALERT01-DUP.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/BK-ALERT01-DUP.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-ALERT01-DUP.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-ALERT01-DUP.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-ALERT01-DONE.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-ALERT01-DONE.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-ALERT01-DEF.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/BK-ALERT01-DEF.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## PAY-RES

Route/context: payment return/result. Preview: /_preview/context/pay-res/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=checking, ?state=review, ?state=failed, ?state=lost, ?state=success.
Fixture: [src/MockData/booking/views/pay-res.json](<../../src/MockData/booking/views/pay-res.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-CHECK.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-CHECK.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-FAIL.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-FAIL.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-LOST.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-LOST.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-OK.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-OK.html>)
- [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-REVIEW.html](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/pages/PAY-RES-REVIEW.html>)

Named screenshots: [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-REVIEW.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-REVIEW.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-OK.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-OK.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-CHECK.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-CHECK.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-FAIL.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-FAIL.png>), [design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-LOST.png](<../../design-export/batches/Rival_Batch2_Full(2)/rival-batch2-full/screenshots/PAY-RES-LOST.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-01

Route/context: /stylist. Preview: /stylist/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-E.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-E.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-M2.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-M2.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-NS.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-NS.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-NS2.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-NS2.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-OFF.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-01-OFF.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/STY-01-E.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/STY-01-E.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/STY-01-M.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/STY-01-M.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/STY-01-E.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/STY-01-E.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/STY-01-M.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/STY-01-M.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-NS2.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-NS2.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-M2.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-M2.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-NS.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-NS.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-OFF.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-OFF.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-E.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-01-E.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-02

Route/context: /stylist/calendar. Preview: /stylist/calendar/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-BLK.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-BLK.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-BLKD.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-BLKD.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-E.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-E.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-HOL.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-HOL.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-HOLA.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-HOLA.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-MON.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-02-MON.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-MON.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-MON.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-HOL.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-HOL.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-BLK.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-BLK.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-E.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-E.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-HOLA.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-HOLA.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-BLKD.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-02-BLKD.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-03

Route/context: /stylist/requests. Preview: /stylist/requests/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-CL.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-CL.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-E.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-E.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-FILTER-CL.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-FILTER-CL.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-FILTER-W.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-FILTER-W.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-FILTER.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-FILTER.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-W.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-03-W.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-FILTER.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-FILTER.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-FILTER-CL.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-FILTER-CL.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-CL.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-CL.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-E.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-E.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-W.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-W.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-FILTER-W.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-03-FILTER-W.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-04

Route/context: request response. Preview: /_preview/context/sty-04/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-C.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-C.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-CAN.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-CAN.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-R.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-R.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-S.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-S.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-T1B.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-T1B.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-TK.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-TK.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-W.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-04-W.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-TK.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-TK.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-CAN.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-CAN.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-C.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-C.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-T1B.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-T1B.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-R.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-R.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-S.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-S.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-W.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-04-W.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-05

Route/context: /stylist/appointments. Preview: /stylist/appointments/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-E.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-E.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-FILTER-UP.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-FILTER-UP.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-FILTER.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-FILTER.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-NR.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-NR.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-PAST.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-05-PAST.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-PAST.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-PAST.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-E.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-E.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-FILTER.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-FILTER.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-NR.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-NR.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-FILTER-UP.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-05-FILTER-UP.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-06

Route/context: /stylist/appointments/{id}. Preview: /stylist/appointments/demo/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-CAN-EDIT.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-CAN-EDIT.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-CAN.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-CAN.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-CXL.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-CXL.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-DONE.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-DONE.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-NS.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-NS.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-NSD.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-NSD.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-PAST.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-PAST.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-PROP-CAN.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-PROP-CAN.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-PROP.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-PROP.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-REQ.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-REQ.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-CONF.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-CONF.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-DONE.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-DONE.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-ERR.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-ERR.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-P-CONF.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-P-CONF.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-P-DONE.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-P-DONE.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-P-ERR.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-P-ERR.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-P.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC-P.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RSC.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RUN.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-RUN.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-SMS.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-06-SMS.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-SMS.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-SMS.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-ERR.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-ERR.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RUN.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RUN.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-CXL.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-CXL.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-DONE.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-DONE.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-CAN.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-CAN.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-PROP-CAN.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-PROP-CAN.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-PAST.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-PAST.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-P-DONE.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-P-DONE.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-CAN-EDIT.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-CAN-EDIT.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-NS.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-NS.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-REQ.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-REQ.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-DONE.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-DONE.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-PROP.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-PROP.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-NSD.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-NSD.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-P-ERR.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-P-ERR.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-P-CONF.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-P-CONF.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-CONF.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-CONF.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-P.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-06-RSC-P.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-07

Route/context: /stylist/manual-booking. Preview: /stylist/manual-booking/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-C.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-C.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-CA.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-CA.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-CN.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-CN.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-CONF.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-CONF.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-ERR.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-ERR.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-O.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-O.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-OFF.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-OFF.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-OK.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-OK.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-S.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-S.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-T.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-T.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-TP.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-07-TP.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-CONF.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-CONF.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-CN.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-CN.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-T.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-T.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-OK.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-OK.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-CA.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-CA.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-S.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-S.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-ERR.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-ERR.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-C.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-C.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-TP.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-TP.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-O.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-O.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-OFF.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-07-OFF.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-08

Route/context: /stylist/schedule. Preview: /stylist/schedule/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-BLK-N.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-BLK-N.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-BLK.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-BLK.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DATE.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DATE.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DAY-OFF.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DAY-OFF.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DAY.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DAY.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DEL-A.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DEL-A.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DEL.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-DEL.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-EX-BLK.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-EX-BLK.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-EX-OFF.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-EX-OFF.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-EX.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-EX.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-HOL.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-HOL.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-HOLA.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-HOLA.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-OFF-H.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-OFF-H.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-OFF.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-OFF.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-PRE.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-PRE.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-PS.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-PS.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-STALE.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-08-STALE.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-HOLA.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-HOLA.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-EX-OFF.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-EX-OFF.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-OFF-H.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-OFF-H.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DATE.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DATE.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DAY.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DAY.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DEL-A.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DEL-A.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-HOL.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-HOL.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-EX-BLK.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-EX-BLK.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-OFF.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-OFF.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-PRE.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-PRE.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DAY-OFF.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DAY-OFF.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-EX.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-EX.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-PS.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-PS.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-BLK.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-BLK.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-STALE.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-STALE.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DEL.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-DEL.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-BLK-N.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-08-BLK-N.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-09

Route/context: /stylist/portfolio. Preview: /stylist/portfolio/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-DEL.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-DEL.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-E.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-E.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-EDIT-H.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-EDIT-H.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-EDIT.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-EDIT.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-NEW.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-09-NEW.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-EDIT-H.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-EDIT-H.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-EDIT.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-EDIT.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-E.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-E.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-NEW.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-NEW.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-DEL.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-09-DEL.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-10

Route/context: /stylist/notifications. Preview: /stylist/notifications/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-10-E.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-10-E.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-10-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-10-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-10-READ.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-10-READ.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-10-READ.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-10-READ.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-10-E.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-10-E.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-10-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-10-M.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-11

Route/context: /stylist/profile. Preview: /stylist/profile/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-11-EDIT.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-11-EDIT.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-11-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-11-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-11-PASS.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-11-PASS.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-11-PK-DEL.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-11-PK-DEL.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-11-EDIT.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-11-EDIT.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-11-PASS.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-11-PASS.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-11-PK-DEL.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-11-PK-DEL.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-11-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-11-M.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STY-CUS

Route/context: /stylist/customers. Preview: /stylist/customers/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-D-PAST.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-D-PAST.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-D-RQ.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-D-RQ.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-D.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-D.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-E.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-E.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-M.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-M.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-NR.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-NR.dc.html>)
- [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-SMS.dc.html](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/canvas/STY-CUS-SMS.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-NR.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-NR.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-SMS.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-SMS.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-M.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-M.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-D.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-D.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-E.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-E.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-D-RQ.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-D-RQ.dc.html.png>), [design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-D-PAST.dc.html.png](<../../design-export/batches/Rival_Batch4_Stylist_Canvas(2)/Rival_Batch4_Stylist_Canvas/previews/STY-CUS-D-PAST.dc.html.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-01

Route/context: /admin. Preview: /admin/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-01-ANS.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-01-ANS.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-01-E.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-01-E.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-01-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-01-M.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-01-ANS.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-01-ANS.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-01-E.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-01-E.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-01-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-01-M.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-02

Route/context: /admin/calendar. Preview: /admin/calendar/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-02-BLK.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-02-BLK.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-02-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-02-M.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-02-MENU.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-02-MENU.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-02-ONE.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-02-ONE.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-02-ONE.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-02-ONE.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-02-MENU.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-02-MENU.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-02-BLK.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-02-BLK.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-02-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-02-M.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-03

Route/context: /admin/requests. Preview: /admin/requests/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-CL-AM.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-CL-AM.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-CL.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-CL.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-F.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-F.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-M.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-PROP.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-PROP.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-WAIT-AM.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-WAIT-AM.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-WAIT.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-03-WAIT.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-CL.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-CL.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-CL-AM.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-CL-AM.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-PROP.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-PROP.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-WAIT-AM.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-WAIT-AM.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-M.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-WAIT.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-WAIT.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-F.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-03-F.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-04

Route/context: /admin/requests/{id}. Preview: /admin/requests/demo/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-P-V.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-P-V.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-CXA.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-CXA.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-CXL.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-CXL.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-DONE.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-DONE.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-ERR.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-ERR.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-FEE.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-FEE.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-M.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-REJ.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-REJ.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-S.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-S.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-STY.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-STY.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-TIME.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-04-R-TIME.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-CXA.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-CXA.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-ERR.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-ERR.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-DONE.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-DONE.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-TIME.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-TIME.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-STY.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-STY.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-M.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-REJ.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-REJ.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-S.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-S.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-P-V.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-P-V.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-CXL.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-CXL.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-FEE.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-04-R-FEE.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-05

Route/context: /admin/appointments. Preview: /admin/appointments/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-05-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-05-M.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/ADM-05-M.dc.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/source/ADM-05-M.dc.html>)
- [design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/ADM-05-M.html](<../../design-export/batches/Rival_Batch1_Full(2)/rival-batch1-full/pages/ADM-05-M.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-05-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-05-M.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-06

Route/context: /admin/appointments/{id}. Preview: /admin/appointments/demo/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-06-CHG.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-06-CHG.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-06-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-06-M.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-06-MSG.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-06-MSG.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-06-REC.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-06-REC.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-06-MSG.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-06-MSG.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-06-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-06-M.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-06-CHG.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-06-CHG.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-06-REC.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-06-REC.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-07

Route/context: /admin/manual-booking. Preview: /admin/manual-booking/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-C.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-C.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-CONF.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-CONF.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-ERR.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-ERR.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-PRE.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-PRE.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-S.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-S.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-STY.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-07-STY.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-STY.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-STY.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-S.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-S.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-ERR.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-ERR.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-CONF.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-CONF.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-PRE.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-PRE.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-C.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-07-C.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-08

Route/context: /admin/customers. Preview: /admin/customers/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-08-F.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-08-F.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-08-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-08-M.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-08-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-08-M.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-08-F.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-08-F.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-09

Route/context: /admin/customers/{id}. Preview: /admin/customers/demo/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-ADJ-ERR.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-ADJ-ERR.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-ADJ.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-ADJ.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-DEL.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-DEL.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-EDIT.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-EDIT.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-INACT.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-INACT.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-PAST.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-PAST.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-PAY-E.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-PAY-E.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-PAY-LED.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-PAY-LED.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-PAY.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-PAY.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-RQ.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M-RQ.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-M.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-OFF.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-OFF.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-PS.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-09-PS.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-09-REV.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-09-REV.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-DEL.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-DEL.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-RQ.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-RQ.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-PAY-LED.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-PAY-LED.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-PAST.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-PAST.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-EDIT.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-EDIT.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-ADJ.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-ADJ.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-PAY-E.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-PAY-E.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-INACT.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-INACT.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-PS.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-PS.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-OFF.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-OFF.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-ADJ-ERR.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-ADJ-ERR.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-PAY.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-09-M-PAY.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-10

Route/context: /admin/stylists. Preview: /admin/stylists/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-M.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-M.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-NEW-ERR.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-NEW-ERR.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-NEW-M.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-NEW-M.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-NEW-OK.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-NEW-OK.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-OFF.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-10-OFF.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-NEW-M.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-NEW-M.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-NEW-OK.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-NEW-OK.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-NEW-ERR.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-NEW-ERR.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-M.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-M.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-OFF.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-10-OFF.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-11

Route/context: /admin/stylists/{id}. Preview: /admin/stylists/demo/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-DEL.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-DEL.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-EDIT.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-EDIT.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-EX.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-EX.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-INACT.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-INACT.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-M.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-M.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-MAP-RM.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-MAP-RM.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-MAP.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-MAP.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-OFF.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-OFF.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-PS.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-PS.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-SCH.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-11-SCH.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-M.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-M.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-DEL.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-DEL.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-EDIT.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-EDIT.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-MAP-RM.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-MAP-RM.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-SCH.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-SCH.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-PS.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-PS.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-MAP.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-MAP.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-EX.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-EX.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-INACT.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-INACT.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-OFF.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-11-OFF.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-12

Route/context: /admin/services. Preview: /admin/services/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-M.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-M.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-C.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-C.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-CMP.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-CMP.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-ERR.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-ERR.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-M.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-M.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-OK.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-NEW-OK.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-OFF.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-12-OFF.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-M.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-M.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-CMP.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-CMP.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-C.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-C.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-OFF.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-OFF.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-OK.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-OK.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-ERR.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-NEW-ERR.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-M.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-12-M.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-13

Route/context: /admin/services/{id}. Preview: /admin/services/demo/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-C-OFF.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-C-OFF.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-C.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-C.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-DEL.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-DEL.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-EDIT.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-EDIT.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-F-PAT.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-F-PAT.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-F.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-F.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-MAP-RM.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-MAP-RM.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-MAP.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-MAP.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-OFF.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-OFF.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-P.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-P.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-PATE.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-13-PATE.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-DEL.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-DEL.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-MAP-RM.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-MAP-RM.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-C-OFF.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-C-OFF.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-MAP.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-MAP.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-EDIT.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-EDIT.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-F-PAT.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-F-PAT.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-C.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-C.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-P.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-P.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-PATE.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-PATE.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-OFF.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-OFF.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-F.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-13-F.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-14

Route/context: /admin/pricing. Preview: /admin/pricing/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-A.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-A.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-BASE.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-BASE.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-CF-A.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-CF-A.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-CF-P.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-CF-P.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-CF-S.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-CF-S.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-OV-DEL.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-OV-DEL.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-OV-ERR.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-OV-ERR.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-OV-NEW.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-OV-NEW.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-OVR.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-OVR.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-PK.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-PK.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-STY.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-14-STY.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-PK.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-PK.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-CF-S.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-CF-S.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-OV-DEL.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-OV-DEL.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-STY.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-STY.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-OV-ERR.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-OV-ERR.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-CF-P.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-CF-P.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-CF-A.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-CF-A.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-OV-NEW.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-OV-NEW.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-BASE.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-BASE.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-A.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-A.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-OVR.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-14-OVR.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-15

Route/context: /admin/schedules. Preview: /admin/schedules/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-A.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-A.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-DEL.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-DEL.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-ERR.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-ERR.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-NEW.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-NEW.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-STEP1.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-STEP1.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-STY.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-STY.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-SVC.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-BF-SVC.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-HOL-NEW.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-HOL-NEW.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-HOL.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-HOL.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-PRE.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-PRE.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-SAL-DAY.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-SAL-DAY.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-SAL.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-SAL.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-STY-EX.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-STY-EX.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-STY-PK.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-STY-PK.dc.html>)
- [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-STY.dc.html](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/canvas/ADM-15-STY.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-NEW.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-NEW.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-PRE.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-PRE.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-HOL.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-HOL.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-STY.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-STY.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-SVC.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-SVC.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-HOL-NEW.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-HOL-NEW.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-SAL-DAY.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-SAL-DAY.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-DEL.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-DEL.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-STY-PK.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-STY-PK.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-SAL.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-SAL.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-STY-EX.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-STY-EX.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-A.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-A.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-STEP1.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-STEP1.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-STY.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-STY.png>), [design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-ERR.png](<../../design-export/batches/Rival_Batch6_Salon_Management(2)/Rival_Batch6_Salon_Management/previews/ADM-15-BF-ERR.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-16

Route/context: /admin/payments. Preview: /admin/payments/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-A.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-A.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-DONE.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-DONE.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-E.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-E.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-F.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-F.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-FS.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-FS.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-NO.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-NO.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-OK0.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-OK0.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-OK1.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-OK1.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-OK2.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-OK2.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-RV.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-16-RV.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-AC

Route/context: /admin/action-center. Preview: /admin/action-center/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-AC-E.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-AC-E.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-AC-F.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-AC-F.dc.html>)
- [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-AC-M.dc.html](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/canvas/ADM-AC-M.dc.html>)

Named screenshots: [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-AC-F.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-AC-F.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-AC-E.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-AC-E.png>), [design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-AC-M.png](<../../design-export/batches/Rival_Batch5_Admin_Daily(3)/Rival_Batch5_Admin_Daily/previews/ADM-AC-M.png>)

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-NOT

Route/context: /admin/notifications. Preview: /admin/notifications/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-A.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-A.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-ACT.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-ACT.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-DEL.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-DEL.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-NEW-P.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-NEW-P.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-NEW.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-NEW.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-PRE.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-PRE.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-PUB-E.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-PUB-E.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-PUB.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-PUB.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-RCP.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-NOT-RCP.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-20

Route/context: /admin/portfolio. Preview: /admin/portfolio/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-A.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-A.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-DEL.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-DEL.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-E.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-E.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-FS.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-FS.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-NEW.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-20-NEW.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-21

Route/context: /admin/settings. Preview: /admin/settings/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-A.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-A.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-B.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-B.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-ERR.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-ERR.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-F-HRS.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-F-HRS.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-F-IMG.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-F-IMG.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-F.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-21-F.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-23

Route/context: /admin/sms. Preview: /admin/sms/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-CONF.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-CONF.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-M.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-M.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-PICK.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-PICK.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-PS.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-PS.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-RES.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-23-RES.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-24

Route/context: /admin/settings/booking. Preview: /admin/settings/booking/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-24-A.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-24-A.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-24-B.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-24-B.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-24-ERR.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-24-ERR.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-24-F.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-24-F.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## ADM-25

Route/context: /admin/profile. Preview: /admin/profile/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-25-A.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-25-A.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-25-EDIT.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-25-EDIT.dc.html>)
- [design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-25-PK-DEL.dc.html](<../../design-export/batches/Rival_Batch7_Artboards(2)/Rival_Batch7_Artboards/artboards/ADM-25-PK-DEL.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STATE-01

Route/context: Shared context (no independent product route). Preview: /_preview/context/state-01/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-01-ADM.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-01-ADM.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-01-CUS.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-01-CUS.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-01-STY.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-01-STY.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STATE-02

Route/context: Shared context (no independent product route). Preview: /_preview/context/state-02/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-02-CUS.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-02-CUS.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-02-STY.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-02-STY.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STATE-03

Route/context: Shared context (no independent product route). Preview: /_preview/context/state-03/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-03-EXP.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-03-EXP.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-03-REJ.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-03-REJ.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STATE-04

Route/context: Shared context (no independent product route). Preview: /_preview/context/state-04/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-04.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-04.dc.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: [src/MockData/booking/views/state-04.json](<../../src/MockData/booking/views/state-04.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-04.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-04.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STATE-05

Route/context: Shared context (no independent product route). Preview: /_preview/context/state-05/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-05.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-05.dc.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: [src/MockData/booking/views/state-05.json](<../../src/MockData/booking/views/state-05.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-05.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-05.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STATE-06

Route/context: Shared context (no independent product route). Preview: /_preview/context/state-06/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=returned.
Fixture: [src/MockData/booking/views/state-06.json](<../../src/MockData/booking/views/state-06.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-06-DONE.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-06-DONE.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-06-LOST.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-06-LOST.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STATE-07

Route/context: Shared context (no independent product route). Preview: /_preview/context/state-07/. Mapping: mapped.
Implementation: in-progress. Template: [src/Views/Booking/Index.njk](<../../src/Views/Booking/Index.njk>).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: ?state=gateway, ?state=sms, ?state=map, ?state=otp.
Fixture: [src/MockData/booking/views/state-07.json](<../../src/MockData/booking/views/state-07.json>).

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-07-GW.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-07-GW.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-07-MAP.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-07-MAP.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-07-OTP.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-07-OTP.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-07-SMS.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-07-SMS.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## STATE-08

Route/context: Shared context (no independent product route). Preview: /_preview/context/state-08/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-08.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-08.dc.html>). Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-08.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/STATE-08.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## SYS-SESSION

Route/context: Shared context (no independent product route). Preview: /_preview/context/sys-session/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-SESSION-A.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-SESSION-A.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-SESSION-BACK.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-SESSION-BACK.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-SESSION-OTP.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-SESSION-OTP.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## SYS-RO

Route/context: Shared context (no independent product route). Preview: /_preview/context/sys-ro/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-RO-CUS.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-RO-CUS.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-RO-STY.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-RO-STY.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## SYS-OFFLINE

Route/context: Shared context (no independent product route). Preview: /_preview/context/sys-offline/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-OFFLINE-FULL.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-OFFLINE-FULL.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-OFFLINE-RETRY.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-OFFLINE-RETRY.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-OFFLINE-TOAST.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/SYS-OFFLINE-TOAST.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.

## KIT-01

Route/context: Shared context (no independent product route). Preview: /_preview/context/kit-01/. Mapping: mapped.
Implementation: unassigned. Template: none (placeholder).
Default mobile candidate: not uniquely selected. Reference capture: 390×844; verify the source canvas dimensions before pixel comparison.
Desktop: see approved briefs in docs-work/desktop-layouts; absence is not approval. No desktop reference is inferred from filenames.
Runtime states: default / consult handoff.
Fixture: none; later phase owns content.

Source HTML candidates:

- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-A.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-A.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-B.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-B.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-C.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-C.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-D.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-D.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-E.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-E.dc.html>)
- [design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-F.dc.html](<../../design-export/batches/Rival_Batch08_Artboards(2)/Rival_Batch08/project/KIT-01-F.dc.html>)

Named screenshots: none verified; render exact HTML

Per-state component, copy, asset, viewport, responsive and motion selections must be completed in the [page spec](templates/page-spec.md) for the assigned page; unresolved sources remain gaps.
