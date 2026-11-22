# Component Reuse Matrix

DEC-069: [list-entry.js](../src/wwwroot/js/components/list-entry.js) is the shared owner of variable-record entry on implemented booking, customer and portfolio consumers. It reuses canonical timing from [motion.js](../src/wwwroot/js/components/motion.js); no section wrapper, static shell, title or home consumer participates. [Current contract and measured QA](../docs-work/VARIABLE_LIST_MOTION_2026-11-17.md) supersede section-entry descriptions.

DEC-076 reuses Sheet and the [Jalali calendar](../src/Views/Booking/_Calendar.njk) in CUS-04. The CUS-03 date filter and swap date field use the same [calendar Sheet controller](../src/wwwroot/js/features/customer/appointment-date-picker.js). The swap supplies its own date eligibility rule and uses the shared feedback and button styles. [Feature contract](features/APPOINTMENT_SWAP.md)

DEC-065 restores the shared customer menu's ordinary anchors and removes its radio enhancement. [Sheet](../src/wwwroot/js/components/sheet.js) remains the sole owner of opening/closing, modal stack, inertness and focus/scroll; customer breakpoint dismissal reuses it. [Mobile customer More](../src/wwwroot/css/03-components/customer-more-mobile.css) owns a fixed viewport and the exact direct-child list scrolling exception. Other role menus and overlays keep their prior layout/scroll rules. [Current checks](../docs-work/PHASE_04_MORE_RECOVERY_2026-11-16.md) supersede earlier radio/header descriptions below.

DEC-064: customer shell consumers share [native desktop selection](../src/Views/Shared/_CustomerDesktopNav.njk), [identity](../src/Views/Shared/_CustomerIdentity.njk), grouped customer More and active-label dock. Sheet owns inertness, focus, scroll and stacked dialogs; only customer mobile More gets the direct-owner left-drawer exception. Navigation-motion remains the sole route interceptor and composes the new [dock selection](../src/wwwroot/js/components/customer-dock.js). No customer/stylist/admin copies of Sheet or data adapter are added. [Regression and source record](../docs-work/PHASE_04_OWNER_FEEDBACK_2026-11-16.md).

CUS-01 desktop correction (DEC-063): [CustomerDesktopNav](../src/Views/Shared/_CustomerDesktopNav.njk) is extracted unchanged in appearance/routes from the accepted booking sidebar; both booking and home include it. Existing sidebar CSS and logout/sheet ownership remain shared. Home has an active-page marker and disables booking/recurring menu entries in its inactive fixture state. Dedicated home CSS rearranges AppointmentHero into a horizontal desktop ticket. [Regression scope](../tests/phase04/desktop.spec.mjs): desktop links, logout/focus, mobile invariants and prior booking/choice/shell consumers.

Phase 04 starts on 2026-11-16 (DEC-062). CUS-01 introduces [one canonical AppointmentHero partial](../src/Views/Shared/Components/_AppointmentHero.njk) and [its styles](../src/wwwroot/css/03-components/appointment-hero.css). Its dashboard countdown consumes fixture durations; no financial or schedule policy is added. Shared RoleLayout gains optional class/header blocks without changing default rendered markup. Existing role nav/More/logout/rail owners are reused; the accepted booking dock CSS gains the new home consumer. Customer home, booking choices, all role sheets, public/auth responsive consumers receive focused regression. [Evidence](../docs-work/PHASE_04_IMPLEMENTATION_FA.md). Phase 03 remains accepted; the earlier unassigned notes below are historical.

Phase 03 acceptance (2026-11-15, DEC-058): the owner accepted the booking components and reusable StatePage base. [Closeout and reuse guidance](../docs-work/PHASE_03_CLOSEOUT_FA.md) identify single-source templates/modules and regression consumers. Future consumer pages are not implemented by this acceptance; Phase 04 remains unassigned.

Independent review infrastructure: [preview-review/](../preview-review/) owns review rows, manual toggles, filtering, backup and revision notifications. It reuses local design tokens/fonts/icons, but no product behavior, role state or approval controller. Its controls do not become new product component/phase ownership. [Report](../docs-work/PREVIEW_REVIEW_REPORT.md).

Phase 01–02 refresh (2026-11-14): [motion timing/cancellation](../src/wwwroot/js/components/motion.js) is shared by route exit; existing sheet/navigation owners remain single-source. DEC-048 removes the visible carousel pause control while retaining keyboard/indicators and hover/focus suspension; home-steps loops while visible. See [refresh report](../docs-work/PHASE_01_02_REFRESH_FA.md) and [motion contract](ai/MOTION_SPEC.md). Shared booking consumers receive regression coverage without changing Phase 03 page ownership.

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
