import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import core from '@actions/core';
import { main } from './main';
import { mockAll, restoreAll } from './__tests__/mock-all';

describe('main', () => {
  beforeEach(() => {
    vi.spyOn(core, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    restoreAll();
  });

  it('main', async () => {
    mockAll();

    await main();
  });
});
