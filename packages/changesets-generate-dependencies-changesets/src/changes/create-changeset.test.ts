import core from '@actions/core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import fs from 'fs-extra';
import dedent from 'dedent';
import { createChangeset } from './create-changeset';

describe('createChangeset', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('valid', async () => {
    const coreDebug = vi.spyOn(core, 'debug').mockImplementation(() => {});
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
    expect(coreDebug).toBeCalledWith(`${debugMessage}\n`);
  });
});
