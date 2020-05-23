module.exports = {
  repo: 'alvarosaburido/vue-dynamic-forms',
  editLinks: true,
  docsDir: 'docs',
  nav: [{ text: 'Sandbox', link: '/sandbox' }],
  sidebar: {
    '/': [
      {
        title: 'Getting Started',
        collapsable: false,
        children: [
          ['guide/install', 'Installation'],
          ['guide/usage', 'Usage'],
        ],
      },
      {
        title: 'API',
        collapsable: false,
        children: [
          ['guide/fields', 'fields'],
          ['guide/events', 'events'],
        ],
      },
      {
        title: 'Theme & Styling',
        collapsable: true,
        children: [['guide/theming', 'Theming']],
      },
      {
        title: 'Validation',
      },
      {
        title: 'Advanced',
        collapsable: true,
        children: [
          ['guide/slots', 'Slots'],
          ['guide/netlify-forms', 'Netlify Forms'],
        ],
      },
    ],
  },
};
