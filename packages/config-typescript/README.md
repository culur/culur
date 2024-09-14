# `@culur/config-typescript`

[![NPM Version](https://img.shields.io/npm/v/@culur/config-typescript?logo=npm)](https://www.npmjs.com/package/@culur/config-typescript)
[![NPM Download](https://img.shields.io/npm/dm/@culur/config-typescript?logo=npm)](https://www.npmjs.com/package/@culur/config-typescript)
[![NPM License](https://img.shields.io/npm/l/@culur/config-typescript)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Sharing [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

## ✨ Features

There are 3 configurations:

| File                 | Alias  | Target   | Module   | Description                                                                                                             |
| -------------------- | ------ | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `tsconfig.base.json` | `base` | -        | -        | Base configuration                                                                                                      |
| `tsconfig.json`      | `.`    | `ES2021` | `ESNext` | Default configuration                                                                                                   |
| `tsconfig.bun.json`  | `bun`  | `ESNext` | `ESNext` | Configuration specific to bun ([Suggested `compilerOptions`](https://bun.sh/docs/typescript#suggested-compileroptions)) |

## 💿 Installation

Add `@culur/config-typescript` dependency to your project.

```bash
# Using npm
npm install @culur/config-typescript --save-dev

# Using pnpm
pnpm install @culur/config-typescript --dev

# Using yarn
yarn add @culur/config-typescript --dev
```

Other packages:

- Use need to install `typescript` and `@types/node` packages in devDependencies.

### 🔌 Requirements

- Node.js >= 20
- TypeScript >= 5.1

## 📖 Usage

Add to your `tsconfig.json`:

```jsonc
{
  "extends": "@culur/config-typescript",
}
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
