import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockInput } from '~/__tests__/mock-input';
import { getInput } from './get-input';

vi.mock('@actions/core', () => ({
  default: {
    getInput: vi.fn(),
  },
}));

describe('getInput', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('valid', async () => {
    mockInput({
      baseBranchPattern: 'BASE-BRANCH',
      headBranchPattern: 'HEAD-BRANCH',
      userName: 'USER-NAME',
      userEmail: 'USER-EMAIL',
    });

    const input = getInput();

    expect(input.baseBranchPattern).toEqual('BASE-BRANCH');
    expect(input.headBranchPattern).toEqual('HEAD-BRANCH');
    expect(input.userName).toEqual('USER-NAME');
    expect(input.userEmail).toEqual('USER-EMAIL');
  });
});
