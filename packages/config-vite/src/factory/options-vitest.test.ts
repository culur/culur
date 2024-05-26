import { describe, expect, it } from 'vitest';
import { defineConfigTest } from './options-vitest';

describe('defineConfigTest', () => {
  it.each([
    { parameter: undefined, type: 'undefined' },
    { parameter: true, type: 'object' },
    { parameter: {}, type: 'object' },
  ] as const)('parameter = $parameter', ({ parameter, type }) => {
    const configTest = defineConfigTest(parameter);
    expect(configTest).toBeTypeOf(type);
  });
});
