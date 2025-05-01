import github from '@actions/github';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockAll } from './__tests__/mock-all';

vi.mock('@actions/core', () => ({
  default: {
    setFailed: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    getInput: vi.fn(),
  },
}));

// Shallow clone original @actions/github context
const originalContext = { ...github.context };
describe('index', () => {
  afterEach(() => {
    vi.resetAllMocks();
    Object.defineProperty(github, 'context', { value: originalContext });
  });

  it('index', async () => {
    mockAll();

    await expect(import('./index')).resolves.toBeTruthy();
    await new Promise(r => setTimeout(r, 100));
  });
});
