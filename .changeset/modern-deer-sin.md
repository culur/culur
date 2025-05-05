---
'@culur/logger': minor
---

Refactor & support `<Static>` to improve performance:

- Data will be formatted right inside `.task()` and `.tasks()` instead of using `useEffect` in component.

- Tasks will have a sealing mechanism to optimize performance
