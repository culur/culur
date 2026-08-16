import type { Node } from 'estree-jsx';
import type { ParserOptions } from 'prettier';
import dedent from 'dedent';
import { afterEach, beforeEach, describe } from 'vitest';
import { testFormat } from './__tests__/utils/test-format';
import { estree } from './ast';

describe('printers preprocess handling: async Promise AST preprocess', () => {
  let originalPreprocess:
    | undefined
    | ((ast: Node, _options: ParserOptions<Node>) => Node | Promise<Node>);

  beforeEach(() => {
    originalPreprocess = estree.preprocess;
    estree.preprocess = (ast, _options) => Promise.resolve(ast);
  });

  afterEach(() => {
    estree.preprocess = originalPreprocess;
  });

  testFormat(
    'correctly handles async Promise returned by estree.preprocess',
    { classNameThreshold: 2 },
    dedent /* tsx */ `
      <div className="flex items-center text-sm font-bold" />;
    `,
    dedent /* tsx */ `
      <div className={cn('flex items-center', 'text-sm font-bold')} />;
    `,
  );
});

describe('printers preprocess handling: fallback when estree.preprocess is undefined (sync path)', () => {
  let originalPreprocess:
    | undefined
    | ((ast: Node, _options: ParserOptions<Node>) => Node | Promise<Node>);

  beforeEach(() => {
    originalPreprocess = estree.preprocess;
    estree.preprocess = undefined;
  });

  afterEach(() => {
    estree.preprocess = originalPreprocess;
  });

  testFormat(
    'uses ast directly if estree.preprocess is undefined',
    { classNameThreshold: 2 },
    dedent /* tsx */ `
      <div className="flex items-center text-sm font-bold" />;
    `,
    dedent /* tsx */ `
      <div className={cn('flex items-center', 'text-sm font-bold')} />;
    `,
  );
});
