import { assert, describe, expect, expectTypeOf, test } from 'vitest';
import { defineRule, defineRules, mergeConfigs } from './utils';
import { ConfigRuleSettings } from 'stylelint';

describe('Rules', () => {
  test('defineRule & rules', () => {
    type PrimaryOption = true;
    type SecondaryOptions = {
      ignore: ['comments'];
    };

    const blockNoEmptyRule = defineRule<PrimaryOption, SecondaryOptions>([
      true,
      { ignore: ['comments'] },
    ]);
    const blockNoEmpty = defineRules({ 'block-no-empty': blockNoEmptyRule });

    assert(Array.isArray(blockNoEmptyRule));
    expectTypeOf(blockNoEmpty).toBeObject();
  });
});

describe('Merge configs', () => {
  test('Should merge plugins', () => {
    const mergedConfigs = mergeConfigs(
      { plugins: ['plugin-a'] }, //
      { plugins: ['plugin-b'] },
      { plugins: [] },
      {},
    );

    assert(Array.isArray(mergedConfigs.plugins));
    expect(mergedConfigs.plugins).toHaveLength(2);
  });

  test('Should merge overrides', () => {
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
