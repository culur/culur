import * as octokitGraphql from '@octokit/graphql';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPullRequestInfo } from './get-pull-request-info';

vi.mock('@octokit/graphql', async () => {
  const octokitGraphql: typeof import('@octokit/graphql') =
    await vi.importActual('@octokit/graphql');
  return {
    ...octokitGraphql,
    graphql: vi.fn(),
    withCustomRequest: vi.fn(),
  };
});

describe('getPullRequestInfo', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('error', () => {
    it('no pullRequestNumber', async () => {
      await expect(async () =>
        getPullRequestInfo({
          repo: 'culur/culur',
          pullRequestNumber: undefined as any,
        }),
      ).rejects.toThrowError('Please pass a pull request number');
    });

    it('no repo', async () => {
      await expect(async () =>
        getPullRequestInfo({
          repo: '' as `${string}/${string}`,
          pullRequestNumber: 1,
        }),
      ).rejects.toThrowError(
        'Please pass a GitHub repository in the form of userOrOrg/repoName to getInfo',
      );
    });

    it('invalid repo', async () => {
      await expect(async () =>
        getPullRequestInfo({
          repo: 'culur//culur',
          pullRequestNumber: 1,
        }),
      ).rejects.toThrowError(
        `Please pass a valid GitHub repository in the form of userOrOrg/repoName to getInfo (it has to match the "^[\\w.-]+\\/[\\w.-]+$" pattern)`,
      );
    });
  });

  describe('valid', async () => {
    it('default', async () => {
      process.env.GITHUB_TOKEN = 'TOKEN';

      vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => ({
        repo_0: {
          pr_12: {
            __typename: 'PullRequest',
            url: 'https://github.com/culur/culur/pull/12',
            title: 'fix(deps): update all non-major dependencies',
            author: {
              __typename: 'Bot',
              login: 'renovate',
              url: 'https://github.com/apps/renovate',
            },
            mergeCommit: {
              oid: '3983d4a5af7ad396dc07833f7970a083c7caaceb',
              message: 'fix(deps): update all non-major dependencies',
              commitUrl:
                'https://github.com/culur/culur/commit/3983d4a5af7ad396dc07833f7970a083c7caaceb',
              abbreviatedOid: '3983d4a',
            },
          },
        },
      }));

      const pullRequestInfo = await getPullRequestInfo({
        repo: 'culur/culur',
        pullRequestNumber: 12,
      });

      expect(pullRequestInfo).toEqual({
        user: {
          name: 'renovate',
          link: '[@renovate](https://github.com/apps/renovate)',
        },
        commit: {
          hash: '3983d4a5af7ad396dc07833f7970a083c7caaceb',
          message: 'fix(deps): update all non-major dependencies',
          link: '[`3983d4a`](https://github.com/culur/culur/commit/3983d4a5af7ad396dc07833f7970a083c7caaceb)',
        },
        pullRequest: {
          number: 12,
          title: 'fix(deps): update all non-major dependencies',
          link: '[#12](https://github.com/culur/culur/pull/12)',
        },
      });
    });

    it('no user', async () => {
      process.env.GITHUB_TOKEN = 'TOKEN';

      vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => ({
        repo_0: {
          pr_12: {
            __typename: 'PullRequest',
            url: 'https://github.com/culur/culur/pull/12',
            title: 'fix(deps): update all non-major dependencies',
            author: null,
            mergeCommit: {
              oid: '3983d4a5af7ad396dc07833f7970a083c7caaceb',
              message: 'fix(deps): update all non-major dependencies',
              commitUrl:
                'https://github.com/culur/culur/commit/3983d4a5af7ad396dc07833f7970a083c7caaceb',
              abbreviatedOid: '3983d4a',
            },
          },
        },
      }));

      const pullRequestInfo = await getPullRequestInfo({
        repo: 'culur/culur',
        pullRequestNumber: 12,
      });

      expect(pullRequestInfo).toEqual({
        user: null,
        commit: {
          hash: '3983d4a5af7ad396dc07833f7970a083c7caaceb',
          message: 'fix(deps): update all non-major dependencies',
          link: '[`3983d4a`](https://github.com/culur/culur/commit/3983d4a5af7ad396dc07833f7970a083c7caaceb)',
        },
        pullRequest: {
          number: 12,
          title: 'fix(deps): update all non-major dependencies',
          link: '[#12](https://github.com/culur/culur/pull/12)',
        },
      });
    });

    it('no commit', async () => {
      process.env.GITHUB_TOKEN = 'TOKEN';

      vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => ({
        repo_0: {
          pr_12: {
            __typename: 'PullRequest',
            url: 'https://github.com/culur/culur/pull/12',
            title: 'fix(deps): update all non-major dependencies',
            author: {
              __typename: 'Bot',
              login: 'renovate',
              url: 'https://github.com/apps/renovate',
            },
            mergeCommit: null,
          },
        },
      }));

      const pullRequestInfo = await getPullRequestInfo({
        repo: 'culur/culur',
        pullRequestNumber: 12,
      });

      expect(pullRequestInfo).toEqual({
        user: {
          name: 'renovate',
          link: '[@renovate](https://github.com/apps/renovate)',
        },
        commit: null,
        pullRequest: {
          number: 12,
          title: 'fix(deps): update all non-major dependencies',
          link: '[#12](https://github.com/culur/culur/pull/12)',
        },
      });
    });
  });
});
