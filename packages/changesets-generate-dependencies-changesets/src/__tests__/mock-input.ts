import core from '@actions/core';
import { vi } from 'vitest';

export function mockInput(input: {
  baseBranchPattern: string;
  headBranchPattern: string;
  userName: string;
  userEmail: string;
}) {
  vi.spyOn(core, 'getInput').mockImplementation(name => {
    if (name === 'base-branch') return input.baseBranchPattern;
    if (name === 'head-branch') return input.headBranchPattern;
    if (name === 'user-name') return input.userName;
    if (name === 'user-email') return input.userEmail;
    return '-';
  });
}
