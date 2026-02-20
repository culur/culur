import { getInput as coreGetInput } from '@actions/core';

export function getInput() {
  return {
    baseBranchPattern: coreGetInput('base-branch', { required: true }),
    headBranchPattern: coreGetInput('head-branch', { required: true }),
    userName: coreGetInput('user-name', { required: true }),
    userEmail: coreGetInput('user-email', { required: true }),
  };
}

export type Input = ReturnType<typeof getInput>;
