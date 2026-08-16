import type { Literal, Node, SimpleLiteral } from 'estree-jsx';

export function isLiteral(node?: Node | null): node is Literal {
  return Boolean(node && node.type === 'Literal');
}

export type StringLiteral = SimpleLiteral & { value: string };

export function isStringLiteral(node?: Node | null): node is StringLiteral {
  return isLiteral(node) && typeof node.value === 'string';
}

export const buildStringLiteral = (value: string): StringLiteral => ({
  type: 'Literal',
  value,
  raw: JSON.stringify(value),
});
