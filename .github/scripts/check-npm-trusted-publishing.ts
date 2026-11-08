// Check that every public package can get an npm token through trusted publishing (OIDC),
// without publishing anything. Must run inside the workflow registered as trusted publisher
// (`build-and-release.yml`) with `permissions: id-token: write`.
//
// It uses the same token exchange as the npm CLI does before `npm publish`, so a missing,
// expired or mismatched trusted publisher configuration fails here instead of at release time.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const registry = 'https://registry.npmjs.org';
const { ACTIONS_ID_TOKEN_REQUEST_URL, ACTIONS_ID_TOKEN_REQUEST_TOKEN } =
  process.env;

if (!ACTIONS_ID_TOKEN_REQUEST_URL || !ACTIONS_ID_TOKEN_REQUEST_TOKEN) {
  console.error(
    'No GitHub OIDC token available. Run this in GitHub Actions with `permissions: id-token: write`.',
  );
  process.exit(1);
}

interface PackageJson {
  name: string;
  private?: boolean;
}

type ExchangeResult = { ok: true } | { ok: false; detail: string };

async function getPublicPackages(): Promise<string[]> {
  const names: string[] = [];
  for (const dir of await readdir('packages')) {
    const file = path.join('packages', dir, 'package.json');
    const json = await readFile(file, 'utf8').catch(() => null);
    if (!json) continue;
    const { name, private: isPrivate } = JSON.parse(json) as PackageJson;
    if (!isPrivate) names.push(name);
  }
  return names.sort();
}

async function getIdToken(requestUrl: string, requestToken: string) {
  const url = new URL(requestUrl);
  url.searchParams.set('audience', `npm:${new URL(registry).hostname}`);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${requestToken}` },
  });
  if (!response.ok) {
    throw new Error(`Cannot get GitHub OIDC token: HTTP ${response.status}`);
  }
  const { value } = (await response.json()) as { value: string };
  return value;
}

async function exchange(
  idToken: string,
  name: string,
): Promise<ExchangeResult> {
  // Same escaping as `npm-package-arg`: `@scope/name` -> `@scope%2fname`
  const escapedName = name.replace('/', '%2f');
  const response = await fetch(
    `${registry}/-/npm/v1/oidc/token/exchange/package/${escapedName}`,
    { method: 'POST', headers: { Authorization: `Bearer ${idToken}` } },
  );
  if (response.ok) return { ok: true };
  const body = await response.text().catch(() => '');
  return { ok: false, detail: `HTTP ${response.status} ${body.slice(0, 200)}` };
}

const packages = await getPublicPackages();
const idToken = await getIdToken(
  ACTIONS_ID_TOKEN_REQUEST_URL,
  ACTIONS_ID_TOKEN_REQUEST_TOKEN,
);
const failures: string[] = [];

for (const name of packages) {
  const result = await exchange(idToken, name);
  console.log(
    `${result.ok ? '✔' : '✖'} ${name}${result.ok ? '' : `: ${result.detail}`}`,
  );
  if (!result.ok) failures.push(name);
}

if (failures.length > 0) {
  console.error(
    [
      '',
      `Trusted publishing is not usable for ${failures.length} package(s): ${failures.join(', ')}`,
      'Check the "Trusted Publisher" section of each package on npmjs.com (repository culur/culur,',
      'workflow build-and-release.yml). A brand-new package must be published manually once first.',
    ].join('\n'),
  );
  process.exit(1);
}

console.log(
  `\nTrusted publishing works for all ${packages.length} public packages.`,
);
