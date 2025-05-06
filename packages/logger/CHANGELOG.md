# @culur/logger

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
