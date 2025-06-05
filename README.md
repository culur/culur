# Culur Monorepo

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

Welcome to the `culur` monorepo, a monorepo personally developed by [@phamhongphuc](https://github.com/phamhongphuc) (even though hosted under the `culur` organization). This project was born from the desire to promote reusability, consistency, and streamlined setup & updates across my various personal projects. It's meticulously managed using **pnpm** and **Nx**.

While primarily intended for my own use, you are welcome to utilize these packages or draw inspiration from this setup for your own projects. Please be mindful that updates can be frequent and may include breaking changes without extensive prior notice, as this is an actively evolving personal toolkit.

Beyond its direct utility, this repository serves as a practical demonstration of:

- **Monorepo Architecture & Core Workflow:**

  - Setting up a robust monorepo with **pnpm** and **Nx**.
  - Fine-tuning **Renovate** for intelligent dependency grouping and optimized updates within a monorepo.
  - Customizing **Changesets** for rich, emoji-enhanced changelogs with clear structure (aided by self-developed `@culur/changesets-*` packages).

- **CI/CD and Automation with GitHub Actions:**

  - Building reusable GitHub Actions, particularly for consistent environment setup across workflows.
  - Leveraging **Volta** to enforce pinned Node.js and pnpm versions.
  - Optimizing **Nx** build and task execution by utilizing GitHub Cache (as an effective alternative to Nx Cloud).
  - Automating **Changeset** creation for updates from Renovate PRs or during release preparation.
  - Orchestrating a seamless **NPM** package release pipeline.

- **Reusable Tooling Configurations (via `@culur/config-*` packages and best practices):**

  - Establishing comprehensive linting with **ESLint**, **Prettier**, **Stylelint**, and **Markdown Lint**, tailored for monorepos with potential nested configurations and optimized for Nx's caching and task running.
  - Implementing shareable and minimally-adjusted configurations for **tsup** (bundling), **tsconfig** (TypeScript), **Vite**, and **Vitest** (testing) across different packages.

- ...and many other patterns and examples embedded within this codebase.

While these approaches are personally trusted and have proven effective for my needs, they might not represent the absolute 'best practice' in every scenario. If you spot areas for improvement or have suggestions, please don't hesitate to share them in the [Discussions](https://github.com/culur/culur/discussions)!

## 📦 Packages

Explore the collection of packages developed within this monorepo, organized as follows:

### ⚙️ 1. Configs

Standardize your development environment with these readily-usable configurations for common linters and development tools.

| Package                                                     | Description                                                                               | NPM                                                                                                                                                                                                                                                                                 |
| :---------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`config-eslint`](packages/config-eslint/README.md)         | Sharing [Eslint](https://eslint.org/) configurations.                                     | [![NPM Version](https://img.shields.io/npm/v/@culur/config-eslint?logo=npm)](https://www.npmjs.com/package/@culur/config-eslint) [![NPM Download](https://img.shields.io/npm/dm/@culur/config-eslint?logo=npm)](https://www.npmjs.com/package/@culur/config-eslint)                 |
| [`config-prettier`](packages/config-prettier/README.md)     | Sharing [Prettier](https://prettier.io) configurations.                                   | [![NPM Version](https://img.shields.io/npm/v/@culur/config-prettier?logo=npm)](https://www.npmjs.com/package/@culur/config-prettier) [![NPM Download](https://img.shields.io/npm/dm/@culur/config-prettier?logo=npm)](https://www.npmjs.com/package/@culur/config-prettier)         |
| [`config-stylelint`](packages/config-stylelint/README.md)   | Sharing [Stylelint](https://stylelint.io) configurations.                                 | [![NPM Version](https://img.shields.io/npm/v/@culur/config-stylelint?logo=npm)](https://www.npmjs.com/package/@culur/config-stylelint) [![NPM Download](https://img.shields.io/npm/dm/@culur/config-stylelint?logo=npm)](https://www.npmjs.com/package/@culur/config-stylelint)     |
| [`config-tsup`](packages/config-tsup/README.md)             | Sharing [tsup](https://github.com/egoist/tsup) configurations.                            | [![NPM Version](https://img.shields.io/npm/v/@culur/config-tsup?logo=npm)](https://www.npmjs.com/package/@culur/config-tsup) [![NPM Download](https://img.shields.io/npm/dm/@culur/config-tsup?logo=npm)](https://www.npmjs.com/package/@culur/config-tsup)                         |
| [`config-typescript`](packages/config-typescript/README.md) | Sharing [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html). | [![NPM Version](https://img.shields.io/npm/v/@culur/config-typescript?logo=npm)](https://www.npmjs.com/package/@culur/config-typescript) [![NPM Download](https://img.shields.io/npm/dm/@culur/config-typescript?logo=npm)](https://www.npmjs.com/package/@culur/config-typescript) |
| [`config-vite`](packages/config-vite/README.md)             | Sharing [Vite](https://vitejs.dev/)/[Vitest](https://vitest.dev/) configurations.         | [![NPM Version](https://img.shields.io/npm/v/@culur/config-vite?logo=npm)](https://www.npmjs.com/package/@culur/config-vite) [![NPM Download](https://img.shields.io/npm/dm/@culur/config-vite?logo=npm)](https://www.npmjs.com/package/@culur/config-vite)                         |

### 🛠️ 2. Utilities and libraries

A collection of bespoke utility functions and focused libraries, crafted to solve specific development challenges or enhance common workflows.

| Package                                               | Description                             | NPM                                                                                                                                                                                                                                                                     |
| :---------------------------------------------------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`logger`](packages/logger/README.md)                 | Create beautiful CLI interfaces.        | [![NPM Version](https://img.shields.io/npm/v/@culur/logger?logo=npm)](https://www.npmjs.com/package/@culur/logger) [![NPM Download](https://img.shields.io/npm/dm/@culur/logger?logo=npm)](https://www.npmjs.com/package/@culur/logger)                                 |
| [`generate-zod`](packages/generate-zod/README.md)     | An enhanced wrapper around `ts-to-zod`. | [![NPM Version](https://img.shields.io/npm/v/@culur/generate-zod?logo=npm)](https://www.npmjs.com/package/@culur/generate-zod) [![NPM Download](https://img.shields.io/npm/dm/@culur/generate-zod?logo=npm)](https://www.npmjs.com/package/@culur/generate-zod)         |
| [`types`](packages/types/README.md)                   | Provides shared TypeScript types.       | [![NPM Version](https://img.shields.io/npm/v/@culur/types?logo=npm)](https://www.npmjs.com/package/@culur/types) [![NPM Download](https://img.shields.io/npm/dm/@culur/types?logo=npm)](https://www.npmjs.com/package/@culur/types)                                     |
| [`utils-packages`](packages/utils-packages/README.md) | Check if packages are installed or not. | [![NPM Version](https://img.shields.io/npm/v/@culur/utils-packages?logo=npm)](https://www.npmjs.com/package/@culur/utils-packages) [![NPM Download](https://img.shields.io/npm/dm/@culur/utils-packages?logo=npm)](https://www.npmjs.com/package/@culur/utils-packages) |

### 📝 3. Utilities for customize changesets

This suite of packages is dedicated to customizing and enhancing the Changesets workflow, particularly for generating rich changelogs and integrating seamlessly with GitHub.

| Package                                                                                                         | Description                                                                            | NPM                                                                                                                                                                                                                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`changesets-changelog-github`](packages/changesets-changelog-github/README.md)                                 | A changelog entry generator for GitHub that links to commits, PRs, and users.          | [![NPM Version](https://img.shields.io/npm/v/@culur/changesets-changelog-github?logo=npm)](https://www.npmjs.com/package/@culur/changesets-changelog-github) [![NPM Download](https://img.shields.io/npm/dm/@culur/changesets-changelog-github?logo=npm)](https://www.npmjs.com/package/@culur/changesets-changelog-github) |
| [`changesets-generate-dependencies-changesets`](packages/changesets-generate-dependencies-changesets/README.md) | Github action for generate dependencies changesets.                                    | Internal package                                                                                                                                                                                                                                                                                                            |
| [`changesets-github-info`](packages/changesets-github-info/README.md)                                           | Get the GitHub username and PR number from a commit. Intended for use with changesets. | [![NPM Version](https://img.shields.io/npm/v/@culur/changesets-github-info?logo=npm)](https://www.npmjs.com/package/@culur/changesets-github-info) [![NPM Download](https://img.shields.io/npm/dm/@culur/changesets-github-info?logo=npm)](https://www.npmjs.com/package/@culur/changesets-github-info)                     |

## 📜 Changelog

Major changes and version history for the entire monorepo (managed by Changesets) can be found in the individual package `CHANGELOG.md` files. For a high-level overview of recent significant updates, refer to the [GitHub Releases](https://github.com/culur/culur/releases).

## 💬 Feedback & Issues

While this is a personal project and I may not have the capacity to review or merge feature-driven Pull Requests aimed at serving other users, I still appreciate feedback and bug reports.

- **Questions & Ideas:** Please use [GitHub Discussions](https://github.com/culur/culur/discussions).
- **Bug Reports:** If you encounter a bug, feel free to [open an issue](https://github.com/culur/culur/issues).

If you'd like to implement a new feature based on your ideas, please consider forking this project and developing it in your own repository.

## 🔒 License

This monorepo and its packages are licensed under the [MIT License](LICENSE). See the `LICENSE` file for more details.
