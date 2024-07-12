import process from 'node:process';
import { config } from 'dotenv';

config();

export default {
  projects: {
    github: {
      schema:
        'packages/changesets-github-info/node_modules/@octokit/graphql-schema/schema.graphql',
      documents: [
        'packages/changesets-github-info/src/**/*.{graphql,js,ts,jsx,tsx}',
      ],
      extensions: {
        endpoints: {
          default: {
            url: 'https://api.github.com/graphql',
            headers: {
              authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
          },
        },
      },
    },
  },
};
