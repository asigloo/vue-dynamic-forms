import DynamicForm from './components/dynamic-form/DynamicForm.vue';
import DynamicInput from './components/dynamic-input/DynamicInput.vue';
import utils from './core/utils';

const version = process.env.VERSION || require('../package.json').version;

export let _Vue;

export function install(Vue) {
  if (install.installed && _Vue === Vue) return;
  install.installed = true;

  _Vue = Vue;

  Vue.prototype.$formUtils = utils;

  Vue.component('dynamic-form', DynamicForm);
  Vue.component('dynamic-input', DynamicInput);
}

export const AsDynamicForms = {
  install,
  version,
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(AsDynamicForms);
}

export * from './core/utils';

export { DynamicForm, DynamicInput };

export default AsDynamicForms;
