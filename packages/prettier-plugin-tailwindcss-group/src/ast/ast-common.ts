import type { Identifier, Node } from 'estree-jsx';
import type { Printer } from 'prettier';
import estreePlugin from 'prettier/plugins/estree.js';

export const estree = estreePlugin.printers.estree as Printer<Node>;

export function isNode(value: unknown): value is Node {
  const node = value as Node;
  return (
    node !== null && //
    typeof node === 'object' &&
    typeof node.type === 'string'
  );
}

export function isIdentifier(
  node: Node,
  names?: string | string[],
): node is Identifier {
  if (node.type !== 'Identifier') return false;
  if (names !== undefined) {
    if (Array.isArray(names)) {
      if (!names.includes(node.name)) return false;
    } else if (node.name !== names) {
      return false;
    }
  }
  return true;
}
