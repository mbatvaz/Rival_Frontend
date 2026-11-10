> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Asset Audit

## Findings

- Design System v2 contains local fonts, icons, logos, photos, SVG and WebP assets. Use canonical asset names and preserve relative paths.
- Batch 3 explicitly omits two decorative images referenced by `bundle.css`; they are non-blocking because the component remains usable without them.
- Batch 7 and Batch 8 exports reference `/_blob/<id>` and omit shared DS CSS/fonts; Master includes both the source exports and the full design-system archive so implementation does not depend on Claude Design runtime.
- Some logo masks fail in isolated Batch 7/8 previews. Copy the local logo asset into `wwwroot/img` and do not depend on `/_blob`.
- `STATE-07-MAP` is an intentional placeholder; address comes from ADM-21. Do not invent a map image.

## Canonical handling

1. Fonts: local Yekan Bakh files from Design System v2.
2. Icons: local Remix Icon sprite/assets; no CDN.
3. Logo: local DS logo asset, not CSS mask pointing to a remote blob.
4. Photos: use DS groups Real hall, services, stylists, customers and the batch-specific canonical photo when the handoff names one.
5. Missing decorative assets: log as non-blocking and keep layout stable; never replace a named product photo with a random placeholder.
