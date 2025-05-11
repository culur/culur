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
  options: {
    zodImportValue?: GenerateZodSchemaProps['zodImportValue'];
    skipParseJSDoc?: GenerateZodSchemaProps['skipParseJSDoc'];
    getDependencyName?: GenerateZodSchemaProps['getDependencyName'];
    customJSDocFormatTypes?: CustomJSDocFormatTypes;
    importIsValid?: string;
    postCommands?: (outputFile: string) => string[];
  } = {},
) {
  const {
    customJSDocFormatTypes = {},
    postCommands = outputFile => [
      `eslint "${outputFile}" --fix`,
      `prettier "${outputFile}" --write`,
    ],
    ...globalOptions
  } = options;

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
