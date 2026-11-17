# Customer desktop canvas and shared-menu alignment

Owner report: side cuts in the wide dashboard background and a menu jump when navigating between dashboard and booking. This is a bug correction within the existing CUS-01 desktop brief, not a new composition or phase acceptance.

## Reproduction and cause

The dashboard workspace painted its gradient inside a centered maximum 1600px element; the body outside painted solid bg-canvas. Wide screens exposed the two vertical edges. The home outer grid also had space-6 padding on both inline sides, while the booking grid starts directly at the centered container edge and its mast supplies space-3 internally. Identical sidebar widths therefore still had different coordinates. The new actual-click regression failed before correction at 1024px: dashboard x=857, booking x=881 (24px jump).

## Correction

Only desktop home CSS changes: paint the gradient on the full-width body scoped by the home workspace; keep the centered workspace transparent. Move the inline gutter from the outer grid to its header/content, keeping their previous inner layout. The menu now starts at the same container edge as booking; its sticky inset is space-6 to match the booking mast's padding. No product fixtures, navigation logic, booking CSS or mobile design changed.

Source: [desktop home CSS](../src/wwwroot/css/04-pages/customer-home-desktop.css), [booking grid](../src/wwwroot/css/04-pages/owner-booking-desktop.css), [booking mast inset](../src/wwwroot/css/04-pages/booking-owner-feedback.css), [existing brief](desktop-layouts/CUS-01.md). Regression: [cross-route alignment](../tests/phase04/shell-alignment.spec.mjs).

## Observations and validation

Fresh screenshots inspected at DPR 1: 390×844, 768×844, 1280×900 and 1920×900 (full-page capture where taller). Five comparisons with the existing reference/brief and accepted previous revision:

1. The 1920px gradient continues through both outer margins; there is no vertical canvas boundary at the 1600px content edge.
2. Actual home → booking → home clicks preserve menu x/y/width/height at 1024, 1280, 1600, 1920 and 2560px; destinations and ordinary link behavior remain shared.
3. The 1280px view retains one horizontal appointment per row, with 144px photos and stacked left support cards.
4. The 1920px view retains paired appointment/payment rows, bounded cards, the left tools order and salon notice placement.
5. The 390/768px views retain mobile/tablet header, overlapping hero panels, horizontal rails, dock and salon notice without its removed clock tile.

Root 39/39 and subpath 39/39 passed: alignment, desktop, home, More recovery and owner-feedback suites. They include three home states, no horizontal overflow, console/request checks, axe, keyboard, reduced motion and fallback coverage. Subpath run restored root output. Lint's new test-global and CSS-spacing findings were corrected. A separate ad-hoc pre-fix screenshot attempt could not launch the default Playwright cache; the repository runner's configured browser worked, and the pre-fix regression failure plus final screenshots are the evidence. No physical-device retest or full-phase acceptance is claimed. Screenshots are in ignored tests/screens/phase04-shell/{root,subpath}/ and the existing phase04 screenshot directories.
