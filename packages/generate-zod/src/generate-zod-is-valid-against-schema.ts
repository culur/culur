import { camelCase } from 'es-toolkit';

export function generateZodIsValidAgainstSchema(declarationName: string) {
  const schemaName = `${camelCase(declarationName)}Schema`;

  return `export const is${declarationName} = isValidAgainstSchema<${declarationName}>(${schemaName});`;
}
