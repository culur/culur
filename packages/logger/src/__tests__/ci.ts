import process from 'node:process';

export function isCI() {
  return process.env.CI === 'true';
}
