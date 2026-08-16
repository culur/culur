import type { Node, ObjectExpression, Property } from 'estree-jsx';
import { isIdentifier } from './ast-common';
import { isLiteral, isStringLiteral } from './ast-literal';

export function isObjectExpression(node: Node): node is ObjectExpression {
  return node.type === 'ObjectExpression';
}

export function isProperty(node: Node): node is Property {
  return node.type === 'Property';
}

export function isStaticProperty(
  node: Node,
  keyName?: string | ((key: string) => boolean),
): node is Property {
  if (!isProperty(node) || node.computed) return false;

  const key = isIdentifier(node.key)
    ? node.key.name
    : isStringLiteral(node.key)
      ? node.key.value
      : null;

  if (key === null) {
    return keyName === undefined && isLiteral(node.key);
  }

  if (keyName === undefined) return true;
  if (typeof keyName === 'function') return keyName(key);
  return key === keyName;
}
