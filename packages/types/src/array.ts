import type { Entries } from 'type-fest';

export function entries<
  TArray extends { [s: string]: unknown } | ArrayLike<unknown>,
>(array: TArray) {
  return Object.entries(array) as Entries<TArray>;
}

export function keys<TArray extends object>(array: TArray) {
  return Object.keys(array) as (keyof TArray)[];
}
