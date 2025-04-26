---
'@culur/config-eslint': minor
---

Add `culur/renovate-json/rules` for **Renovate configurations**:

- This new rule enforces consistent key sorting within Renovate configuration files
- Currently, it automatically sorts the keys in the following sections:
  - The root-level configuration object.
  - Each individual object within the `packageRules` array.
