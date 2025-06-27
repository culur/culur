import type { TasksTitle } from '@culur/logger';
import type { GenerateZodSchemaProps } from 'ts-to-zod';
import type { CustomJSDocFormatTypes } from 'ts-to-zod/lib/config';
import process from 'node:process';
import Logger from '@culur/logger';
import { generateZodFile } from './generate-zod-file';

export interface GenerateZodOptions {
  title?: TasksTitle<void[]>;
  cwd?: string;
  loggerWidth?: number;
  loggerFileWidth?: number;
  zodImportValue?: GenerateZodSchemaProps['zodImportValue'];
  skipParseJSDoc?: GenerateZodSchemaProps['skipParseJSDoc'];
  getDependencyName?: GenerateZodSchemaProps['getDependencyName'];
  customJSDocFormatTypes?: CustomJSDocFormatTypes;
  postCommands?: (outputFile: string) => string[];
}

export async function generateZod(
  files: {
    [outputFile: string]: {
      customImport?: string;
      inputFiles: { [filename: string]: string[] };
      validateTypes?: string[];
    };
  },
  options: GenerateZodOptions = {},
) {
  const {
    cwd = process.cwd(),
    loggerWidth = process.stdout.columns,
    loggerFileWidth,
    customJSDocFormatTypes = {},
    postCommands,
    ...globalOptions
  } = options;

  const logger = new Logger(
    options.title ?? { text: 'Generate zod', color: 'cyan' },
    { width: loggerWidth },
  );

  for (const outputFile in files) {
    const tasks = logger.root.tasks<string[]>([], {
      title: [
        { text: 'Output:', width: 7 },
        { text: outputFile, width: loggerFileWidth, color: 'green' },
      ],
      immediately: false,
      concurrency: 1,
    });

    generateZodFile(tasks, {
      cwd,
      outputFile,
      customJSDocFormatTypes,
      loggerFileWidth,
      postCommands,
      ...files[outputFile],
      ...globalOptions,
    });
  }

  await logger.root.wait({ isReturnOrThrow: true });
  await logger.unmount();
}
