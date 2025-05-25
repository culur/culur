import path from 'node:path';
import { render } from 'ink-testing-library';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { fs } from 'zx';
import { generateZod, ts } from '..';

const cwd = path.resolve(import.meta.dirname, 'samples');

describe('generate zod', async () => {
  beforeAll(() => {
    vi.mock('ink', async () => {
      const ink: typeof import('ink') = await vi.importActual('ink');
      return { ...ink, render };
    });
  });

  it('generate product', async () => {
    await generateZod(
      {
        'product-enum.zod.ts': {
          inputFiles: {
            'product-enum.ts': ['Status', 'PermissionLevel'],
          },
          customImport: ts`
            import { z } from 'zod';
            import { PermissionLevel, Status } from './product-enum';
          `,
        },
        'product.zod.ts': {
          customImport: ts`
            import type { DetailedProduct } from './product';
            import { z } from 'zod';
            import { isValidAgainstSchema } from '~/is-valid-against-schema';
            import {
              permissionLevelSchema,
              statusSchema,
            } from './product-enum.zod';
          `,
          inputFiles: {
            'product.ts': [
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
      { cwd },
    );

    await expect(
      await fs.readFile(path.resolve(cwd, 'product-enum.zod.ts'), 'utf-8'),
    ).toMatchFileSnapshot(path.resolve(cwd, 'product-enum.zod.ts.snapshot.ts'));

    await expect(
      await fs.readFile(path.resolve(cwd, 'product.zod.ts'), 'utf-8'),
    ).toMatchFileSnapshot(path.resolve(cwd, 'product.zod.ts.snapshot.ts'));
  });

  it('generate', async () => {
    await generateZod(
      {
        'user.zod.ts': {
          inputFiles: {
            'user.ts': ['Address', 'Contact', 'User'],
          },
        },
      },
      { cwd },
    );

    await expect(
      await fs.readFile(path.resolve(cwd, 'user.zod.ts'), 'utf-8'),
    ).toMatchFileSnapshot(path.resolve(cwd, 'user.zod.ts.snapshot.ts'));
  });

  it('generate failed', async () => {
    const generatedZod = generateZod(
      {
        'user.zod.ts': {
          inputFiles: {
            'user.zod.ts.snapshot.ts': ['Unknown'],
          },
        },
      },
      { cwd },
    );

    await expect(generatedZod).rejects.toThrowError(
      /^Can't find declaration \[Unknown\] in \[.+\]$/,
    );
  });
});
