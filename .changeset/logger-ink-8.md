---
'@culur/logger': major
---

Upgrade to `ink` v8 and `chalk` v6, which require Node.js `>=22`.

- Raise `engines.node` to `>=22`.
- `LineCol` only passes `minWidth` to `Box` when the column width is a number, since `ink` v8 no longer accepts a percentage `minWidth`.
