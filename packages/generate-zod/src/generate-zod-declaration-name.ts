import type { GenerateZodSchemaProps } from 'ts-to-zod';
import { camelCase } from 'es-toolkit';
import { generateZodSchemaVariableStatement } from 'ts-to-zod';
import ts from 'typescript';
import { findNode } from './find-node';

export async function generateZodDeclarationName({
  declarationName,
  declarationOutputName,
  ...props
}: {
  declarationName: string;
  declarationOutputName: string;
} & Pick<
  GenerateZodSchemaProps,
  | 'zodImportValue'
  | 'sourceFile' //
  | 'getDependencyName'
  | 'skipParseJSDoc'
  | 'customJSDocFormatTypes'
>) {
  const node = findNode(props.sourceFile, declarationName);
  const varName = `${camelCase(declarationOutputName)}Schema`;

  const results = generateZodSchemaVariableStatement(
    { varName, node, ...props }, //
  );

  return ts
    .createPrinter({ newLine: ts.NewLineKind.LineFeed }) //
    .printNode(ts.EmitHint.Unspecified, results.statement, props.sourceFile);
}
