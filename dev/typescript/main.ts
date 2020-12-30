import { createApp } from 'vue';

import App from './App.vue';
import './styles/main.scss';

import { createDynamicForms } from '../../src';

/* import { createDynamicForms } from '../../dist/as-dynamic-forms.esm';
 */
const VueDynamicForms = createDynamicForms({
  autoValidate: true,
  form: {
    customClass: 'plugin-options-class-added',
    customStyles: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    method: 'POST',
    netlify: false,
    netlifyHoneypot: null,
  },
});

export const app = createApp(App);

app.use(VueDynamicForms);

app.mount('#app');
