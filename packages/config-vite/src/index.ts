import { defineConfig } from './factory/define-config';

export const vite = defineConfig({ test: false });
export const vitest = defineConfig({ test: true });
export { defineConfig };
