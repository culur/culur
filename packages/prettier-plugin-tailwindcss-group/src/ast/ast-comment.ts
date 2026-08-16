import type { Node } from 'estree-jsx';

export interface Comment {
  type: 'Line' | 'Block' | string;
  value: string;
  [key: string]: unknown;
}

export type NodeWithComments<T extends Node = Node> = T & {
  comments?: Comment[];
  leadingComments?: Comment[];
  trailingComments?: Comment[];
};

export function isNodeWithComments<T extends Node = Node>(
  node?: T | null,
): node is NodeWithComments<T> {
  if (!node) return false;
  const n = node as NodeWithComments<T>;
  return Boolean(
    (n.comments && n.comments.length > 0) ||
    (n.leadingComments && n.leadingComments.length > 0) ||
    (n.trailingComments && n.trailingComments.length > 0),
  );
}
