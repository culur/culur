import { getDefaultConfig } from 'tailwind-merge-ts';
import { createConfigUtils } from 'tailwind-merge-ts/lib/config-utils';

console.log('=== THỬ NGHIỆM IMPORT THÔNG QUA ALIAS tailwind-merge-ts ===');

const config = getDefaultConfig();
const configUtils = createConfigUtils(config);

const testClasses = [
  'block',
  'md:inline-flex',
  'w-full',
  'w-[200px]',
  'text-red-500',
  'hover:bg-slate-100',
];

const results = testClasses.map(cls => {
  const parsed = configUtils.parseClassName(cls);
  const classGroupId = configUtils.getClassGroupId(parsed.baseClassName);
  return {
    raw: cls,
    baseClassName: parsed.baseClassName,
    modifiers: parsed.modifiers,
    classGroupId: classGroupId ?? 'unknown',
  };
});

console.table(results);
