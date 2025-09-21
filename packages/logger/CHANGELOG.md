# @culur/logger

## 1.6.0

### Minor Changes

- ✨ Transform `export *` statements into explicit exports ([`1ddc1f5`](https://github.com/culur/culur/commit/1ddc1f55bd22aad17c12806ad4e5192e53294ce8)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- ⚙️ Update dependencies ([`2df0eaf`](https://github.com/culur/culur/commit/2df0eafe23a94f6eb32652bab48dfd3e37c4116e)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `chalk@^5.6.2`
    - `dedent@^1.7.0`
    - `ink@^6.3.1`
  - `devDependencies`:
    - `@types/react@^19.1.13`

## 1.5.0

### Minor Changes

- ✨ Use `fallbackSymbols` from `figures` instead of `figureSet` to prevent rendering issues caused by `ink`'s updated `Box` component size calculation ([`85911d1`](https://github.com/culur/culur/commit/85911d1cdb8ecea1e66d5805134961b0ec116f68)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ⚙️ Update dependencies ([`a0f2890`](https://github.com/culur/culur/commit/a0f2890aeadfbb65e115b7e891cb47d9dc0c586e)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `chalk@^5.6.0`
    - `es-toolkit@^1.39.10`
    - `ink@^6.2.3`
    - `react@^19.1.1`
    - `string-width@^8.1.0`
  - `devDependencies`:
    - `@types/async@^3.2.25`
    - `@types/react@^19.1.12`

### Patch Changes

- ⚙️ Move `FORCE_COLOR` and `NO_COLOR` to vitest setup to ensure consistent color output in tests ([`7c901b3`](https://github.com/culur/culur/commit/7c901b3ad15cfe8eed7ad0b60c3bd90b40500c81)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.4.0

### Minor Changes

- ✨ Add Ink's `<Static>` again ([`fb740f1`](https://github.com/culur/culur/commit/fb740f1c1c65127dbcc4752f7a30b8b6158c3c35)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - Add **Ink's** `<Static>` component again
  - Adjusted unit tests to fit the updated code.

### Patch Changes

- ✨ Add try catch to `formatData` ([`6a17fe6`](https://github.com/culur/culur/commit/6a17fe64b2a1dffe74cac33ddb01bba6463878e8)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ⚙️ Update dependencies ([#335](https://github.com/culur/culur/pull/335) [`572415e`](https://github.com/culur/culur/commit/572415eeba78abaa0283a9d7e5546f6d49a21c9c)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `es-toolkit@^1.39.5`
    - `ink@^6.0.1`
    - `prettier@^3.6.2`
  - `devDependencies`:
    - `@types/react@^19.1.8`

- ⚙️ Format `README.md` & `CHANGELOG.md` ([#332](https://github.com/culur/culur/pull/332) [`f80ca19`](https://github.com/culur/culur/commit/f80ca193496caa19abf584454b7740070c7ad7dc)) ([@renovate](https://github.com/apps/renovate)).

## 1.3.1

### Patch Changes

- 🩹 Fix: Unmount both instances in `Logger.unmount()` ([`fa94b0f`](https://github.com/culur/culur/commit/fa94b0f355b26fb151ffad0a3d2b7b1fa2ee1a23)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.3.0

### Minor Changes

- ✨ Replaced Ink's `<Static>` with a custom static lines implementation ([`08b21f5`](https://github.com/culur/culur/commit/08b21f5dd4db8dc76830cfaeb7d5fdf96337ab37)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - Removed **Ink's** `<Static>` component because it was causing problems (often missing lines).
  - Disabled **Ink's** `patchConsole` feature because it was buggy. **Consequently, console.log can no longer be used.** Instead, please use `logger.root.log("data")`.
  - Adjusted unit tests to fit the updated code.

## 1.2.3

### Patch Changes

- 🚨 Test: update unit test ([`67dcb78`](https://github.com/culur/culur/commit/67dcb78afb7542d6914e69aa5ef200761c49ba75)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Update types ([`82a3eb4`](https://github.com/culur/culur/commit/82a3eb4c7ae8b59754d0159dffd9824082041c90)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ⚙️ Update dependencies ([`fc8de0b`](https://github.com/culur/culur/commit/fc8de0b198a632694d0fe7546881faeb7082f49d)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `ink@^6.0.0`
    - `react@^19.1.0`
  - `devDependencies`:
    - `@types/react@^19.1.6`
    - `react-devtools@^6.1.2`
    - `react-devtools-core@^6.1.2`

## 1.2.2

### Patch Changes

- ✨ Move `concurrency` into `Tasks` property ([`0d762de`](https://github.com/culur/culur/commit/0d762dee29960b0977be376d0ec26de253612910)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ⚙️ Update dependencies ([#310](https://github.com/culur/culur/pull/310) [`d42acdc`](https://github.com/culur/culur/commit/d42acdcf95b3238cdabe79d81d2af93726f312ce)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `es-toolkit@^1.38.0`
  - `devDependencies`:
    - `@types/react@^18.3.22`

- ✨ Export types `BaseRunnable` and `IRootObject` ([`843687b`](https://github.com/culur/culur/commit/843687b43a3ed96293b09a4b8cb55ba8d39f87bf)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.2.1

### Patch Changes

- 📦 Update `tsup` entry to improve size ([`725b41e`](https://github.com/culur/culur/commit/725b41ece53848a0135540d7cb4c5e617fabec89)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.2.0

### Minor Changes

- ✨ Update `TasksOptions` ([`addbb36`](https://github.com/culur/culur/commit/addbb3641e15e4d8049ef8fac87b1d7f7e4c0edc)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - Add prop `isShowTimer`
  - Add prop `isShowAllFulfilled`
  - Add prop `isShowAllPending`
  - Add prop `isShowTaskAsGrid` & `gridWidth`

### Patch Changes

- 🩹 Fix `stringifyString` to support multiline ([`0c501b7`](https://github.com/culur/culur/commit/0c501b74ec86112e638b35940f7a096beae3c1bb)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Update sealing ([`addbb36`](https://github.com/culur/culur/commit/addbb3641e15e4d8049ef8fac87b1d7f7e4c0edc)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - Rename `seal` to `isSealing`.
  - Rename `sealed` to `isSealed`.
  - First line of `Tasks` will be static if it's sealed.

- ✨ Rename `stopOnError` to `isReturnOrThrow` ([`addbb36`](https://github.com/culur/culur/commit/addbb3641e15e4d8049ef8fac87b1d7f7e4c0edc)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ⚙️ Update dependencies ([#295](https://github.com/culur/culur/pull/295) [`1707b12`](https://github.com/culur/culur/commit/1707b12cca15a9d694238cb8264f1b0c423455ee)) ([@renovate](https://github.com/apps/renovate)):
  - `devDependencies`:
    - `@types/react@^18.3.21`
    - `type-fest@^4.41.0`

- 📦 Remove `@culur/config-vite` from `devDependencies` ([`0289747`](https://github.com/culur/culur/commit/02897471b2b06f5330428fc1247158afb7365cc4)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Use `@culur/types` instead of `type-fest` ([`2687dc5`](https://github.com/culur/culur/commit/2687dc5b6c789c89bd83cf3c0b86bba5e590918b)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Migrate from `lodash-es` to `es-toolkit` ([`0775112`](https://github.com/culur/culur/commit/07751126f036ad60fe5cc594c4a4474af04e2d00)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Remove `TaskParams` & `TasksParams` to make it easier to read ([`addbb36`](https://github.com/culur/culur/commit/addbb3641e15e4d8049ef8fac87b1d7f7e4c0edc)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Add convenience functions ([`ee1dfe3`](https://github.com/culur/culur/commit/ee1dfe338d03d16e37c648c91ede2c7e26ccea74)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - `Tasks.group(title, options)`: Convenience functions for `Tasks.tasks(...)`
  - `Tasks.end()`: Seal tasks if there're no running children tasks

## 1.1.0

### Minor Changes

- ✨ Refactor & support `<Static>` to improve performance ([`0822905`](https://github.com/culur/culur/commit/0822905b0f4a15c9eb607ad211e0c831a2570cd2)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - Data will be formatted right inside `.task()` and `.tasks()` instead of using `useEffect` in component.
  - Tasks will have a sealing mechanism to optimize performance

## 1.0.1

### Patch Changes

- ✨ Export these missing items in addition to `Logger` ([`cd5f9a7`](https://github.com/culur/culur/commit/cd5f9a784807afd8d03ba3025b86e5e914e56cc0)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - Export all components (`BoxData, BoxIcon, Line, LineCol, LineCols, TextTimer`)
  - Export all items (`Task, Tasks, Log, Base`)
  - Export all types & enum (`Icon, Prefix, Status...`)
  - Export everything from the `ink` library

## 1.0.0

### Major Changes

- 📦 First release ([`59d8aec`](https://github.com/culur/culur/commit/59d8aec66ad4e204cc722f17a82c389a62282f19)) ([@phamhongphuc](https://github.com/phamhongphuc)).
