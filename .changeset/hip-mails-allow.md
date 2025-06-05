---
'@culur/logger': minor
---

Replaced Ink's `<Static>` with a custom static lines implementation:

- Removed **Ink's** `<Static>` component because it was causing problems (often missing lines).
- Disabled **Ink's** `patchConsole` feature because it was buggy. **Consequently, console.log can no longer be used.** Instead, please use `logger.root.log("data")`.
- Adjusted unit tests to fit the updated code.
