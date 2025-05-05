export function stringify(value: unknown): string {
  switch (typeof value) {
    case 'undefined':
      return 'undefined';
    case 'number':
    case 'boolean':
      return String(value);
    case 'string':
      return `"${value}"`;
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
