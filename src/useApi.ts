import { inject, InjectionKey } from 'vue';
import { DynamicFormsPlugin } from './dynamicForms';

export const dynamicFormsSymbol: InjectionKey<DynamicFormsPlugin> = Symbol();

export function useDynamicForms() {
  const dynamicForms = inject(dynamicFormsSymbol);
  if (!dynamicForms) throw new Error('No dynamicForms provided!!!');

  return dynamicForms;
}
