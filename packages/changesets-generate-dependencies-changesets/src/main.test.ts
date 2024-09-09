import core from '@actions/core';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { mockAll, restoreAll } from './__tests__/mock-all';
import { main } from './main';

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
