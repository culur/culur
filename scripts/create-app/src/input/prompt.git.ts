import { confirmOrDefault, inputOrDefault } from '@culur/utils-prompts';
import Joi from 'joi';
import type { CommandInput } from './command';

export const getGit = async (options: CommandInput['options']) => {
  const git = await confirmOrDefault({
    defaultValue: options.git,
    config: {
      message: 'Initial git commits',
    },
  });

  if (git) {
    const emailSchema = Joi.string()
      .label('Git commit author email')
      .email()
      .required();

    const gitName = await inputOrDefault({
      defaultValue: options.gitAuthorName,
      config: {
        message: 'Git commit author name',
      },
    });
    const gitEmail = await inputOrDefault({
      defaultValue: options.gitAuthorEmail,
      config: {
        message: 'Git commit author email',
        validate: value => emailSchema.validate(value).error?.message ?? true,
      },
    });

    const gitConfig = Object.entries({
      'user.name': gitName,
      'user.email': gitEmail,
    }).map(([key, value]) => `${key}=${value}`);

    return { gitConfig };
  }

  return null;
};
