import { debug } from '@actions/core';
import dedent from 'dedent';
import fs from 'fs-extra';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createChangeset } from './create-changeset';

vi.mock('@actions/core', () => ({
  debug: vi.fn(),
}));

describe('createChangeset', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('valid', async () => {
    vi.spyOn(fs, 'writeFile').mockImplementation(() => {});

    await createChangeset({
      diffPackageFiles: [
        {
          packageFile: 'packages/foo/package.json',
          json: {
            name: 'foo',
          },
          changedPackages: {
            dependencies: { bar: '2.0.0' },
            devDependencies: undefined,
          },
        },
      ],
      commit: { hash: 'abcd1234' },
    });

    const debugMessage = dedent`
      --------------------------------------------------
      .changeset/renovate-abcd1234-foo.md
      --------------------------------------------------
      ---
      'foo': patch
      ---

      Update dependencies:

      - \`dependencies\`:
        - \`bar@2.0.0\`
    `;
    expect(debug).toBeCalledWith(`${debugMessage}\n`);
  });
});
