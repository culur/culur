import { CommandInput, getCommandInput } from './command';
import { DirectoryInput, getDirectoryInput } from './directory';
import { PromptInput, getPromptInput } from './prompt';

export class Input {
  private constructor(
    public readonly command: CommandInput,
    public readonly dir: DirectoryInput,
    public readonly prompt: PromptInput,
  ) {}

  public static async init() {
    const command = getCommandInput();
    const dir = getDirectoryInput({ command });
    const prompt = await getPromptInput({ command, dir });

    return new Input(command, dir, prompt);
  }
}
