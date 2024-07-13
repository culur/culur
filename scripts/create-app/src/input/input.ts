import type { CommandInput} from './command';
import { getCommandInput } from './command';
import type { DirectoryInput} from './directory';
import { getDirectoryInput } from './directory';
import type { PromptInput} from './prompt';
import { getPromptInput } from './prompt';

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
