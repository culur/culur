import { extname } from 'node:path';
import definePrettierConfig from '@culur/config-prettier/factory';
import type { Options } from 'prettier';
import prettier from 'prettier';

const parserMapper: {
  [key: string]: Options['parser'];
} = {
  '.js': 'babel',
  '.jsc': 'babel',
  '.jsm': 'babel',

  '.ts': 'typescript',
  '.tsc': 'typescript',
  '.tsm': 'typescript',

  '.css': 'css',
  '.scss': 'scss',
  '.less': 'less',

  '.json': 'json',

  '.md': 'markdown',
  '.mdx': 'mdx',

  '.html': 'html',
  '.vue': 'vue',

  '.yaml': 'yaml',
  '.yml': 'yaml',
};

export const formatCode = async (
  file: string,
  source: string,
  options: Options = {},
) => {
  const ext = extname(file);
  const parser = parserMapper[ext];
  if (!parser) return source;

  return prettier.format(source, definePrettierConfig({ ...options, parser }));
};
