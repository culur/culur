import { describe, expect, test, vi } from 'vitest';
import definePrettierConfig from './factory';
import prettier from 'prettier';

describe('Platform', () => {
  vi.mock('os');

  test.each([
    { platform: 'win32', endOfLine: 'crlf' },
    { platform: 'linux', endOfLine: 'lf' },
  ])('Platform is $platform', async ({ platform, endOfLine }) => {
    const os = await import('os');
    os.platform = vi.fn().mockReturnValue(platform);

    const config = definePrettierConfig();
    expect(config.endOfLine).toBe(endOfLine);
  });
});

describe('Create config', () => {
  test('Is valid config', async () => {
    const config = definePrettierConfig();
    const code = 'const a = \n 123';
    const formattedCode = await prettier.format(code, {
      ...config,
      parser: 'typescript',
    });
    expect(formattedCode.trim()).toBe('const a = 123;');
  });

  test('Can override config', () => {
    const config = definePrettierConfig({
      tabWidth: 4,
      overrides: [
        {
          files: ['custom.ts'],
          options: { printWidth: 160 },
        },
      ],
    });

    expect(config.tabWidth).toBe(4);
    expect(
      config.overrides?.find(override => override.files.includes('custom.ts'))
        ?.options?.printWidth,
    ).toBe(160);
  });
});
