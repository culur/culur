import type { GenerateZodSchemaProps } from 'ts-to-zod';
import type { CustomJSDocFormatTypes } from 'ts-to-zod/lib/config';
import { generateZodFile } from './generate-zod-file';

export async function generateZod(
  files: {
    [outputFile: string]: {
      importLines?: string;
      inputFiles: { [filename: string]: string[] };
      validateTypes?: string[];
    };
  },
  {
    customJSDocFormatTypes = {},
    postCommands = outputFile => [
      `eslint "${outputFile}" --fix`,
      `prettier "${outputFile}" --write`,
    ],
    ...globalOptions
  }: Pick<
    GenerateZodSchemaProps,
    'zodImportValue' | 'getDependencyName' | 'skipParseJSDoc'
  > & {
    importIsValid?: string;
    customJSDocFormatTypes?: CustomJSDocFormatTypes;
    postCommands?: (outputFile: string) => string[];
  } = {},
) {
  const promises = Object.entries(files) //
    .map(([outputFile, options]) =>
      generateZodFile({
        outputFile,
        customJSDocFormatTypes,
        postCommands,
        ...options,
        ...globalOptions,
      }),
    );

  await Promise.all(promises);
}
