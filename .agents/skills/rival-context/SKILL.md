---
name: rival-context
description: Locate Rival source, design evidence, consumers and tests when task paths or ownership are unclear; check or refresh the project map after structural changes, or prepare a concise context handoff. Unnecessary when the required paths and scope are already verified.
---

# Rival context navigation

Use the [small index](../../../docs/ai/PROJECT_INDEX.md), not a full repository scan or graph dump. Reuse verified findings already in this conversation.

1. For an unresolved page or phase use `npm run -s task:context -- PAGE-ID` or `-- --phase NN`. For unresolved shared ownership use a scoped `rg` or `npm run -s map:query -- <term> --compact`. Reuse addresses already supplied.
2. QUERY checks freshness and warns on drift; do not precede it with a redundant CHECK. `npm run map:check` is the standalone maintenance check and writes nothing. In read-only work, report gaps and inspect source without updating. During authorized maintenance use `map:update`; use `map:build` for a missing graph or deliberate full rebuild.
3. Read relevant contract headings, DEC/OQ entries, source and tests only. Confirm design candidates against the actual state/handoff; INFERRED consumers and literal test references are candidates, not execution evidence. MVC destinations are planned.
4. For structural changes, refresh the map after source changes and check it before handoff. Preserve contract authority, phase/desktop gates, product data boundaries and original exports. The map never authorizes implementation or acceptance.

Handoff: authorized scope; Page IDs/paths; effective decisions and approvals; verified source reads and checks; unresolved gaps; next action. Link evidence rather than copying history. Summarize unavailable coverage honestly.

Details and extraction limits: [graph guide](../../../docs/ai/PROJECT_GRAPH.md). Do not create a second map, install dependencies, or run product browser suites merely to answer a navigation question.
