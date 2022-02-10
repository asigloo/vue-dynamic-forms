import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme({
  title: 'Vue Dynamic Forms',
  description: 'Easy way to dynamically create reactive forms in vue based on varying business object model',
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
            {
              text: 'Reset Form',
              link: '/guide/advanced/reset-form',
            },
          ],
        },
      ],
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Alvaro Saburido' }],
    ['meta', { property: 'og:title', content: 'Vue Dynamic Forms' }],
    [
      'meta',
      {
        property: 'og:image',
        content:
          'https://res.cloudinary.com/alvarosaburido/image/upload/v1589993773/portfolio/web/vue-dynamic-forms/open-graph-preview_kv4glm.png',
      },
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Easy way to dynamically create reactive forms in vue based on varying business object model',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@alvaro_code' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content:
          'https://res.cloudinary.com/alvarosaburido/image/upload/v1589993773/portfolio/web/vue-dynamic-forms/open-graph-preview_kv4glm.png',
      },
    ],

    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        crossorigin: 'anonymous',
        href: 'https://fonts.gstatic.com',
      },
    ],
  ],
})
