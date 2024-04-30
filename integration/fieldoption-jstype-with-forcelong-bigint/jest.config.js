const base = require("../../jest.config");

// Set maxWorkers for assertion failures involving BigInt
// https://github.com/jestjs/jest/issues/11617
module.exports = {
  ...base,
  maxWorkers: 1,
};
