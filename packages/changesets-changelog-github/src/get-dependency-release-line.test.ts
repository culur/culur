import parse from '@changesets/parse';
import type { ModCompWithPackage, VersionType } from '@changesets/types';
import dedent from 'dedent';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockGithubInfo } from './__tests__/mock-github-info';
import { getDependencyReleaseLine } from './get-dependency-release-line';
import type { MockRecord } from './__tests__/types';

function testGetDependencyReleaseLine(
  name: string,
  {
    mockRecords,
    pullRequest: { repo },
    dependenciesChangesets,
    expectReleaseLine,
  }: {
    mockRecords: MockRecord[];
    pullRequest: { repo: string };
    dependenciesChangesets: {
      packageName: string;
      homepage?: string;
      versionType: VersionType;
      version: [string, string];
      commit: string;
    }[];
    expectReleaseLine: string;
  },
) {
  it(name, async () => {
    mockGithubInfo(...mockRecords);

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
        packageJson: {
          name: 'packageName',
          version: '0.0.0',
          homepage: change.homepage,
        },
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
  mockRecords: [],
  pullRequest: { repo: 'culur/culur' },
  dependenciesChangesets: [],
  expectReleaseLine: '',
});

testGetDependencyReleaseLine('default', {
  mockRecords: [
    {
      repo: 'culur/culur',
      user: 'culur',
      commitHash: 'abcd123',
      commitMessage: 'feat: new feature',
    },
  ],
  pullRequest: { repo: 'culur/culur' },
  dependenciesChangesets: [
    {
      packageName: 'foo',
      version: ['1.0.0', '1.0.1'],
      versionType: 'minor',
      commit: 'abcd123',
    },
  ],
  expectReleaseLine: dedent`
    - 📦 Update workspace dependencies:
      - \`foo@1.0.1\`
  `,
});

testGetDependencyReleaseLine('default with homepage', {
  mockRecords: [
    {
      repo: 'culur/culur',
      user: 'culur',
      commitHash: 'abcd123',
      commitMessage: 'feat: new feature',
    },
  ],
  pullRequest: { repo: 'culur/culur' },
  dependenciesChangesets: [
    {
      packageName: 'foo',
      version: ['1.0.0', '1.0.1'],
      versionType: 'minor',
      commit: 'abcd123',
      homepage: 'https://github.com/culur/culur/',
    },
  ],
  expectReleaseLine: dedent`
    - 📦 Update workspace dependencies:
      - [\`foo@1.0.1\`](https://github.com/culur/culur/)
  `,
});
