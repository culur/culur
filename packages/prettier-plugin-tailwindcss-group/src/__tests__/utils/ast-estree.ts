import type { Expression, ExpressionStatement, Node, Program } from 'estree-jsx';
import { parse } from '@babel/parser';

/**
 * Parses source code into a standard ESTree Program AST node using @babel/parser with estree plugin.
 */
export function parseEstree(code: string): Program {
  const file = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'estree'],
  });
  return file.program as unknown as Program;
}

/**
 * Parses a single JS/TS/JSX expression into an ESTree AST node.
 */
export function parseExpression<T extends Node = Expression>(code: string): T {
  const program = parseEstree(`(${code})`);
  const stmt = program.body[0] as ExpressionStatement;
  return stmt.expression as T;
}
