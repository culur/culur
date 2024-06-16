import { afterEach, describe, expect, it, vi } from 'vitest';
import { getInput } from './get-input';
import { mockInput } from '~/__tests__/mock-input';

describe('getInput', () => {
  afterEach(() => {
    vi.restoreAllMocks();
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
