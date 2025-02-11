# @culur/config-stylelint

## 1.3.5

### Patch Changes

- 📦 Update dependencies ([#197](https://github.com/culur/culur/pull/197) [`c538a63`](https://github.com/culur/culur/commit/c538a635ce3170e3adbb189f3d913137cd56b0a5)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `dependencies`:
    - `stylelint-config-clean-order@^7.0.0`
    - `stylelint-config-standard@^37.0.0`
    - `stylelint-config-standard-scss@^14.0.0`
    - `stylelint-scss@^6.11.0`
  - `devDependencies`:
    - `postcss@^8.5.2`
    - `postcss-html@^1.8.0`
  - `peerDependencies`:
    - `stylelint@>=16.14.1`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.2`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.3.4

### Patch Changes

- 📦 Update dependencies ([`dc71536`](https://github.com/culur/culur/commit/dc71536bf73e88a65f3f1794e9b0882977715ca0)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `dependencies`:
    - `stylelint-scss@^6.9.0`

- 📦 Update dependencies ([`dc71536`](https://github.com/culur/culur/commit/dc71536bf73e88a65f3f1794e9b0882977715ca0)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `devDependencies`:
    - `postcss@^8.4.49`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.1`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.3.3

### Patch Changes

- 📦 Update dependencies ([#147](https://github.com/culur/culur/pull/147) [`c50dd8c`](https://github.com/culur/culur/commit/c50dd8c8a21279da5c7cf122c567697497d45d62)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `stylelint-scss@^6.8.1`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.3.2

### Patch Changes

- ✨ Add `selector-pseudo-class-no-unknown` for css module ([`969b5ab`](https://github.com/culur/culur/commit/969b5ab2f312e5239971fd7109f3b55fe9bf9052)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.3.1

### Patch Changes

- ✨ Add `*.woff2` into `.stylelintignore` ([`ebb5d51`](https://github.com/culur/culur/commit/ebb5d518879ee4b16b99ba3078acbad155ece54c)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.3.0

### Minor Changes

- ✨ - Update `order/order` by groups ([`56b20f6`](https://github.com/culur/culur/commit/56b20f621e5ef0674733b8a0e919c33db483d607)) ([@phamhongphuc](https://github.com/phamhongphuc)):
  - Import: @use, @forward, @import
  - Root: @config, @tailwind, @layer
  - Variables: $variable, @variable, --property
  - Functions: @function, @mixin
  - Declarations: @extend, @include, @apply, .mixin(), display: block
  - Block rules: &::after {}, child-component {}
  - Blocks nested: @at-root, @responsive, @variants, @screen, @media

### Patch Changes

- 📦 Update dependencies ([`f2fd67d`](https://github.com/culur/culur/commit/f2fd67d82d2fafebd29fbe4cb7b1efb7076b8a70)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `postcss@^8.4.47`

- 📦 Update dependencies ([`20aaced`](https://github.com/culur/culur/commit/20aaced1c061595b4caa464badc211439b9ce63e)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `stylelint-scss@^6.7.0`

- ✨ Disable `declaration-empty-line-before` ([`7d04f22`](https://github.com/culur/culur/commit/7d04f227023bb3fc7fe065e5e3d93089bf1271d6)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Update `.stylelintignore` based on [`github/gitignore`](https://github.com/github/gitignore) ([`d0ddbd6`](https://github.com/culur/culur/commit/d0ddbd6a4d80898a5c3ca6739bbb7f7b157cf302)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.2.0

### Minor Changes

- 🔨 Move some `devDependencies` to root `package.json` & update `files`, `scripts` ([`20be1dc`](https://github.com/culur/culur/commit/20be1dc915fd9369a848e8ada356099bfa942ea7)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 🔨 Migrate to `pnpm` ([`83be594`](https://github.com/culur/culur/commit/83be59407b83f4d6e84406f19e1d14b4d7660c15)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update all dependencies ([`55bb525`](https://github.com/culur/culur/commit/55bb525f6974895b29cb3c9df967cb2cc90a8cd8)) ([@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 📝 Docs: add `pnpm` into the installation section ([`3ea3544`](https://github.com/culur/culur/commit/3ea3544f1c800f61b1f9aca4c74824f9337d0099)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Feat: update `.stylelintignore` ([`174f30b`](https://github.com/culur/culur/commit/174f30b061eb97c6dc8e114e24c9f7060008e311)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.1.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.1.1

### Patch Changes

- 🎨 Style: format code ([`7106ef6`](https://github.com/culur/culur/commit/7106ef687bd13fe3e695a241a95bb2168ef67d25)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([`f0a03a3`](https://github.com/culur/culur/commit/f0a03a33fbca1233f3d4fecb2e47d6adde48ae6f)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `devDependencies`:
    - `@types/node@^22.5.4`
    - `postcss@^8.4.45`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.6`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.1.0

### Minor Changes

- ✨ Export pre-built configs to extends ([`10e640b`](https://github.com/culur/culur/commit/10e640b767aed4aaa5d859ddbf4aedfec6626bac)) ([@phamhongphuc](https://github.com/phamhongphuc)).

## 1.0.5

### Patch Changes

- 📦 Update dependencies ([#88](https://github.com/culur/culur/pull/88) [`931ffd2`](https://github.com/culur/culur/commit/931ffd24457c410ee28a3a38fef93a97527a85d6)) ([@phamhongphuc](https://github.com/phamhongphuc)):

  - `dependencies`:
    - `stylelint-scss@^6.5.1`
  - `devDependencies`:
    - `@types/node@^20.16.2`
    - `@vitest/coverage-v8@^2.0.5`
    - `@vitest/ui@^2.0.5`
    - `postcss@^8.4.41`
    - `stylelint@^16.9.0`
    - `tsup@^8.2.4`
    - `typescript@^5.5.4`
    - `vitest@^2.0.5`

- 🩹 `ignoreFunctions` is `[]` (empty array) instead of `undefined` ([`031cace`](https://github.com/culur/culur/commit/031cacea954b7574f349c28dd40c307095ee69cb)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- ✨ Add `factory` to entry point ([`1269ad5`](https://github.com/culur/culur/commit/1269ad5548345a4681eb67bf4f0a33079b256723)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.5`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.0.4

### Patch Changes

- 📦 Update `packageJson.homepage` & `packageJson.repository.directory` ([`95ddadc`](https://github.com/culur/culur/commit/95ddadc3dc22af28bb67ff55d02b366176e8685f)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.4`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.0.3

### Patch Changes

- ✨ Update tsup config ([`571e742`](https://github.com/culur/culur/commit/571e742777500a4c30fcc433e84c5ed081db8cb8)) ([@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([`48415cd`](https://github.com/culur/culur/commit/48415cd678f229f7de42a24141ebf6ab76aa2d19)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `rimraf@^6.0.1`

- 📦 Update dependencies ([`9e437f6`](https://github.com/culur/culur/commit/9e437f6a43faa352d4a2d9235571df68b084ebf5)) ([@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `stylelint-scss@^6.4.1`

- 📦 Update dependencies ([`bcc7aeb`](https://github.com/culur/culur/commit/bcc7aeb1f6780ff7a53f2202a1bfa0de2236ee14)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `stylelint@^16.7.0`

- 📦 Update dependencies ([`8674db9`](https://github.com/culur/culur/commit/8674db941572a49cc16a9c53e981fed32e8aebcf)) ([@renovate](https://github.com/apps/renovate)):

  - `devDependencies`:
    - `@vitest/coverage-v8@^2.0.2`
    - `@vitest/ui@^2.0.2`
    - `vitest@^2.0.2`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.3`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.0.2

### Patch Changes

- 📝 Update `README.md` ([`2a74486`](https://github.com/culur/culur/commit/2a744863a5ba8378906547713fde5033ea85939c) [@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update dependencies ([#35](https://github.com/culur/culur/pull/35) [`9a595fa`](https://github.com/culur/culur/commit/9a595fae5f9505e9afdc872a2f670c08bb53d419) [@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `stylelint-config-clean-order@^6.1.0`
    - `stylelint-config-standard@^36.0.1`
    - `stylelint-scss@^6.3.2`
  - `devDependencies`:
    - `@types/node@^20.14.10`
    - `postcss@^8.4.39`
    - `rimraf@^5.0.8`
    - `typescript@^5.5.3`

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.2`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.0.1

### Patch Changes

- 📦 Update dependencies ([`49476de`](https://github.com/culur/culur/commit/49476dee58addebe889a9bd134435a7d41a6d1f2) [@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `stylelint-config-clean-order@^6.0.0`

- 📦 Update dependencies ([`74dbf2c`](https://github.com/culur/culur/commit/74dbf2c0050b30e9289aa7879c4cbb9ac103f4d3) [@renovate](https://github.com/apps/renovate)):

  - `dependencies`:
    - `stylelint-scss@^6.3.1`
  - `devDependencies`:
    - `@types/node@^20.14.2`
    - `stylelint@^16.6.1`
    - `tsup@^8.1.0`

- 📦 Update workspace dependencies to specific version ([`7f4eeae`](https://github.com/culur/culur/commit/7f4eeae4fa2c2dbed218675e8ce2cc91ca0bc4c3) [@phamhongphuc](https://github.com/phamhongphuc)).

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.1`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)

## 1.0.0

### Major Changes

- 🎉 Initial project ([`a83892c`](https://github.com/culur/culur/commit/a83892c01bc3a49cd21b79a1abd5443147fff0c4) [@phamhongphuc](https://github.com/phamhongphuc)).

### Patch Changes

- 📦 Update workspace dependencies:
  - [`@culur/utils-packages@1.0.0`](https://github.com/culur/culur/tree/main/packages/utils-packages#readme)
