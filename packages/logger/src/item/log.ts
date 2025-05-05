import type { LineColProps, LineColsProps, LineProps } from '~/components';
import { toLineCols } from '~/components';
import { Icon, Prefix } from '~/types';
import { Base } from './base';

export class Log extends Base {
  readonly #cols: LineColProps[];
  readonly #icon;

  constructor(parent: Base, props: LineColsProps, icon = Icon.Info) {
    super(parent);

    this.#icon = icon;
    this.#cols = toLineCols(props);
  }

  toLines(): LineProps[] {
    return [
      {
        key: this.key,
        isStatic: true,
        level: this.level,
        prefix: Prefix.BlockMiddleLine,
        icon: this.#icon,
        colsLeft: this.#cols,
      },
    ];
  }
}
