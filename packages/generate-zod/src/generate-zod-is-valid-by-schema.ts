import { camelCase } from 'es-toolkit';

export function generateZodIsValidBySchema(declarationName: string) {
  const schemaName = `${camelCase(declarationName)}Schema`;

  return `export const is${declarationName} = isValidBySchema<${declarationName}>(${schemaName});`;
}
