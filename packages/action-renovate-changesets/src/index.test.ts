import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import core from '@actions/core';
import github from '@actions/github';
import { mockAll } from './main.test';

// Shallow clone original @actions/github context
const originalContext = { ...github.context };
describe('index', () => {
  beforeEach(() => {
    vi.spyOn(core, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(github, 'context', { value: originalContext });
  });

  it('index', async () => {
    mockAll();

    await import('./index');
    await new Promise(r => setTimeout(r, 100));
  });
});
