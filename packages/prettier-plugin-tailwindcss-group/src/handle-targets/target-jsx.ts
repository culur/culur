import type { Node } from 'estree-jsx';
import type { PluginOptions } from '../prettier';
import {
  isCallExpression,
  isClassNameKey,
  isIdentifier,
  isJSXAttribute,
  isJSXExpressionContainer,
  isJSXIdentifier,
  isNodeWithComments,
  isStringLiteral,
} from '../ast';
import { handleExpressionArray } from '../handle-node/handle-expressions';
import { handleStringLiteral } from '../handle-node/handle-string-literal';

/** Handles JSX attribute formatting for `className` and `*ClassName` attributes. */
export function handleTargetJSX(node: Node, options: PluginOptions): boolean {
  // Validate that node is a JSXAttribute with a name matching className / *ClassName
  if (
    !isJSXAttribute(node) ||
    !isJSXIdentifier(node.name) ||
    !isClassNameKey(node.name.name) ||
    !node.value
  ) {
    return false;
  }

  // Case 1: Plain string literal attribute value, e.g. `className="..."`
  if (isStringLiteral(node.value)) {
    node.value = handleStringLiteral(node.value, options, 'jsx');
  }
  // Case 2: JSX expression container with a string literal, e.g. `className={"..."}`
  else if (
    isJSXExpressionContainer(node.value) &&
    isStringLiteral(node.value.expression)
  ) {
    if (
      isNodeWithComments(node.value) ||
      isNodeWithComments(node.value.expression)
    ) {
      return false;
    }
    node.value = handleStringLiteral(node.value.expression, options, 'jsx');
  }
  // Case 3: JSX expression container calling a tailwind helper function, e.g. `className={cn(...)}`
  else if (
    isJSXExpressionContainer(node.value) &&
    isCallExpression(node.value.expression) &&
    isIdentifier(node.value.expression.callee, options.tailwindFunctions)
  ) {
    const result = handleExpressionArray(
      node.value.expression.arguments,
      options,
    );

    // If result is an expression array, update function arguments; otherwise replace expression
    if (Array.isArray(result)) {
      node.value.expression.arguments = result;
    } else {
      node.value = result;
    }
  }

  return true;
}
