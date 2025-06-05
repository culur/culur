import type { Instance } from 'ink';
import type { RefObject } from 'react';
import type { IRootObject } from '../item';
import type { TasksTitle } from '../types/tasks';
import type { DynamicLinesRef } from './dynamic-lines';
import type { StaticLinesRef } from './static-lines';
import process from 'node:process';
import { render } from 'ink';
import { Tasks } from '../item/tasks';
import { DynamicLines } from './dynamic-lines';
import { StaticLines } from './static-lines';
import { StaticLinesStdout } from './static-lines-std';

export class Logger<TTasksData extends any[] = []> {
  readonly #dynamicLinesRef: RefObject<DynamicLinesRef | null> = {
    current: null,
  };
  readonly #staticLinesRef: RefObject<StaticLinesRef | null> = {
    current: null,
  };
  readonly #dynamicLineInstance: Instance;
  readonly #staticLineInstance: Instance;
  readonly #tasks: Tasks<TTasksData>;

  get root() {
    return this.#tasks;
  }

  private get dynamicLineInstance() {
    return this.#dynamicLineInstance;
  }

  private get staticLineInstance() {
    return this.#staticLineInstance;
  }

  constructor(title: TasksTitle<TTasksData>, props?: IRootObject['props']) {
    const staticLines = (
      <StaticLines ref={this.#staticLinesRef} {...props} /> //
    );
    const dynamicLines = (
      <DynamicLines ref={this.#dynamicLinesRef} {...props} /> //
    );

    this.#dynamicLineInstance = render(dynamicLines, { patchConsole: false });

    const staticStdout = new StaticLinesStdout(
      /* v8 ignore next */
      props?.width ?? process.stdout.columns,
      /* v8 ignore next 5 */ /* manual testing */
      content => {
        this.#dynamicLineInstance.clear();
        process.stdout.write(content);
        this.#dynamicLineInstance.rerender(dynamicLines);
      },
    ) as unknown as NodeJS.WriteStream;
    this.#staticLineInstance = render(staticLines, {
      stdout: staticStdout,
      patchConsole: false,
    });

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

    this.#staticLinesRef.current?.setLines(staticLines);
    this.#dynamicLinesRef.current?.setLines(dynamicLines);
  }

  async unmount(delay = 10) {
    if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay));
    this.staticLineInstance.unmount();
    this.dynamicLineInstance.unmount();
  }
}
