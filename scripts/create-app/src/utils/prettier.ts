import { definePrettierConfig } from '@culur/config-prettier/dist/factory';
import { extname } from 'path';
import prettier, { Options } from 'prettier';

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
