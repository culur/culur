import type { Config } from 'stylelint';

export const configShared = (): Config => ({
  extends: ['stylelint-config-html'],
});
