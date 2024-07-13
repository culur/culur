import { input } from '@inquirer/prompts';
import type { Context } from '@inquirer/type';
import { getPrinter } from './utils/print';

export const inputOrDefault = ({
  config,
  context,
  defaultValue,
}: {
  config: Parameters<typeof input>[0];
  context?: Context;
  defaultValue?: string;
}) => {
  const { print } = getPrinter(config.theme);

  if (typeof defaultValue === 'string') {
    print(
      [config.message, 'message'], //
      [defaultValue, 'answer'],
    );

    return defaultValue;
  }

  return input(config, context);
};
