---
name: design-system-governance
description: Audit Rival token and shared-component usage when adding a component, changing shared styles, or investigating duplicated markup and magic values.
---

# Design system governance

Query the token/component in [navigation](../../../docs/ai/PROJECT_INDEX.md) for candidate consumers. Read relevant catalog/reuse entries, canonical token definitions and affected source; reuse verified reads. Confirm conditional consumers before choosing regressions. Respect phase owners; a design-only component is not an implemented module.

Identify existing components before adding markup/CSS/JS. Check variants/states, canonical partial/module, semantic names/focus/targets and consumers. Report duplicated patterns with actual paths and reusable owner, not filename similarity alone.

Compare hardcoded colors/type/spacing/radius/shadow/motion to existing tokens; distinguish approved geometry, absent families and defects. Do not invent breakpoint/container/z-index tokens. Check contract breakpoints, logical RTL CSS and named container-query fallback. Keep original exports read-only. Make only authorized scoped fixes and trigger consumer regression for shared changes.

Output component/token findings, exact paths, reuse decisions, approved exceptions versus unresolved debt, and actual lint/browser results.
