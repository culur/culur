# `@culur/prettier-config`

> Sharing [Prettier](https://prettier.io) configurations.

## Install

Add `@culur/prettier-config` dependency to your project.

```bash
# Using npm
npm install @culur/prettier-config --save-dev

# Using yarn
yarn add @culur/prettier-config --dev
```

## Usage

There are three approaches to extend this shared config.

### 1. Reference it in your `package.json`

```jsonc
{
  "name": "my-lib",
  "version": "0.0.0",
  "prettier": "@culur/prettier-config",
}
```

### 2. Use any of the supported extensions to export a string

Example: `.prettierrc.json`.

```jsonc
"@culur/prettier-config"
```

### 3. Overwrite some properties from the shared configuration

```js
// .prettierrc.js
module.exports = {
  ...require('@culur/prettier-config'),
  semi: false,
};
```

```js
// .prettierrc.mjs
import config from '@culur/config-prettier';

export default {
  ...config,
  semi: false,
};
```

## Ignoring Code

`Prettier` does not provide a full solution to share the `.prettierignore` file. But we can still share the file between projects using one of two approaches below.

### 1. Using `--ignore-path` CLI option

The simplest way to do this is using `--ignore-path` CLI option.

```bash
prettier ** --write --ignore-path node_modules/@culur/prettier-config/.prettierignore
```

By this way, there's no need to create a new file in your project folder. But you also can't extend the `.prettierignore` file.

### 2. Copy the ignore file to your project folder

If you want to extend the ignore file, run the following command in the root of your project folder:

```bash
# unix
cp "node_modules\@culur\prettier-config\.prettierignore" ".prettierignore"

# windows
copy "node_modules\@culur\prettier-config\.prettierignore" ".prettierignore"
```

It will copy the `.prettierignore` from `@culur/prettier-config` to your project root folder.

### Scripts

Some commonly used scripts in `package.json`.

```json
{
  "scripts": {
    "fix:prettier": "prettier ** --write",
    "test:prettier": "prettier ** --list-different"
  }
}
```

## Related

- [Prettier](https://github.com/prettier/prettier) - an opinionated code formatter.
- [Prettier - Sharing configurations](https://prettier.io/docs/en/configuration.html#sharing-configurations) - Document on sharing prettier configurations.
- [Prettier - Ignore Code](https://prettier.io/docs/en/ignore.html) - Use `.prettierignore` to ignore certain files and folders completely.
