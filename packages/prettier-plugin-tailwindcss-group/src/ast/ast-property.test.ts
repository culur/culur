import type { ObjectExpression } from 'estree-jsx';
import { assert, describe, expect, it } from 'vitest';
import { parseExpression } from '../__tests__/utils/ast-estree';
import {
  isObjectExpression,
  isProperty,
  isStaticProperty,
} from './ast-property';
import { isClassNameKey } from './key';

describe('ast-property utils', () => {
  describe('isObjectExpression', () => {
    it('returns true for ObjectExpression nodes', () => {
      const node = parseExpression('{ className: "flex" }');
      expect(isObjectExpression(node)).toBe(true);
    });

    it('returns false for other node types', () => {
      const node = parseExpression('foo');
      expect(isObjectExpression(node)).toBe(false);
    });
  });

  describe('isProperty', () => {
    it('returns true for Property nodes', () => {
      const node = parseExpression(`{ className: "flex" }`);
      assert(isObjectExpression(node));
      expect(isProperty(node.properties[0])).toBe(true);
    });

    it('returns false for non-Property nodes', () => {
      const node = parseExpression('foo');
      expect(isProperty(node)).toBe(false);
    });
  });

  describe('isStaticProperty', () => {
    it('returns true for non-computed Identifier or Literal keys without key filter', () => {
      const objIdent = parseExpression<ObjectExpression>(
        '{ className: "flex" }',
      );
      const objStr = parseExpression<ObjectExpression>(
        '{ "className": "flex" }',
      );
      const objNum = parseExpression<ObjectExpression>('{ 123: "flex" }');

      expect(isStaticProperty(objIdent.properties[0])).toBe(true);
      expect(isStaticProperty(objStr.properties[0])).toBe(true);
      expect(isStaticProperty(objNum.properties[0])).toBe(true);
    });

    it('filters by string keyName', () => {
      const objVariants = parseExpression<ObjectExpression>('{ variants: {} }');
      const objNum = parseExpression<ObjectExpression>('{ 123: "flex" }');

      expect(isStaticProperty(objVariants.properties[0], 'variants')).toBe(
        true,
      );
      expect(
        isStaticProperty(objVariants.properties[0], 'compoundVariants'),
      ).toBe(false);
      expect(isStaticProperty(objNum.properties[0], 'variants')).toBe(false);
    });

    it('filters by callback keyName', () => {
      const objWrapper = parseExpression<ObjectExpression>(
        '{ wrapperClassName: "flex" }',
      );
      const objStyle = parseExpression<ObjectExpression>('{ style: "flex" }');
      const objNum = parseExpression<ObjectExpression>('{ 123: "flex" }');

      expect(isStaticProperty(objWrapper.properties[0], isClassNameKey)).toBe(
        true,
      );
      expect(isStaticProperty(objStyle.properties[0], isClassNameKey)).toBe(
        false,
      );
      expect(isStaticProperty(objNum.properties[0], isClassNameKey)).toBe(
        false,
      );
    });

    it('returns false for computed or non-static keys', () => {
      const objComputed = parseExpression<ObjectExpression>(
        '{ [className]: "flex" }',
      );
      const nodeIdent = parseExpression('foo');

      expect(isStaticProperty(objComputed.properties[0])).toBe(false);
      expect(isStaticProperty(objComputed.properties[0], 'className')).toBe(
        false,
      );
      expect(isStaticProperty(nodeIdent)).toBe(false);
    });
  });
});
