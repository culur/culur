# @culur/config-eslint

## 1.4.4

### Patch Changes

- ⚙️ Update dependencies ([#308](https://github.com/culur/culur/pull/308) [`512c70a`](https://github.com/culur/culur/commit/512c70a8302b3d94af1dbd76ef7b05a3b49f411a)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^4.13.2`
    - `@vitest/eslint-plugin@^1.2.1`
  - `devDependencies`:
    - `@vue/compiler-sfc@^3.5.14`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.2.4`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.4.3

### Patch Changes

- 📦 Update `tsup` entry to improve size ([`725b41e`](https://github.com/culur/culur/commit/725b41ece53848a0135540d7cb4c5e617fabec89)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.2.3`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.4.2

### Patch Changes

- 📦 Remove useless packages ([`520934f`](https://github.com/culur/culur/commit/520934f108d91d6b24145a3cef037de847caebb4)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ⚙️ Update dependencies ([#296](https://github.com/culur/culur/pull/296) [`ebf776e`](https://github.com/culur/culur/commit/ebf776e8ad796526cc9fba72a5c516b65f7f077f)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^4.13.0`
  - `devDependencies`:
    - `type-fest@^4.41.0`

- 📦 Remove `@culur/config-vite` from `devDependencies` ([`0289747`](https://github.com/culur/culur/commit/02897471b2b06f5330428fc1247158afb7365cc4)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.2.2`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.4.1

### Patch Changes

- 📦 Update dependencies ([#282](https://github.com/culur/culur/pull/282) [`2b7da03`](https://github.com/culur/culur/commit/2b7da03b35254fc27224366d9379e45c213197bd)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@vitest/eslint-plugin@^1.1.44`

## 1.4.0

### Minor Changes

- ✨ Add `@vitest/eslint-plugin` ([`dee4cd3`](https://github.com/culur/culur/commit/dee4cd34d146a79867f6cc6b3f065f3e988732d0)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 🔨 Refactor: rename `yamlYarnrcRules` to `yarnrcYmlRules`, nothing changes in the bundle code ([`2d2c2b5`](https://github.com/culur/culur/commit/2d2c2b56805af2bba36fc52064145f1ebbd02029)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 🚨 Test: update unit tests for new ESLint setup ([`a59db17`](https://github.com/culur/culur/commit/a59db173a6ce8389beb04d11f2afcebcaf862b05)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.2.1`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.3.0

### Minor Changes

- ✨ Add `culur/renovate-json/rules` for **Renovate configurations** ([`5ba37f6`](https://github.com/culur/culur/commit/5ba37f611ea1240a75af798762bc88c2fef7f281)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - This new rule enforces consistent key sorting within Renovate configuration files
  - Currently, it automatically sorts the keys in the following sections:
    - The root-level configuration object.
    - Each individual object within the `packageRules` array.

### Patch Changes

- ⚙️ Update dependencies ([`3e1bde7`](https://github.com/culur/culur/commit/3e1bde7c0641a97c5b48e44294bb856b1b1988b4)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^4.12.0`
  - `devDependencies`:
    - `@eslint/eslintrc@^3.3.1`
    - `type-fest@^4.40.1`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.2.1`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.7

### Patch Changes

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.2.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.6

### Patch Changes

- 📦 Update dependencies ([`8477bb1`](https://github.com/culur/culur/commit/8477bb1ab445164fa92108bda30c56cde5daf549)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `dependencies`:
    - `@antfu/eslint-config@^4.10.1`
  - `devDependencies`:
    - `@eslint/eslintrc@^3.3.0`
    - `type-fest@^4.37.0`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.3`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.5

### Patch Changes

- 📦 Update dependencies ([#197](https://github.com/culur/culur/pull/197) [`c538a63`](https://github.com/culur/culur/commit/c538a635ce3170e3adbb189f3d913137cd56b0a5)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `dependencies`:
    - `@antfu/eslint-config@^4.2.0`
  - `devDependencies`:
    - `type-fest@^4.34.1`
  - `peerDependencies`:
    - `eslint@>=9.20.0`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.2`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.4

### Patch Changes

- 📦 Update dependencies ([`dc71536`](https://github.com/culur/culur/commit/dc71536bf73e88a65f3f1794e9b0882977715ca0)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `devDependencies`:
    - `@eslint/eslintrc@^3.2.0`

- 📦 Update dependencies ([`dc71536`](https://github.com/culur/culur/commit/dc71536bf73e88a65f3f1794e9b0882977715ca0)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `devDependencies`:
    - `type-fest@^4.27.0`

- 📦 Update dependencies ([`dc71536`](https://github.com/culur/culur/commit/dc71536bf73e88a65f3f1794e9b0882977715ca0)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `dependencies`:
    - `@antfu/eslint-config@^3.9.2`

- 📦 Update dependencies ([`dc71536`](https://github.com/culur/culur/commit/dc71536bf73e88a65f3f1794e9b0882977715ca0)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `devDependencies`:
    - `@vue/compiler-sfc@^3.5.13`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.1`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.3

### Patch Changes

- 📦 Update dependencies ([#146](https://github.com/culur/culur/pull/146) [`e75d1ad`](https://github.com/culur/culur/commit/e75d1ad133b80bcc6eb7aebcf4618ea74c33509d)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^3.8.0`

- 📦 Update dependencies ([#130](https://github.com/culur/culur/pull/130) [`fbc896f`](https://github.com/culur/culur/commit/fbc896fe9b49c8dd0500e1b42d7c15a2d39878c2)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `@vue/compiler-sfc@^3.5.12`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.2

### Patch Changes

- 📦 Update dependencies ([#123](https://github.com/culur/culur/pull/123) [`904f6bf`](https://github.com/culur/culur/commit/904f6bf0439d544787df2a7dd8aa6e3b0ef7a435)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `@vue/compiler-sfc@^3.5.9`

- 📦 Update dependencies ([#127](https://github.com/culur/culur/pull/127) [`c031405`](https://github.com/culur/culur/commit/c0314053c4058dcb25e889b280b7d5a78b1913df)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^3.7.3`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.1

### Patch Changes

- 📦 Update dependencies ([`dd0bb07`](https://github.com/culur/culur/commit/dd0bb0763fb5eba340703a0b79ef4c1f12c4fd5e)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `@vue/compiler-sfc@^3.5.7`

- 📦 Update dependencies ([`6a3282d`](https://github.com/culur/culur/commit/6a3282d0703fb04b32d64e6ffdc9c439438c6a6a)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^3.7.1`

- ✨ Add `.jsx` & `.tsx` to `filename/rules` ([`19025b8`](https://github.com/culur/culur/commit/19025b86036340d0f3d237d9381335af0fe13651)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.0

### Minor Changes

- 🔨 Move some `devDependencies` to root `package.json` & update `files`, `scripts` ([`20be1dc`](https://github.com/culur/culur/commit/20be1dc915fd9369a848e8ada356099bfa942ea7)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 🔨 Migrate to `pnpm` ([`83be594`](https://github.com/culur/culur/commit/83be59407b83f4d6e84406f19e1d14b4d7660c15)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update all dependencies ([`55bb525`](https://github.com/culur/culur/commit/55bb525f6974895b29cb3c9df967cb2cc90a8cd8)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 📝 Docs: add `pnpm` into the installation section ([`3ea3544`](https://github.com/culur/culur/commit/3ea3544f1c800f61b1f9aca4c74824f9337d0099)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Override `antfu/imports/rules` ([`b3eeab3`](https://github.com/culur/culur/commit/b3eeab375f6e8f56240a38e3235684c129186858)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.1.0

### Minor Changes

- 🩹 Fix: update return type of `defineConfig` ([`b490ed9`](https://github.com/culur/culur/commit/b490ed99b9887dee0b98763adbb2e4de525d50e6)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 🎨 Style: format code ([`7106ef6`](https://github.com/culur/culur/commit/7106ef687bd13fe3e695a241a95bb2168ef67d25)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([`f0a03a3`](https://github.com/culur/culur/commit/f0a03a33fbca1233f3d4fecb2e47d6adde48ae6f)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `dependencies`:
    - `@antfu/eslint-config@^3.4.1`
  - `devDependencies`:
    - `@types/node@^22.5.4`
    - `@vue/compiler-sfc@^3.5.3`
    - `eslint@^9.10.0`
    - `type-fest@^4.26.1`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.6`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.0.7

### Patch Changes

- 📦 Update dependencies ([#93](https://github.com/culur/culur/pull/93) [`4601923`](https://github.com/culur/culur/commit/460192320d9c1aa8e9ef9f5cc24d3834880dca79)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^3.0.0`

## 1.0.6

### Patch Changes

- ✨ Update `culur/yarnrc-yml/rules` ([`faea13e`](https://github.com/culur/culur/commit/faea13e970d080a10b4ef7d002105043482c9feb)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - Sort dependency name in `packageExtensions` alphabetically.
  - Sort `packageExtensions` field by `dependencies`, `peerDependencies` & `peerDependenciesMeta`.
  - Sort child dependency name alphabetically.

- ✨ `antfu/vue/rules`: add 2 override rules ([`f377173`](https://github.com/culur/culur/commit/f3771731171571552f058b19fb69ec5d2ccda49b)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `vue/padding-line-between-blocks`: always
  - `vue/component-name-in-template-casing`: with `registeredComponentsOnly: false` for support components import by `unplugin-vue-components`

- 📦 Update dependencies ([#88](https://github.com/culur/culur/pull/88) [`931ffd2`](https://github.com/culur/culur/commit/931ffd24457c410ee28a3a38fef93a97527a85d6)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `dependencies`:
    - `@antfu/eslint-config@^2.27.3`
  - `devDependencies`:
    - `@eslint/config-inspector@^0.5.4`
    - `@types/eslint@^9.6.1`
    - `@types/node@^20.16.2`
    - `@vitest/coverage-v8@^2.0.5`
    - `@vitest/ui@^2.0.5`
    - `@vue/compiler-sfc@^3.4.38`
    - `eslint@^9.9.1`
    - `tsup@^8.2.4`
    - `type-fest@^4.26.0`
    - `typescript@^5.5.4`
    - `vitest@^2.0.5`

- 🔨 Refactor: create index export for `overrides` & `rules` folders ([`e69f0cc`](https://github.com/culur/culur/commit/e69f0cc0e2b9c87015f5e444a9e642187e9927c8)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.5`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.0.5

### Patch Changes

- 📦 Update `packageJson.homepage` & `packageJson.repository.directory` ([`95ddadc`](https://github.com/culur/culur/commit/95ddadc3dc22af28bb67ff55d02b366176e8685f)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Rename to `culur/filename/rules` ([`f6cf51d`](https://github.com/culur/culur/commit/f6cf51da5d27bb40f7a53073f92662a7ebdc4e86)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Update `OverrideConfig` types ([`c6b48aa`](https://github.com/culur/culur/commit/c6b48aa33c2d6f1fa60e8399cec87ffe5e4a5e4c)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Add `culur/yarnrc-yml/rules` ([`9ba54db`](https://github.com/culur/culur/commit/9ba54dba9a511365bedc6f7d3e10870e67cd250c)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([`1111cd6`](https://github.com/culur/culur/commit/1111cd65addb46f4707868b8485aadb550e40818)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^2.22.2`

- 📦 Update dependencies ([`fdd8f85`](https://github.com/culur/culur/commit/fdd8f851eaa3282131d72bced4d864640edf74a7)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `eslint@^9.7.0`

- ✨ Override `antfu/vue/rules` ([`c5ce774`](https://github.com/culur/culur/commit/c5ce774cf1890b0d55a77e29cdfa0cfacfb2aa1e)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.4`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.0.4

### Patch Changes

- 📝 Update `README.md` ([`3f052fc`](https://github.com/culur/culur/commit/3f052fcf60f7fda0af0d156266fb716b05dde1ff)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([`cafb9f7`](https://github.com/culur/culur/commit/cafb9f713c8f2b27860b04e5c2668011ceef83c3)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^2.22.0`

- 📦 Update dependencies ([`48415cd`](https://github.com/culur/culur/commit/48415cd678f229f7de42a24141ebf6ab76aa2d19)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `rimraf@^6.0.1`

- 📦 Update dependencies ([`8674db9`](https://github.com/culur/culur/commit/8674db941572a49cc16a9c53e981fed32e8aebcf)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `@vitest/coverage-v8@^2.0.2`
    - `@vitest/ui@^2.0.2`
    - `vitest@^2.0.2`

## 1.0.3

### Patch Changes

- 📝 Update `README.md` ([`2a74486`](https://github.com/culur/culur/commit/2a744863a5ba8378906547713fde5033ea85939c) [@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([#35](https://github.com/culur/culur/pull/35) [`9a595fa`](https://github.com/culur/culur/commit/9a595fae5f9505e9afdc872a2f670c08bb53d419) [@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^2.21.3`
  - `devDependencies`:
    - `@types/node@^20.14.10`
    - `eslint@^9.6.0`
    - `rimraf@^5.0.8`
    - `type-fest@^4.21.0`
    - `typescript@^5.5.3`

## 1.0.2

### Patch Changes

- 📦 Update dependencies ([#26](https://github.com/culur/culur/pull/26) [`29627d9`](https://github.com/culur/culur/commit/29627d9f3d8966a6010e89fb79c61efd9aa3ba69) [@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^2.21.1`
  - `devDependencies`:
    - `eslint@^9.5.0`
    - `type-fest@^4.20.1`

## 1.0.1

### Patch Changes

- 📦 Update dependencies ([`74dbf2c`](https://github.com/culur/culur/commit/74dbf2c0050b30e9289aa7879c4cbb9ac103f4d3) [@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `@antfu/eslint-config@^2.20.0`
  - `devDependencies`:
    - `@types/node@^20.14.2`
    - `eslint@^9.4.0`
    - `tsup@^8.1.0`
    - `type-fest@^4.19.0`

- 📦 Update workspace dependencies to specific version ([`7f4eeae`](https://github.com/culur/culur/commit/7f4eeae4fa2c2dbed218675e8ce2cc91ca0bc4c3) [@phamhongphuc](https://github.com/phamhongphuc)).

## 1.0.0

### Major Changes

- 🎉 Initial project ([`210d07d`](https://github.com/culur/culur/commit/210d07d7ca6046807a2ff18011635c3b280dd707) [@phamhongphuc](https://github.com/phamhongphuc)).
