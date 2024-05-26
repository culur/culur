import { describe, expect, it } from 'vitest';
import * as index from '.';

describe('index', () => {
  it('index', () => {
    expect(index).toBeTypeOf('object');
  });
});
