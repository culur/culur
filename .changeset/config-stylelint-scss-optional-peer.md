---
'@culur/config-stylelint': major
---

Move `stylelint-config-standard-scss` and `stylelint-scss` from `dependencies` to optional `peerDependencies`.

CSS, Tailwind and Vue projects no longer install the SCSS packages, and future `stylelint` majors are no longer blocked by them. SCSS projects must install them explicitly:

```bash
pnpm install stylelint-config-standard-scss stylelint-scss --dev
```
