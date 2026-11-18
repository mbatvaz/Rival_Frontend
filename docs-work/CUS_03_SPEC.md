# CUS-03 implementation specification

## Current owner revision (DEC-075)

[Calendar layering follow-up](CUS_03_OWNER_FEEDBACK_2026-11-17.md#لایه-تقویم-و-خوانایی-تاریخ-dec-075) keeps the filter visibly rendered beneath its overlaid calendar while making that parent inert/ARIA-hidden. It adds space-3 between month controls and days, and increases appointment day/time to 26/14px. This changes presentation only; DEC-074 filter semantics remain current.

## Previous owner revision (DEC-074)

[Filter interaction and motion follow-up](CUS_03_MOTION_2026-11-17.md) adds a bounded view-radio surface, native multi-select status/service/stylist groups with exclusive “all”, whole-field calendar opening, an unbordered clear action, borderless calendar icons and customer-scoped tap-highlight suppression. Date range remains the only single-select group. Nested calendar return is static and initial appointment entry follows fixture/DOM order. This supersedes the single-value filter and geometric appointment-order details below without changing the common-filter/date-range/desktop layout decisions.

## Previous owner revision (DEC-073)

[Seven annotations and popup specification](CUS_03_OWNER_FEEDBACK_2026-11-17.md) supersede tab-specific filter groups, locked today, the original segmented buttons and the two-column cap below. Both views share status/service/stylist/range/from/to, retain them across view changes and reload/Back, validate ordered Jalali boundaries, and reuse the Phase 03 calendar for each endpoint. Desktop tools sit beside the bell; native radios and bounded state cards apply. No booking/payment writes or additional page contexts. [Current desktop brief](desktop-layouts/CUS-03.md).

Assigned Phase 04 continuation, owner 2026-11-17 / DEC-072. Route `/customer/appointments/`; CUS-04 detail links remain registered placeholders in this review slice. Phase 03 acceptance is unchanged. Domain/design authority: Batch 3 brief §4 and consolidated Handoff 06 D10-41/42/45/59/60. No new business permission or financial rule.

Exact mobile sources: `design-export/batches/Rival_Batch3_Customer_Panel_HTML(2)/Rival_Batch3_Customer_Panel_HTML/CUS-03{,-PAST,-FILTER,-FILTER-PAST,-EMPTY,-NORESULT}.html`. Each `.rv-board` was rendered at 390px, DPR=1; 844px default/filter/empty/no-result, 900px past. Source images are local and already represented in the public/booking asset catalogs. Preserve Persian copy and numerical dates from these sources.

States: default three future records; `?tab=history` or `?state=past` five historical records; `?state=filter` / `filter-past` opens the applicable shared sheet; `?state=empty` has zero records; `?state=noresult` selects history, absence/Sina/recent filters with zero matches. `?state=loading` and `?state=error` exercise adapter feedback; `?state=inactive` keeps read-only list navigation available. No speculative list writes.

Data: `customer/appointments.json` owns records, status text, date boundaries and filter options. Runtime goes through `core/api.js`. Build uses the same fixture for initial HTML. Filter query parameters (`tab`, `service`, `stylist`, `status`, `range`, `boundary`) support reload/back/forward; unsupported values fall back conservatively. Jalali input normalizes Persian/Arabic digits, validates date structure and the relevant bound.

Reuse: existing role/shell/dock/More/logout; shared `_CustomerDesktopNav`; booking-context card/media and recurring date/person vocabulary; canonical `_AppointmentCard` adds a list-only status. History uses `_AppointmentHistoryRow`. One extra role-layout block hosts page sheets without copying lifecycle. Initial record motion uses the existing list-entry module. [Desktop and responsive specification](desktop-layouts/CUS-03.md) is an owner-authorized review preview; not accepted composition.

Semantics: h1, tablist with arrow/Home/End support, labelled panels, native fieldsets/radios, status announcements, inline error with focus, 44px targets, fixed filter opener with shared focus restoration. No nested vertical scroll; compact filter groups wrap. Static source dates are deliberately not rolled to execution date. All original exports remain read-only. Actual checks and deviations go in `CUS_03_REVIEW_2026-11-17.md`.
