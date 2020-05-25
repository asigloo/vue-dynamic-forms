const isDeployPreview = require('./isDeployPreview');
const meta = require('./meta');

const head = [
  [
    'link',
    {
      href:
        '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600|Roboto Mono',
      rel: 'stylesheet',
      type: 'text/css',
    },
  ],
  [
    'link',
    {
      href:
        '//fonts.googleapis.com/css?family=Dosis:300&amp;text=Vue Dynamic Forms',
      rel: 'stylesheet',
      type: 'text/css',
    },
  ],
  ['link', { rel: 'icon', href: `/icons/favicon.ico` }],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/icons/favicon-32x32.png',
    },
  ],
  [
    'link',
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/icons/favicon-16x16.png',
    },
  ],
  ['link', { rel: 'shortcut icon', href: '/icons/favicon.ico' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'apple-touch-icon', href: `/vue-dynamic-forms` }],
  [
    'link',
    {
      rel: 'mask-icon',
      href: '/icons/safari-pinned-tab.svg',
      color: '#3eaf7c',
    },
  ],
  [
    'meta',
    {
      name: 'msapplication-TileImage',
      content: '/icons/msapplication-icon-144x144.png',
    },
  ],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['meta', { name: 'title', content: meta.title }],
  ['meta', { name: 'description', content: meta.description }],
  ['link', { rel: 'icon', href: meta.icon, type: 'image/png' }],
  ['meta', { property: 'og:image', content: meta.icon }],
  ['meta', { property: 'twitter:image', content: meta.icon }],
  ['meta', { name: 'description', content: meta.description }],
  ['meta', { property: 'og:description', content: '' }],
  ['meta', { property: 'twitter:description', content: meta.description }],
  ['meta', { property: 'twitter:title', content: meta.title }],
  ['meta', { property: 'og:title', content: meta.title }],
  ['meta', { property: 'og:site_name', content: meta.title }],
  ['meta', { property: 'og:url', content: meta.url }],
];

if (isDeployPreview) {
  head.push(
    ['meta', { name: 'robots', content: 'noindex' }],
    ['meta', { name: 'googlebot', content: 'noindex' }],
  );
}

module.exports = head;
