import { selectOrDefault } from '@culur/utils-prompts';
import { CommandInput } from './command';
import { getTypeFe } from './prompt.type.fe';
import { getTypeLib } from './prompt.type.lib';

export const getType = async (options: CommandInput['options']) => {
  const type = await selectOrDefault({
    defaultValue: options.type,
    config: {
      message: 'Project type',
      choices: [
        { name: 'Library', value: 'lib' },
        { name: 'Front-end', value: 'fe' },
      ],
    },
  });

  switch (type) {
    case 'fe':
      return await getTypeFe({ options, type });
    case 'lib':
      return await getTypeLib({ type });
  }
};
