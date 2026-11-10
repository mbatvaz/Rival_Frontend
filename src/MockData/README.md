# Static fixture contract

Only `core/api.js` reads fixture data or simulates writes. This is a demo, not a backend.

- `api.read('foundation/preferences')` reads `mock-data/foundation/preferences.json`.
- `{ state: 'empty' }` or `{ state: 'error' }` selects the corresponding named fixture.
- Writes return `{ ok: true, demo: true, data }` and persist only in localStorage.
- Storage is isolated by the deployment basePath. `api.reset(resource)` restores fixture reads.
- These infrastructure fixtures are preferences only; they do not model booking or payments.
- Future features read a documented `?state=...` parameter and pass it to the adapter.
- `AbortSignal` is supported for reads. Failures expose stable code/message/status fields.
