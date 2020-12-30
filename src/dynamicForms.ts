import { App, isVue2 } from 'vue-demi';
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

      if (isVue2) {
        // Vue 2 only
        console.log('IS VUEEEE 222');
      } else {
        // Vue 3 only
        console.log('IS VUEEEE 333');
      }

      app.component('dynamic-form', DynamicForm);
      app.provide(dynamicFormsSymbol, self);
    },
  };

  return vdf;
}
