import { selectOrDefault } from '@culur/utils-prompts';
import type { CommandInput } from './command';

export const getTypeFe = async ({
  options,
  type,
}: {
  options: CommandInput['options'];
  type: 'fe';
}) => {
  const framework = await selectOrDefault({
    defaultValue: options.framework,
    config: {
      message: 'Front-end framework',
      choices: [
        { name: 'Vue', value: 'vue' },
        { name: 'React', value: 'react' },
      ],
    },
  });

  switch (framework) {
    case 'vue':
      return getTypeFeVue({ options, type, framework });
    case 'react':
      return getTypeFeReact({ options, type, framework });
  }
};

async function getTypeFeReact({
  options,
  type,
  framework,
}: {
  options: CommandInput['options'];
  type: 'fe';
  framework: 'react';
}) {
  const builder = await selectOrDefault({
    defaultValue: options.builder,
    config: {
      message: 'Builder framework',
      choices: [
        { name: 'Vite', value: 'vite' },
        { name: 'Next.js', value: 'next' },
      ],
    },
  });

  return { type, framework, builder };
}

async function getTypeFeVue({
  options,
  type,
  framework,
}: {
  options: CommandInput['options'];
  type: 'fe';
  framework: 'vue';
}) {
  const builder = await selectOrDefault({
    defaultValue: options.builder,
    config: {
      message: 'Builder framework',
      choices: [
        { name: 'Vite', value: 'vite' },
        { name: 'Nuxt', value: 'nuxt' },
      ],
    },
  });

  return { type, framework, builder };
}
