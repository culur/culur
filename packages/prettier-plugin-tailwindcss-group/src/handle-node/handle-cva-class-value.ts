import type { Expression } from 'estree-jsx';
import type { PluginOptions } from '../prettier';
import {
  isArrayExpression,
  isCallExpression,
  isIdentifier,
  isStringLiteral,
} from '../ast';
import { handleExpressionArray } from './handle-expressions';
import { handleStringLiteral } from './handle-string-literal';

/** Handles a class value expression (StringLiteral, CallExpression, or ArrayExpression) inside `cva(...)`. */
export function handleCvaClassValue(
  expression: Expression,
  options: PluginOptions,
): Expression {
  // Case 1: Plain string literal, e.g. "px-4 py-2" -> converts to string array if threshold exceeded
  if (isStringLiteral(expression)) {
    return handleStringLiteral(expression, options, 'cva');
  }

  // Case 2: Tailwind helper function call, e.g. cn("px-4", "py-2", dynamic)
  if (
    isCallExpression(expression) &&
    isIdentifier(expression.callee, options.tailwindFunctions)
  ) {
    const result = handleExpressionArray(expression.arguments, options);
    if (Array.isArray(result)) {
      expression.arguments = result;
      return expression;
    }
    return result;
  }

  // Case 3: Array of class expressions, e.g. ["px-4", "py-2", dynamic]
  if (isArrayExpression(expression)) {
    const result = handleExpressionArray(expression.elements, options);
    if (Array.isArray(result)) {
      expression.elements = result;
      return expression;
    }
    return result;
  }

  // Fallback: Return expression unchanged if unrecognized
  return expression;
}
