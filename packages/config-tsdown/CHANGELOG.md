# @culur/config-tsdown

## 1.1.0

### Minor Changes

- 🎉 Add `@culur/config-tsdown` package as a replacement for `@culur/config-tsup` ([`c828933`](https://github.com/culur/culur/commit/c828933f1c39505be8b2b1c5cbca6f0549bfa02d)) ([@phamhongphuc](https://github.com/phamhongphuc)).

  This new package provides a standardized configuration for `tsdown`, supporting ESM and CJS formats with built-in TypeScript definitions and source mapping.

- ⚙️ Migrate build system from `tsup` to `tsdown` across all packages ([`83b3791`](https://github.com/culur/culur/commit/83b379149b9e9536f4cd161976762afb35b6b61a)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- ⚙️ Added `tsdown` to `devDependencies` for development and testing ([`1521d34`](https://github.com/culur/culur/commit/1521d34b3a6ac832a6f85d7ae8d3cc41f8622109)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 🔨 Update internal references and configurations to align with the renaming of `defineObject` to `defineObjectFactory` ([`93080d5`](https://github.com/culur/culur/commit/93080d5424969774178f2035a3fc623b199ca64d)) ([@phamhongphuc](https://github.com/phamhongphuc)).
