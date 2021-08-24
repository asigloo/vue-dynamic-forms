import DefaultTheme, { Config } from 'vitepress/theme'
import { createDynamicForms } from '../../../src'

const modules = import.meta.globEager('../components/**/*.vue')
const components = []

for (const path in modules) {
  components.push(modules[path].default)
}

const VueDynamicForms = createDynamicForms({
  autoValidate: true,
  form: {
    customClass: 'plugin-options-class-added',
    method: 'POST',
    netlify: false,
    netlifyHoneypot: null,
  },
})

const theme: Config = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueDynamicForms)
    components.forEach(component => {
      app.component(component.name, component)
    })
  },
}

export default theme
