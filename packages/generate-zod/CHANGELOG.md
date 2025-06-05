# @culur/generate-zod

## 1.2.0

### Minor Changes

- ✨ Move default cwd to `generateZod` function ([`0b5b751`](https://github.com/culur/culur/commit/0b5b751ef7a580d7e82dee96d5478d9f5697f298)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.3.0`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 1.1.1

### Patch Changes

- 📦 Update dependencies ([#319](https://github.com/culur/culur/pull/319) [`6413d53`](https://github.com/culur/culur/commit/6413d5311acb30779eb52a25baed0f19f10998dc)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `zod@^3.25.50`

- 📦 Update dependencies ([`56cc332`](https://github.com/culur/culur/commit/56cc332f48ef070cefeef0a670aa06f0fe3b5103)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `ink@^6.0.0`

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.2.3`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 1.1.0

### Minor Changes

- 🔨 Refactor ([`d97f2d0`](https://github.com/culur/culur/commit/d97f2d0ca85ba106f145b9d3e1b521cf3ca401c4)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - Rename `importLines` to `customImport`.
  - Remove `importIsValidAgainstSchema`, use `customImport` only.
  - By default, `postCommands` has `prettier` command only.
  - Add prop `cwd`.
  - Add prop `loggerProps`.
  - Add `@culur/logger` as `peerDependencies`.

### Patch Changes

- ⚙️ Update dependencies ([#311](https://github.com/culur/culur/pull/311) [`14640c2`](https://github.com/culur/culur/commit/14640c2b0b84e2f52ca7556c50043418d8dfcd45)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `es-toolkit@^1.38.0`
  - `devDependencies`:
    - `zod@^3.25.28`
    - `zx@^8.5.4`

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.2.2`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 1.0.1

### Patch Changes

- 🔨 Refactor `isValidAgainstSchema()` ([`22ffb0b`](https://github.com/culur/culur/commit/22ffb0b6cb5d1d26d4638fa47e76c818f6ba9b14)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - Rename `isValidBySchema()` to `isValidAgainstSchema()`.
  - Add entry `./is-valid-against-schema` and use it to improve tree-shaking. This will avoid importing "fs/promise" in the browser environment.
  - Add `debug` parameter to improve debugging.

## 1.0.0

### Major Changes

- 📦 Update dependencies ([`50b8b0f`](https://github.com/culur/culur/commit/50b8b0f7972c921c86c88a8b2b7a3d291bfb0a4a)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - Move `dedent` to `peerDependencies`.
  - Move `zx` to `devDependencies` and upgrade.

### Patch Changes

- ✨ Update `options` types ([`d4983a6`](https://github.com/culur/culur/commit/d4983a6313f3fee34e120fb2ad480ef4f31312e0)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📝 Add `README.md` ([`3bd6459`](https://github.com/culur/culur/commit/3bd6459d9484862efa137f4a072be66834f0665c)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update `tsup` entry to improve size ([`725b41e`](https://github.com/culur/culur/commit/725b41ece53848a0135540d7cb4c5e617fabec89)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📝 Change `homepage` ([`f2e4586`](https://github.com/culur/culur/commit/f2e45865408899b9e6c22d4826ffa2dd34d1bc96)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 0.0.1

### Patch Changes

- 🚨 Improve unit test ([`8be5e45`](https://github.com/culur/culur/commit/8be5e45d50da5c85fead7df94365d32f786f31bb)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Remove `@culur/config-vite` from `devDependencies` ([`0289747`](https://github.com/culur/culur/commit/02897471b2b06f5330428fc1247158afb7365cc4)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Migrate from `lodash-es` to `es-toolkit` ([`0775112`](https://github.com/culur/culur/commit/07751126f036ad60fe5cc594c4a4474af04e2d00)) ([@phamhongphuc](https://github.com/phamhongphuc)).
