import type { ArrayExpression, Node } from 'estree-jsx';
import { buildStringLiteral } from './ast-literal';

export type StringArrayExpression = ArrayExpression & {
  elements: NonNullable<ArrayExpression['elements'][number]>[];
};

export function isArrayExpression(node: Node): node is ArrayExpression {
  return node.type === 'ArrayExpression';
}

/** Builds an ArrayExpression of StringLiterals from grouped class strings. */
export function buildStringArrayExpression(
  groups: string[],
): StringArrayExpression {
  return {
    type: 'ArrayExpression',
    elements: groups.map(buildStringLiteral),
  } satisfies StringArrayExpression;
}
