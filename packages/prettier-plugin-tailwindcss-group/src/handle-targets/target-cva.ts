import type { Node } from 'estree-jsx';
import type { PluginOptions } from '../prettier';
import { isCallExpression, isIdentifier, isObjectExpression } from '../ast';
import { handleTargetCvaBase } from './target-cva-base';
import { handleTargetCvaCompoundVariants } from './target-cva-compound-variants';
import { handleTargetCvaVariants } from './target-cva-variants';

/**
 * Handles a `cva(...)` CallExpression, transforming static classes in
 * `params[0]`, `params[1].variants`, and `params[1].compoundVariants`.
 */
export function handleTargetCVA(node: Node, options: PluginOptions): boolean {
  // Validate that node is a CallExpression calling `cva(...)` with at least 1 argument
  if (
    !isCallExpression(node) ||
    !isIdentifier(node.callee, 'cva') ||
    node.arguments.length < 1
  ) {
    return false;
  }

  // Process params[0] — base classes
  handleTargetCvaBase(node, options);

  // Process params[1] — config object (variants & compoundVariants)
  const config = node.arguments[1];
  if (config && config.type !== 'SpreadElement' && isObjectExpression(config)) {
    handleTargetCvaVariants(config, options);
    handleTargetCvaCompoundVariants(config, options);
  }

  return true;
}
