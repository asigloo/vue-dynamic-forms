import { inject, InjectionKey, provide, App } from 'vue';
import { DynamicFormsOptions, DynamicFormsPlugin } from './dynamicForms';

export const dynamicFormsSymbol: InjectionKey<DynamicFormsPlugin> = Symbol();

/* const createDynamicForms = (
  config: DynamicFormsOptions,
): DynamicFormsPlugin => {
        return ({
            options: {
                theme: config.theme,
            },
        });
    };

export function provideDynamicForms(config: DynamicFormsOptions) {
  const vdf = createDynamicForms(config);
  provide(dynamicFormsSymbol, vdf);
} */

export function useDynamicForms() {
  const dynamicForms = inject(dynamicFormsSymbol);
  if (!dynamicForms) throw new Error('No dynamicForms provided!!!');

  return dynamicForms;
}
