import { camelCase } from 'es-toolkit';

export function generateZodIsValidAgainstSchema(
  declarationName: string,
  declarationOutputName: string,
) {
  const schemaName = `${camelCase(declarationOutputName)}Schema`;

  return `export const is${declarationOutputName} = isValidAgainstSchema<${declarationName}>(${schemaName});`;
}
