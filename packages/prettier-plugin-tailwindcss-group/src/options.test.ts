import { describe, expect, it } from 'vitest';
import { resolveOptions } from './options';

describe('resolveOptions validation', () => {
  it('resolves valid options correctly', () => {
    const resolved = resolveOptions({ tailwindFunctions: ['cn', 'clsx'] });
    expect(resolved.tailwindFunctions).toEqual(['cn', 'clsx']);
    expect(resolved.classNameThreshold).toBe(10);
    expect(resolved.modifierThreshold).toBe(2);
  });

  it('customizes classNameThreshold correctly', () => {
    const resolved = resolveOptions({ classNameThreshold: 5 });
    expect(resolved.classNameThreshold).toBe(5);
    expect(resolved.modifierThreshold).toBe(2);
    expect(resolved.tailwindFunctions).toEqual(['cn']);
  });

  it('customizes modifierThreshold correctly', () => {
    const resolved = resolveOptions({ modifierThreshold: 4 });
    expect(resolved.modifierThreshold).toBe(4);
  });

  it('falls back to ["cn"] if tailwindFunctions is empty array or undefined', () => {
    expect(resolveOptions({ tailwindFunctions: [] }).tailwindFunctions).toEqual(
      ['cn'],
    );
    expect(resolveOptions({}).tailwindFunctions).toEqual(['cn']);
    expect(resolveOptions(null).tailwindFunctions).toEqual(['cn']);
  });

  it('throws error if tailwindFunctions contains invalid JS/TS identifier', () => {
    expect(() => resolveOptions({ tailwindFunctions: ['invalid-fn'] })).toThrow(
      'Option "tailwindFunctions" contains invalid function name "invalid-fn". Function names must be valid JS/TS identifiers.',
    );
    expect(() => resolveOptions({ tailwindFunctions: ['123fn'] })).toThrow(
      'Option "tailwindFunctions" contains invalid function name "123fn". Function names must be valid JS/TS identifiers.',
    );
  });

  it('throws error if tailwindFunctions is not an array', () => {
    expect(() =>
      resolveOptions({ tailwindFunctions: 'clsx' as unknown as string[] }),
    ).toThrow('Option "tailwindFunctions" must be an array of strings.');
    expect(() =>
      resolveOptions({ tailwindFunctions: 123 as unknown as string[] }),
    ).toThrow('Option "tailwindFunctions" must be an array of strings.');
  });

  it('throws error if classNameThreshold is not a non-negative integer', () => {
    expect(() => resolveOptions({ classNameThreshold: -1 })).toThrow(
      'Option "classNameThreshold" must be a non-negative integer.',
    );
    expect(() => resolveOptions({ classNameThreshold: 2.5 })).toThrow(
      'Option "classNameThreshold" must be a non-negative integer.',
    );
    expect(() =>
      resolveOptions({ classNameThreshold: '5' as unknown as number }),
    ).toThrow('Option "classNameThreshold" must be a non-negative integer.');
  });

  it('throws error if modifierThreshold is not a non-negative integer', () => {
    expect(() => resolveOptions({ modifierThreshold: -1 })).toThrow(
      'Option "modifierThreshold" must be a non-negative integer.',
    );
    expect(() => resolveOptions({ modifierThreshold: 1.5 })).toThrow(
      'Option "modifierThreshold" must be a non-negative integer.',
    );
    expect(() =>
      resolveOptions({ modifierThreshold: '2' as unknown as number }),
    ).toThrow('Option "modifierThreshold" must be a non-negative integer.');
  });
});
