> **ARCHIVED ORIGINAL:** Preserved for provenance. The current technical contract is `docs/RIVAL_PROJECT_CONTRACT.md`; do not implement superseded instructions from this archived copy.

> **ARCHIVED ORIGINAL:** Preserved for provenance. The active Codex phase prompts are under `phases/`; technical instructions in this original package are superseded by root `AGENTS.md` and `docs/RIVAL_PROJECT_CONTRACT.md`.

# Front-end Architecture Contract

## Repository shape

```text
rival-frontend/
├── CLAUDE.md
├── PROGRESS.md
├── OPEN_QUESTIONS.md
├── DISCREPANCIES.md
├── docs/                     # read-only references
├── design-export/            # read-only source evidence
├── mock-server/              # preview only
├── src/
│   ├── Views/                # Razor-shaped Nunjucks subset
│   ├── MockData/
│   └── wwwroot/
│       ├── css/00-tokens..05-utilities
│       ├── js/core,components,features
│       ├── fonts,icons,img,lib
└── tests/visual,a11y,structure
```

## Templates

Only `{{ var }}`, `if/else`, `for`, `include`, `extends/block` are allowed. URLs are real `/Area/Controller/Action` anchors. Forms are ordinary POST forms with an antiforgery placeholder. No inline scripts or styles.

## JS

Native ES modules. `core/registry.js` binds `data-rv` hooks and lazy-loads one feature per file. `core/api.js` owns all reads/writes and exposes mock endpoint shapes that can later point at MVC endpoints. No global store.

## Static preview

Use one lightweight HTTP server for Nunjucks + mock JSON. `file://` is not the source of truth; if a generated standalone preview is needed, generate it from the same templates.

## Quality gate

Each slice must match the 390 artboard within a logged tolerance, be reviewed at 768 and 1280, pass axe, preserve keyboard path, cover documented states, and update PROGRESS.md.
