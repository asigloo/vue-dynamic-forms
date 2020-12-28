const path = require('path');

module.exports = {
  css: {
    sourceMap: true,
  },
  devServer: {
    host: '0.0.0.0',
    port: 6042, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: false,
  },
  chainWebpack: config => {
    config.optimization.splitChunks(false);
    config.merge({ devtool: 'source-map' });
    config.resolve.symlinks(false);
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
};
