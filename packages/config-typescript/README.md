# `@culur/config-typescript`

> Sharing [TypeScript](https://www.typescriptlang.org/) configurations.

## Install

Add `@culur/config-typescript` dependency to your project.

```bash
# Using npm
npm install @culur/config-typescript --save-dev

# Using yarn
yarn add @culur/config-typescript --dev
```

## Usage

The library contains 3 configuration files:

- `tsconfig.json`: Base configuration
- `tsconfig.lib.json`: Configuration specific to the library
- `tsconfig.scripts.json`: Configuration specific to scripts

This config is extended from [`@tsconfig/recommended`](https://github.com/tsconfig/bases#recommended-tsconfigjson) with some modification.

To use, extends from these files in your project's `tsconfig.json`:

```jsonc
{
  "extends": "@culur/config-typescript/tsconfig.json",
}
```

## Requirements

Node.js >= 20
TypeScript >= 5.0.0

## Related

- [typescript](https://github.com/microsoft/TypeScript) - A language for application-scale JavaScript.

## License

MIT
