import core from '@actions/core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import fs from 'fs-extra';
import dedent from 'dedent';
import { createChangeset } from './create-changeset';
import * as module from '~/git/get-short-commit-hash';

describe('createChangeset', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('valid', async () => {
    const coreDebug = vi.spyOn(core, 'debug').mockImplementation(() => {});
    vi.spyOn(fs, 'writeFile').mockImplementation(() => {});
    vi.spyOn(module, 'getShortCommitHash').mockImplementation(
      async () => 'abcd1234',
    );

    await createChangeset([
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
    ]);

    const debugMessage = dedent`
      --------------------------------------------------
      .changeset/renovate-abcd1234-foo.md
      --------------------------------------------------
      ---
      'foo': patch
      ---

      Update dependencies from renovate:

      - \`dependencies\`:
        - \`bar\` to \`2.0.0\`
    `;
    expect(coreDebug).toBeCalledWith(`${debugMessage}\n`);
  });
});
