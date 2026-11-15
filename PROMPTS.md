# Reusable Rival prompts

Use only for explicitly assigned scope. Replace bracketed inputs. The [phase plan](docs/PHASE_PLAN.md) retains dependency/approval ownership.

## Page

Implement [PAGE-ID / route / states] in assigned [PHASE]. Read its [page spec](docs/ai/templates/page-spec.md), exact manifest HTML/screenshots and handoff. Check similar routes, shared partials, token generation and component ownership. Present a short file/test plan; record invariants, responsive adaptations and any dependency decision. Desktop needs an owner-reviewed brief before implementation. Build the smallest reusable change using real copy/assets. Run build, lint and relevant root/subpath tests. Validate route/title/content, runtime/console, primary interaction and screenshots at exact dimensions. Compare mobile against source and desktop against its approved brief. Cover tablet/intermediate widths, RTL, axe, keyboard/focus, reduced motion, performance and defined loading/empty/error/success states. Fix significant mismatches; record at least five concrete comparisons and every remaining deviation with source, reason and acceptance status. Report changed files, tests and screenshots. Stop at the phase gate.

## Component

For [COMPONENT / consuming Page IDs], read the [catalog](docs/ai/COMPONENT_CATALOG.md), reuse matrix, exact component README/preview and existing implementation. State owner, variants, input model, states, tokens, accessibility and responsive behavior. Extend its single canonical implementation. Apply the page validation workflow to affected consuming routes. A design preview does not prove a future-phase component is implemented.

## Feature

For [FEATURE / phase], complete the [feature spec](docs/ai/templates/feature-spec.md), tying routes and permissions to confirmed decisions. Define fixture contracts through the existing API adapter; no real side effects. Follow the page workflow for each affected route/state and shared-component regression list. Flag missing product evidence rather than inventing behavior.

## Animation

For [TRIGGER / component], inspect its reference and [motion contract](docs/ai/MOTION_SPEC.md); complete a [motion spec](docs/ai/templates/motion-spec.md). Choose native CSS first, then capability-detected native APIs; evaluate libraries through dependency policy. Define timing, interruption, cancellation, navigation, reduced motion, fallback and measurable performance evidence. Test rapid repeated interaction, close/reopen/navigation and keyboard use at mobile/desktop widths. Verify static fallback conveys the same meaning. Report measured observations without inventing scores.

## QA

Audit [PAGE IDs / states] using the [checklist](docs/ai/QA_CHECKLIST.md). Read sources before viewing implementation. Use [visual](docs/ai/templates/visual-qa-report.md) and [responsive](docs/ai/templates/responsive-qa-report.md) reports. Distinguish automated assertions, screenshot observations, accepted adaptations and unverified gaps. Record actual tools, commands, dimensions, state URLs and physical-device coverage.
