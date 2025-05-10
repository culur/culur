# @culur/logger

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
