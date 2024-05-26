import { assert, describe, expect, expectTypeOf, it } from 'vitest';
import { defineRule, defineRules, mergeConfigs } from './utils';

describe('rules', () => {
  it('defineRule & rules', () => {
    type PrimaryOption = true;
    interface SecondaryOptions {
      ignore: ['comments'];
    }

    const blockNoEmptyRule = defineRule<PrimaryOption, SecondaryOptions>([
      true,
      { ignore: ['comments'] },
    ]);
    const blockNoEmpty = defineRules({ 'block-no-empty': blockNoEmptyRule });

    assert(Array.isArray(blockNoEmptyRule));
    expectTypeOf(blockNoEmpty).toBeObject();
  });
});

describe('merge configs', () => {
  it('should merge plugins', () => {
    const mergedConfigs = mergeConfigs(
      { plugins: ['plugin-a'] }, //
      { plugins: ['plugin-b'] },
      { plugins: [] },
      {},
    );

    assert(Array.isArray(mergedConfigs.plugins));
    expect(mergedConfigs.plugins).toHaveLength(2);
  });

  it('should merge overrides', () => {
    const mergedConfigs = mergeConfigs(
      { overrides: [{ files: 'a.css' }] },
      { overrides: [{ files: 'b.css' }] },
      { overrides: [] },
      {},
    );

    assert(Array.isArray(mergedConfigs.overrides));
    expect(mergedConfigs.overrides).toHaveLength(2);
  });
});
