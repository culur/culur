# `@culur/config-stylelint`

[Culur](https://github.com/culur)'s config for [Stylelint](https://stylelint.io).

## Features

### Extends

- The config extends rules from:
  - [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard) - The standard shareable config for Stylelint.
  - [`stylelint-config-standard-scss`](https://github.com/stylelint-scss/stylelint-config-standard-scss) - The standard shareable SCSS config for Stylelint.
  - [`stylelint-config-recommended-vue`](https://github.com/ota-meshi/stylelint-config-recommended-vue) - The recommended shareable Vue config for Stylelint.
  - [`stylelint-config-recess-order`](https://github.com/stormwarning/stylelint-config-recess-order) - The configurations that sorts CSS properties the way Recess did and Bootstrap did/does.
- Plugins from:
  - [`stylelint-order`](https://github.com/hudochenkov/stylelint-order) - A plugin pack of order related linting rules for stylelint.
  - [`stylelint-scss`](https://github.com/kristerkari/stylelint-scss) - A collection of SCSS specific linting rules for stylelint.
- And it also has our custom config for [Tailwind CSS](https://tailwindcss.com/) (e.g. [`at-rule-no-unknown`](https://stylelint.io/user-guide/rules/at-rule-no-unknown)) and more.

### Custom Syntax

Because Stylelint no longer includes parsers (for scss, vue...) this config will use the overrides property to config the following syntaxes if needed.

- [`postcss-html`](https://www.npmjs.com/package/postcss-html) - For `html, php, vue, svelte, xml` files.
- [`postcss-scss`](https://www.npmjs.com/package/postcss-scss) - For `scss` files.
- [`postcss-sass`](https://www.npmjs.com/package/postcss-sass) - For `sass` files.

### Auto detect environment

The config is smart enough to detect the environment automatically.

- If you've installed `sass` or `dart-sass` or `node-sass`, the config will load the `stylelint-scss` plugin and its configurations.

- If you've installed `tailwindcss`:

  - The rule `at-rule-no-unknown` will ignore all [Tailwind CSS's Directives](https://tailwindcss.com/docs/functions-and-directives).
  - The rule `order/order` (from `stylelint-order`) will be modified from `stylelint-config-hudochenkov/order` to our custom to make it can work with [Tailwind CSS](https://tailwindcss.com).

- If you've installed `vue`, the config will extends `stylelint-config-recommended-vue`.

### Dependencies

This config bundles the following packages, you don't need to install them yourself anymore

- `postcss-html`
- `postcss-sass`
- `postcss-scss`
- `stylelint-config-html`
- `stylelint-config-hudochenkov`
- `stylelint-config-prettier`
- `stylelint-config-standard`
- `stylelint-config-standard-scss`
- `stylelint-config-standard-vue`
- `stylelint-order`
- `stylelint-scss`

## Install

Add `@culur/stylelint-config` dependency to your project.

```bash
# Using npm
npm install @culur/stylelint-config --save-dev

# Using yarn
yarn add @culur/stylelint-config --dev
```

## Usage

If you've installed `@culur/stylelint-config` locally within your project, Just set your stylelint config to:

```json
{
  "extends": ["@culur/stylelint-config"]
}
```

If you've globally installed `@culur/stylelint-config` using the `-g` flag, then you'll need to use the absolute path to `@culur/stylelint-config` in your config e.g.

```json
{
  "extends": "/absolute/path/to/@culur/stylelint-config"
}
```

### Scripts

Some commonly used scripts in `package.json`.

```json
{
  "scripts": {
    "fix:css": "stylelint **/*.{vue,tsx,css,scss} --allow-empty-input --fix",
    "test:css": "stylelint **/*.{vue,tsx,css,scss} --allow-empty-input"
  }
}
```

## Related

### Stylelint

- [Stylelint](https://github.com/stylelint/stylelint) - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
- [Stylelint - Configurations](https://stylelint.io/user-guide/configure) - Document on stylelint configurations.

### Library

- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework for rapid UI development.
- [VueJS](https://vuejs.org/) - An approachable, performant and versatile framework for building web user interfaces.

### Configuration

- [Stylelint Config Standard](https://github.com/stylelint/stylelint-config-standard) - The standard shareable config for stylelint.
- [Stylelint Config Standard SCSS](https://github.com/stylelint-scss/stylelint-config-standard-scss) - The standard shareable SCSS config for Stylelint.
- [Stylelint Config Standard Vue](https://github.com/ota-meshi/stylelint-config-standard-vue) - The standard shareable Vue config for Stylelint.
- [Stylelint Config Html](https://github.com/ota-meshi/stylelint-config-html) - The shareable HTML config for Stylelint.
- [Stylelint Config Prettier](https://github.com/prettier/stylelint-config-prettier) - Turns off all rules that are unnecessary or might conflict with prettier.
- [Stylelint Config Hudochenkov](https://github.com/hudochenkov/stylelint-config-hudochenkov) - The configurations from the author of [`stylelint-order`](https://github.com/hudochenkov/stylelint-order).

### Syntaxes

- [PostCSS HTML Syntax](https://www.npmjs.com/package/postcss-html) - PostCSS syntax for parsing HTML (and HTML-like).
- [PostCSS SCSS Syntax](https://www.npmjs.com/package/postcss-scss) - SCSS parser for PostCSS.
- [PostCSS SASS Syntax](https://www.npmjs.com/package/postcss-sass) - SASS parser for PostCSS.

### Plugins

- [Stylelint Order](https://github.com/hudochenkov/stylelint-order) - A plugin pack of order related linting rules for stylelint.
- [Stylelint SCSS](https://github.com/kristerkari/stylelint-scss) - A collection of SCSS specific linting rules for stylelint.
