import path from 'node:path';
import type { CodegenConfig } from '@graphql-codegen/cli';

const graphqlFile = 'src/types/schema.operations.generated.ts';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'node_modules/@octokit/graphql-schema/schema.graphql',
  documents: ['src/batch-query/batch-query.fragments.ts'],
  generates: {
    [graphqlFile]: {
      plugins: ['typescript-operations'],
      overwrite: true,
      config: {
        scalars: {
          DateTime: 'string',
          GitObjectID: 'string',
          URI: 'string',
        },
      },
      hooks: {
        afterOneFileWrite: [
          [
            `pnpm --dir ../.. exec prettier "${path.resolve(__dirname, graphqlFile)}/" --write`,
            '&&',
            `pnpm --dir ../.. exec eslint "${path.resolve(__dirname, graphqlFile)}" --fix`,
            '&&',
            'echo',
          ].join(' '),
        ],
      },
    },
  },
};

export default config;
