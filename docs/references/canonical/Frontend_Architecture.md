# Frontend Architecture Decision — Superseded by the Codex Project Contract

This 2026-11-02 owner decision remains historical evidence for the original mobile-first / Razor-compatible intent. Its technical details have been superseded and clarified by the owner on 2026-11-09.

**Current authoritative document:** [`../../RIVAL_PROJECT_CONTRACT.md`](../../RIVAL_PROJECT_CONTRACT.md).

Key updates:
- Node/npm are local build/test tooling only; Nunjucks renders static HTML at build time; no Express runtime is used; cPanel receives `dist/` only.
- Codex replaces Claude Code as the primary coding agent.
- Desktop is a page-specific composition derived from the mobile product design language, not a stretched mobile page.
- Native CSS, Yekan Bakh only, local Lucide-based SVG icons, and the updated phase ownership rules are defined in the current contract.

For original source wording, use the archived owner decision in `references/archive/legacy-claude-kickstart/docs/design/` only as historical evidence. Do not implement from that archived copy.
