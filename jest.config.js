module.exports = {
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: ['js', 'ts'],
  testMatch: [
    '<rootDir>/integration/**/*-test.ts',
    '<rootDir>/tests/**/*-test.ts',
  ],
};
