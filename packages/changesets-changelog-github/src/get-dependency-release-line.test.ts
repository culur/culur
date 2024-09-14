import type { ModCompWithPackage, VersionType } from '@changesets/types';
import parse from '@changesets/parse';
import dedent from 'dedent';
import { describe, expect, it } from 'vitest';
import { getDependencyReleaseLine } from './get-dependency-release-line';

function testGetDependencyReleaseLine(
  name: string,
  {
    pullRequest: { repo },
    dependenciesChangesets,
    expectReleaseLine,
  }: {
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
  pullRequest: { repo: 'culur/culur' },
  dependenciesChangesets: [],
  expectReleaseLine: '',
});

testGetDependencyReleaseLine('default', {
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
