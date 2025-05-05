import chalk from 'chalk';
import { Box } from 'ink';
import SyntaxHighlight from 'ink-syntax-highlight';

export function BoxSyntaxJS({ code }: { code: string }) {
  return (
    <Box flexGrow={1}>
      <SyntaxHighlight
        code={code}
        language="js"
        theme={{
          string: chalk.green,
          number: chalk.yellow,
          literal: chalk.gray,
        }}
      />
    </Box>
  );
}
