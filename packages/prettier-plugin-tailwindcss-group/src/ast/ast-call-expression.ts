import type { CallExpression, Node } from 'estree-jsx';

export function isCallExpression(node: Node): node is CallExpression {
  return node.type === 'CallExpression';
}
