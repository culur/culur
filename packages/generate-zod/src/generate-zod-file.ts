import type { Task, Tasks } from '@culur/logger';
import type { AsyncResultIteratorPromise } from 'async';
import type { GenerateZodSchemaProps } from 'ts-to-zod';
import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { mapLimit } from 'async';
import typescript from 'typescript';
import { generateZodDeclarationName } from './generate-zod-declaration-name';
import { generateZodFileImports } from './generate-zod-file-imports';
import { generateZodIsValidAgainstSchema } from './generate-zod-is-valid-against-schema';

const execAsync = promisify(exec);

export async function generateZodFile(
  tasks: Tasks<string[]>,
  options: {
    cwd: string;
    customImport?: string;
    inputFiles: { [filename: string]: string[] };
    outputFile: string;
    validateTypes?: string[];
    postCommands?: (outputFile: string) => string[];
  } & Pick<
    GenerateZodSchemaProps,
    | 'zodImportValue'
    | 'skipParseJSDoc'
    | 'getDependencyName'
    | 'customJSDocFormatTypes'
  >,
) {
  const {
    cwd,
    customImport,
    inputFiles,
    outputFile,
    validateTypes = [],
    postCommands = outputFile => [`prettier "${outputFile}" --write`],
    ...props
  } = options;
  const absoluteOutputFile = resolve(cwd, outputFile);

  let content = '';
  content += generateZodFileImports({ customImport });

  const inputTasks: Task<string>[] = [];
  for (const inputFile in inputFiles) {
    const inputTask = tasks.task(
      async () => {
        const absoluteInputFile = resolve(cwd, inputFile);
        const sourceText = await fs.readFile(absoluteInputFile, {
          encoding: 'utf-8',
        });
        const sourceFile = typescript.createSourceFile(
          inputFile,
          sourceText,
          typescript.ScriptTarget.Latest,
        );

        let fileContent = '';
        for (const declarationName of inputFiles[inputFile]) {
          fileContent += '\n\n';
          fileContent += await generateZodDeclarationName({
            sourceFile,
            declarationName,
            ...props,
          });

          if (validateTypes.includes(declarationName)) {
            fileContent += '\n\n';
            fileContent += generateZodIsValidAgainstSchema(declarationName);
          }
        }

        return fileContent;
      },
      {
        title: [
          { text: 'Input:', width: 'no-wrap' },
          { text: inputFile, color: 'green' },
          { text: `${inputFiles[inputFile].join('\n')}`, color: 'cyan' },
        ],
        immediately: false,
      },
    );
    inputTasks.push(inputTask);
  }

  tasks.task(
    async () => {
      const fileContents = await mapLimit<Task<string>, string>(
        inputTasks,
        2,
        (async task => {
          return task.wait({ isReturnOrThrow: true });
        }) satisfies AsyncResultIteratorPromise<Task<string>, string>,
      );

      content += fileContents.join('\n\n');

      return fs.writeFile(absoluteOutputFile, content);
    },
    {
      title: [
        { text: 'Write:', width: 'no-wrap' },
        { text: outputFile, color: 'green' },
      ],
      immediately: false,
    },
  );

  const commands = postCommands(absoluteOutputFile);
  for (const command of commands) {
    tasks.task(() => execAsync(command), {
      title: [
        { text: 'Run:', width: 'no-wrap' },
        { text: command.replace(absoluteOutputFile, '[file]'), color: 'blue' },
      ],
      immediately: false,
    });
  }

  return null;
}
