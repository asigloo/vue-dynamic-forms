/* import { UserConfig } from 'vitepress'
 */
const { description } = require('../../package')

const config = {
  title: 'Vue Dynamic Forms',
  description,
  lang: 'en-US',
  themeConfig: {
    repo: 'asigloo/vue-dynamic-forms',
    logo: '/logo.svg',
    editLinks: true,
    editLinkText: 'Edit this page',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Migration Guide',
        link: '/guide/migration-guide',
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Guide',
          children: [
            {
              text: 'Introduction',
              link: '/guide/',
            },
            {
              text: 'Getting Started',
              link: '/guide/getting-started',
            },
            {
              text: 'Usage',
              link: '/guide/usage',
            },
            {
              text: 'Validation',
              link: '/guide/validation',
            },
            {
              text: 'Models',
              link: '/guide/models',
            },
          ],
        },
        {
          text: 'API',
          children: [
            {
              text: 'Fields',
              link: '/guide/api/fields',
            },
            {
              text: 'Props',
              link: '/guide/api/props',
              children: [
                {
                  text: 'Dynamic Form',
                  link: '/guide/api/props/dynamic-form-props',
                },
                {
                  text: 'Dynamic Input',
                  link: '/guide/api/props/dynamic-input-props',
                },
              ],
            },
            {
              text: 'Events',
              link: '/guide/api/events',
            },
          ],
        },
        {
          text: 'Theming',
          children: [
            {
              text: 'Basic theming',
              link: '/guide/theming/basic',
            },
          ],
        },
        {
          text: 'Advanced',
          children: [
            {
              text: 'Slots',
              link: '/guide/advanced/slots',
            },
          ],
        },
      ],
    },
  },
}

module.exports = config
