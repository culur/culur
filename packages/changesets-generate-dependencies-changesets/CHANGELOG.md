# @culur/changesets-generate-dependencies-changesets

## 1.3.14

### Patch Changes

- 🩹 Fix type error in `getDependenciesType.ts` when accessing dependencies in `package.json` ([`bbb035a`](https://github.com/culur/culur/commit/bbb035a5fc799ccc1897a5f49f6c9ad8363d74b9)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 🚨 Fix ESM compatibility and update test mocks for @actions/\* packages ([`e233241`](https://github.com/culur/culur/commit/e233241ee47b1c05c1d16bdd867756c081482bd5)) ([@phamhongphuc](https://github.com/phamhongphuc)).

  Changed @actions/\* imports to named imports and updated mock implementations to be compatible with the recently upgraded ESM versions of @actions/\* packages.

- ⚙️ Update dependencies ([`0f6d083`](https://github.com/culur/culur/commit/0f6d08335cea2a29515b8b6d2d653e68d9de6858)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - `dependencies`:
    - `@actions/core@^3.0.0`
    - `@actions/exec@^3.0.0`
    - `@actions/github@^9.0.0`

- ⚙️ Update dependencies ([`0bc008e`](https://github.com/culur/culur/commit/0bc008e04d4df06328ddf4e7b12b8e897956398a)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `dedent@^1.7.1`
    - `fs-extra@^11.3.3`
    - `minimatch@^10.2.2`

- 📦 Update workspace dependencies:
  - [`@culur/types@1.3.5`](https://github.com/culur/culur/tree/main/packages/types#readme)

## 1.3.13

### Patch Changes

- ⚙️ Test: update unit test ([#411](https://github.com/culur/culur/pull/411) [`b56dacf`](https://github.com/culur/culur/commit/b56dacf90d244dba4f89125e8635b0ea21cb83a0)) ([@github-actions](https://github.com/apps/github-actions)).

- ⚙️ Update dependencies ([#406](https://github.com/culur/culur/pull/406) [`637fedf`](https://github.com/culur/culur/commit/637fedff1bbb2562c06594313b956bdeb5d471c4)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `minimatch@^10.1.1`

- ⚙️ Update vitest config ([#411](https://github.com/culur/culur/pull/411) [`76d407d`](https://github.com/culur/culur/commit/76d407d752a4bd7564b407e3c0e760ebfa1a2bc2)) ([@github-actions](https://github.com/apps/github-actions)).

- 📦 Update workspace dependencies:
  - [`@culur/types@1.3.4`](https://github.com/culur/culur/tree/main/packages/types#readme)

## 1.3.12

### Patch Changes

- 📦 Update dependencies ([`ede8599`](https://github.com/culur/culur/commit/ede859932f8536485c91433a29a2942f88c1db17)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `dedent@^1.7.0`
    - `fs-extra@^11.3.2`

- 📦 Update workspace dependencies:
  - [`@culur/types@1.3.3`](https://github.com/culur/culur/tree/main/packages/types#readme)

## 1.3.11

### Patch Changes

- 📦 Update dependencies ([`c29123d`](https://github.com/culur/culur/commit/c29123d1251df75f399ec2933d5d4d52770ef8f2)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `fs-extra@^11.3.1`

## 1.3.10

### Patch Changes

- 📦 Update dependencies ([#330](https://github.com/culur/culur/pull/330) [`27e30e3`](https://github.com/culur/culur/commit/27e30e304717fd19fd785dcf3b6ce87b5a2bca71)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `minimatch@^10.0.3`

- ⚙️ Format `README.md` & `CHANGELOG.md` ([#332](https://github.com/culur/culur/pull/332) [`f80ca19`](https://github.com/culur/culur/commit/f80ca193496caa19abf584454b7740070c7ad7dc)) ([@renovate](https://github.com/apps/renovate)).

- 📦 Update workspace dependencies:
  - [`@culur/types@1.3.2`](https://github.com/culur/culur/tree/main/packages/types#readme)

## 1.3.9

### Patch Changes

- 📦 Update `tsup` entry to improve size ([`725b41e`](https://github.com/culur/culur/commit/725b41ece53848a0135540d7cb4c5e617fabec89)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/types@1.3.1`](https://github.com/culur/culur/tree/main/packages/types#readme)

## 1.3.8

### Patch Changes

- 📦 Update dependencies ([#294](https://github.com/culur/culur/pull/294) [`dd0019c`](https://github.com/culur/culur/commit/dd0019c471807e696b1bbc6f03be969d5d519dc5)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `@actions/github@^6.0.1`
  - `devDependencies`:
    - `type-fest@^4.41.0`

- 📦 Remove `@culur/config-vite` from `devDependencies` ([`0289747`](https://github.com/culur/culur/commit/02897471b2b06f5330428fc1247158afb7365cc4)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Use `@culur/types` instead of `type-fest` ([`2687dc5`](https://github.com/culur/culur/commit/2687dc5b6c789c89bd83cf3c0b86bba5e590918b)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/types@1.3.0`](https://github.com/culur/culur/tree/main/packages/types#readme)

## 1.3.7

### Patch Changes

- 📦 Update dependencies ([`36873f1`](https://github.com/culur/culur/commit/36873f1ae7048f89f51d0a70c0f53ad1b8e5b618)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `dedent@^1.6.0`

## 1.3.6

### Patch Changes

- 🚨 Test: update unit tests for new ESLint setup ([`a59db17`](https://github.com/culur/culur/commit/a59db173a6ce8389beb04d11f2afcebcaf862b05)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.3.5

### Patch Changes

- ✨ Use regex for better `package.json` filtering ([`36c3b07`](https://github.com/culur/culur/commit/36c3b070895b1fe12f20a8c56bf42413d0aeac51)) ([@phamhongphuc](https://github.com/phamhongphuc)).

  This ensures only standard `package.json` files in subdirectories are targeted, avoiding matches with files like `package.json5` or `custom-package.json`.

- 📦 Update dependencies ([`e6c1c88`](https://github.com/culur/culur/commit/e6c1c888fc2d1337eae8001fec5caf7d6724b268)) ([@renovate](https://github.com/apps/renovate)):
  - `devDependencies`:
    - `type-fest@^4.40.1`

- 🚨 Test: improve unit test ([`e1b0a51`](https://github.com/culur/culur/commit/e1b0a5111fffae20ed679e374dda7d728d662533)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.3.4

### Patch Changes

- 📦 Update dependencies ([`8477bb1`](https://github.com/culur/culur/commit/8477bb1ab445164fa92108bda30c56cde5daf549)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - `devDependencies`:
    - `type-fest@^4.37.0`

## 1.3.3

### Patch Changes

- 📦 Update dependencies ([#197](https://github.com/culur/culur/pull/197) [`c538a63`](https://github.com/culur/culur/commit/c538a635ce3170e3adbb189f3d913137cd56b0a5)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - `dependencies`:
    - `fs-extra@^11.3.0`
  - `devDependencies`:
    - `type-fest@^4.34.1`

## 1.3.2

### Patch Changes

- 📦 Update dependencies ([`dc71536`](https://github.com/culur/culur/commit/dc71536bf73e88a65f3f1794e9b0882977715ca0)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - `devDependencies`:
    - `type-fest@^4.27.0`

## 1.3.1

### Patch Changes

- 📦 Update dependencies ([#156](https://github.com/culur/culur/pull/156) [`e00eff3`](https://github.com/culur/culur/commit/e00eff365032234f92cba8a5c29c61c43945eda4)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `@actions/core@^1.11.1`

- 📦 Update dependencies ([#157](https://github.com/culur/culur/pull/157) [`7750c48`](https://github.com/culur/culur/commit/7750c48a6f4b15782d5350e300e735ea2d1fb78e)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `@octokit/webhooks-types@^7.6.1`

## 1.3.0

### Minor Changes

- 🔨 Move some `devDependencies` to root `package.json` & update `files`, `scripts` ([`20be1dc`](https://github.com/culur/culur/commit/20be1dc915fd9369a848e8ada356099bfa942ea7)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 🔨 Migrate to `pnpm` ([`83be594`](https://github.com/culur/culur/commit/83be59407b83f4d6e84406f19e1d14b4d7660c15)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update all dependencies ([`55bb525`](https://github.com/culur/culur/commit/55bb525f6974895b29cb3c9df967cb2cc90a8cd8)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.2.4

### Patch Changes

- 🎨 Style: format code ([`7106ef6`](https://github.com/culur/culur/commit/7106ef687bd13fe3e695a241a95bb2168ef67d25)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([`f0a03a3`](https://github.com/culur/culur/commit/f0a03a33fbca1233f3d4fecb2e47d6adde48ae6f)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - `devDependencies`:
    - `@types/node@^22.5.4`
    - `type-fest@^4.26.1`

## 1.2.3

### Patch Changes

- ⚙️ Update `tsup.config.ts` ([`4231add`](https://github.com/culur/culur/commit/4231adddb239e1cfe92b696b8992ef3acf09afd6)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 🚨 Test: update mock `fs.writeFile` ([`cf5e4bd`](https://github.com/culur/culur/commit/cf5e4bd0df4102b838daf69c2e8ddf7f42b07a93)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([#88](https://github.com/culur/culur/pull/88) [`931ffd2`](https://github.com/culur/culur/commit/931ffd24457c410ee28a3a38fef93a97527a85d6)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - `devDependencies`:
    - `@types/node@^20.16.2`
    - `@vitest/coverage-v8@^2.0.5`
    - `@vitest/ui@^2.0.5`
    - `tsup@^8.2.4`
    - `type-fest@^4.26.0`
    - `typescript@^5.5.4`
    - `vitest@^2.0.5`

## 1.2.2

### Patch Changes

- 📦 Update `packageJson.homepage` & `packageJson.repository.directory` ([`95ddadc`](https://github.com/culur/culur/commit/95ddadc3dc22af28bb67ff55d02b366176e8685f)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.2.1

### Patch Changes

- 📦 Update dependencies ([`48415cd`](https://github.com/culur/culur/commit/48415cd678f229f7de42a24141ebf6ab76aa2d19)) ([@renovate](https://github.com/apps/renovate)):
  - `devDependencies`:
    - `rimraf@^6.0.1`

- 📦 Update dependencies ([`c9bb285`](https://github.com/culur/culur/commit/c9bb285546c046c0825a69f4136145cf57e79e94)) ([@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `minimatch@^10.0.1`

- 📦 Update dependencies ([`8674db9`](https://github.com/culur/culur/commit/8674db941572a49cc16a9c53e981fed32e8aebcf)) ([@renovate](https://github.com/apps/renovate)):
  - `devDependencies`:
    - `@vitest/coverage-v8@^2.0.2`
    - `@vitest/ui@^2.0.2`
    - `vitest@^2.0.2`

## 1.2.0

### Minor Changes

- 🔨 Rename to `changesets-generate-dependencies-changesets` ([`d119068`](https://github.com/culur/culur/commit/d1190685753112900d74d7126520a58f0594b56f) [@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 📦 Package `@octokit/webhooks-definitions` has been deprecated, use `@octokit/webhooks-types` instead ([`e60a9e8`](https://github.com/culur/culur/commit/e60a9e846739d86ce13b6160eaf132e387abf5b9) [@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Update changeset format ([`4b27f36`](https://github.com/culur/culur/commit/4b27f3676e387320b184ca2df17b4fa92bd10826) [@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([#35](https://github.com/culur/culur/pull/35) [`9a595fa`](https://github.com/culur/culur/commit/9a595fae5f9505e9afdc872a2f670c08bb53d419) [@renovate](https://github.com/apps/renovate)):
  - `dependencies`:
    - `minimatch@^9.0.5`
  - `devDependencies`:
    - `@types/node@^20.14.10`
    - `rimraf@^5.0.8`
    - `type-fest@^4.21.0`
    - `typescript@^5.5.3`

## 1.1.0

### Minor Changes

- 🔨 Rename to `generate-changesets` ([`7798879`](https://github.com/culur/culur/commit/77988797484b47af773475d0b4e91030244f018a) [@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 📦 Update dependencies ([#26](https://github.com/culur/culur/pull/26) [`29627d9`](https://github.com/culur/culur/commit/29627d9f3d8966a6010e89fb79c61efd9aa3ba69) [@renovate](https://github.com/apps/renovate)):
  - `devDependencies`:
    - `type-fest@^4.20.1`

## 1.0.1

### Patch Changes

- 📦 Update dependencies ([`74dbf2c`](https://github.com/culur/culur/commit/74dbf2c0050b30e9289aa7879c4cbb9ac103f4d3) [@renovate](https://github.com/apps/renovate)):
  - `devDependencies`:
    - `@types/node@^20.14.2`
    - `tsup@^8.1.0`
    - `type-fest@^4.19.0`

## 1.0.0

### Major Changes

- 🎉 Initial project ([`2f70e3e`](https://github.com/culur/culur/commit/2f70e3e56731f46176c0bfdd429d45d4cf095f8d) [@phamhongphuc](https://github.com/phamhongphuc)).
