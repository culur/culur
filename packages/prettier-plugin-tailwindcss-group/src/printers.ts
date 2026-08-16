import type { Node } from 'estree-jsx';
import type { Plugin } from 'prettier';
import estreePlugin from 'prettier/plugins/estree.js';
import { estree } from './ast';
import { resolveOptions } from './options';
import { walkAst } from './printers.walk-ast';

export const printers: Plugin<Node>['printers'] = {
  estree: {
    ...estreePlugin.printers.estree,
    preprocess(ast, options) {
      const pluginOptions = resolveOptions(options);

      const processedAST = estree.preprocess
        ? estree.preprocess(ast, options)
        : ast;

      if (processedAST instanceof Promise) {
        return processedAST.then(resolvedAst => {
          walkAst(resolvedAst, pluginOptions);
          return resolvedAst;
        });
      }

      walkAst(processedAST, pluginOptions);
      return processedAST;
    },
  },
};
