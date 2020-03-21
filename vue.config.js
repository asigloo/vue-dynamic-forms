const path = require('path');
const ExtractTextPlugin = require('mini-css-extract-plugin');

module.exports = {
  css: {
    sourceMap: true,
  },
  devServer: {
    host: '0.0.0.0',
    port: 6084, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false,
  },
  pages: {
    index: {
      entry: 'dev/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  chainWebpack: config => {
    config.optimization.splitChunks(false);
    config.merge({ devtool: 'source-map' });
    config.resolve.symlinks(false);
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
    config.plugin('extract-css').use(ExtractTextPlugin, [
      {
        filename: 'css/[id].css',
        allChunks: true,
      },
    ]);
  },
};
