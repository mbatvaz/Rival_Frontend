# Component Reuse Matrix

Design System v2 contains 51 component groups. The implementation should expose one canonical HTML/CSS/JS implementation per row below; page variants only configure data and state.

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

Phase 02 review: reusable native primitives now include Glass/IconTile (`materials.css`), editable five-cell Otp (`_Otp.njk`, `components/otp.js`), PolicyWindow (`_PolicyWindow.njk`), portfolio feedback/skeleton and auth notice styles. Sheet preserves an inert visible background. Future phase owners should reuse these primitives; canonical StatePage ownership remains Phase 03.

Second Phase 02 review: PortfolioViewer has a centered desktop variant (DEC-037) and reuses gallery-rail.js for native touch, mouse drag/wheel and keyboard scrolling. Other shared sheets retain their bottom alignment. Auth password uses the full Auth layout, replacing its previous popup.

Phase 02 accepted reuse contract (2026-11-10): see docs-work/PHASE_02_COMPONENT_GUIDE_FA.md for source ownership, data-rv hooks, sheet/focus/scroll constraints, OTP setup, gallery gestures and current owner-approved exceptions. This is documentation of existing components; it does not start any later-phase implementation.

Phase 03 supplies the generic `Shared/Components/_StatePage.njk` and `state-page.css`. Its input is a state key, title, description, tone, icon, optional context/reference/notice, optional labelled lines and actions. Booking result fixtures are adapted into this model in `tools/lib/product.mjs`. Later state owners can provide their own model. The calendar template and rendering function are used by both the desktop date workspace and the recurring edit sheet. The booking masthead uses the existing role navigation and More/logout sheets.

Device review reuse: `components/rail.js` owns desktop pointer drag and centered-item observation for horizontal rails. `components/sheet.js` and `motion.css` own the closing lifecycle and motion. Keep the label visible above the input, and reserve placeholder text for an example. See DEC-044 and the device review rules in the contract.
