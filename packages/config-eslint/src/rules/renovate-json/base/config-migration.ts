import type { JsoncSortKeysOrder } from './types';

export const configMigration = [
  'configMigration', // boolean: Enable this to get config migration PRs when needed
] as const satisfies JsoncSortKeysOrder;
