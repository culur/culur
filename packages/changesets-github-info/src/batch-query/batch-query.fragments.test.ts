import { validate } from '@octokit/graphql-schema';
import { describe, expect, it } from 'vitest';
import { getQuery } from './batch-query';
import type { GithubInfoRequest } from './batch-query.type';

describe('validate query', () => {
  it.each<{ name: string; requests: GithubInfoRequest[] }>([
    {
      name: 'pull request only',
      requests: [
        { owner: 'culur', name: 'culur', pullRequestNumber: 1 }, //
      ],
    },
    {
      name: 'commit only',
      requests: [
        { owner: 'culur', name: 'culur', commitHash: 'abcd123' }, //
      ],
    },
    {
      name: 'commit & pull request',
      requests: [
        { owner: 'culur', name: 'culur', pullRequestNumber: 1 },
        { owner: 'culur', name: 'culur', commitHash: 'abcd123' },
      ],
    },
  ])('$name', async ({ requests }) => {
    const { query } = await getQuery(requests);

    const errors = validate(query);
    expect(errors).toHaveLength(0);
  });
});
