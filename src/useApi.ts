import { inject, InjectionKey } from 'vue-demi';
import { DynamicFormsPlugin } from './dynamicForms';

export const dynamicFormsSymbol: InjectionKey<DynamicFormsPlugin> = Symbol();

export function useDynamicForms(): DynamicFormsPlugin {
  const dynamicForms = inject(dynamicFormsSymbol);
  if (!dynamicForms) throw new Error('No dynamicForms provided!!!');

  return dynamicForms;
}
