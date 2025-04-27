---
'@culur/changesets-generate-dependencies-changesets': patch
---

Use regex for better `package.json` filtering.

This ensures only standard `package.json` files in subdirectories are targeted, avoiding matches with files like `package.json5` or `custom-package.json`.
