module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {},
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        parser: 'typescript',
        printWidth: 85,
        endOfLine: 'auto',
      },
      {
        usePrettierrc: false,
        fileInfoOptions: {
          withNodeModules: true,
        }
      }
    ],
    quotes: ['error', 'single'],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prefer-const': 'off'
  }
};