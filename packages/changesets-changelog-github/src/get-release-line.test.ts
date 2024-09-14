import parse from '@changesets/parse';
import dedent from 'dedent';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { changesetsGithubInfo } from './__tests__/mock-github-info';
import { getReleaseLine } from './get-release-line';

function testGetReleaseLine(
  name: string,
  {
    commit: { repo, commitHash, summary },
    expectReleaseLine,
    only,
  }: {
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

vi.mock('@culur/changesets-github-info', () =>
  changesetsGithubInfo(
    {
      repo: 'culur/culur',
      user: 'culur',
      commitHash: 'aaaa001',
      commitMessage: 'feat: add feature 001',
      pullRequestNumber: 1,
      pullRequestTitle: 'feat: feature 001',
    },
    {
      repo: 'culur/culur',
      user: 'culur',
      commitHash: 'aaaa002',
      commitMessage: 'feat: add feature 002',
    },
    {
      repo: 'culur/culur',
      user: 'culur',
      commitHash: 'aaaa003',
      commitMessage: 'feat: feature 003',
      pullRequestNumber: 3,
      pullRequestTitle: 'feat: feature 003',
    },
  ),
);

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
    commit: {
      repo: 'culur/culur',
      commitHash: 'aaaa001',
      summary: dedent`
        Feat: add new feature
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add new feature ([#1](https://github.com/culur/culur/pull/1) [\`aaaa001\`](https://github.com/culur/culur/commit/aaaa001)) ([@culur](https://github.com/culur)).
    `,
  });

  testGetReleaseLine('commit only', {
    commit: {
      repo: 'culur/culur',
      commitHash: 'aaaa002',
      summary: dedent`
        Feat: add new feature
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add new feature ([\`aaaa002\`](https://github.com/culur/culur/commit/aaaa002)) ([@culur](https://github.com/culur)).
    `,
  });
});

// const mockRecord = defineMockRecord({
//   repo: 'culur/culur',
//   user: 'culur',
//   commitHash: 'abcd123',
//   commitMessage: 'feat: new feature',
//   pullRequestNumber: 999,
//   pullRequestTitle: 'feat: new feature',
// });

describe('override', () => {
  const expectReleaseLine = dedent`
    - ✨ Feat: add some features ([#3](https://github.com/culur/culur/pull/3) [\`aaaa003\`](https://github.com/culur/culur/commit/aaaa003)) ([@culur](https://github.com/culur)).
  `;

  testGetReleaseLine('override pull', {
    commit: {
      repo: 'culur/culur',
      summary: dedent`
        Feat: add some features
        pull: 3
      `,
    },
    expectReleaseLine,
  });

  testGetReleaseLine('override commit', {
    commit: {
      repo: 'culur/culur',
      summary: dedent`
        Feat: add some features
        commit: aaaa003
      `,
    },
    expectReleaseLine,
  });

  testGetReleaseLine('override commit & pull', {
    commit: {
      repo: 'culur/culur',
      summary: dedent`
        Feat: add some features
        pull: 3
        commit: aaaa003
      `,
    },
    expectReleaseLine,
  });

  testGetReleaseLine('override multiple authors', {
    commit: {
      repo: 'culur/culur',
      commitHash: 'aaaa003',
      summary: dedent`
        Feat: add some features
        author: @other
        author: @user
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add some features ([#3](https://github.com/culur/culur/pull/3) [\`aaaa003\`](https://github.com/culur/culur/commit/aaaa003)) ([@other](https://github.com/other) [@user](https://github.com/user)).
    `,
  });

  testGetReleaseLine('no commit & pull', {
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
    commit: {
      repo: 'culur/culur',
      commitHash: 'aaaa003',
      summary: dedent`
        Feat: add some features.
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add some features ([#3](https://github.com/culur/culur/pull/3) [\`aaaa003\`](https://github.com/culur/culur/commit/aaaa003)) ([@culur](https://github.com/culur)).
    `,
  });

  testGetReleaseLine('multiple lines', {
    commit: {
      repo: 'culur/culur',
      commitHash: 'aaaa003',
      summary: dedent`
        Feat: add some features:
        - Feature 1
        - Feature 2
      `,
    },
    expectReleaseLine: dedent`
      - ✨ Feat: add some features ([#3](https://github.com/culur/culur/pull/3) [\`aaaa003\`](https://github.com/culur/culur/commit/aaaa003)) ([@culur](https://github.com/culur)):
        - Feature 1
        - Feature 2
    `,
  });
});
