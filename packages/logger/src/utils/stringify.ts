const doubleQuoteRegex = /"/g;
const singleQuoteRegex = /'/g;
const backtickRegex = /`/g;

function stringifyString(str: string) {
  const hasSingleQuote = str.includes("'");
  const hasDoubleQuote = str.includes('"');
  const hasNewLine = str.includes('\n');

  if (!hasDoubleQuote && !hasNewLine) {
    return `"${str.replace(doubleQuoteRegex, '\\"')}"`;
  } else if (!hasSingleQuote && !hasNewLine) {
    return `'${str.replace(singleQuoteRegex, "\\'")}'`;
  } else {
    return `\`${str.replace(backtickRegex, '\\`')}\``;
  }
}

export function stringify(value: unknown): string {
  switch (typeof value) {
    case 'undefined':
      return 'undefined';
    case 'number':
    case 'boolean':
      return String(value);
    case 'string':
      return stringifyString(value);
    case 'bigint':
      return `${value}n`;
    case 'symbol':
      return `Symbol("${value.description}")`;
    case 'function':
      return `[Function]`;
    case 'object': {
      if (value === null) return 'null';
      if (Array.isArray(value)) {
        return `[${value.map(stringify).join(',')}]`;
      }
      if (value instanceof RegExp) {
        return value.toString();
      }
      return `{${Object.entries(value)
        .map(([key, val]) => `${JSON.stringify(key)}:${stringify(val)}`)
        .join(',')}}`;
    }
  }
}
