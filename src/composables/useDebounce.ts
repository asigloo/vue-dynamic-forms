/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type FunctionArgs<Args extends any[] = any[], Return = void> = (
  ...args: Args
) => Return;

export interface FunctionWrapperOptions<
  Args extends any[] = any[],
  This = any
> {
  fn: FunctionArgs<Args, This>;
  args: Args;
  thisArg: This;
}

export type EventFilter<Args extends any[] = any[], This = any> = (
  invoke: () => void,
  options: FunctionWrapperOptions<Args, This>,
) => void;

/**
 * @internal
 */
export function createFilterWrapper<T extends FunctionArgs>(
  filter: EventFilter,
  fn: T,
) {
  function wrapper(this: any, ...args: any[]) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }

  return (wrapper as any) as T;
}

export const bypassFilter: EventFilter = invoke => {
  return invoke();
};

export function debounceFilter(ms: number): EventFilter {
  if (ms <= 0) return bypassFilter;

  let timer: ReturnType<typeof setTimeout> | undefined;

  const filter: EventFilter = invoke => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(invoke, ms);
  };

  return filter;
}

export function useDebounceFn<T extends FunctionArgs>(fn: T, ms = 200): T {
  return createFilterWrapper(debounceFilter(ms), fn);
}
