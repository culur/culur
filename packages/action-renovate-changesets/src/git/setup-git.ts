import process from 'node:process';
import core from '@actions/core';
import dedent from 'dedent';
import exec from '@actions/exec';
import fs from 'fs-extra';
import type { Branches } from '~/setup/get-branches';

export async function setupGit({ headBranch }: Branches) {
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
      login renovate[bot]
      password ${githubToken}
    `,
  );

  await exec.exec(`git checkout ${headBranch}`);
  await exec.exec('git config user.name renovate[bot]');
  await exec.exec(
    'git config user.email renovate[bot]@users.noreply.github.com',
  );
}
