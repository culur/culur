import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { fs } from 'zx';
import { generateZod, ts } from '..';

const sampleFolder = path.resolve(import.meta.dirname, 'samples');

const outputProductEnumSnapshot = path.resolve(
  sampleFolder,
  'product-enum.zod.ts.snapshot.ts',
);
const outputProductEnum = path.resolve(sampleFolder, 'product-enum.zod.ts');
const inputProductEnum = path.resolve(sampleFolder, 'product-enum.ts');

const outputProductSnapshot = path.resolve(
  sampleFolder,
  'product.zod.ts.snapshot.ts',
);
const outputProduct = path.resolve(sampleFolder, 'product.zod.ts');
const inputProduct = path.resolve(sampleFolder, 'product.ts');

const outputUserSnapshot = path.resolve(
  sampleFolder,
  'user.zod.ts.snapshot.ts',
);
const outputUser = path.resolve(sampleFolder, 'user.zod.ts');
const inputUser = path.resolve(sampleFolder, 'user.ts');

describe('generate zod', async () => {
  it('generate product', async () => {
    await generateZod(
      {
        [outputProductEnum]: {
          inputFiles: {
            [inputProductEnum]: ['Status', 'PermissionLevel'],
          },
          importLines: ts`
            import { PermissionLevel, Status } from './product-enum';
          `,
        },
        [outputProduct]: {
          importLines: ts`
            import type { DetailedProduct } from './product';
            import {
              permissionLevelSchema,
              statusSchema,
            } from './product-enum.zod';
          `,
          inputFiles: {
            [inputProduct]: [
              'PaymentMethod',
              'BasicProduct',
              'DetailedProduct',
              'OptionalBasicProduct',
              'RequiredDetailedProduct',
            ],
          },
          validateTypes: ['DetailedProduct'],
        },
      },
      {
        importIsValidAgainstSchema: ts`
          import { isValidAgainstSchema } from '~/is-valid-against-schema';
        `,
      },
    );

    await expect(await fs.readFile(outputProductEnum, { encoding: 'utf-8' })) //
      .toMatchFileSnapshot(outputProductEnumSnapshot);

    await expect(await fs.readFile(outputProduct, { encoding: 'utf-8' })) //
      .toMatchFileSnapshot(outputProductSnapshot);
  });

  it('generate', async () => {
    await generateZod(
      {
        [outputUser]: {
          inputFiles: {
            [inputUser]: ['Address', 'Contact', 'User'],
          },
        },
      },
      {
        postCommands: outputFile => [`prettier "${outputFile}" --write`],
      },
    );

    await expect(await fs.readFile(outputUser, { encoding: 'utf-8' })) //
      .toMatchFileSnapshot(outputUserSnapshot);
  });

  it('generate failed', async () => {
    const generatedZod = generateZod({
      [outputUser]: {
        inputFiles: {
          [inputUser]: ['Unknown'],
        },
      },
    });

    await expect(generatedZod).rejects.toThrowError(
      /^Can't find declaration \[Unknown\] in \[.+\]$/,
    );
  });
});
