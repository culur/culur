import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockAll, restoreAll } from './__tests__/mock-all';
import { main } from './main';

vi.mock('@actions/core', () => ({
  setFailed: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
  getInput: vi.fn(),
}));

describe('main', () => {
  afterEach(() => {
    vi.resetAllMocks();
    restoreAll();
  });

  it('main', async () => {
    mockAll();

    await expect(main()).resolves.toEqual(undefined);
  });
});
