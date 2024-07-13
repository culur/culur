import { pick } from 'lodash-es';

export const sortObject = (object?: Partial<Record<string, string>>) => {
  if (!object) return undefined;

  return pick(object, Object.keys(object).sort());
};
