import { extname } from 'node:path';
import prettier from 'prettier';
import type { Options } from 'prettier';
import definePrettierConfig from './factory';

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
  filename: string,
  source: string,
  options: Options = {},
) => {
  const ext = extname(filename);
  const parser = parserMapper[ext];
  if (!parser) return source;

  return prettier.format(source, definePrettierConfig({ ...options, parser }));
};
