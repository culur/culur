# `@culur/config-typescript`

> Sharing [TypeScript](https://www.typescriptlang.org/) and [tsup](https://github.com/egoist/tsup) configurations.

## Install

Add `@culur/config-typescript` dependency to your project.

```bash
# Using npm
npm install @culur/config-typescript --save-dev

# Using yarn
yarn add @culur/config-typescript --dev
```

## Usage

### 1. TypeScript configurations <kbd><a href="./tsconfig.json">tsconfig.json</a></kbd>

This config is extended from [`@tsconfig/recommended`](https://github.com/tsconfig/bases#recommended-tsconfigjson) with some modification.

```jsonc
{
  "extends": "@culur/config-typescript/tsconfig.json"
}
```

### 2. tsup configurations <kbd><a href="./tsup.config.ts">tsup.config.ts</a></kbd>

#### a. Use the config directly

```ts
import { tsupConfig } from "@culur/config-typescript";

export default tsupConfig;
```

#### b. Or overwrite some properties from the shared configuration

```ts
import { defineConfig } from "tsup";
import { tsupConfig } from "@culur/config-typescript";

export default defineConfig({
  ...tsupConfig,
  plugins: [
    //...
  ],
});
```

## Related

- [typescript](https://github.com/microsoft/TypeScript) - A language for application-scale JavaScript.
- [esbuild](https://github.com/evanw/esbuild) - An extremely fast JavaScript and CSS bundler and minifier.
- [tsup](https://github.com/egoist/tsup) - Bundle your TypeScript library with no config, powered by esbuild.
