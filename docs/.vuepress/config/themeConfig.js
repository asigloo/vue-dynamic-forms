module.exports = {
  repo: '@asigloo/vue-dynamic-forms',
  editLinks: true,
  docsDir: 'docs',
  nav: [{ text: 'Sandbox', link: '/sandbox' }],
  sidebar: {
    '/': [
      {
        title: 'Community',
        collapsable: false,
        children: [
          ['sponsors', 'Sponsors 🎉'],
          ['contributors', 'Contributors'],
        ],
      },
    ],
  },
};
