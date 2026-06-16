module.exports = {
  testEnvironment: 'node',
  testTimeout: 60 * 1000,
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  rootDir: 'src',
  testRegex: '.*\\.(spec|test)\\.(t|j)s$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@common(.*)$': '<rootDir>/common$1',
    '^@infrastructure(.*)$': '<rootDir>/infrastructure$1',
    '^@api(.*)$': '<rootDir>/api$1'
  },
  collectCoverageFrom: [ '**/*.(t|j)s' ],
  coverageDirectory: '../coverage',
  maxWorkers: '50%',
  maxConcurrency: 2
}
