import process from 'node:process';
import core from '@actions/core';
import exec from '@actions/exec';

export async function checkBranch() {
  const branch = await exec.getExecOutput('git branch --show-current');
  if (!branch.stdout.startsWith('renovate/')) {
    core.info('Not a renovate branch, skipping');
    process.exit(0);
  }
}
