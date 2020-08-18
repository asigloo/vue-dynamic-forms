import { App } from 'vue';
import { dynamicFormsSymbol } from './useApi';
import DynamicForm from './components/dynamic-form/DynamicForm.vue';

export interface DynamicFormsOptions {
  theme?: string;
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
      const vdf = this;
      app.component('dynamic-form', DynamicForm);
      app.provide(dynamicFormsSymbol, vdf);
    },
  };

  return vdf;
}
