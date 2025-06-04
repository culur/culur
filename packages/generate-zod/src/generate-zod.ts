import type { IRootObject } from '@culur/logger';
import type { GenerateZodSchemaProps } from 'ts-to-zod';
import type { CustomJSDocFormatTypes } from 'ts-to-zod/lib/config';
import process from 'node:process';
import Logger from '@culur/logger';
import { generateZodFile } from './generate-zod-file';

export async function generateZod(
  files: {
    [outputFile: string]: {
      customImport?: string;
      inputFiles: { [filename: string]: string[] };
      validateTypes?: string[];
    };
  },
  options: {
    cwd?: string;
    loggerProps?: IRootObject['props'];
    zodImportValue?: GenerateZodSchemaProps['zodImportValue'];
    skipParseJSDoc?: GenerateZodSchemaProps['skipParseJSDoc'];
    getDependencyName?: GenerateZodSchemaProps['getDependencyName'];
    customJSDocFormatTypes?: CustomJSDocFormatTypes;
    postCommands?: (outputFile: string) => string[];
  } = {},
) {
  const {
    cwd = process.cwd(),
    loggerProps = { width: process.stdout.columns },
    customJSDocFormatTypes = {},
    postCommands,
    ...globalOptions
  } = options;

  const logger = new Logger(
    { text: 'Generate zod', color: 'cyan' },
    loggerProps,
  );

  for (const outputFile in files) {
    const tasks = logger.root.tasks<string[]>([], {
      title: [
        { text: 'Output:', width: 'no-wrap' },
        { text: outputFile, color: 'green' },
      ],
      immediately: false,
      concurrency: 1,
    });

    generateZodFile(tasks, {
      cwd,
      outputFile,
      customJSDocFormatTypes,
      postCommands,
      ...files[outputFile],
      ...globalOptions,
    });
  }

  await logger.root.wait({ isReturnOrThrow: true });
  await logger.unmount();
}
