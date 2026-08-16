import type {
  CallExpression,
  Expression,
  Identifier,
  JSXAttribute,
  JSXEmptyExpression,
  JSXExpressionContainer,
  JSXIdentifier,
  Node,
} from 'estree-jsx';

export function isJSXAttribute(node: Node): node is JSXAttribute {
  return node.type === 'JSXAttribute';
}

export function isJSXIdentifier(
  node: Node,
  name?: string,
): node is JSXIdentifier {
  if (node.type !== 'JSXIdentifier') return false;
  if (name !== undefined && node.name !== name) return false;
  return true;
}

export function isJSXExpressionContainer(
  node: Node,
): node is JSXExpressionContainer {
  return node.type === 'JSXExpressionContainer';
}

export function buildExpressionContainer(
  expression: Expression | JSXEmptyExpression,
): JSXExpressionContainer {
  return {
    type: 'JSXExpressionContainer',
    expression,
  } satisfies JSXExpressionContainer;
}

export function buildCallExpression(
  wrapperName: string,
  args: Expression[],
): CallExpression {
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: wrapperName,
    } satisfies Identifier,
    arguments: args,
    optional: false,
  } satisfies CallExpression;
}
