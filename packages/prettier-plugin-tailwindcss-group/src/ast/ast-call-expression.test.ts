import { describe, expect, it } from 'vitest';
import { parseExpression } from '../__tests__/utils/ast-estree';
import { isCallExpression } from './ast-call-expression';

describe('ast-call-expression utils', () => {
  describe('isCallExpression', () => {
    it('returns true for CallExpression nodes', () => {
      const node = parseExpression('cn("flex")');
      expect(isCallExpression(node)).toBe(true);
    });

    it('returns false for other node types', () => {
      const node = parseExpression('foo');
      expect(isCallExpression(node)).toBe(false);
    });
  });
});
