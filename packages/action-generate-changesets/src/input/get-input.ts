import core from '@actions/core';

export function getInput() {
  return {
    baseBranchPattern: core.getInput('base-branch', { required: true }),
    headBranchPattern: core.getInput('head-branch', { required: true }),
    userName: core.getInput('user-name', { required: true }),
    userEmail: core.getInput('user-email', { required: true }),
  };
}

export type Input = ReturnType<typeof getInput>;
