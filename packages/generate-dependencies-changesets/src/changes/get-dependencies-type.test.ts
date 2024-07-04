import { describe, expect, it } from 'vitest';
import {
  dependenciesTypes,
  getDependenciesType,
} from './get-dependencies-type';

describe('getDependenciesTypes', () => {
  it.each(dependenciesTypes)('%s', type => {
    const dependenciesType = getDependenciesType(
      { [type]: { foo: '^1.0.0' } },
      'foo',
      '^1.0.0',
    );

    expect(dependenciesType).toStrictEqual(type);
  });

  it('unknown dependenciesType', () => {
    expect(() => getDependenciesType({}, 'foo', '^1.0.0')).toThrowError(
      'Unknown dependencies change',
    );
  });
});
