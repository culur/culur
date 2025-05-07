import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { fs } from 'zx';
import { generateZod, ts } from '..';

const sampleFolder = 'src/__tests__/samples';

const outputProductEnum = path.resolve(sampleFolder, 'product-enum.zod.ts');
const inputProductEnum = path.resolve(sampleFolder, 'product-enum.ts');

const outputProduct = path.resolve(sampleFolder, 'product.zod.ts');
const inputProduct = path.resolve(sampleFolder, 'product.ts');

const outputUser = path.resolve(sampleFolder, 'user.zod.ts');
const inputUser = path.resolve(sampleFolder, 'user.ts');

describe('generate zod', async () => {
  it('generate product', async () => {
    const outputProductEnumFile = //
      await fs.readFile(outputProductEnum, { encoding: 'utf-8' });
    const outputProductFile = //
      await fs.readFile(outputProduct, { encoding: 'utf-8' });

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
        importIsValid: ts`
          import { isValidBySchema } from '~/is-valid-by-schema';
        `,
      },
    );

    await expect(outputProductEnumFile) //
      .toMatchFileSnapshot('./samples/product-enum.zod.ts.snapshot.ts');
    await expect(outputProductFile) //
      .toMatchFileSnapshot('./samples/product.zod.ts.snapshot.ts');
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

    const outputUserFile = //
      await fs.readFile(outputUser, { encoding: 'utf-8' });

    await expect(outputUserFile) //
      .toMatchFileSnapshot('./samples/user.zod.ts.snapshot.ts');
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
