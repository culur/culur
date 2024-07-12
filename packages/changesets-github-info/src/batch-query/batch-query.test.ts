import * as octokitGraphql from '@octokit/graphql';
import { GraphqlResponseError } from '@octokit/graphql';
import dedent from 'dedent';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { batchQuery } from './batch-query';

vi.mock('@octokit/graphql', async () => {
  const octokitGraphql: typeof import('@octokit/graphql') =
    await vi.importActual('@octokit/graphql');
  return {
    ...octokitGraphql,
    graphql: vi.fn(),
    withCustomRequest: vi.fn(),
  };
});

describe('batchQuery', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('empty response', async () => {
    process.env.GITHUB_TOKEN = 'TOKEN';
    vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => null);

    await expect(async () => await batchQuery([])).rejects.toThrowError(
      'An error occurred when fetching data from GitHub',
    );
  });

  it('error', async () => {
    process.env.GITHUB_TOKEN = 'TOKEN';
    vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => {
      const error = new GraphqlResponseError(
        { url: '', method: 'POST' },
        {},
        {
          data: { repo_0: { pr_0: null } },
          errors: [
            {
              type: 'NOT_FOUND',
              path: ['repo_1', 'pr_12'] as unknown as [string],
              locations: [
                {
                  line: 8,
                  column: 9,
                },
              ],
              extensions: {},
              message:
                'Could not resolve to a PullRequest with the number of 0.',
            },
          ],
        },
      );
      throw error;
    });

    await expect(
      async () =>
        await batchQuery([
          {
            owner: 'culur',
            name: 'culur',
            pullRequestNumber: 0,
          },
        ]),
    ).rejects.toThrowError(
      dedent`
        An error occurred when fetching data from GitHub:
        [
          {
            "type": "NOT_FOUND",
            "path": [
              "repo_1",
              "pr_12"
            ],
            "locations": [
              {
                "line": 8,
                "column": 9
              }
            ],
            "extensions": {},
            "message": "Could not resolve to a PullRequest with the number of 0."
          }
        ]
      `,
    );
  });

  it('commit', async () => {
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

    const data = await batchQuery([
      {
        owner: 'culur',
        name: 'culur',
        commitHash: 'f86251f658c8f9900d2d3a48f705ca7e7ad7cf95',
      },
    ]);

    expect(data).toEqual([
      {
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
    ]);
  });

  it('pr', async () => {
    process.env.GITHUB_TOKEN = 'TOKEN';

    vi.spyOn(octokitGraphql, 'graphql').mockImplementation(async () => ({
      repo_0: {
        pr_12: {
          __typename: 'PullRequest',
          url: 'https://github.com/culur/culur/pull/12',
          author: {
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

    const data = await batchQuery([
      {
        owner: 'culur',
        name: 'culur',
        pullRequestNumber: 12,
      },
    ]);

    expect(data).toEqual([
      {
        __typename: 'PullRequest',
        url: 'https://github.com/culur/culur/pull/12',
        author: { login: 'renovate', url: 'https://github.com/apps/renovate' },
        mergeCommit: {
          oid: '3983d4a5af7ad396dc07833f7970a083c7caaceb',
          message: 'fix(deps): update all non-major dependencies',
          commitUrl:
            'https://github.com/culur/culur/commit/3983d4a5af7ad396dc07833f7970a083c7caaceb',
          abbreviatedOid: '3983d4a',
        },
      },
    ]);
  });
});
