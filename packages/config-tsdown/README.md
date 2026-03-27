# `@culur/config-tsdown`

[![NPM Version](https://img.shields.io/npm/v/@culur/config-tsdown?logo=npm)](https://www.npmjs.com/package/@culur/config-tsdown)
[![NPM Download](https://img.shields.io/npm/dm/@culur/config-tsdown?logo=npm)](https://www.npmjs.com/package/@culur/config-tsdown)
[![NPM License](https://img.shields.io/npm/l/@culur/config-tsdown)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Sharing [tsdown](https://tsdown.dev/) configurations.

## ✨ Features

The library includes several tsdown configurations for reuse.

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
  treeshake: true,
};
```

### 2. There are 3 complete configurations

| Name      | Format       |
| --------- | ------------ |
| `esm`     | `esm`        |
| `cjs`     | `cjs`        |
| `esm_cjs` | `esm`, `cjs` |

## 💿 Installation

Add `@culur/config-tsdown` dependency to your project.

```bash
# Using npm
npm install @culur/config-tsdown --save-dev

# Using pnpm
pnpm install @culur/config-tsdown --dev

# Using yarn
yarn add @culur/config-tsdown --dev
```

Other packages:

- You also need to install `tsdown` and `typescript` packages in `devDependencies`.

## 📖 Usage

### 1. Use the config directly

In `tsdown.config.ts`, use:

```ts
import { cjs, esm, esm_cjs } from '@culur/config-tsdown';

// format 'esm'
export default esm;

// format 'cjs'
export default cjs;

// format 'esm_cjs'
export default esm_cjs;
```

### 2. Overwrite some properties from the shared configuration

In `tsdown.config.ts`, use `defineConfig`:

```ts
import { defineConfig, esm } from '@culur/config-tsdown';

export default defineConfig({
  ...esm,
  //...
});
```

## 🔄 Migrate from tsup

If you are migrating from `@culur/config-tsup`, you can follow these steps:

1. Replace `@culur/config-tsup` with `@culur/config-tsdown`.
2. Update your `tsup.config.ts` to `tsdown.config.ts`.
3. Change imports from `@culur/config-tsup` to `@culur/config-tsdown`.

For more details on migrating from tsup to tsdown, please refer to the official [tsdown migration guide](https://tsdown.dev/guide/migrate-from-tsup).

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
    "build": "tsdown"
  }
}
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
