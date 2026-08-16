import type { JSXExpressionContainer } from 'estree-jsx';
import type { StringArrayExpression, StringLiteral } from '../ast';
import type { PluginOptions } from '../prettier';
import {
  buildCallExpression,
  buildExpressionContainer,
  buildStringArrayExpression,
  buildStringLiteral,
  isNodeWithComments,
} from '../ast';
import { groupClasses } from '../group-classes/group-classes';
import { splitClasses } from '../utils/split-classes';

export function handleStringLiteral(
  node: StringLiteral,
  options: PluginOptions,
  target: 'jsx',
): JSXExpressionContainer | StringLiteral;
export function handleStringLiteral(
  node: StringLiteral,
  options: PluginOptions,
  target: 'cva',
): StringArrayExpression | StringLiteral;
/** Processes a static string literal, grouping Tailwind CSS classes if threshold is exceeded. */
export function handleStringLiteral(
  node: StringLiteral,
  options: PluginOptions,
  target: 'jsx' | 'cva',
): JSXExpressionContainer | StringArrayExpression | StringLiteral {
  // BAIL OUT: If the string literal has attached comments, we must not touch it.
  if (isNodeWithComments(node)) {
    return node;
  }

  const classes = splitClasses(node.value);

  // Keep as single string literal if class count is within threshold
  if (classes.length <= options.classNameThreshold) return node;

  // Group classes into logical clusters
  const groups = groupClasses(classes, options.modifierThreshold);

  // CVA context: transform into an ArrayExpression of string literals
  if (target === 'cva') {
    return buildStringArrayExpression(groups);
  }

  // JSX context: wrap grouped string literals in primary tailwind helper function (e.g. cn(...))
  const wrapperName = options.tailwindFunctions[0];
  const stringLiterals = groups.map(buildStringLiteral);
  const expressionCall = buildCallExpression(wrapperName, stringLiterals);
  return buildExpressionContainer(expressionCall);
}
