export function warn(msg: string, ...args: unknown[]): void {
  console.warn('[DynamicForms warn]: ' + msg, ...args);
}
