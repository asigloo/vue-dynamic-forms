import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import router from './router'

import { createDynamicForms } from '/@'

/* import { createDynamicForms } from '../../../dist/as-dynamic-forms.es'; */

const VueDynamicForms = createDynamicForms({
  autoValidate: true,
  form: {
    customClass: 'plugin-options-class-added',
    method: 'POST',
    netlify: false,
    netlifyHoneypot: null,
  },
})

export const app = createApp(App)

console.log({ app })

app.use(VueDynamicForms)

app.use(router).mount('#app')
