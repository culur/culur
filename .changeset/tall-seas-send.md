---
'@culur/generate-zod': patch
---

Refactor `isValidAgainstSchema()`:

- Rename `isValidBySchema()` to `isValidAgainstSchema()`.
- Add entry `./is-valid-against-schema` and use it to improve tree-shaking. This will avoid importing "fs/promise" in the browser environment.
- Add `debug` parameter to improve debugging.
