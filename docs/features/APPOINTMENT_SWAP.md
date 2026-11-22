# Appointment Swap (تعویض نوبت)

Phase 04 · CUS-04 · DEC-076 through DEC-080 · accepted by the owner.

## Product rules

- The appointment is the reserved slot. The swap exchanges the current attendees of two slots immediately on redemption. The creator chooses the salon-local calendar day of the appointment they want to receive. Any eligible time on that exact day qualifies.
- The two current attendees must be different. Each must own and be eligible to manage their selected, future, active appointment. Verify the source at creation, then both records and their current revisions at redemption. Both appointments require the same stylist and matching service, duration, branch and configuration, unless a production service-compatibility policy explicitly permits another combination.
- The attendee manages the appointment under existing cancellation, rescheduling and no-show policies. The original booking creator and payer remain associated with their original records. If cancellation permits a refund, the original payer receives it. An exchange preserves appointment IDs, schedules, service/stylist configuration, payments, ledger, booking history, and each appointment's existing rescheduling quota and history. No settlement, fee or slot search is involved.
- Each customer voluntarily accepts the rules by submitting their respective form. Any private settlement is the customers' responsibility under applicable law. The salon's existing legal and service obligations apply.
- The customers are responsible for their decision and agreement to swap. Both sets of rules state the scope of the salon's responsibility.

## CUS-04 states

1. **ایجاد کد تعویض** opens the shared bottom Sheet. If an eligible active offer exists, show its code immediately. Otherwise show creator rules and a future date-only Jalali picker. **موافقت و ایجاد کد** requires a selected future date.
2. The display shows code, copy action, target date and timestamp-derived countdown. Each code lasts exactly 600 seconds, including across reloads. Expiry returns the open Sheet to the creation form and permits a new code; the status is announced once. The timer value can be read on demand. Closing an offer display does not revoke the code.
3. **ثبت کد تعویض** opens the recipient rules and code input. **بررسی کد تعویض** validates the code and shows the current and incoming appointment schedules in the same Sheet. The customer may return to the preserved code. **موافقت و تعویض نوبت** revalidates and redeems the reviewed offer.
4. Show specific in-Sheet errors for invalid, expired, consumed, same-user, date, stylist, service, configuration, ineligible, changed or temporary failure. Normalize Persian/Arabic digits, letter case, spaces and hyphens. Authorization and invalid-code failures disclose no counterparty identifiers.
5. The success view displays the received schedule and links to the received appointment and the customer's list. Dismissing the Sheet leaves the result visible in the detail page. Keep the shared Sheet, Jalali calendar, feedback and action styles. [Desktop brief](../../docs-work/desktop-layouts/CUS-04.md)

## Adapter and view model

| Operation | Request and result |
|---|---|
| Read owned appointments | Demo customer key → owned records, with current dates, revisions and management/financial roles. |
| Read active offer | Demo customer key + source appointment ID → current source-owned offer or null. |
| Create offer | Demo customer key + source ID + displayed revision + local date → offer. Existing active offers are returned unchanged. |
| Preview offer | Demo customer key + target ID + displayed revision + code → offer ID and both schedules. Ownership and consumption stay unchanged. |
| Redeem offer | Demo customer key + target ID + displayed revision + code + reviewed offer ID → exchange ID and received appointment ID. One successful execution per offer. |

The appointment VM uses `createdByUserId`, `payerUserId`, `attendeeUserId`, `status`, local `date` (ISO civil day in Asia/Tehran), `time`, service/stylist/branch/configuration IDs, duration and `revision`. The Jalali calendar is the display and input surface. An offer contains an ID, code, source ID, creator ID, source revision, desired date, timestamps and active/expired/consumed/invalidated state. History links the offer and appointment IDs with previous/new attendees and execution time. The consumed offer links to the exchange. A changed source revision invalidates an active offer; an unrelated target revision change requires reopening the target detail before retrying.

The mock uses a single base-path-scoped ledger through `core/api.js`. Both attendee writes, revisions, code consumption and the audit event are committed in one localStorage replacement under a same-origin Web Lock. Writes that cannot acquire this facility fail safely. A repeated request sees the consumed status and cannot create a second exchange. Code validity uses the current timestamp at execution, independent of the display countdown. Codes use browser cryptographic randomness.

## Review fixture and backend handoff

The directory has direct links to the create form, code display, code entry, confirmation and success. The code, confirmation and success examples use sample views. Opening them neither issues nor consumes an offer. Details for archived fixture records still show the actions as disabled. Future, booked demo records for active customers support the full exchange.

Use the two **تعویض نوبت** CUS-04 preview entries in tabs on the same origin and base path. They identify two controlled customer perspectives and land on the appointment currently owned by each. The demonstration seeds two different appointment days a few days after first use in the salon timezone and preserves them on that browser profile. Select the second customer's displayed date when issuing from the first tab. The demo customer parameter is passed to related home, list, detail and rescheduling destinations. Historical, date-fixed review records keep their approved presentation.

The browser-local demo models ownership and refund attribution. Cancellation submission already remains outside this preview. localStorage is editable and isolated by origin/browser profile, with no shared state across separate devices or real customer authentication. After the seeded appointment dates pass, use a fresh browser profile to seed new future appointments. In production derive the customer identity from the session, use server time and the configured salon timezone, generate and protect tokens server-side, rate-limit attempts, enforce unique active offers, and authorize each read and mutation against current state. Lock or compare versions on both appointments and the offer inside one database transaction. Use an idempotency key bound to the authenticated caller and request, commit the two ownership updates, consumption and history together, and keep payment and refund attribution linked to the original ledger. Replace the adapter with authenticated endpoints and antiforgery-protected MVC forms.

## Technical acceptance

Verify active reuse and expiry across reloads, blank/invalid/date-only selection, cross-user swap at unequal hours, consumed/expired/invalid/conflicting codes, service/stylist/configuration/date/state checks, and competing submissions or failed writes without partial changes. Verify the unchanged financial, schedule and rescheduling records, both customer views, original-payer cancellation copy, and existing CUS-04 management. Exercise root/subpath routes, supported widths, keyboard and Sheet restoration, reduced motion and axe. Owner review is tracked separately from these checks.

## Verification

DEC-080 accepts the CUS-04 slice. The booked reference pages retain their fixed design dates and link to a functional swap fixture from either enabled action. Live booked records show a countdown to their actual fixture start. The active outgoing offer blocks incoming redemption until the offer expires or is consumed.

- DEC-079 focused Playwright coverage passed 62/62 at root and 62/62 under `/rival-demo/`. It covers shared scrim parity, delayed initial content, pointer and keyboard focus, reduced motion, nested Sheets, scroll restoration, and public and role-shell popup regressions.

- DEC-078 focused Playwright runs passed 42/42 at root and 42/42 under `/rival-demo/`. Coverage includes the five shortcuts, inactive and historical actions, dashboard timer parity, centered result, dark overlay, normal and reduced motion, scroll restoration, and the cancellation and dashboard regressions.

- DEC-077 focused Playwright runs passed 27/27 at root and 27/27 under `/rival-demo/`, including no ledger mutation on preview, expiry during confirmation, retained code on return, and axe and screenshots for both new views.

- `npm run build` and `npm run lint` passed. The final subpath run also restored and rebuilt root output.
- `npm test` and `npm run test:subpath` each reported 269 passed and 3 failed. All 19 swap cases passed in both configurations. The three failures were also reproduced individually on an isolated build of `bbd837a`. The Phase 03 calendar fade ordering got 70 ms where it expected a delay greater than 170 ms. Preview review expected 45 variant rows (HEAD contained 57) and 52 red rows (HEAD contained 49).
- The focused root run covered CUS-04 swap/detail/rescheduling, CUS-03 filter/list, CUS-01 home, the Phase 03 owner-feedback calendar and the runtime API. It reported 80 passes and the same Phase 03 calendar failure.
- Chromium checked widths 320, 390, 768, 1023, 1024 and 1280 at height 844, including keyboard activation, restored focus and scroll position, 44px targets, normal and reduced motion, axe, console and response errors. The domain suite exercised normalized code input, clipboard, past/invalid dates, expired and reused codes, a failed write and concurrent redemption. No physical-device review was performed. [Visual observations](../../docs-work/desktop-layouts/CUS-04.md#swap-visual-evidence)

## Implementation paths

- **Scope and review** — [Decision log](../DECISION_LOG.md), [phase plan](../PHASE_PLAN.md), [progress](../../PROGRESS.md), [open questions](../OPEN_QUESTIONS.md), [page inventory](../PAGE_INVENTORY.md), [traceability](../TRACEABILITY.md), [discrepancies](../DISCREPANCIES.md), [reuse matrix](../COMPONENT_REUSE_MATRIX.md), [Phase 04 README](../../phases/PHASE_04_Customer_Panel/README.md), [desktop brief](../../docs-work/desktop-layouts/CUS-04.md), and the generated [project index](../ai/PROJECT_INDEX.md), [graph guide](../ai/PROJECT_GRAPH.md) and [graph data](../ai/project-graph.json).
- **Detail and presentation** — [Detail.njk](../../src/Views/Customer/Appointments/Detail.njk), [_DetailContent.njk](../../src/Views/Customer/Appointments/_DetailContent.njk), [_SwapSheets.njk](../../src/Views/Customer/Appointments/_SwapSheets.njk), [appointments index](../../src/Views/Customer/Appointments/Index.njk), [home index](../../src/Views/Customer/Home/Index.njk), [panel header](../../src/Views/Shared/_CustomerPanelLayout.njk), [scoped styles](../../src/wwwroot/css/04-pages/customer-appointment-swap.css) and [CSS entry point](../../src/wwwroot/css/app.css).
- **Data and projection** — [API entry point](../../src/wwwroot/js/core/api.js), [swap adapter](../../src/wwwroot/js/core/appointment-swap-api.js), [rules](../../src/wwwroot/js/core/appointment-swap-rules.js), [fixture](../../src/MockData/customer/appointment-swap.json), [build context](../../tools/lib/customer.mjs) and [preview registry](../../src/page-registry.json).
- **Runtime** — [Detail entry](../../src/wwwroot/js/features/customer/appointment-detail.js), [swap detail](../../src/wwwroot/js/features/customer/appointment-swap-detail.js), [create](../../src/wwwroot/js/features/customer/appointment-swap-create.js), [redeem](../../src/wwwroot/js/features/customer/appointment-swap-redeem.js), [customer context](../../src/wwwroot/js/features/customer/appointment-swap-context.js), [summary projection](../../src/wwwroot/js/features/customer/appointment-swap-summaries.js), [appointments](../../src/wwwroot/js/features/customer/appointments.js), [home](../../src/wwwroot/js/features/customer/home.js), and [shared date picker](../../src/wwwroot/js/features/customer/appointment-date-picker.js).
- **Management and QA** — [Reschedule interaction](../../src/wwwroot/js/features/customer/appointment-reschedule.js), [reschedule data](../../src/wwwroot/js/features/customer/reschedule-data.js), [reschedule result](../../src/wwwroot/js/features/customer/reschedule-result.js) and [swap browser suite](../../tests/phase04/appointment-swap.spec.mjs).
