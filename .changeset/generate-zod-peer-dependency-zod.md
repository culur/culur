---
'@culur/generate-zod': patch
---

Add `zod` to `peerDependencies`.

Specify `zod: ^4.0.0` under `peerDependencies` to treat `zod` as an external dependency during type bundling and prevent bundling CJS declaration files.
