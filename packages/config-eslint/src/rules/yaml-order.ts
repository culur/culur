import type { Rules } from '@antfu/eslint-config';
import type { Linter } from 'eslint';

export const yamlOrder = {
  type: 'asc',
  caseSensitive: false,
  natural: true,
} as const;

export type YamlSortKeys =
  NonNullable<Rules['yaml/sort-keys']> extends Linter.RuleEntry<infer F>
    ? F
    : never;

export type YamlSortKeysRecord = YamlSortKeys[0];
