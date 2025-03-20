import process from 'node:process';
import core from '@actions/core';
import exec from '@actions/exec';
import dedent from 'dedent';
import fs from 'fs-extra';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { configGit } from './config-git';

vi.mock('@actions/core', () => ({
  default: {
    setFailed: vi.fn(),
    info: vi.fn(),
  },
}));

describe('configGit', () => {
  afterEach(() => {
    vi.resetAllMocks();
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

    await configGit({
      input: {
        baseBranchPattern: '-',
        headBranchPattern: '-',
        userName: '-',
        userEmail: '-',
      },
    });

    expect(core.setFailed) //
      .toBeCalledWith('Please add the GITHUB_TOKEN to the changesets action');
  });
});
