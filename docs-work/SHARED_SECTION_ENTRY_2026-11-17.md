# Shared section entry and dashboard shadow correction

## Owner scope and sources

DEC-068 extends the accepted DEC-067 motion to the other implemented pages and fixes mobile dashboard shadows. No new product page/composition is introduced. Exact template structure selects variable sections, not every descendant or every main. Existing source/design reads from the accepted public/auth/booking phases remain applicable; the motion change is directly owner-authorized.

Implementation: [section-entry.css](../src/wwwroot/css/05-utilities/section-entry.css), [shared motion](../src/wwwroot/css/05-utilities/motion.css), [entry import](../src/wwwroot/css/app.css). Explicit data-rv-entry hooks are in public Home/Portfolio/Rules, auth Login/Complete/Unavailable, booking Choices/Time/Requested/Checkout/Recurring and shared StatePage templates. The customer dashboard retains its existing explicit section sequence. Placeholder pages are excluded.

## Motion contract

Trigger: entry of a document or newly shown result section. Standard easing, duration-slow 380ms; numbered groups start in duration-fast 140ms increments. Desktop from 1024px fades only. Mobile/tablet fades with local physical translateX(-24px)→none. No whole-viewport throw or entire-main transform; public hero photograph, logos, shared headers/footers/navigation, booking steps and fixed payment actions remain outside the markers. Nested marker animations are prohibited: checkout's hold is moved into the breakdown on desktop, so it has no separate entry hook. Focus inside a marked section immediately shows it; reduced motion removes animation/delay, including live changes. CSS supplies the final static fallback; no JavaScript/animation API dependency or route blocking is added.

Interrupted navigation discards the old CSS animation with the document; responsive media queries choose the new mode. Existing sheet/dock cancellation and navigation handlers are reused. Only transform/opacity animate; no per-frame layout reads, scroll event loop, new timing token or dependency. No measured FPS claim or physical-device test is made. Booking main remains opaque for the accepted no-flash behavior, while its variable child groups enter independently.

## Shadow cause and correction

Horizontal overflow auto establishes a clipped scrollport on both axes. Appointment bottom padding was 32px, and payment padding only 16px; their 34px/32px blur plus downward shadow offset extended beyond the scrollport. This caused the visible horizontal cuts. [Customer rail CSS](../src/wwwroot/css/04-pages/customer-review-layout.css) now reserves 64px at each block edge using existing space-12+space-4. Compensating negative block margins preserve original card/header/dot positions and section gaps. Horizontal dimensions, native scrolling, snap points, keyboard interaction and shadows themselves remain unchanged. Desktop retains its normal grid reset. The existing mobile canvas horizontal clip still prevents transient entry overflow.

## Source-versus-runtime observations

1. Public home retains its static hero image/header while copy and lower sections use the requested local-entry sequence; final photo crop and content geometry remain accepted.
2. Portfolio filter/grid and Rules intro/rule groups enter separately; common header/footer remain in place.
3. Login/completion animate variable headings/forms, while the brand mark/top-back action remains static; focus reveals forms immediately and OTP/name flows still work.
4. Booking context/choice heading/rail and date/time panels enter separately; step navigation and fixed payment actions never inherit an entry transform. The desktop reparented hold does not double-animate.
5. Result intro/facts use the shared motion; reduced motion keeps the same icon/copy/actions and instant final visibility.
6. Dashboard appointment/payment shadows taper inside the enlarged scrollport space, retaining the previous card positions and horizontal keyboard scroll. Fresh root/subpath screenshots cover 390, 768 and 1280px with DPR 1; customer shadow captures use 390×844.

## Validation record

The initial runner could not bind 4183 or 4293: Windows reserved TCP ranges 4147–4246 and 4249–4348. No OS/network configuration was changed. The repository runner works on 8183/8184 through its existing RIVAL_TEST_PORT override. Initial new checks found nested checkout hooks and a result-route redirect timing race; the hook was narrowed and the test waits for the rendered destination. Root related suite passed 41/41 (shared entry, home, motion frames, auth, shared motion, booking and no-flash). Final subpath/public-accessibility results are appended below. Tests inspect main opacity, animation names, nested/static boundaries, no horizontal overflow, errors/requests, live reduced motion, native keyboard rails, and the 64px shadow reservation. Tests and screenshots: [shared entry](../tests/phase04/shared-entry.spec.mjs), tests/screens/shared-entry/{root,subpath}/. Build and lint pass; this is not full-phase acceptance.

Final subpath suite passed 53/53, including the existing public responsive/axe/keyboard tests at mobile/tablet/desktop and smaller widths. Root output restored. Fresh subpath customer-shadow, mobile login and desktop booking screenshots were opened and checked: both dashboard rails retain tapered shadows, focused scrollport outlines are removed before capture, brand/navigation geometry remains stable and booking steps stay outside animation. Existing 4173 is also inside the Windows excluded range; local preview was restarted on 8183 without altering operating-system reservations. Final lint/docs/whitespace and project-map checks pass.
