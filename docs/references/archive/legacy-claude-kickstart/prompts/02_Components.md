> **ARCHIVED / NOT ACTIVE:** This document was written for the previous Claude Code workflow. Use root `AGENTS.md`, `README_START_HERE_FA.md`, `prompts/`, and `phases/` for the Codex workflow. Technical instructions in this archive are superseded by `docs/RIVAL_PROJECT_CONTRACT.md`.

بعد از تأیید فونداسیون.

---

Phase 2 — shared components. From `COMPONENT_INVENTORY.md`, implement every shared component used by two or more pages (buttons, inputs, selects, OTP, chips, tags, cards, list rows, tabs, stepper, calendar/date strip, time-slot grid, avatar, empty/error/loading states, banners, all shared sheets).

Rules: one Razor-shaped partial + one CSS file + (only if interactive) one JS module per component; variants driven by modifier classes; states implemented exactly as the docs define; at most one green button per page is a page-level rule, so expose button variants but never auto-apply primary.

Show each in the component book at 390 / 768 / 1280 with every variant and state. Compare against the artboards where they exist; log differences. Run lint, visual, a11y. Update PROGRESS.md. Commit. Stop for review.
