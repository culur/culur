# @culur/config-eslint

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
