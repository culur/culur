# `@culur/config-stylelint`

> Sharing [Stylelint](https://stylelint.io) configurations.

## Install

Add `@culur/stylelint-config` dependency to your project.

```bash
# Using npm
npm install @culur/stylelint-config --save-dev

# Using yarn
yarn add @culur/stylelint-config --dev
```

## Usage

If you've installed `@culur/stylelint-config` locally within your project, just set your stylelint config to:

```json
// .stylelintrc.json
{
  "extends": ["@culur/stylelint-config"]
}
```

You can also define which environments are enabled via the `defineConfig` function.

```js
// .stylelintrc.mjs
import { defineConfig } from '@culur/config-stylelint/dist/factory.mjs';

export default defineConfig(
  {
    tailwind: true,
    sass: false,
    vue: false,
  },
  {
    extends: [],
    plugins: [],
    rules: {},
  },
);
```

### Scripts

Some commonly used scripts in `package.json`.

```json
{
  "scripts": {
    "fix:css": "stylelint **/*.{vue,tsx,css,scss} --allow-empty-input --fix",
    "test:css": "stylelint **/*.{vue,tsx,css,scss} --allow-empty-input"
  }
}
```

## Features

### Auto detect environment

The config will check whether the following packages are installed or not to change plugins, rules and configs.

| Environment | Packages                             |
| ----------- | ------------------------------------ |
| Tailwind    | `tailwindcss`                        |
| SCSS        | `sass` or `dart-sass` or `node-sass` |
| Vue         | `vue`                                |

### Extends

- The config extends:
  - Configs from:
    - [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard) - The standard shareable config for Stylelint.
    - [`stylelint-config-standard-scss`](https://github.com/stylelint-scss/stylelint-config-standard-scss) - The standard shareable SCSS config for Stylelint.
    - [`stylelint-config-standard-vue`](https://github.com/ota-meshi/stylelint-config-standard-vue) - The recommended shareable Vue config for Stylelint.
    - [`stylelint-config-html`](https://github.com/ota-meshi/stylelint-config-html) - The shareable HTML config for Stylelint.
    - [`stylelint-config-clean-order`](https://github.com/kutsan/stylelint-config-clean-order) - A clean and complete config for stylelint-order.
  - Plugins from:
    - [`stylelint-order`](https://github.com/hudochenkov/stylelint-order) - A plugin pack of order related linting rules for stylelint.
    - [`stylelint-scss`](https://github.com/kristerkari/stylelint-scss) - A collection of SCSS specific linting rules for stylelint.
    - [`stylelint-selector-bem-pattern`](https://github.com/simonsmith/stylelint-selector-bem-pattern) - Stylelint plugin that incorporates postcss-bem-linter
- And it also has our custom rules for `Tailwind`, `SCSS` and `Vue`.

### Custom Syntax

Because Stylelint no longer includes parsers (for scss, vue...) this config will use the overrides property to config the following syntaxes if needed.

- [`postcss-html`](https://www.npmjs.com/package/postcss-html) - For `html, php, vue, svelte, xml` files.
- [`postcss-scss`](https://www.npmjs.com/package/postcss-scss) - For `scss` files.
- [`postcss-sass`](https://www.npmjs.com/package/postcss-sass) - For `sass` files.

### Dependencies

This config bundles the following packages, you don't need to install them yourself anymore

- `postcss-html`
- `postcss-sass`
- `postcss-scss`
- `stylelint-config-clean-order`
- `stylelint-config-html`
- `stylelint-config-standard`
- `stylelint-config-standard-scss`
- `stylelint-config-standard-vue`
- `stylelint-order`
- `stylelint-scss`
- `stylelint-selector-bem-pattern`

## Related

### Stylelint

- [Stylelint](https://github.com/stylelint/stylelint) - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
- [Stylelint - Configurations](https://stylelint.io/user-guide/configure) - Document on stylelint configurations.

### Library

- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework for rapid UI development.
- [VueJS](https://vuejs.org/) - An approachable, performant and versatile framework for building web user interfaces.
