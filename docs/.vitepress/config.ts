const { description } = require('../../package')

module.exports = {
  title: 'Vue Dynamic Forms',
  description,
  themeConfig: {
    repo: 'asigloo/vue-dynamic-forms',
    logo: '/logo.svg',
    nav: [
      {
        text: 'Migration Guide',
        link: '/v3/guide/migration-guide',
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
          ],
        },
      ],
    },
  },
}
