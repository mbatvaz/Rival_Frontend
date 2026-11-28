# Component Reuse Matrix

## Implemented reuse

Choose the closest accepted page and reuse its partials, styles or behavior. Supply role-specific routes, content and permissions through the existing interfaces. Use the linked implementation when the same behavior is needed.

| Need | Accepted reference | Runtime owner |
| --- | --- | --- |
| Role shell and navigation | CUS-01, BK-01, STY-02 | [RoleLayout](../src/Views/Shared/_RoleLayout.njk), [mobile dock](../src/Views/Shared/_RoleNav.njk), [customer sidebar](../src/Views/Shared/_CustomerDesktopNav.njk), [staff sidebar](../src/Views/Shared/_StaffSideNav.njk), [navigation motion](../src/wwwroot/js/components/navigation-motion.js) |
| Controls, glass surfaces and typography | CUS-01, CUS-10 | [Controls](../src/wwwroot/css/03-components/controls.css), [tokens](../src/wwwroot/css/00-tokens/) |
| Sheets, feedback and field focus | CUS-03, CUS-06, CUS-10 | [Sheet lifecycle](../src/wwwroot/js/components/sheet.js), [keyboard positioning](../src/wwwroot/js/components/sheet-keyboard.js) |
| Appointment list, history and detail | CUS-01, CUS-03, CUS-04 | [AppointmentHero](../src/Views/Shared/Components/_AppointmentHero.njk), [AppointmentCard](../src/Views/Shared/Components/_AppointmentCard.njk), [history row](../src/Views/Shared/Components/_AppointmentHistoryRow.njk) |
| Requests and notifications | CUS-05, CUS-06, CUS-09 | [RequestCard](../src/Views/Shared/Components/_RequestCard.njk), [detail behavior](../src/wwwroot/js/features/customer/request-detail.js), [NotificationItem](../src/Views/Shared/Components/_NotificationItem.njk) |
| Booking, calendar and checkout | BK-01, BK-F01, BK-F02, BK-REC01 | [Booking dispatcher](../src/wwwroot/js/features/booking/index.js), [calendar partial](../src/Views/Booking/_Calendar.njk), [checkout](../src/wwwroot/js/features/booking/checkout.js) |
| Stylist calendar | STY-02 | [Shared month sheet](../src/wwwroot/js/features/booking/calendar-sheet.js), [stylist calendar](../src/Views/Stylist/Calendar/Index.njk), [personal block sheets](../src/Views/Stylist/Calendar/_Sheets.njk) |
| Form verification and profile editing | AUTH-01, CUS-10 | [OTP](../src/Views/Shared/Components/_Otp.njk), [OTP behavior](../src/wwwroot/js/components/otp.js), [profile forms](../src/wwwroot/js/features/customer/profile-forms.js) |
| Result, empty, loading and motion | PAY-RES, STATE-04, CUS-03 | [StatePage](../src/Views/Shared/Components/_StatePage.njk), [skeleton](../src/wwwroot/css/03-components/skeleton.css), [Motion adapter](../src/wwwroot/js/components/motion.js) |
| Action confirmation toast | STY-01 saved no-show | [Toast surface and entry](../src/wwwroot/css/03-components/toast.css), [Feedback source](../design-export/design-system-v2/components/Feedback/README.md) |
| Portfolio previews and photo editing | PUB-02, CUS-10 | [Gallery rail](../src/wwwroot/js/features/gallery-rail.js), [profile photo editor](../src/wwwroot/js/features/customer/profile-photo.js) |

Look up source and an accepted analogue together with [task context](ai/PROMPT_ROUTING.md#context). Confirm real consumers before changing a shared contract.

## Design-system coverage

Design System v2 maps the groups below to canonical implementations and planned owners. Page variants supply data and state.

| Layer | Canonical component | Used by | Source evidence |
|---|---|---|---|
| Token | tokens / type / motion / elevation | all pages | DS `tokens/tokens.json` |
| Primitive | Button (primary/secondary/danger/pressed/loading/disabled) | all forms and action bars | DS Button; KIT-01-B |
| Primitive | TextField / OTP input | auth, profile, admin forms | DS TextField, OtpInput; AUTH-01 |
| Primitive | Segmented / ChoiceControls | scope, tabs, payment mode, radio cards | DS Segmented; ADM-09, ADM-16 |
| Primitive | StatusBadge / StatusCatalog | appointment, request, payment, notification | DS StatusBadge/StatusCatalog |
| Primitive | GlassMaterial / Card shell | every surface | DS GlassMaterial |
| Shared shell | HeaderDesktop / BottomNav / MoreDrawer | Customer, Stylist, OwnerAdmin | Batch 1 SHELL/MORE; DS Navigation/ShellBars |
| Shared shell | Sheet + Scrim + focus trap | all confirmations/forms/pickers | D10-108; DS Overlays |
| Shared feedback | Toast / Notice / PartialSuccess | all action results | DS Feedback/PartialSuccess; KIT-01 |
| Shared state | StatePage / EmptyStates / Skeleton | all lists and system states | DS StatePage/EmptyStates; Batch 8 |
| Shared data | AppointmentCard / ReservationCard | customer/stylist/admin appointments | DS AppointmentCard/ReservationCard |
| Shared data | RequestCard | customer/stylist/admin requests | DS RequestCard |
| Shared data | CustomerCard / CustomerProfile | customer directories/details | DS CustomerCard/CustomerProfile |
| Shared data | PortfolioCard | public, stylist, admin portfolio | DS PortfolioCard |
| Shared data | NotificationItem | customer/stylist/admin notification centers | DS NotificationItem |
| Shared schedule | WeekStrip / CalendarDayPicker / CalendarRangePicker | booking, calendar, schedule | DS calendar groups |
| Shared booking | PickerCard / BookingFlow | BK-01/02, manual booking | DS PickerCard/BookingFlow |
| Shared booking | HoldTimer / CheckoutSummary / CheckoutTicket | BK-F02, CUS-06, recurring | DS HoldTimer/CheckoutSummary/CheckoutTicket |
| Shared booking | RecurringBooking | BK-REC01 | DS RecurringBooking |
| Shared ops | WorkSchedule / StylistSchedule | STY-08, ADM-15 | DS WorkSchedule/StylistSchedule |
| Shared finance | CreditPayments / WalletLedger / PricingRules | ADM-09, ADM-14, ADM-16 | DS finance groups; D10-171..177 |
| Shared admin | SettingsFinance / ScreensAdmin | ADM-21/24 and admin page compositions | DS groups; Batch 7 |
| Pattern promotion | ImpactPreview (`b3-eff`) | disable/delete/schedule changes | Handoff 08 §6 |
| Pattern promotion | StatePage (`b2-res`) | STATE/PAY-RES/system recovery | Handoff 08 D10-191 |
| Pattern promotion | Radio option raised/sunken | ADM-16, ADM-15, ADM-23 | Handoff 08 §6 |
| Pattern promotion | Field error in sheet | all form sheets | Handoff 08 §6 |

Do not create separate “wallet page”, “announcement page”, “reports page”, or role-specific copies of shared operational pages.

## Phase ownership clarifications (owner-confirmed 2026-11-09)

- `StatePage` base is implemented once in Phase 03 because the booking flow is its first production use. Phase 03 owns booking variants STATE-04..07. Phase 08 adds remaining STATE variants and SYS recovery patterns by composition; it must not rebuild the base.
- `CreditPayments`, `WalletLedger`, `PaymentRow`, and the balance summary are canonical shared finance primitives. Phase 06 implements them for ADM-09; Phase 08 extends the same implementation for ADM-16 matching.
- Batch-specific prefixes (`b2-` through `b7-`, `f-`) are export evidence only. Production components use `rv-*` classes.
