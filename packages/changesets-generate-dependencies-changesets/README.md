# `@culur/changesets-generate-dependencies-changesets`

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Github action for generate dependencies changesets.

## ✨ Features

Tools like renovate or dependabot already perform automatic dependency updates, however, changesets do not understand these changes and developers have to add changesets themselves.

This action will generate markdown changeset files in each dependabot or renovate pull request. Specifically, this action will:

- If the pull request contains any changeset files, this action will skip the next steps.
- Identify changed dependencies from `package.json` file changes.
  - If one of the following fields changes (`dependencies`, `devDependencies`, `optionalDependencies`, `peerDependencies`, `engines`, `volta`), it is considered to have changed dependencies.
  - This action supports both monorepo and polyrepo. Each `package.json` file will represent a project.
- Generate markdown changeset files. Regardless of the updated dependencies, type of change will always be patch.
- Amend previous commit with generated files.
- Force push to your repository.

## 📖 Usage

To be able to use this action you need to follow the following steps:

### 1. Create and use Personal Access Token

After this action changes the changeset files and push commit, you may want the workflow to run again (to track the pull request status).

There are several workarounds to trigger further workflow runs, which each have their own pros and cons, this action uses the Personal Access Token for its own sake, to create and add the Personal Access Token to your repository, follow the instructions below.

1. Create your Personal Access Token ([docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)).
2. Add secrets for your repository ([docs](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)).

### 2. Specify labels for pull requests

Although this action will ignore pull requests that do not change `package.json`, running such an action will also waste resources (CI/CD time). To solve this we will specify labels for pull requests.

If you are using Renovate, update `renovate.json`:

```json
{
  "labels": ["dependencies"]
}
```

If you are using dependabot, update `dependabot.yml`:

```yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    labels:
      - dependencies
```

### 3. Example workflow

```yml
name: 🦋 Generate dependencies changesets

on: [pull_request]

jobs:
  generate-changeset:
    name: Generate dependencies changesets
    runs-on: ubuntu-latest
    if: |
      contains(github.event.pull_request.labels.*.name, 'dependencies') &&
      startsWith(github.head_ref, 'renovate/') &&
      github.base_ref == 'dev'
    steps:
      #! Checkout
      - name: ⬇️ Checkout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          ref: ${{ github.event.pull_request.head.ref }}

      #! Generate dependencies changesets
      - name: 🦋 Generate dependencies changesets
        uses: '@culur/changesets-generate-dependencies-changesets'
        with:
          branch: renovate
          user-name: renovate[bot]
          user-email: renovate[bot]@users.noreply.github.com
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
