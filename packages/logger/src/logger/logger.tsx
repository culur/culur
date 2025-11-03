import type { Instance } from 'ink';
import type { RefObject } from 'react';
import type { IRootObject } from '../item';
import type { TasksTitle } from '../types/tasks';
import type { LinesRef } from './lines';
import { render } from 'ink';
import { Tasks } from '../item/tasks';
import { Lines } from './lines';

export class Logger<TTasksData extends any[] = []> {
  readonly #linesRef: RefObject<LinesRef | null> = {
    current: null,
  };
  readonly #linesInstance: Instance;
  readonly #tasks: Tasks<TTasksData>;

  get root() {
    return this.#tasks;
  }
  private get linesInstance() {
    return this.#linesInstance;
  }

  constructor(title: TasksTitle<TTasksData>, props?: IRootObject['props']) {
    this.#linesInstance = render(<Lines ref={this.#linesRef} {...props} />);

    //? Tasks
    this.#tasks = new Tasks<TTasksData>(
      { onChange: () => this.#onChange(), level: -1, props },
      { title, isShowTimer: false, isShowAllPending: true },
    );
    this.#tasks.onChange();
  }

  #onChange() {
    const lines = this.#tasks.toLines();

    const staticLines = [];
    const dynamicLines = [];
    let isMeetNonStatic = false;

    for (const line of lines) {
      if (!isMeetNonStatic) {
        if (line.isStatic) {
          staticLines.push(line);
        } else {
          dynamicLines.push(line);
          isMeetNonStatic = true;
        }
      } else {
        dynamicLines.push(line);
      }
    }

    this.#linesRef.current?.setLines({ staticLines, dynamicLines });
  }

  async unmount(delay = 10) {
    /* v8 ignore else -- @preserve */
    if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay));
    this.linesInstance.unmount();
  }
}
