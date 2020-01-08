import DynamicForm from './components/dynamic-form/DynamicForm.vue';
import DynamicInput from './components/dynamic-input/DynamicInput.vue';

export const AsDynamicForms = {
  install(Vue) {
    Vue.component('dynamic-form', DynamicForm);
    Vue.component('dynamic-input', DynamicInput);
  },
};
