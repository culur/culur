import type { Node } from 'estree-jsx';
import type { PluginOptions } from './prettier';
import { estree, isNode } from './ast';
import {
  handleTargetCVA,
  handleTargetJSX,
  handleTargetObjectProperty,
} from './handle-targets';

const NON_TRAVERSABLE_KEYS = new Set<string>(['parent', 'comments']);

const TARGET_HANDLERS = [
  handleTargetJSX,
  handleTargetCVA,
  handleTargetObjectProperty,
] as const;

export function walkAst(node: Node, options: PluginOptions): void {
  if (!isNode(node)) return;

  for (const handle of TARGET_HANDLERS) {
    if (handle(node, options)) break;
  }

  const visitorKeys = estree.getVisitorKeys!(node, NON_TRAVERSABLE_KEYS);

  for (const key of visitorKeys) {
    const child = node[key as Exclude<keyof typeof node, 'type'>];
    if (!child) continue;

    if (Array.isArray(child)) {
      for (const item of child) {
        if (isNode(item)) {
          walkAst(item, options);
        }
      }
    } else if (isNode(child)) {
      walkAst(child, options);
    }
  }
}
