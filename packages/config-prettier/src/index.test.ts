import prettier from 'prettier';
import { describe, expect, it } from 'vitest';
import prettierConfig from '.';

describe('create config', () => {
  it('is valid config', async () => {
    const config = prettierConfig;
    const code = 'const a = \n 123';
    const formattedCode = await prettier.format(code, {
      ...config,
      parser: 'typescript',
    });
    expect(formattedCode.trim()).toBe('const a = 123;');
  });
});
