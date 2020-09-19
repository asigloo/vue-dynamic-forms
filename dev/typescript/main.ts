import { createApp } from 'vue';

import App from './App.vue';
import './styles/main.scss';

import { createDynamicForms } from '../../src';

const VueDynamicForms = createDynamicForms({
  theme: 'material',
});

export const app = createApp(App);

app.use(VueDynamicForms);

app.mount('#app');
