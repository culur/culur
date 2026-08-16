import { describe, expect, it } from 'vitest';
import { isClassNameKey } from './key';

describe('isClassNameKeyName', () => {
  it('matches exact className, suffix ClassName, and suffix className', () => {
    expect(isClassNameKey('className')).toBe(true);
    expect(isClassNameKey('wrapperClassName')).toBe(true);
    expect(isClassNameKey('wrapperclassName')).toBe(true);
    expect(isClassNameKey('containerClassName')).toBe(true);
    expect(isClassNameKey('$prefixClassName')).toBe(true);
    expect(isClassNameKey('_privateClassName')).toBe(true);
  });

  it('rejects names that do not match', () => {
    expect(isClassNameKey('classname')).toBe(false);
    expect(isClassNameKey('CLASSNAME')).toBe(false);
    expect(isClassNameKey('id')).toBe(false);
    expect(isClassNameKey('style')).toBe(false);
    expect(isClassNameKey('')).toBe(false);
  });
});
