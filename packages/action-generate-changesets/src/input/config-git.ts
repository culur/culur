import process from 'node:process';
import core from '@actions/core';
import dedent from 'dedent';
import exec from '@actions/exec';
import fs from 'fs-extra';
import type { Input } from './get-input';

export async function configGit({ input }: { input: Input }) {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    core.setFailed('Please add the GITHUB_TOKEN to the changesets action');
    return;
  }

  core.info('Setting GitHub credentials');
  await fs.writeFile(
    `${process.env.HOME}/.netrc`,
    dedent`
      machine github.com
      login ${input.userName}
      password ${githubToken}
    `,
  );

  await exec.exec(`git config user.name ${input.userName}`);
  await exec.exec(`git config user.email ${input.userEmail}`);
}
