# `@culur/changesets-github-info`

[![NPM Version](https://img.shields.io/npm/v/@culur/changesets-github-info?logo=npm)](https://www.npmjs.com/package/@culur/changesets-github-info)
[![NPM Download](https://img.shields.io/npm/dm/@culur/changesets-github-info?logo=npm)](https://www.npmjs.com/package/@culur/changesets-github-info)
[![NPM License](https://img.shields.io/npm/l/@culur/changesets-github-info)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Get the GitHub username and PR number from a commit. Intended for use with changesets.

## ✨ Features

This library if a fork of [`@changesets/get-github-info`](https://www.npmjs.com/package/@changesets/get-github-info). The main purpose of this library is to customize the returned results to suit the needs of use in `@culur/changesets-changelog-github`.

It uses `@octokit/graphql` and `dataloader` to query data. It also takes advantage of the dataloader's caching and batching features to optimize queries.

## 💿 Installation

Add `@culur/changesets-github-info` dependency to your project.

```bash
# Using npm
npm install @culur/changesets-github-info

# Using yarn
yarn add @culur/changesets-github-info
```

## 📖 Usage

You need a [GitHub Personal Access Token](https://github.com/settings/tokens/new) with `read:user` and `repo:status` permissions, and add it to a `.env` file.

```.env
GITHUB_TOKEN=token
```

Then you can use it in your script like this.

```ts
import {
  getCommitInfo,
  getPullRequestInfo,
} from '@culur/changesets-github-info';
import { config } from 'dotenv';

config();

const commitInfo = await getCommitInfo({
  repo: 'culur/culur',
  commitHash: '65810fdd21ad34a2b06e42e977480bbfade20375',
});

const pullRequestInfo = await getPullRequestInfo({
  repo: 'culur/culur',
  pullRequestNumber: 3,
});

const commitInfo = {
  user: {
    name: 'github-actions',
    link: '[@github-actions](https://github.com/apps/github-actions)',
  },
  commit: {
    hash: '65810fdd21ad34a2b06e42e977480bbfade20375',
    message: 'chore: version packages',
    link: '[`65810fd`](https://github.com/culur/culur/commit/65810fdd21ad34a2b06e42e977480bbfade20375)',
  },
  pullRequest: {
    number: 17,
    title: 'chore: version packages',
    link: '[#17](https://github.com/culur/culur/pull/17)',
  },
};

const pullRequestInfo = {
  user: {
    name: 'github-actions',
    link: '[@github-actions](https://github.com/apps/github-actions)',
  },
  commit: {
    hash: '0a8933299dacec0fe2ad79e20c6e117d13e1ad81',
    message: 'chore: version packages',
    link: '[`0a89332`](https://github.com/culur/culur/commit/0a8933299dacec0fe2ad79e20c6e117d13e1ad81)',
  },
  pullRequest: {
    number: 5,
    title: 'chore: version packages',
    link: '[#5](https://github.com/culur/culur/pull/5)',
  },
};
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
