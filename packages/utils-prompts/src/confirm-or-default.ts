import { confirm } from '@inquirer/prompts';
import type { Context } from '@inquirer/type';
import { getPrinter } from './utils/print';

export const confirmOrDefault = ({
  config,
  context,
  defaultValue,
}: {
  config: Parameters<typeof confirm>[0];
  context?: Context;
  defaultValue?: boolean;
}) => {
  const { print } = getPrinter(config.theme);
  const transformer =
    config.transformer ?? ((value: boolean) => (value ? 'yes' : 'no'));

  if (typeof defaultValue === 'boolean') {
    print(
      [config.message, 'message'], //
      [transformer(defaultValue), 'answer'],
    );

    return defaultValue;
  }

  return confirm(config, context);
};
