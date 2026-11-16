---
name: frontend-testing-debugging
description: Reproduce and debug a failing Rival frontend route or interaction using browser inspection and existing Playwright suites. General completion QA belongs to rival-visual-qa.
---

# Frontend testing and debugging

Resolve target paths with [navigation](../../../docs/ai/PROJECT_INDEX.md); specify route/query/role, fixture and observable expected flow. Reuse verified source and QA findings for unchanged code. Read relevant existing tests/checklist sections before adding coverage; run the narrow reproduction first, broader affected regression after a fix.

Prefer an available Browser plugin for interactive diagnosis; if absent or failing, use existing local Playwright tooling. Build and serve static output using repository commands; no Express/backend. Inspect console/page errors and relevant failed requests, route/title/nonempty content and at least one real local demo interaction. Check the resulting state; a screenshot alone is not functional proof.

Reproduce root cause, apply the narrowest authorized correction and run affected regressions, including basePath/shared consumers where relevant. Capture a fresh screenshot and complete a [visual report](../../../docs/ai/templates/visual-qa-report.md) with actual tools, steps, commands/results and failures/unavailable checks. Never perform real external transactions or report a test that was not checked.
