import type { ReactNode } from 'react';
import { EventEmitter } from 'node:events';
import { vi } from 'vitest';

// Use the real `ink` even when a test file mocks it (the mock re-exports this `render`)
const { render: inkRender } =
  await vi.importActual<typeof import('ink')>('ink');

class Output extends EventEmitter {
  readonly isTTY = true;
  readonly frames: string[] = [];

  get columns() {
    return 100;
  }

  write = (frame: string) => {
    this.frames.push(frame);
  };

  lastFrame = (): string | undefined => this.frames.at(-1);
}

class Input extends EventEmitter {
  readonly isTTY = true;
  data: string | null = null;

  write = (data: string) => {
    this.data = data;
    this.emit('readable');
    this.emit('data', data);
  };

  read = () => {
    const { data } = this;
    this.data = null;
    return data;
  };

  setEncoding() {}
  setRawMode() {}
  resume() {}
  pause() {}
  ref() {}
  unref() {}
}

/**
 * Same API as `ink-testing-library`'s `render`, but forces `interactive: true`.
 * With ink 8, a non-TTY stdout or a CI environment makes ink non-interactive,
 * and it then writes only the final frame at unmount.
 */
export function render(tree: ReactNode) {
  const stdout = new Output();
  const stderr = new Output();
  const stdin = new Input();

  const instance = inkRender(tree, {
    stdout: stdout as unknown as NodeJS.WriteStream,
    stderr: stderr as unknown as NodeJS.WriteStream,
    stdin: stdin as unknown as NodeJS.ReadStream,
    debug: true,
    exitOnCtrlC: false,
    patchConsole: false,
    interactive: true,
  });

  return {
    rerender: instance.rerender,
    unmount: instance.unmount,
    cleanup: instance.cleanup,
    stdout,
    stderr,
    stdin,
    frames: stdout.frames,
    lastFrame: stdout.lastFrame,
  };
}
