import type tsup from 'tsup';

export type Options = ReturnType<(typeof tsup)['defineConfig']>;
