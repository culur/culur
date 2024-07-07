import parse from '@changesets/parse';
import dedent from 'dedent';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { CommitOrPullRecord } from './__tests__/mock-github-info';
import {
  defineCommitOrPullRecord,
  mockGithubInfo,
} from './__tests__/mock-github-info';
import { getReleaseLine } from './get-release-line';

function testGetReleaseLine(
  name: string,
  record: CommitOrPullRecord,
  summary: string,
  expectReleaseLine: string,
  options?: { only: boolean },
) {
  // eslint-disable-next-line test/no-only-tests
  (options?.only ? it.only : it)(name, async () => {
    mockGithubInfo(record);

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
        commit: record.commit ?? undefined,
      },
      'minor',
      { repo: record.repo },
    );

    expect(releaseLine).toEqual(`\n\n${expectReleaseLine}\n`);
  });
}

const githubInfo = defineCommitOrPullRecord({
  repo: 'culur/culur',
  user: 'culur',
  commit: 'abcd123',
  pull: 999,
});

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

testGetReleaseLine(
  'default',
  githubInfo,
  dedent`
    Feat: add some features
  `,
  dedent`
    - Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)).
  `,
);

describe('override', () => {
  const expectReleaseLine = dedent`
      - Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)).
    `;
  testGetReleaseLine(
    'override pull',
    githubInfo,
    dedent`
      Feat: add some features
      pull: 999
    `,
    expectReleaseLine,
  );

  testGetReleaseLine(
    'override commit',
    githubInfo,
    dedent`
      Feat: add some features
      commit: abcd123
    `,
    expectReleaseLine,
  );

  testGetReleaseLine(
    'override commit & pull',
    githubInfo,
    dedent`
      Feat: add some features
      pull: 999
      commit: abcd123
    `,
    expectReleaseLine,
  );

  testGetReleaseLine(
    'override multiple authors',
    githubInfo,
    dedent`
      Feat: add some features
      author: @other
      author: @user
    `,
    dedent`
        - Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@other](https://github.com/other), [@user](https://github.com/user)).
      `,
  );

  testGetReleaseLine(
    'override commit & pull',
    { ...githubInfo, commit: null },
    dedent`
      Feat: add some features
    `,
    dedent`
      - Feat: add some features.
    `,
  );
});

describe('punctuation', () => {
  testGetReleaseLine(
    'single line',
    githubInfo,
    dedent`
      Feat: add some features.
    `,
    dedent`
      - Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)).
    `,
  );

  testGetReleaseLine(
    'multiple line',
    githubInfo,
    dedent`
      Feat: add some features:
      - Feature 1
      - Feature 2
    `,
    dedent`
      - Feat: add some features ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@culur](https://github.com/culur)):
        - Feature 1
        - Feature 2
    `,
  );
});
