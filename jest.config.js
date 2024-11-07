module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'], 
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/test/**/*.test.ts'], 
  collectCoverage: true, 
  collectCoverageFrom: ['src/**/*.ts'], 
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
};
