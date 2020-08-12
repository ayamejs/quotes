
declare module "@ayamejs/quotes" {
  export function parse(line: string, sep?: string): string[];

  const version: string;
  export { version };
}
