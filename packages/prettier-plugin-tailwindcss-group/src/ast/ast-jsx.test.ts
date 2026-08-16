import type { JSXAttribute, JSXElement } from 'estree-jsx';
import { describe, expect, it } from 'vitest';
import { parseExpression } from '../__tests__/utils/ast-estree';
import {
  isJSXAttribute,
  isJSXExpressionContainer,
  isJSXIdentifier,
} from './ast-jsx';

describe('ast-jsx utils', () => {
  describe('isJSXAttribute', () => {
    it('returns true for JSXAttribute nodes', () => {
      const element = parseExpression<JSXElement>('<div className="flex" />');
      const attr = element.openingElement.attributes[0];
      expect(isJSXAttribute(attr)).toBe(true);
    });

    it('returns false for other node types', () => {
      const node = parseExpression('foo');
      expect(isJSXAttribute(node)).toBe(false);
    });
  });

  describe('isJSXIdentifier', () => {
    it('returns false if node type is not JSXIdentifier', () => {
      const node = parseExpression('foo');
      expect(isJSXIdentifier(node)).toBe(false);
    });

    it('returns true for JSXIdentifier when name is undefined', () => {
      const element = parseExpression<JSXElement>('<div className="flex" />');
      const attr = element.openingElement.attributes[0] as JSXAttribute;
      expect(isJSXIdentifier(attr.name)).toBe(true);
    });

    it('handles name argument matching and non-matching', () => {
      const element = parseExpression<JSXElement>('<div className="flex" />');
      const attr = element.openingElement.attributes[0] as JSXAttribute;
      expect(isJSXIdentifier(attr.name, 'className')).toBe(true);
      expect(isJSXIdentifier(attr.name, 'id')).toBe(false);
    });
  });

  describe('isJSXExpressionContainer', () => {
    it('returns true for JSXExpressionContainer nodes', () => {
      const element = parseExpression<JSXElement>('<div className={"flex"} />');
      const attr = element.openingElement.attributes[0] as JSXAttribute;
      expect(isJSXExpressionContainer(attr.value!)).toBe(true);
    });

    it('returns false for other node types', () => {
      const node = parseExpression('foo');
      expect(isJSXExpressionContainer(node)).toBe(false);
    });
  });
});
