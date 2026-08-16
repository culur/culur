import type { Expression, SpreadElement } from 'estree-jsx';
import type { StringLiteral } from '../ast';
import type { PluginOptions } from '../prettier';
import {
  buildStringLiteral,
  isNodeWithComments,
  isStringLiteral,
} from '../ast';
import { groupClasses } from '../group-classes/group-classes';
import { splitClasses } from '../utils/split-classes';

/** Extracts and regroups static class strings in an expression array while preserving dynamic elements. */
export function handleExpressionArray<
  T extends Expression | SpreadElement | null,
>(expressions: T[], options: PluginOptions): T[] | StringLiteral {
  const staticStrings: string[] = [];
  const dynamicExpressions: T[] = [];

  // Separate static string literals from dynamic expressions
  for (const arg of expressions) {
    if (isStringLiteral(arg)) {
      // BAIL OUT: If the string literal has attached comments, we must not touch it.
      // Modifying or regrouping strings would destroy the AST comment locations,
      // causing Prettier to throw "Comment was not printed" errors or misplace comments.
      if (isNodeWithComments(arg)) {
        return expressions;
      }
      staticStrings.push(arg.value);
    } else {
      dynamicExpressions.push(arg);
    }
  }

  // Nothing to group if there are no static strings
  if (staticStrings.length === 0) return expressions;

  const combinedString = staticStrings.join(' ');
  const classes = splitClasses(combinedString);

  // Case 1: No static classes found (e.g. empty or whitespace-only strings)
  if (classes.length === 0) {
    return dynamicExpressions.length === 0
      ? buildStringLiteral('')
      : dynamicExpressions;
  }

  // Case 2: Class count is within threshold -> keep as a single string literal
  if (classes.length <= options.classNameThreshold) {
    const node = buildStringLiteral(combinedString) as unknown as T;
    return dynamicExpressions.length === 0
      ? (node as unknown as StringLiteral)
      : [node, ...dynamicExpressions];
  }

  // Case 3: Class count exceeds threshold -> group into multiple string literals
  const grouped = groupClasses(classes, options.modifierThreshold).map(
    buildStringLiteral,
  ) as unknown as T[];

  return dynamicExpressions.length === 0
    ? grouped
    : [...grouped, ...dynamicExpressions];
}
