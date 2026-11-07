---
'@culur/config-eslint': patch
---

Add `minimumReleaseAgeExcludePrune` to the `pnpm-workspace.yaml` key order.

`@antfu/eslint-config` v9.5 enforces `minimumReleaseAgeExcludePrune: true` via `pnpm/yaml-enforce-settings`, so the key is now sorted right after `minimumReleaseAgeStrict` by `yaml/sort-keys`.
