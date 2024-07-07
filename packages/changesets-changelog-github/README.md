# `@culur/changesets-changelog-github`

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> A changelog entry generator for GitHub that links to commits, PRs, and users.

## ✨ Features

This is a changelog entry generator for Github used in Changesets.
It's basically `@changesets/changelog-github`, but the format has been modified and has some more customization.

Below are some examples:

### 1. Changeset with multiple lines

Changeset file:

```md
---
'@culur/foo': patch
---

Feat: add some features:

- Feature A.
- Feature B.
```

Generated changelog:

```md
# @culur/foo

## 1.0.1

### Patch Changes

- Feat: add some features ([#123](https://github.com/culur/culur/pull/123) [`abcd123`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)):
  - Feature A.
  - Feature B.
```

Preview:

- Feat: add some features ([#123](https://github.com/culur/culur/pull/123) [`abcd123`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)):
  - Feature A.
  - Feature B.

### 2. Changeset with dependencies updating

Package `@culur/bar` has been updated to `1.0.1`.

Generated changelog:

```md
# @culur/foo

## 1.0.1

### Patch Changes

- Updated dependencies ([`abcd123`](https://github.com/culur/culur/commit/abcd123)):
  - [`@culur/bar@1.0.1`](https://github.com/culur/culur/packages/bar)
```

Preview:

- Updated dependencies ([`abcd123`](https://github.com/culur/culur/commit/abcd123)):
  - [`@culur/bar@1.0.1`](https://github.com/culur/culur/packages/bar)

## 💿 Installation

Add `@culur/changesets-changelog-github` dependency to your project.

```bash
# Using npm
npm install @culur/changesets-changelog-github --save-dev

# Using yarn
yarn add @culur/changesets-changelog-github --dev
```

## 📖 Usage

Update your `.changesets/config.json`:

```json
{
  "changelog": ["@culur/changesets-changelog-github", { "repo": "org/repo" }]
}
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
