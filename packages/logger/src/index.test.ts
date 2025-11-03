import { describe, expect, it } from 'vitest';
import LoggerIndex from '.';
import { Logger } from './logger/logger';

describe('index', () => {
  it('index', () => {
    expect(LoggerIndex).toStrictEqual(Logger);
  });
});
