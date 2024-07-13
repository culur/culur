import { existsSync } from 'node:fs';
import { emptyDir, ensureDir } from 'fs-extra';
import type { Input } from '~/input/input';

export const initialFolder = async ({ input }: { input: Input }) => {
  if (!existsSync(input.dir.projectDir)) await ensureDir(input.dir.projectDir);
  if (input.prompt.override === 'remove') await emptyDir(input.dir.projectDir);
};
