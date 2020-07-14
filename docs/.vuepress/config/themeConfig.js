module.exports = {
  repo: 'alvarosaburido/vue-dynamic-forms',
  editLinks: true,
  docsDir: 'docs',
  logo: '/vue-dynamic-forms.png',
  nav: [
    {
      text: 'Sandbox',
      target: '_blank',
      link: 'https://codesandbox.io/s/vue-dynamic-forms-ftzes',
    },
  ],
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
          ['guide/fields', 'Fields'],
          ['guide/props', 'Props'],
          ['guide/events', 'Events'],
          ['guide/models', 'Models'],
          ['guide/slots', 'Slots'],
        ],
      },
      {
        title: 'Theme & Styling',
        collapsable: true,
        children: [['guide/theming', 'Theming']],
      },
      {
        title: 'Validation',
        collapsable: true,
        children: [['guide/validation', 'Add validation']],
      },
      {
        title: 'Examples',
        collapsable: true,
        children: [
          ['guide/examples/phone-prefix-example', 'Phone Prefix'],
          ['guide/examples/thirdparty', 'Third-Party'],
        ],
      },
      {
        title: 'Advanced',
        collapsable: true,
        children: [['guide/netlify-forms', 'Netlify Forms']],
      },
    ],
  },
};
