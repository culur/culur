---
'@culur/config-eslint': patch
---

`antfu/vue/rules`: add 2 override rules:

- `vue/padding-line-between-blocks`: always
- `vue/component-name-in-template-casing`: with `registeredComponentsOnly: false` for support components import by `unplugin-vue-components`
