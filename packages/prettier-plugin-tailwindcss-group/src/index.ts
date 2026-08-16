import type { Plugin } from 'prettier';
import { options } from './options';
import { printers } from './printers';

export { options } from './options';
export { printers } from './printers';

const plugin: Plugin = {
  options,
  printers,
};

export default plugin;
