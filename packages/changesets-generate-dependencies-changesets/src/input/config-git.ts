import type { Input } from './get-input';
import process from 'node:process';
import { info, setFailed } from '@actions/core';
import { exec } from '@actions/exec';
import dedent from 'dedent';
import fs from 'fs-extra';

export async function configGit({ input }: { input: Input }) {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    setFailed('Please add the GITHUB_TOKEN to the changesets action');
    return;
  }

  info('Setting GitHub credentials');
  await fs.writeFile(
    `${process.env.HOME}/.netrc`,
    dedent`
      machine github.com
      login ${input.userName}
      password ${githubToken}
    `,
  );

  await exec(`git config user.name ${input.userName}`);
  await exec(`git config user.email ${input.userEmail}`);
}
