import { describe, expect } from 'vitest';
import LoggerIndex from '.';
import { Logger } from './logger/logger';

describe('index', () => {
  expect(LoggerIndex).toStrictEqual(Logger);
});
