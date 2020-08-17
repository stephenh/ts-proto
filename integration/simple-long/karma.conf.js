module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      { pattern: '*.+(js|ts)' },
      { pattern: 'google/**/*.+(js|ts)' },
      { pattern: 'import_dir/**/*.+(js|ts)' },
    ],
    preprocessors: {
      '*.+(js|ts)': 'karma-typescript',
      'google/**/*.+(js|ts)': 'karma-typescript',
      'import_dir/**/*.+(js|ts)': 'karma-typescript',
    },
    reporters: ['progress', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
    },
  });
};
