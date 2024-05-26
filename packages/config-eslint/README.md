# `@culur/config-eslint`

[![NPM Version](https://img.shields.io/npm/v/@culur/config-eslint?logo=npm)](https://www.npmjs.com/package/@culur/config-eslint)
[![NPM Download](https://img.shields.io/npm/dm/@culur/config-eslint?logo=npm)](https://www.npmjs.com/package/@culur/config-eslint)
[![NPM License](https://img.shields.io/npm/l/@culur/config-eslint)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Sharing [Eslint](https://eslint.org/) configurations.

## 💿 Installation

Add `@culur/config-eslint` dependency to your project.

```bash
# Using npm
npm install @culur/config-eslint --save-dev

# Using yarn
yarn add @culur/config-eslint --dev
```

Other packages:

- Use need to install `eslint` package in devDependencies.
- For `inspector`, you can install `eslint-config-inspector` in devDependencies.

## 📖 Usage

In `eslint.config.js`, use `defineConfig`:

```js
// .eslint.config.cjs
const defineConfig = require('@culur/config-eslint');

module.exports = defineConfig();
```

```js
// .eslint.config.mjs
import defineConfig from '@culur/config-eslint';

export default defineConfig();
```

## 📜 Scripts

Some commonly used scripts in `package.json`.

```json
{
  "scripts": {
    "fix:es": "eslint --fix",
    "lint:es": "eslint",
    "lint:es-in": "eslint-config-inspector"
  }
}
```

## ✨ Features

The library is a shareable Eslint configuration. It has some key features as follows:

- Extends all config from [`@antfu/eslint-config`](https://github.com/antfu/eslint-config).
- Override and add some rules according to personal opinion.
- Full customizable (use the same functions as `@antfu/eslint-config`).

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
