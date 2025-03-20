# `@culur/config-stylelint`

[![NPM Version](https://img.shields.io/npm/v/@culur/config-stylelint?logo=npm)](https://www.npmjs.com/package/@culur/config-stylelint)
[![NPM Download](https://img.shields.io/npm/dm/@culur/config-stylelint?logo=npm)](https://www.npmjs.com/package/@culur/config-stylelint)
[![NPM License](https://img.shields.io/npm/l/@culur/config-stylelint)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Sharing [Stylelint](https://stylelint.io) configurations.

## ✨ Features

**The** library is a shareable Stylelint configuration. It has some key features as follows:

### Auto detect environment

The configuration will check if the following packages are installed and their versions to change plugins and rules.

| Environment | Packages                             | Support versions |
| ----------- | ------------------------------------ | ---------------- |
| Tailwind    | `tailwindcss`                        | 0, 1, 2, 3, 4    |
| SCSS        | `sass` or `dart-sass` or `node-sass` | -                |
| Vue         | `vue`                                | -                |

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
- And it also has custom rules for `Tailwind`, `SCSS` and `Vue`.
- This config bundles the above packages, you don't need to install them yourself.

## 💿 Installation

Add `@culur/config-stylelint` dependency to your project.

```bash
# Using npm
npm install @culur/config-stylelint --save-dev

# Using pnpm
pnpm install @culur/config-stylelint --dev

# Using yarn
yarn add @culur/config-stylelint --dev
```

Other packages:

- Use need to install `stylelint` package in devDependencies.

## 📖 Usage

### 1. Extending config

Set your `.stylelintrc.json` to:

```json
{
  "extends": ["@culur/config-stylelint"]
}
```

Below are also some pre-built configs to use.

| Config                                       | Tailwind | Sass | Vue  |
| -------------------------------------------- | -------- | ---- | ---- |
| `@culur/config-stylelint`                    | auto     | auto | auto |
| `@culur/config-stylelint/auto`               | auto     | auto | auto |
| `@culur/config-stylelint/none`               |          |      |      |
| `@culur/config-stylelint/sass-vue`           |          | true | true |
| `@culur/config-stylelint/sass`               |          | true |      |
| `@culur/config-stylelint/tailwind3-sass-vue` | 3        | true | true |
| `@culur/config-stylelint/tailwind3-sass`     | 3        | true |      |
| `@culur/config-stylelint/tailwind3`          | 3        |      |      |
| `@culur/config-stylelint/tailwind4-vue`      | 4        |      | true |
| `@culur/config-stylelint/tailwind4`          | 4        |      |      |
| `@culur/config-stylelint/vue`                |          |      | true |

### 2. Define config

You can also define which environments are enabled via the `defineConfig` function.

```js
// .stylelintrc.mjs
import { defineConfig } from '@culur/config-stylelint/factory';

export default defineConfig(
  {
    tailwind: 4,
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

_Note_: When using `defineConfig` function, you must install `stylelint-config-*` and plugins dependencies to your project.

### 2. Ignoring Code

`Stylelint` use `.stylelintignore` file to ignore specific files. You can use the following command to copy our default `.stylelintignore` to your project root folder:

```bash
# unix
cp "node_modules\@culur\config-stylelint\.stylelintignore" ".stylelintignore"

# windows
copy "node_modules\@culur\config-stylelint\.stylelintignore" ".stylelintignore"
```

## 📜 Scripts

Some commonly used scripts in `package.json`.

```json
{
  "scripts": {
    "fix:css": "stylelint '**/*.{vue,tsx,css,scss}' --allow-empty-input --fix",
    "lint:css": "stylelint '**/*.{vue,tsx,css,scss}' --allow-empty-input"
  }
}
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
