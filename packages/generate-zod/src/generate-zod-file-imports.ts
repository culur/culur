import { ts } from '.';

export function generateZodFileImports({
  customImport,
}: {
  customImport?: string;
}) {
  if (customImport) return customImport;

  return ts`import { z } from 'zod';`;
}
