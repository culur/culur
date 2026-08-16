import { describe, expect, it } from 'vitest';
import { parseExpression } from '../__tests__/utils/ast-estree';
import {
  buildStringArrayExpression,
  isArrayExpression,
} from './ast-array-expression';

describe('ast-array-expression utils', () => {
  describe('isArrayExpression', () => {
    it('returns true for ArrayExpression nodes', () => {
      const node = parseExpression('["flex", "p-4"]');
      expect(isArrayExpression(node)).toBe(true);
    });

    it('returns false for other node types', () => {
      const node = parseExpression('foo');
      expect(isArrayExpression(node)).toBe(false);
    });
  });

  describe('buildStringArrayExpression', () => {
    it('builds an ArrayExpression from array of string groups', () => {
      const result = buildStringArrayExpression(['flex items-center', 'p-4']);
      expect(result.type).toBe('ArrayExpression');
      expect(result.elements).toHaveLength(2);
      expect(result.elements[0]).toEqual({
        type: 'Literal',
        value: 'flex items-center',
        raw: JSON.stringify('flex items-center'),
      });
    });
  });
});
