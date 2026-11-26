---
name: frontend-fidelity
description: Investigate Rival source-to-runtime visual mismatches or perform an explicitly requested fidelity comparison. Extends the shared visual QA workflow with exact-source observations and deviation analysis.
---

# Frontend fidelity

Resolve the assigned page via [navigation](../../../docs/ai/PROJECT_INDEX.md). Read relevant page-spec/source-map entries, actual HTML/screenshots and component handoff; reuse verified reads and shared QA captures/checks for the unchanged revision. Verify route, state, dimensions and capture scale; null selectors or missing sources remain gaps.

Capture the runtime at matching mobile dimensions. Compare desktop to an approved brief when evaluating an existing Phase 01–04 desktop layout. Check layout, hierarchy, copy, typography, spacing, palette, assets/icons, container, responsive behavior and motion. Use the [visual report](../../../docs/ai/templates/visual-qa-report.md) for concrete source-versus-runtime observations.

Fix significant mismatches within assigned scope and repeat affected checks until resolved or explicitly recorded as deviations with severity and acceptance status. A pending deviation is not approved. Do not redesign the page or claim pixel fidelity from automated assertions. Output exact source paths, state URLs, screenshots, observations, fixes and remaining limits.
