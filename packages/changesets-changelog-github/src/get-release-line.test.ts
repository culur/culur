import dedent from 'dedent';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { testGetReleaseLine } from './__tests__/test-get-release-line';
import { getReleaseLine } from './get-release-line';
import { defineGithubInfo } from './__tests__/github-info';

const githubInfo = defineGithubInfo({
  repo: 'culur/culur',
  user: 'userAccount',
  commit: 'abcd123',
  pull: 999,
});

describe('getReleaseLine', async () => {
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
        "changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]
      `);
    });
  });

  testGetReleaseLine(
    'default',
    githubInfo,
    dedent`
      Feat: add some feature
    `,
    dedent`
      - Feat: add some feature ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@userAccount](https://github.com/userAccount)).
    `,
  );

  describe('override', () => {
    const expectReleaseLine = dedent`
      - Feat: add some feature ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@userAccount](https://github.com/userAccount)).
    `;
    testGetReleaseLine(
      'override pull',
      githubInfo,
      dedent`
        Feat: add some feature
        pull: 999
      `,
      expectReleaseLine,
    );

    testGetReleaseLine(
      'override commit',
      githubInfo,
      dedent`
        Feat: add some feature
        commit: abcd123
      `,
      expectReleaseLine,
    );

    testGetReleaseLine(
      'override commit & pull',
      githubInfo,
      dedent`
          Feat: add some feature
          pull: 999
          commit: abcd123
        `,
      expectReleaseLine,
    );

    testGetReleaseLine(
      'override multiple authors',
      githubInfo,
      dedent`
        Feat: add some feature
        author: @other
        author: @user
      `,
      dedent`
        - Feat: add some feature ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@other](https://github.com/other), [@user](https://github.com/user)).
      `,
    );

    testGetReleaseLine(
      'override commit & pull',
      { ...githubInfo, commit: null },
      dedent`
          Feat: add some feature
        `,
      dedent`
        - Feat: add some feature.
      `,
    );
  });

  describe('punctuation', () => {
    testGetReleaseLine(
      'single line',
      githubInfo,
      dedent`
        Feat: add some feature.
      `,
      dedent`
        - Feat: add some feature ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@userAccount](https://github.com/userAccount)).
      `,
    );

    testGetReleaseLine(
      'multiple line',
      githubInfo,
      dedent`
        Feat: add some feature:
        - Feature 1
        - Feature 2
      `,
      dedent`
        - Feat: add some feature ([#999](https://github.com/culur/culur/pull/999) [\`abcd123\`](https://github.com/culur/culur/commit/abcd123)) ([@userAccount](https://github.com/userAccount)):
          - Feature 1
          - Feature 2
      `,
    );
  });
});
