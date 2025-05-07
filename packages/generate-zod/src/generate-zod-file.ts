import type { GenerateZodSchemaProps } from 'ts-to-zod';
import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import { promisify } from 'node:util';
import typescript from 'typescript';
import { ts } from '.';
import { generateZodDeclarationName } from './generate-zod-declaration-name';
import { generateZodIsValidBySchema } from './generate-zod-is-valid-by-schema';

const execAsync = promisify(exec);

export async function generateZodFile({
  importLines,
  importIsValid = ts`import { isValidBySchema } from '@culur/generate-zod';`,
  inputFiles,
  outputFile,
  validateTypes = [],
  postCommands,
  ...props
}: {
  importLines?: string;
  importIsValid?: string;
  inputFiles: { [filename: string]: string[] };
  outputFile: string;
  validateTypes?: string[];
  postCommands: (outputFile: string) => string[];
} & Pick<
  GenerateZodSchemaProps,
  | 'zodImportValue'
  | 'getDependencyName'
  | 'skipParseJSDoc'
  | 'customJSDocFormatTypes'
>) {
  let content =
    validateTypes.length > 0
      ? ts`
          ${importIsValid};
          import { z } from 'zod';
        `
      : ts`import { z } from 'zod';`;

  if (importLines) {
    content += `\n${importLines}`;
  }

  content += '\n\n';

  for (const filename in inputFiles) {
    const sourceText = await fs.readFile(filename, { encoding: 'utf-8' });
    const sourceFile = typescript.createSourceFile(
      filename,
      sourceText,
      typescript.ScriptTarget.Latest,
    );

    for (const declarationName of inputFiles[filename]) {
      content += await generateZodDeclarationName({
        sourceFile,
        declarationName,
        ...props,
      });

      if (validateTypes.includes(declarationName)) {
        content += '\n\n';
        content += generateZodIsValidBySchema(declarationName);
      }
      content += '\n\n';
    }
  }

  await fs.writeFile(outputFile, content);

  const commands = postCommands(outputFile);
  for (const command of commands) {
    try {
      await execAsync(command);
      /* v8 ignore next 3 */
    } catch (e) {
      console.error(e);
    }
  }

  return content;
}
