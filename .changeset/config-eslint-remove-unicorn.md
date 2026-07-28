---
'@culur/config-eslint': minor
---

Remove redundant `eslint-plugin-unicorn`

`eslint-plugin-unicorn` is imported automatically from `@antfu/eslint-config`, so explicit dependency declaration and configuration in the project are no longer needed.
