/**  @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        // Note: We are limited to one single TS config even though we have
        // vastly different TS configs for the sources and the tests. So we'll
        // make do with a **very** loose config file. Any type checking should
        // be done with `yarn tsc:check`.
        tsconfig: 'tsconfig.json',
      }
    ],
  },
  resolver: 'jest-ts-webcompat-resolver',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/integration/**/*-test.ts', '<rootDir>/tests/**/*-test.ts'],
  prettierPath: require.resolve('prettier-legacy'),
  testPathIgnorePatterns: [
      '<rootDir>/integration/simple-esmodule-interop/*',
      '<rootDir>/integration/batching-with-context-esModuleInterop/*'
  ],
  testEnvironment: "node"
};
