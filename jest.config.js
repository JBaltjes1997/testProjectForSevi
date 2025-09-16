/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  // ...add more options as needed
};

module.exports = config;
