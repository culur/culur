# `@culur/config-tsup`

[![NPM Version](https://img.shields.io/npm/v/@culur/config-tsup?logo=npm)](https://www.npmjs.com/package/@culur/config-tsup)
[![NPM Download](https://img.shields.io/npm/dm/@culur/config-tsup?logo=npm)](https://www.npmjs.com/package/@culur/config-tsup)
[![NPM License](https://img.shields.io/npm/l/@culur/config-tsup)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Sharing [tsup](https://github.com/egoist/tsup) configurations.

## 💿 Installation

Add `@culur/config-tsup` dependency to your project.

```bash
# Using npm
npm install @culur/config-tsup --save-dev

# Using yarn
yarn add @culur/config-tsup --dev
```

Other packages:

- Use need to install `tsup` and `typescript` packages in devDependencies.

## 📖 Usage

### 1. Use the config directly

In `tsup.config.ts`, use:

```ts
import { cjs, esm, esm_cjs } from '@culur/config-tsup';

// format 'esm'
export default esm;

// format 'cjs'
export default cjs;

// format 'esm_cjs'
export default esm_cjs;
```

### 2. Overwrite some properties from the shared configuration

In `tsup.config.ts`, use `defineConfig`:

```ts
import { defineConfig, esm } from '@culur/config-tsup';

export default defineConfig({
  ...esm,
  plugins: [
    //...
  ],
});
```

## 📜 Scripts

Some commonly used scripts in `package.json`.

```json
{
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  },
  "files": ["CHANGELOG.md", "LICENSE", "README.md", "dist", "src"],
  "scripts": {
    "build": "tsup"
  }
}
```

## ✨ Features

The library includes several tsup configurations for reuse

### 1. Shared configuration

```js
const sharedConfig = {
  sourcemap: true,
  clean: true,
  dts: true,
  entry: [
    'src/**/*.ts', //
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
  ],
  treeshake: 'recommended',
};
```

### 2. There are 3 complete configurations

| Name      | Format       | Splitting |
| --------- | ------------ | --------- |
| `esm`     | `esm`        | `true`    |
| `cjs`     | `cjs`        |           |
| `esm_cjs` | `esm`, `cjs` | `true`    |

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
