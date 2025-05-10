import type { Arrayable, LiteralUnion } from '@culur/types';
import type { Text, TextProps } from 'ink';
import type { ReactElement } from 'react';
import { isValidElement } from 'react';

export type LineColProps =
  | {
      text: ReactElement<void, typeof Text>;
      width?: number | string;
    }
  | ({
      text: string;
      width?: LiteralUnion<'no-wrap' | 'wrap', number | string>;
    } & Omit<TextProps, 'children'>);

export type LineColsProps = Arrayable<
  string | ReactElement<void, typeof Text> | LineColProps
>;

export const toLineCols = (props: LineColsProps): LineColProps[] =>
  (Array.isArray(props) ? props : [props]).map<LineColProps>(text => {
    if (typeof text === 'object') {
      if ('text' in text) return text;
      if (isValidElement(text)) return { text };
    }
    return { text: String(text) };
  });
