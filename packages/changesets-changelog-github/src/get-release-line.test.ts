import type { MockRecord } from './__tests__/types';
import parse from '@changesets/parse';
import dedent from 'dedent';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockGithubInfo } from './__tests__/mock-github-info';
import { defineMockRecord } from './__tests__/types';
import { getReleaseLine } from './get-release-line';

function testGetReleaseLine(
  name: string,
  {
    mockRecords,
    commit: { repo, commitHash, summary },
    expectReleaseLine,
    only,
  }: {
    mockRecords: MockRecord[];
    commit: {
      repo: string;
      commitHash?: string;
      summary: string;
    };
    expectReleaseLine: string;
    only?: boolean;
  },
) {
  // eslint-disable-next-line test/no-only-tests
  (only ? it.only : it)(name, async () => {
    mockGithubInfo(...mockRecords);

    const head = dedent`
      ---
      pkg: 'minor'
      ---
    `;
    const changeset = [head, summary].join('\n');

    const releaseLine = await getReleaseLine(
      {
        ...parse(changeset),
        id: 'some-id',
        commit: commitHash ?? undefined,
      },
      'minor',
      { repo },
    );

    expect(releaseLine).toEqual(`\n\n${expectReleaseLine}\n`);
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('invalid options', () => {
  it.each([null, {}])('options = %s', async options => {
    await expect(() =>
      getReleaseLine(
        { id: 'some-id', releases: [], summary: '', commit: undefined },
        'minor',
        options,
      ),
    ).rejects.toThrowError(dedent`
      Please provide a repo to this changelog generator like this:
      "changelog": ["@culur/changesets-changelog-github", { "repo": "org/repo" }]
    `);
  });
});

describe('default', () => {
  testGetReleaseLine('commit & pull request', {
    mockRecords: [
      {
        repo: 'culur/culur',
        user: 'culur',
        commitHash: 'abcd123',
        commitMessage: 'feat: add new feature',
        pullRequestNumber: 999,
        pullRequestTitle: 'feat: new feature',
      },
    ],
    commit: {
      repo: 'culur/culur',
      commitHash: 'abcd123',
      summary: dedent`
        Feat: add new feature
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add new feature ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)).
    `,
  });

  testGetReleaseLine('commit only', {
    mockRecords: [
      {
        repo: 'culur/culur',
        user: 'culur',
        commitHash: 'abcd123',
        commitMessage: 'feat: add new feature',
      },
    ],
    commit: {
      repo: 'culur/culur',
      commitHash: 'abcd123',
      summary: dedent`
        Feat: add new feature
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add new feature ([\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)).
    `,
  });
});

const mockRecord = defineMockRecord({
  repo: 'culur/culur',
  user: 'culur',
  commitHash: 'abcd123',
  commitMessage: 'feat: new feature',
  pullRequestNumber: 999,
  pullRequestTitle: 'feat: new feature',
});

describe('override', () => {
  const expectReleaseLine = dedent`
    - ✨ Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)).
  `;

  testGetReleaseLine('override pull', {
    mockRecords: [mockRecord],
    commit: {
      repo: 'culur/culur',
      summary: dedent`
        Feat: add some features
        pull: 999
      `,
    },
    expectReleaseLine,
  });

  testGetReleaseLine('override commit', {
    mockRecords: [mockRecord],
    commit: {
      repo: 'culur/culur',
      summary: dedent`
        Feat: add some features
        commit: abcd123
      `,
    },
    expectReleaseLine,
  });

  testGetReleaseLine('override commit & pull', {
    mockRecords: [mockRecord],
    commit: {
      repo: 'culur/culur',
      summary: dedent`
        Feat: add some features
        pull: 999
        commit: abcd123
      `,
    },
    expectReleaseLine,
  });

  testGetReleaseLine('override multiple authors', {
    mockRecords: [mockRecord],
    commit: {
      repo: 'culur/culur',
      commitHash: 'abcd123',
      summary: dedent`
        Feat: add some features
        author: @other
        author: @user
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@other](https://github.com/other) [@user](https://github.com/user)).
    `,
  });

  testGetReleaseLine('no commit & pull', {
    mockRecords: [mockRecord],
    commit: {
      repo: 'culur/culur',
      summary: dedent`
        Feat: add some features
      `,
    },
    expectReleaseLine: dedent`
      - ❔ Feat: add some features.
    `,
  });
});

describe('punctuation', () => {
  testGetReleaseLine('single line', {
    mockRecords: [mockRecord],
    commit: {
      repo: 'culur/culur',
      commitHash: 'abcd123',
      summary: dedent`
        Feat: add some features.
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)).
    `,
  });

  testGetReleaseLine('multiple lines', {
    mockRecords: [mockRecord],
    commit: {
      repo: 'culur/culur',
      commitHash: 'abcd123',
      summary: dedent`
        Feat: add some features:
        - Feature 1
        - Feature 2
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)):
        - Feature 1
        - Feature 2
    `,
  });
});
