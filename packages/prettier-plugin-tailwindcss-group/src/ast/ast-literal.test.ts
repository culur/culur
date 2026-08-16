import { describe, expect, it } from 'vitest';
import { parseExpression } from '../__tests__/utils/ast-estree';
import { buildStringLiteral, isLiteral, isStringLiteral } from './ast-literal';

describe('literal utils', () => {
  describe('isLiteral', () => {
    it('returns true for Literal nodes', () => {
      const nodeStr = parseExpression('"test"');
      const nodeNum = parseExpression('123');
      expect(isLiteral(nodeStr)).toBe(true);
      expect(isLiteral(nodeNum)).toBe(true);
    });

    it('returns false for non-Literal nodes', () => {
      const node = parseExpression('foo');
      expect(isLiteral(node)).toBe(false);
      expect(isLiteral(null)).toBe(false);
      expect(isLiteral(undefined)).toBe(false);
    });
  });

  describe('isStringLiteral', () => {
    it('returns true for StringLiteral nodes', () => {
      const node = parseExpression('"test"');
      expect(isStringLiteral(node)).toBe(true);
    });

    it('returns false for non-string literals or non-literals', () => {
      const nodeNum = parseExpression('123');
      const nodeIdent = parseExpression('foo');
      expect(isStringLiteral(nodeNum)).toBe(false);
      expect(isStringLiteral(nodeIdent)).toBe(false);
      expect(isStringLiteral(null)).toBe(false);
      expect(isStringLiteral(undefined)).toBe(false);
    });
  });

  describe('buildStringLiteral', () => {
    it('creates a StringLiteral with value and JSON raw', () => {
      expect(buildStringLiteral('btn primary')).toEqual({
        type: 'Literal',
        value: 'btn primary',
        raw: JSON.stringify('btn primary'),
      });
    });
  });
});
