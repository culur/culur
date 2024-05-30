import core from '@actions/core';

export function getInput() {
  return {
    baseBranch: core.getInput('base-branch', { required: true }),
  };
}

export type Input = ReturnType<typeof getInput>;
