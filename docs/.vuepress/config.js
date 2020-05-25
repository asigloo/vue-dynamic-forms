const { description } = require('./config/meta');
const head = require('./config/head');
const plugins = require('./config/plugins');
const themeConfig = require('./config/themeConfig');

module.exports = {
  title: 'Vue Dynamic Forms',
  description,
  head,
  plugins,
  themeConfig,
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'src',
      },
    },
  },
};
