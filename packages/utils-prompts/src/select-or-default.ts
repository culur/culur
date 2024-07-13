import process from 'node:process';
import type { Separator } from '@inquirer/prompts';
import { select } from '@inquirer/prompts';
import type { Context } from '@inquirer/type';
import chalk from 'chalk';
import figures from 'figures';
import { getPrinter } from './utils/print';

type TChoice<TValue extends string> = Parameters<
  typeof select<TValue>
>[0]['choices'] extends readonly (infer T)[]
  ? Exclude<T, Separator>
  : never;

const selectTheme = {
  icon: { cursor: figures.pointer },
  style: { disabled: (text: string) => chalk.dim(`- ${text}`) },
};

export const selectOrDefault = <TValue extends string>({
  config,
  context,
  defaultValue,
  options,
}: {
  config: Parameters<typeof select<TValue>>[0];
  context?: Context;
  defaultValue?: string;
  options?: {
    error?: 'exit' | 'throw' | 'input';
  };
}) => {
  const error = options?.error ?? 'exit';
  const { print } = getPrinter(selectTheme, config.theme);

  if (typeof defaultValue === 'string') {
    const defaultChoice = config.choices.find(
      (choice): choice is TChoice<TValue> =>
        choice.type !== 'separator' &&
        !choice.disabled &&
        choice.value === defaultValue,
    );

    if (defaultChoice) {
      print(
        [config.message, 'message'],
        [defaultChoice.name ?? defaultChoice.value, 'answer'],
      );

      return defaultValue as TValue;
    } else {
      print(
        [config.message, 'message'],
        [`Invalid value: ${defaultValue}`, 'error'],
      );

      switch (error) {
        case 'throw':
          throw new Error(`${config.message}: Invalid value: ${defaultValue}`);
        case 'exit':
          process.exit(1);
      }
    }
  }

  return select(config, context);
};
