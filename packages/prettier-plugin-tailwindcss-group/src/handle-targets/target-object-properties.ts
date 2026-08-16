import type { Node } from 'estree-jsx';
import type { PluginOptions } from '../prettier';
import {
  isCallExpression,
  isClassNameKey,
  isIdentifier,
  isStaticProperty,
} from '../ast';
import { handleExpressionArray } from '../handle-node/handle-expressions';

/**
 * Handles Object Property class attributes whose value is a CallExpression
 * calling a function in `tailwindFunctions` (e.g. `{ className: cn(...) }`).
 */
export function handleTargetObjectProperty(
  node: Node,
  options: PluginOptions,
): boolean {
  // Validate that node is an ObjectProperty with matching className key and tailwind function call value
  if (
    !isStaticProperty(node, isClassNameKey) ||
    !isCallExpression(node.value) ||
    !isIdentifier(node.value.callee, options.tailwindFunctions)
  ) {
    return false;
  }

  // Process arguments through expression array handler
  const result = handleExpressionArray(node.value.arguments, options);

  // Update arguments while preserving the CallExpression wrapper
  if (Array.isArray(result)) {
    node.value.arguments = result;
  } else {
    node.value.arguments = [result];
  }

  return true;
}

export const handleTargetObjectProperties = handleTargetObjectProperty;
