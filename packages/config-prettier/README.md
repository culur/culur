# `@culur/config-prettier`

[![NPM Version](https://img.shields.io/npm/v/@culur/config-prettier?logo=npm)](https://www.npmjs.com/package/@culur/config-prettier)
[![NPM Download](https://img.shields.io/npm/dm/@culur/config-prettier?logo=npm)](https://www.npmjs.com/package/@culur/config-prettier)
[![NPM License](https://img.shields.io/npm/l/@culur/config-prettier)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Sharing [Prettier](https://prettier.io) configurations.

## ✨ Features

The library is a shareable Prettier configuration. It has some key features as follows:

- Auto detect operating system to determine `endOfLine` is `crlf` or `lf`.
- Override `.*rc` & `*.code-workspace` files parser to `json`.
- Override `*.md`, `*.yml`, `*.yaml`, `package*.json` files tab width to `2`.
- Override `*.sh` files endOfLine to `lf`.

## 💿 Installation

Add `@culur/config-prettier` dependency to your project.

```bash
# Using npm
npm install @culur/config-prettier --save-dev

# Using pnpm
pnpm install @culur/config-prettier --dev

# Using yarn
yarn add @culur/config-prettier --dev
```

Other packages:

- Use need to install `prettier` package in devDependencies.

## 📖 Usage

### 1. Extending config

There are three approaches to extend this shared config.

#### a. Reference it in your `package.json`

```jsonc
{
  "name": "my-lib",
  "version": "0.0.0",
  "prettier": "@culur/config-prettier",
}
```

#### b. Use any of the supported extensions to export a string

Example: `.prettierrc.json`.

```jsonc
"@culur/config-prettier"
```

#### c. Overwrite some properties from the shared configuration

```js
// .prettierrc.cjs
const defineConfig = require('@culur/config-prettier/factory');

module.exports = defineConfig({
  semi: false,
});
```

```js
// .prettierrc.mjs
import defineConfig from '@culur/config-prettier/factory';

export default defineConfig({
  semi: false,
});
```

### 2. Ignoring Code

`Prettier` use `.prettierignore` file to ignore specific files. You can use the following command to copy our default `.prettierignore` to your project root folder:

```bash
# unix
cp "node_modules\@culur\config-prettier\.prettierignore" ".prettierignore"

# windows
copy "node_modules\@culur\config-prettier\.prettierignore" ".prettierignore"
```

## 📜 Scripts

Some commonly used scripts in `package.json`.

```json
{
  "scripts": {
    "fix:prettier": "prettier '**' --write",
    "lint:prettier": "prettier '**' --list-different"
  }
}
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
