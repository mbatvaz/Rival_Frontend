---
name: frontend-testing-debugging
description: Reproduce and debug a Rival frontend route or interaction using browser inspection and the existing Playwright suites when functionality fails or a feature needs browser validation.
---

# Frontend testing and debugging

Specify target route/query/role, fixture state and observable expected flow from confirmed evidence. Read [QA checklist](../../../docs/ai/QA_CHECKLIST.md) and existing tests before adding coverage.

Prefer an available Browser plugin for interactive diagnosis; if absent or failing, use existing local Playwright tooling. Build and serve static output using repository commands; no Express/backend. Inspect console/page errors and relevant failed requests, route/title/nonempty content and at least one real local demo interaction. Check the resulting state; a screenshot alone is not functional proof.

Reproduce root cause, apply the narrowest authorized correction and run affected regressions, including basePath/shared consumers where relevant. Capture a fresh screenshot and complete a [visual report](../../../docs/ai/templates/visual-qa-report.md) with actual tools, steps, commands/results and failures/unavailable checks. Never perform real external transactions or report a test that was not checked.
