---
'@culur/logger': minor
---

- Fix: Change `Task` data type to better support tuple and list.
- Feat: Change `TData` to `TItems` in `Task` and `Tasks`.
- Feat: Add `Tasks._pushTasks()` to replace direct `Tasks.#tasks.push()` calls and support external calls.
