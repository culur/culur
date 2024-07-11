import * as os from 'node:os';
import prettier from 'prettier';
import { describe, expect, it, vi } from 'vitest';
import definePrettierConfig from './factory';

vi.mock('node:os');

describe('platform', () => {
  it.each([
    { platform: 'win32', endOfLine: 'crlf' },
    { platform: 'linux', endOfLine: 'lf' },
  ] as const)('platform is $platform', async ({ platform, endOfLine }) => {
    vi.spyOn(os, 'platform').mockReturnValue(platform);

    const config = definePrettierConfig();
    expect(config.endOfLine).toBe(endOfLine);
  });
});

describe('create config', () => {
  it('is valid config', async () => {
    const config = definePrettierConfig();
    const code = 'const a = \n 123';
    const formattedCode = await prettier.format(code, {
      ...config,
      parser: 'typescript',
    });
    expect(formattedCode.trim()).toBe('const a = 123;');
  });

  it('can override config', () => {
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
