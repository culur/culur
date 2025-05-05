import type { BoxProps, Instance } from 'ink';
import type { RefObject } from 'react';
import type { LineProps } from './components/line';
import type { RootRef } from './components/root';
import type { TasksTitle } from './types/tasks';
import { render } from 'ink';
import { uniqueId } from 'lodash-es';
import { Root } from './components/root';
import { Tasks } from './item/tasks';

export class Logger<TTasksData extends any[] = []> {
  readonly #ref: RefObject<RootRef> = { current: null };
  readonly #instance: Instance;
  readonly #root: Tasks<TTasksData>;

  get root() {
    return this.#root;
  }

  //? Private getter for testing only
  private get instance() {
    return this.#instance;
  }

  constructor(title: TasksTitle<TTasksData>, props?: BoxProps) {
    this.#instance = render(<Root ref={this.#ref} {...props} />);
    this.#root = new Tasks<TTasksData>(
      { onChange: () => this.#onChange(), level: -1 },
      { title },
    );
    this.#root.onChange();
  }

  #onChange() {
    const lines = this.#root.toLines();
    this.#setLines(lines);
  }

  #setLines(lines: LineProps[]) {
    this.#ref.current?.setLines(
      lines.map(line => ({ ...line, key: uniqueId() })),
    );
  }

  async unmount() {
    await new Promise(resolve => setTimeout(resolve, 10));
    this.#instance.unmount();
  }
}
