# `@culur/types`

[![NPM Version](https://img.shields.io/npm/v/@culur/types?logo=npm)](https://www.npmjs.com/package/@culur/types)
[![NPM Download](https://img.shields.io/npm/dm/@culur/types?logo=npm)](https://www.npmjs.com/package/@culur/types)
[![NPM License](https://img.shields.io/npm/l/@culur/types)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> A collection of essential TypeScript types.

## 💿 Installation

Add `@culur/types` dependency to your project.

```bash
# Using npm
npm install @culur/types

# Using yarn
yarn add @culur/types
```

If you don't use any function in this lib, you can install it as devDependencies.

## 📖 Usage

```ts
import { defineObject } from '@culur/types';

const object = defineObject<{
  foo?: string | number;
  bar?: boolean;
}>()({
  foo: 'foo',
});
// => { foo: string }
```

## ✨ Features

| Name           | Type       | Description                                                 |
| -------------- | ---------- | ----------------------------------------------------------- |
| `defineObject` | `function` | Define the actual object.                                   |
| `entries`      | `function` | `Object.entries()` functions with types from `type-fest`.   |
| `keys`         | `function` | `Object.keys()` function with types from `type-fest`.       |
| `PackageJson`  | `type`     | `PackageJson` from `type-fest` and extends some custom type |

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
