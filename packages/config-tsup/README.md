# `@culur/config-tsup`

> Sharing [tsup](https://github.com/egoist/tsup) configurations.

## Install

Add `@culur/config-tsup` dependency to your project.

```bash
# Using npm
npm install @culur/config-tsup --save-dev

# Using yarn
yarn add @culur/config-tsup --dev
```

## Usage

### 1. Use the config directly

```ts
import { tsupConfig } from '@culur/config-tsup';

export default tsupConfig;
```

### 2. Or overwrite some properties from the shared configuration

```ts
import { defineConfig } from 'tsup';
import { tsupConfig } from '@culur/config-tsup';

export default defineConfig({
  ...tsupConfig,
  plugins: [
    //...
  ],
});
```

## Related

- [esbuild](https://github.com/evanw/esbuild) - An extremely fast JavaScript and CSS bundler and minifier.
- [tsup](https://github.com/egoist/tsup) - Bundle your TypeScript library with no config, powered by esbuild.
