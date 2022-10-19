/**  @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  resolver: 'jest-ts-webcompat-resolver',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/integration/**/*-test.ts', '<rootDir>/tests/**/*-test.ts'],
  testPathIgnorePatterns: ['<rootDir>/integration/simple-esmodule-interop/*'],
  testEnvironment: "node"
};
