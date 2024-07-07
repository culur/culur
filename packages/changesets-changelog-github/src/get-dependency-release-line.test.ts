import parse from '@changesets/parse';
import type { ModCompWithPackage, VersionType } from '@changesets/types';
import dedent from 'dedent';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { CommitOrPullRecord } from './__tests__/mock-github-info';
import { mockGithubInfo } from './__tests__/mock-github-info';
import { getDependencyReleaseLine } from './get-dependency-release-line';

function testGetDependencyReleaseLine(
  name: string,
  {
    commitOrPullRecords,
    dependenciesChangesets,
    repo,
    expectReleaseLine,
  }: {
    commitOrPullRecords: Omit<CommitOrPullRecord, 'repo'>[];
    dependenciesChangesets: {
      packageName: string;
      versionType: VersionType;
      version: [string, string];
      // oldVersion: string;
      // newVersion: string;
      commit: string;
    }[];
    repo: string;
    expectReleaseLine: string;
  },
) {
  it(name, async () => {
    mockGithubInfo(...commitOrPullRecords.map(record => ({ ...record, repo })));

    const changesets = dependenciesChangesets.map(c => ({
      ...parse(dedent`
        ---
        '${c.packageName}': '${c.versionType}'
        ---
      `),
      id: 'some-id',
      commit: c.commit,
    }));

    const dependenciesUpdated = dependenciesChangesets.map<ModCompWithPackage>(
      change => ({
        name: change.packageName,
        type: change.versionType,
        oldVersion: change.version[0],
        newVersion: change.version[1],
        changesets: ['changeset-id'],
        packageJson: { name: 'packageName', version: '0.0.0' },
        dir: '',
      }),
    );

    const releaseLine = await getDependencyReleaseLine(
      changesets,
      dependenciesUpdated,
      { repo },
    );

    expect(expectReleaseLine).toEqual(releaseLine);
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('invalid options', () => {
  it.each([null, {}])('options = %s', async options => {
    await expect(() => getDependencyReleaseLine([], [], options)).rejects
      .toThrowError(dedent`
      Please provide a repo to this changelog generator like this:
      "changelog": ["@culur/changesets-changelog-github", { "repo": "org/repo" }]
    `);
  });
});

testGetDependencyReleaseLine('empty', {
  commitOrPullRecords: [],
  dependenciesChangesets: [],
  repo: 'culur/culur',
  expectReleaseLine: '',
});

testGetDependencyReleaseLine('default', {
  commitOrPullRecords: [
    { user: 'culur', commit: 'abcd123', pull: 456 }, //
  ],
  dependenciesChangesets: [
    {
      packageName: 'foo',
      version: ['1.0.0', '1.0.1'],
      versionType: 'minor',
      commit: 'abcd123',
    },
  ],
  repo: 'culur/culur',
  expectReleaseLine: dedent`
    - Updated dependencies ([\`abcd123\`](https://github.com/culur/culur/commit/abcd123)):
      - \`foo@1.0.1\`
  `,
});
