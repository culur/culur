import type { Options } from 'prettier';
import defineConfig from '@culur/config-prettier/factory';
import prettier from 'prettier';
import { expect, it } from 'vitest';
import plugin from '../../index';

const baseConfig = defineConfig();

export function testFormat(
  name: string,
  options: Options,
  code: string,
  expected: string,
): void {
  it(name, async () => {
    const pass1Config = {
      ...baseConfig,
      parser: 'typescript' as const,
      plugins: [plugin],
      ...options,
    };

    const formatted = await prettier.format(code, pass1Config);

    expect(formatted).toBe(`${expected}\n`);

    const pass2Config = {
      ...pass1Config,
      plugins: (pass1Config.plugins as any[]).filter((p: any) => p !== plugin),
    };

    const formattedWithoutPlugin = await prettier.format(formatted, pass2Config);
    expect(formattedWithoutPlugin).toBe(formatted);
  });
}
