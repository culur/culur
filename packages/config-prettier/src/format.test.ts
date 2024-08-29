import { describe, expect, it } from 'vitest';
import { formatCode } from './format';

describe('formatCode', () => {
  it('format code', async () => {
    const code = 'const a = \n 123';
    const formattedCode = await formatCode('test.ts', code);
    expect(formattedCode.trim()).toBe('const a = 123;');
  });

  it('format code with options', async () => {
    const code = 'const a = \n 123';
    const formattedCode = await formatCode('test.ts', code, {
      printWidth: 100,
    });
    expect(formattedCode.trim()).toBe('const a = 123;');
  });

  it('format code with custom parser', async () => {
    const code = 'const a = \n 123';
    const formattedCode = await formatCode('test.js', code, {
      parser: 'babel',
    });
    expect(formattedCode.trim()).toBe('const a = 123;');
  });

  it('format code with unknown parser', async () => {
    const code = 'const a = \n 123';
    const formattedCode = await formatCode('test.unknown', code);
    expect(formattedCode.trim()).toBe(code.trim());
  });
});
