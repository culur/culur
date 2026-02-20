import { context } from '@actions/github';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockAll } from './__tests__/mock-all';

vi.mock('@actions/core', () => ({
  setFailed: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
  getInput: vi.fn(),
}));

// Shallow clone original @actions/github context
const originalContext = { ...context };
describe('index', () => {
  afterEach(() => {
    vi.resetAllMocks();
    for (const key of Object.keys(context)) delete (context as any)[key];
    Object.assign(context, originalContext);
  });

  it('index', async () => {
    mockAll();

    await expect(import('./index')).resolves.toBeTruthy();
    await new Promise(r => setTimeout(r, 100));
  });
});
