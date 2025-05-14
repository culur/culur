# @culur/generate-zod

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
