import { App, isVue3 } from 'vue-demi';
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

      app.component('dynamic-form', DynamicForm);
      if (isVue3) {
        app.provide(dynamicFormsSymbol, self);
      } else {
        app.config.globalProperties.$vdf = self;
      }
    },
  };

  return vdf;
}
