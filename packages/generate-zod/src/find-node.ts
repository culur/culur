import type { GenerateZodSchemaProps } from 'ts-to-zod';
import ts from 'typescript';

export function findNode(
  sourceFile: ts.SourceFile,
  name: string,
): GenerateZodSchemaProps['node'] {
  let declaration:
    | ts.InterfaceDeclaration
    | ts.TypeAliasDeclaration
    | ts.EnumDeclaration
    | undefined;

  ts.forEachChild(sourceFile, (node: ts.Node) => {
    if (declaration) return;
    if (
      (ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node)) &&
      node.name.text === name
    ) {
      declaration = node;
    }
  });

  if (!declaration) {
    throw new Error(
      `Can't find declaration [${name}] in [${sourceFile.fileName}]`,
    );
  }

  return declaration;
}
