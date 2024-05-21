declare module '*.yml' {
  const json: Record<string, string>;
  export default json;
}

declare module '*.yaml' {
  const json: Record<string, string>;
  export default json;
}
