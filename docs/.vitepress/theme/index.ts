import DefaultTheme from 'vitepress/theme'
import { createDynamicForms } from '/@'
import './base.scss'

const VueDynamicForms = createDynamicForms({
  autoValidate: true,
  form: {
    customClass: 'plugin-options-class-added',
    method: 'POST',
    netlify: false,
    netlifyHoneypot: null,
  },
})

const theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueDynamicForms)
  },
}

export default theme
