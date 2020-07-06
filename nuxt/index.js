const path = require('path');

const THEMES = ['default'];

module.exports = function nuxtDynamicForms(moduleOptions) {
  const options = Object.assign({}, this.options.dynamicForms, moduleOptions);

  if (THEMES.includes(options.theme)) {
    this.options.css.push(
      `@asigloo/vue-dynamic-forms/src/styles/themes/${options.theme}.scss`,
    );
  } else {
    this.options.css.push(
      `@asigloo/vue-dynamic-forms/src/styles/themes/default.scss`,
    );
    console.warn(
      `[vue-dynamic-forms warn]: Theme '${options.theme}' does not exit yet. \n` +
        `Selecting theme 'default'. \n` +
        `You can propose it as a new theme by creating a PR here 'https://github.com/alvarosaburido/vue-dynamic-forms/pulls'`,
    );
  }
  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    ssr: false,
    fileName: 'nuxtDynamicForms.js',
    options,
  });
};

//  module.exports.meta = require('./package.json');
