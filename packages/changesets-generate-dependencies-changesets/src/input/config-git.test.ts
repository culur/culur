import process from 'node:process';
import { afterEach, describe, expect, it, vi } from 'vitest';
import core from '@actions/core';
import dedent from 'dedent';
import exec from '@actions/exec';
import fs from 'fs-extra';
import { configGit } from './config-git';

describe('configGit', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('valid', async () => {
    process.env.GITHUB_TOKEN = 'TOKEN';
    process.env.HOME = '~';
    const writeFile = vi.spyOn(fs, 'writeFile').mockImplementation(() => {});
    vi.spyOn(exec, 'exec').mockImplementation(async () => 0);

    await configGit({
      input: {
        baseBranchPattern: '-',
        headBranchPattern: '-',
        userName: 'renovate[bot]',
        userEmail: '-',
      },
    });

    expect(writeFile) //
      .toBeCalledWith(
        '~/.netrc',
        dedent`
          machine github.com
          login renovate[bot]
          password TOKEN
        `,
      );
  });

  it('invalid', async () => {
    process.env.GITHUB_TOKEN = '';
    const coreFailed = vi.spyOn(core, 'setFailed').mockImplementation(() => {});

    await configGit({
      input: {
        baseBranchPattern: '-',
        headBranchPattern: '-',
        userName: '-',
        userEmail: '-',
      },
    });

    expect(coreFailed) //
      .toBeCalledWith('Please add the GITHUB_TOKEN to the changesets action');
  });
});
