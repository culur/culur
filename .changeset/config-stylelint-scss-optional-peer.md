---
'@culur/config-stylelint': major
---

Move `stylelint-config-standard-scss`, `stylelint-scss` and `stylelint-config-standard-vue` from `dependencies` to optional `peerDependencies`.

Projects that do not use SCSS or Vue no longer install these packages, and future `stylelint` majors are no longer blocked by them. SCSS and Vue projects must install them explicitly:

```bash
# SCSS
pnpm install stylelint-config-standard-scss stylelint-scss --dev

# Vue
pnpm install stylelint-config-standard-vue --dev
```
