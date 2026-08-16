import type { ArrayExpression } from 'estree-jsx';
import { assert, describe, expect, it } from 'vitest';
import { parseExpression } from '../__tests__/utils/ast-estree';
import { isNodeWithComments, type NodeWithComments } from './ast-comment';

describe('isNodeWithComments (real ESTree parser output)', () => {
  it('returns false for nodes without comments', () => {
    const node = parseExpression('foo');
    expect(isNodeWithComments(node)).toBe(false);
    expect(isNodeWithComments(null)).toBe(false);
    expect(isNodeWithComments(undefined)).toBe(false);
  });

  it('returns true when Prettier injects node.comments', () => {
    const node: NodeWithComments = parseExpression('foo');
    // Prettier internally maps leading/trailing comments into node.comments during print
    node.comments = [{ type: 'Line', value: ' test' }];
    expect(isNodeWithComments(node)).toBe(true);
  });

  it('detects leading comments from raw Babel ESTree', () => {
    // We use an array so Babel attaches the comment to the inner element
    const arrayNode = parseExpression<ArrayExpression>('[ /* lead */ foo ]');
    const fooNode = arrayNode.elements[0]!;

    assert(isNodeWithComments(fooNode));
    expect(fooNode.leadingComments?.length).toBeGreaterThan(0);
  });

  it('detects trailing comments from raw Babel ESTree', () => {
    const arrayNode = parseExpression<ArrayExpression>('[ foo /* trail */ ]');
    const fooNode = arrayNode.elements[0]!;

    assert(isNodeWithComments(fooNode));
    expect(fooNode.trailingComments?.length).toBeGreaterThan(0);
  });

  it('returns false when comment arrays are explicitly empty', () => {
    const node: NodeWithComments = parseExpression('foo');
    node.comments = [];
    node.leadingComments = [];
    node.trailingComments = [];
    expect(isNodeWithComments(node)).toBe(false);
  });
});
