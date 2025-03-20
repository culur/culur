# `@culur/utils-packages`

[![NPM Version](https://img.shields.io/npm/v/@culur/utils-packages?logo=npm)](https://www.npmjs.com/package/@culur/utils-packages)
[![NPM Download](https://img.shields.io/npm/dm/@culur/utils-packages?logo=npm)](https://www.npmjs.com/package/@culur/utils-packages)
[![NPM License](https://img.shields.io/npm/l/@culur/utils-packages)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Check if environments are installed or not.

## ✨ Features

This library use `local-pkg` to check if the following environments are installed.

| Function      | Packages                                        |
| ------------- | ----------------------------------------------- |
| `hasTailwind` | `tailwindcss`                                   |
| `hasSass`     | `sass` or `dart-sass` or `node-sass`            |
| `hasVue`      | `vue` or `nuxt` or `vitepress` or `@slidev/cli` |

## 💿 Installation

Add `@culur/utils-packages` dependency to your project.

```bash
# Using npm
npm install @culur/utils-packages --save-dev

# Using pnpm
pnpm install @culur/utils-packages --dev

# Using yarn
yarn add @culur/utils-packages --dev
```

## 📖 Usage

```ts
import {
  hasSass,
  hasTailwind,
  hasVue,
  updateDefaultPackages,
} from '@culur/utils-packages';

// detect automatically or override
updateDefaultPackages({
  // vue: true,
  sass: true,
  tailwind: 3, // false or 3 or 4
});

hasVue(); // true or false (detect automatically)
hasSass(); // true (from override)
hasTailwind(); // true (from override)
tailwindVersion(); // 3 (from override)
```

```ts
import { defineHasPackages } from '@culur/utils-packages';

// initialize a new instance
const {
  updateDefaultPackages, //
  hasVue,
  hasSass,
  hasTailwind,
  tailwindVersion,
} = defineHasPackages({
  sass: false, // (override)
});
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
