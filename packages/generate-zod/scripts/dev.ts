import { generateZod, ts } from '~/index';

await generateZod(
  {
    './generated/product.zod.ts': {
      inputFiles: {
        './generated/product.ts': [['Status', 'StatusRaw'], 'PermissionLevel'],
      },
      validateTypes: ['Status'],
      customImport: ts`
        import { z } from 'zod';
        import {
          PermissionLevel,
          Status,
        } from '~/__tests__/samples/product-enum';
        import { isValidAgainstSchema } from '~/is-valid-against-schema';
      `,
    },
  },
  {
    cwd: import.meta.dirname,
    postCommands: outputFile => [`prettier "${outputFile}" --write`],
    loggerWidth: 80,
  },
);
