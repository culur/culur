import * as octokitGraphql from '@octokit/graphql';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCommitInfo } from './get-commit-info';

vi.mock('@octokit/graphql', async importOriginal => {
  const octokitGraphql: typeof import('@octokit/graphql') =
    await importOriginal();
  return {
    ...octokitGraphql,
    graphql: vi.fn(),
    withCustomRequest: vi.fn(),
  };
});

describe('getCommitInfo', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('error', () => {
    it('no commitHash', async () => {
      await expect(async () =>
        getCommitInfo({ repo: 'culur/culur', commitHash: '' }),
      ).rejects.toThrowError('Please pass a commit SHA to getInfo');
    });

    it('no repo', async () => {
      await expect(async () =>
        getCommitInfo({
          repo: '' as `${string}/${string}`,
          commitHash: 'abcd123',
        }),
      ).rejects.toThrowError(
        'Please pass a GitHub repository in the form of userOrOrg/repoName to getInfo',
      );
    });

    it('invalid repo', async () => {
      await expect(async () =>
        getCommitInfo({
          repo: 'culur//culur',
          commitHash: 'abcd123',
        }),
      ).rejects.toThrowError(
        `Please pass a valid GitHub repository in the form of userOrOrg/repoName to getInfo (it has to match the "^[\\w.-]+\\/[\\w.-]+$" pattern)`,
      );
    });
  });

  describe('valid', () => {
    it('default', async () => {
      process.env.GITHUB_TOKEN = 'TOKEN';

      vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => ({
        repo_0: {
          commit_f86251f658c8f9900d2d3a48f705ca7e7ad7cf95: {
            __typename: 'Commit',
            oid: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
            author: {
              user: {
                login: 'github-actions[bot]',
                url: 'https://github.com/github-actions%5Bbot%5D',
              },
            },
            message: 'chore: version packages',
            commitUrl:
              'https://github.com/culur/culur/commit/f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
            associatedPullRequests: {
              nodes: [
                {
                  number: 36,
                  url: 'https://github.com/culur/culur/pull/36',
                  mergedAt: '2024-07-07T09:55:11Z',
                  author: {
                    login: 'github-actions',
                    url: 'https://github.com/apps/github-actions',
                  },
                },
              ],
            },
          },
        },
      }));

      const commitInfo = await getCommitInfo({
        repo: 'culur/culur',
        commitHash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
      });

      expect(commitInfo).toEqual({
        user: {
          name: 'github-actions',
          link: '[@github-actions](https://github.com/apps/github-actions)',
        },
        commit: {
          hash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
          message: 'chore: version packages',
          link: '[`f86251f`](https://github.com/culur/culur/commit/f86251f658c8f9900d2d3a48f705ca7e7ad7cf95)',
        },
        pullRequest: {
          number: 36,
          link: '[#36](https://github.com/culur/culur/pull/36)',
        },
      });
    });

    it('no user', async () => {
      process.env.GITHUB_TOKEN = 'TOKEN';

      vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => ({
        repo_0: {
          commit_f86251f658c8f9900d2d3a48f705ca7e7ad7cf95: {
            __typename: 'Commit',
            oid: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
            author: { user: null },
            message: 'chore: version packages',
            commitUrl:
              'https://github.com/culur/culur/commit/f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
            associatedPullRequests: {
              nodes: [],
            },
          },
        },
      }));

      const commitInfo = await getCommitInfo({
        repo: 'culur/culur',
        commitHash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
      });

      expect(commitInfo).toEqual({
        user: null,
        commit: {
          hash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
          message: 'chore: version packages',
          link: '[`f86251f`](https://github.com/culur/culur/commit/f86251f658c8f9900d2d3a48f705ca7e7ad7cf95)',
        },
        pullRequest: null,
      });
    });

    it('no pull request', async () => {
      process.env.GITHUB_TOKEN = 'TOKEN';

      vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => ({
        repo_0: {
          commit_f86251f658c8f9900d2d3a48f705ca7e7ad7cf95: {
            __typename: 'Commit',
            oid: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
            author: {
              user: {
                login: 'github-actions[bot]',
                url: 'https://github.com/github-actions%5Bbot%5D',
              },
            },
            message: 'chore: version packages',
            commitUrl:
              'https://github.com/culur/culur/commit/f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
            associatedPullRequests: {
              nodes: [],
            },
          },
        },
      }));

      const commitInfo = await getCommitInfo({
        repo: 'culur/culur',
        commitHash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
      });

      expect(commitInfo).toEqual({
        user: {
          name: 'github-actions',
          link: '[@github-actions](https://github.com/apps/github-actions)',
        },
        commit: {
          hash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
          message: 'chore: version packages',
          link: '[`f86251f`](https://github.com/culur/culur/commit/f86251f658c8f9900d2d3a48f705ca7e7ad7cf95)',
        },
        pullRequest: null,
      });
    });

    it('multiple pull request', async () => {
      process.env.GITHUB_TOKEN = 'TOKEN';

      vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => ({
        repo_0: {
          commit_f86251f658c8f9900d2d3a48f705ca7e7ad7cf95: {
            __typename: 'Commit',
            oid: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
            author: {
              user: {
                login: 'github-actions[bot]',
                url: 'https://github.com/github-actions%5Bbot%5D',
              },
            },
            message: 'chore: version packages',
            commitUrl:
              'https://github.com/culur/culur/commit/f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
            associatedPullRequests: {
              nodes: [
                {
                  number: 36,
                  url: 'https://github.com/culur/culur/pull/36',
                  mergedAt: '2024-07-07T09:55:11Z',
                  author: {
                    login: 'github-actions',
                    url: 'https://github.com/apps/github-actions',
                  },
                },
                {
                  number: 12,
                  url: 'https://github.com/culur/culur/pull/12',
                  mergedAt: '2024-06-06T14:10:03Z',
                  author: {
                    login: 'renovate',
                    url: 'https://github.com/apps/renovate',
                  },
                },
              ],
            },
          },
        },
      }));

      const commitInfo = await getCommitInfo({
        repo: 'culur/culur',
        commitHash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
      });

      expect(commitInfo).toEqual({
        user: {
          link: '[@renovate](https://github.com/apps/renovate)',
          name: 'renovate',
        },
        commit: {
          hash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
          message: 'chore: version packages',
          link: '[`f86251f`](https://github.com/culur/culur/commit/f86251f658c8f9900d2d3a48f705ca7e7ad7cf95)',
        },
        pullRequest: {
          link: '[#12](https://github.com/culur/culur/pull/12)',
          number: 12,
        },
      });
    });
  });
});
