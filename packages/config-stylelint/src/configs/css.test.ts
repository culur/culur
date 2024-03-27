import { describe } from 'vitest';
import { testConfig, testRuleLintAndFix } from '~/__tests__';
import { configCss } from './css';
import stylelint from 'stylelint';

describe('CSS config', () => {
  testConfig(configCss, config => {
    //
  });
});
