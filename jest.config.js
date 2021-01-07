module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'json', 'vue'],
  verbose: true,

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },

  snapshotSerializers: ['jest-serializer-vue'],

  testMatch: [
    '**/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],

  testURL: 'http://localhost/',
  transformIgnorePatterns: ['/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/templates/'],

  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.(vue|ts)'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
};
