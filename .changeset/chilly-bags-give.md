---
'@culur/generate-zod': minor
---

Refactor:

- Rename `importLines` to `customImport`.
- Remove `importIsValidAgainstSchema`, use `customImport` only.
- By default, `postCommands` has `prettier` command only.
- Add prop `cwd`.
- Add prop `loggerProps`.
- Add `@culur/logger` as `peerDependencies`.
