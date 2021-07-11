import { App, inject, InjectionKey } from 'vue';
import DynamicForm from './components/dynamic-form/DynamicForm.vue';
import { FormOptions } from './core/models';

export interface DynamicFormsOptions {
  autoValidate?: boolean;
  form?: FormOptions;
}

export interface DynamicFormsPlugin {
  options?: DynamicFormsOptions;
  install(app: App): void;
}

export const dynamicFormsSymbol: InjectionKey<DynamicFormsPlugin> =
  Symbol('vdf');

export function useDynamicForms(): DynamicFormsPlugin {
  const dynamicForms = inject(dynamicFormsSymbol);
  if (!dynamicForms) throw new Error('No dynamicForms provided!!!');

  return dynamicForms;
}

export function createDynamicForms(
  options?: DynamicFormsOptions,
): DynamicFormsPlugin {
  const $vdf: DynamicFormsPlugin = {
    options,
    install(app: App) {
      app.provide(dynamicFormsSymbol, $vdf);

      app.component('DynamicForm', DynamicForm);

      Object.defineProperty(app, '__VUE_DYNAMIC_FORMS_SYMBOL__', {
        get() {
          return dynamicFormsSymbol;
        },
      });
    },
  };

  return $vdf;
}
