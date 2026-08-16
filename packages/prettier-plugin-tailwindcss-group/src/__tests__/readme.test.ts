import path from 'node:path';
import { describe } from 'vitest';
import { extractTestCasesFromMarkdown } from './utils/ast-md';
import { testFormat } from './utils/test-format';

describe('readme.md test cases', () => {
  const readmePath = path.resolve(__dirname, '../../README.md');
  const testCases = extractTestCasesFromMarkdown(readmePath);

  for (const testCase of testCases) {
    testFormat(testCase.id, testCase.options, testCase.input, testCase.expected);
  }
});
