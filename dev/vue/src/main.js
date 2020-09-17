import { createApp } from 'vue'
import App from './App.vue'

import { createDynamicForms } from '../../../dist/as-dynamic-forms.common'

const VueDynamicForms = createDynamicForms({
  theme: 'material',
})

export const app = createApp(App)

app.use(VueDynamicForms)

app.mount('#app')
