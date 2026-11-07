---
'@culur/changesets-changelog-github': major
'@culur/changesets-generate-dependencies-changesets': patch
'@culur/changesets-github-info': patch
---

Upgrade to Changesets v3 and GraphQL 17.

- `@culur/changesets-changelog-github`: require Node.js `>=22.11` (`@changesets/types` v7 is ESM-only), validate the `repo` option as `owner/repo`, and skip dependencies without a `newVersion`.
- `@culur/changesets-generate-dependencies-changesets`: replace deprecated `@octokit/webhooks-types` with `@octokit/openapi-webhooks-types`.
- `@culur/changesets-github-info`: regenerate operation types with `@graphql-codegen/cli` v8 and `graphql` v17.
