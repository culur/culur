# @culur/generate-zod

## 2.0.3

### Patch Changes

- 📦 Update dependencies ([#397](https://github.com/culur/culur/pull/397) [`8ae5be0`](https://github.com/culur/culur/commit/8ae5be08b29e6131a5583f50178f3f264ece9a4a)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `ts-to-zod@^5.0.1`

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.6.2`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 2.0.2

### Patch Changes

- 📦 Update dependencies ([`246ad8f`](https://github.com/culur/culur/commit/246ad8f82c3afc55c334de001a5ea0cdf30b3e46)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `es-toolkit@^1.40.0`
  - `devDependencies`:
    - `zod@^4.1.12`
    - `zx@^8.8.4`

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.6.1`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 2.0.1

### Patch Changes

- 📦 Update dependencies ([`00e6fcf`](https://github.com/culur/culur/commit/00e6fcfd8e317a61316252bd67e4c0f038210fb3)) ([@renovate](https://github.com/apps/renovate)):
  - `devDependencies`:
    - `zx@^8.8.3`

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.6.0`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 2.0.0

### Minor Changes

- 📦 Update dependencies ([`5f3cb88`](https://github.com/culur/culur/commit/5f3cb88533af313d7ad3b69e9e2b60d496297d88)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `ts-to-zod@^4.0.0`
  - `devDependencies`:
    - `zod@^4.1.11`

### Patch Changes

- 📦 Update dependencies ([`9a0e884`](https://github.com/culur/culur/commit/9a0e8845ca8728eb96bf90d35197cab472763f24)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `ts-to-zod@^4.0.1`
  - `devDependencies`:
    - `ink@^6.3.1`
    - `zx@^8.8.2`

- 🚨 Updated unit tests for Zod v4 compatibility (e.g. replaced `nativeEnum` with `enum`) ([`c7c1c68`](https://github.com/culur/culur/commit/c7c1c689a844a1b23af8c373c610ecf9feeb5366)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.6.0`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 1.5.0

### Minor Changes

- 🚨 Add unit tests for `declarationName` and `declarationOutputName` options ([`f0cb355`](https://github.com/culur/culur/commit/f0cb355e7ffd287f70f48d91bc064576a5bab469)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([`0a46398`](https://github.com/culur/culur/commit/0a463980038fd746a94bc89628340a858ff12174)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `es-toolkit@^1.39.10`
  - `devDependencies`:
    - `@types/async@^3.2.25`
    - `ink@^6.2.3`
    - `zx@^8.8.1`

### Patch Changes

- ⚙️ Fix `rimraf` command on Windows by adding `--glob` flag ([`d5c7476`](https://github.com/culur/culur/commit/d5c7476e65e7c96f2f74788b5a284ae7661ccb5b)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.5.0`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 1.4.0

### Minor Changes

- ✨ Add `declarationName` & `declarationOutputName` ([`1ac31be`](https://github.com/culur/culur/commit/1ac31bebb0def4e428a3fa4a3341353af938f058)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 📦 Update dependencies ([#342](https://github.com/culur/culur/pull/342) [`e718994`](https://github.com/culur/culur/commit/e7189942f190e948ac0353d2d0f58da14a5867fe)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `es-toolkit@^1.39.7`
  - `devDependencies`:
    - `zod@^3.25.76`
    - `zx@^8.7.1`

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.4.0`](https://github.com/culur/culur/tree/main/packages/logger#readme)

## 1.3.0

### Minor Changes

- ✨ Add `title`, `loggerWidth`, `loggerFileWidth` & remove `loggerProps` ([`5cea7bf`](https://github.com/culur/culur/commit/5cea7bf935817d82820f22a5ed8459e6578dba92)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- ✨ Replace `\$` with `$` in command ([`d28ca3e`](https://github.com/culur/culur/commit/d28ca3e28eb3f4f0c396469385ac66dbf52185c0)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Add `GenerateZodOptions` ([`79f2833`](https://github.com/culur/culur/commit/79f28335f99f4d836d9cb0eb77bb1754e9272dec)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([#334](https://github.com/culur/culur/pull/334) [`ec70423`](https://github.com/culur/culur/commit/ec704234132a6ac121780f8cfd4c0201eda90729)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `es-toolkit@^1.39.5`
  - `devDependencies`:
    - `ink@^6.0.1`
    - `zod@^3.25.67`
    - `zx@^8.6.0`

- ⚙️ Format `README.md` & `CHANGELOG.md` ([#332](https://github.com/culur/culur/pull/332) [`f80ca19`](https://github.com/culur/culur/commit/f80ca193496caa19abf584454b7740070c7ad7dc)) ([@renovate](https://github.com/apps/renovate)).

- 📦 Update workspace dependencies:
  - [`@culur/logger@1.4.0`](https://github.com/culur/culur/tree/main/packages/logger#readme)

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

- 📦 Update dependencies ([#311](https://github.com/culur/culur/pull/311) [`14640c2`](https://github.com/culur/culur/commit/14640c2b0b84e2f52ca7556c50043418d8dfcd45)) ([@renovate](https://github.com/apps/renovate)):
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
