import type { RuleEntry } from '~/types';

type JsoncSortKeys = RuleEntry<'jsonc/sort-keys'>;

export type JsoncSortKeysOrder = Extract<JsoncSortKeys[0], object>['order'];

export type JsoncSortKeysOrderMap = Record<
  string,
  | JsoncSortKeysOrder
  | Record<
      string,
      | JsoncSortKeysOrder //
      | Record<string, JsoncSortKeysOrder>
    >
>;
