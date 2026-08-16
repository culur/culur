import type { Node } from 'estree-jsx';
import { describe, expect, it, vi } from 'vitest';
import { estree } from './ast';
import { resolveOptions } from './options';
import { walkAst } from './printers.walk-ast';

describe('walkAst unit tests', () => {
  const options = resolveOptions({});

  it('returns early when input is not a valid AST Node', () => {
    expect(() => walkAst(null as unknown as Node, options)).not.toThrow();
    expect(() => walkAst(undefined as unknown as Node, options)).not.toThrow();
    expect(() => walkAst(123 as unknown as Node, options)).not.toThrow();
    expect(() =>
      walkAst('not-a-node' as unknown as Node, options),
    ).not.toThrow();
    expect(() => walkAst({} as unknown as Node, options)).not.toThrow();
  });

  it('handles array child properties containing non-node items', () => {
    const mockNode: any = {
      type: 'Program',
      body: [null, undefined, 123, 'string-item', { type: 'EmptyStatement' }],
    };

    expect(() => walkAst(mockNode, options)).not.toThrow();
  });

  it('handles non-array child properties that are nodes', () => {
    const mockNode: any = {
      type: 'ExpressionStatement',
      expression: {
        type: 'Identifier',
        name: 'foo',
      },
    };

    expect(() => walkAst(mockNode, options)).not.toThrow();
  });

  it('handles truthy non-array child properties that are not nodes', () => {
    const originalGetVisitorKeys = estree.getVisitorKeys;
    vi.spyOn(estree, 'getVisitorKeys').mockReturnValue(['someProp'] as any);

    try {
      const mockNode: any = {
        type: 'CustomNode',
        someProp: 'truthy-non-node-primitive',
      };

      expect(() => walkAst(mockNode, options)).not.toThrow();
    } finally {
      if (originalGetVisitorKeys) {
        estree.getVisitorKeys = originalGetVisitorKeys;
      }
    }
  });
});
