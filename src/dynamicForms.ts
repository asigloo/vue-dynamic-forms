import { App } from 'vue';
import { dynamicFormsSymbol } from './useApi';
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

export function createDynamicForms(
  options?: DynamicFormsOptions,
): DynamicFormsPlugin {
  const vdf: DynamicFormsPlugin = {
    options,
    install(app: App) {
      const self = this;

      app.component('DynamicForm', DynamicForm);
      app.provide(dynamicFormsSymbol, self);
    },
  };

  return vdf;
}
