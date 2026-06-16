// eslint-disable-next-line @typescript-eslint/no-var-requires
const rules = require('./javascript').rules

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-import',
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true
  },
  ignorePatterns: [ '.eslintrc.js' ],
  rules: {
    ...rules,

    // Нет проверки аргументов, т.к. много замоканых функций.
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [ 'error', { args: 'none' } ],

    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': 'off',

    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',

    semi: 'off',
    '@typescript-eslint/semi': [ 'error', 'never' ],

    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterOverload: true,
        exceptAfterSingleLine: true
      }
    ],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        ignoredNodes: [
          'PropertyDefinition[decorators]',
          'TSUnionType',
          'FunctionExpression[params]:has(Identifier[decorators])'
        ],
        SwitchCase: 1,
        VariableDeclarator: 'first'
      }
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        },
        multilineDetection: 'brackets'
      }
    ],

    // Плагин для сортировки порядка импортов
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          [ 'builtin', 'external' ],
          [ 'internal', 'unknown', 'parent', 'sibling', 'index', 'object', 'type' ]
        ],
        pathGroups: [
          {
            pattern: 'infrastructure/**',
            group: 'internal'
          },
          {
            pattern: 'common/**',
            group: 'internal'
          },
          {
            pattern: 'features/**',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: [ 'internal' ]
      }
    ],

    // functions
    'function-paren-newline': [ 'error', 'multiline' ],
    'function-call-argument-newline': [ 'error', 'consistent' ]
  }
}
