module.exports = {
  verbose: true,
  testTimeout: 30000,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.test.ts$',
  moduleNameMapper: {
    '@root(.*)$': '<rootDir>$1',
    '@app(.*)$': '<rootDir>/app$1',
    '@database(.*)$': '<rootDir>/database$1',
    '@repository(.*)$': '<rootDir>/repositories$1',
    '@service(.*)$': '<rootDir>/services$1',
    '@controller(.*)$': '<rootDir>/controllers$1'
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', 'src/database/*'],
  coveragePathIgnorePatterns: [
    'node_modules/*',
    '<rootDir>/__test__/*',
    '<rootDir>/constant/*',
    '<rootDir>/interfaces/*',
    '<rootDir>/app/*',
    '<rootDir>/database/*',
    '<rootDir>/main.ts'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageDirectory: '../coverage',
  reporters: ['default', 'jest-junit']
}
