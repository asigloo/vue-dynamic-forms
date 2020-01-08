module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'plugin:vue/essential',
      'plugin:prettier/recommended',
      'prettier',
      'prettier/vue',
    ],
    plugins: ['prettier'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'prettier/prettier': [
        'error',
        {
          htmlWhitespaceSensitivity: 'ignore',
          singleQuote: true,
          semi: true,
          trailingComma: 'all',
        },
      ],
    },
    parserOptions: {
      parser: 'babel-eslint',
    },
    settings: {
      'import/resolver': {
        alias: [['@', './src']],
      },
    },
  }
