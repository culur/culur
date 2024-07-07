# `@culur/config-vite`

[![NPM Version](https://img.shields.io/npm/v/@culur/config-vite?logo=npm)](https://www.npmjs.com/package/@culur/config-vite)
[![NPM Download](https://img.shields.io/npm/dm/@culur/config-vite?logo=npm)](https://www.npmjs.com/package/@culur/config-vite)
[![NPM License](https://img.shields.io/npm/l/@culur/config-vite)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Sharing [Vite](https://vitejs.dev/)/[Vitest](https://vitest.dev/) configurations.

## ✨ Features

The library is a shareable vite/vitest configuration. It has some key features as follows:

- Include `vite-tsconfig-paths` plugin by default.
- Include `vitest` config by default (with `typecheck`, `coverage`).
- Customizable for more complex applications.

## 💿 Installation

Add `@culur/config-vite` dependency to your project.

```bash
# Using npm
npm install @culur/config-vite --save-dev

# Using yarn
yarn add @culur/config-vite --dev
```

Other packages:

- For `vite` usage, you need to install `vite` package in devDependencies.
- For `vitest` usage, you need to install `vitest`, `@vitest/ui`, `@vitest/coverage-v8` packages in devDependencies.
- For typecheck:
  - Use `tsc` (from `typescript` package)
  - Use `vue-tsc` (from `vue-tsc` package).

## 📖 Usage

### 1. Use default config

In `vite.config.mts`:

```ts
import { vite } from '@culur/config-vite';

export default vite;
```

In `vitest.config.mts`:

```ts
import { vitest } from '@culur/config-vite';

export default vitest;
```

### 2. Use custom config

In `vite.config.ts` or `vitest.config.mts`:

```ts
import { defineConfig } from '@culur/config-vite';

export default defineConfig({
  test: true, // or false
  // other configs...
});
```

## 📜 Scripts

Some commonly used scripts in `package.json`.

```json
{
  "scripts": {
    "test": "vitest run",
    "test-tsc": "tsc --noEmit && vitest run",
    "test-vue-tsc": "vue-tsc --noEmit && vitest run",
    "test-ui": "vitest --ui"
  }
}
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
