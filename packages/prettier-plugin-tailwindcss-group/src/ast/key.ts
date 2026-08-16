export const isClassNameKey = (
  keyName: string,
): keyName is `${string}ClassName` | `${string}className` =>
  keyName.endsWith('ClassName') || keyName.endsWith('className');
