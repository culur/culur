import { describe, expect, test } from 'vitest';
import prettierConfig from '.';
import prettier from 'prettier';

describe('Create config', () => {
  test('Is valid config', async () => {
    const config = prettierConfig;
    const code = 'const a = \n 123';
    const formattedCode = await prettier.format(code, {
      ...config,
      parser: 'typescript',
    });
    expect(formattedCode.trim()).toBe('const a = 123;');
  });
});
