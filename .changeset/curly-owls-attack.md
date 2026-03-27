---
'@culur/logger': minor
'@culur/generate-zod': minor
---

Optimize export type.

Use `export type` for `BaseRunnable`, `IRootObject` to improve TypeScript type extraction and ensure it is treated as a type-only export.
Remove `export { Logger as default }`
