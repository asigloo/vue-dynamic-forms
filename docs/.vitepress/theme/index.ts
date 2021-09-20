import DefaultTheme, { Config } from 'vitepress/theme'
import { createDynamicForms } from '/@'
import '../theme/styles/base.scss'

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
  },
}

export default theme
