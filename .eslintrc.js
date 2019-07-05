module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'only-multiline'],
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'handle-callback-err': ['error', 'never'],
    'arrow-parens': [2, 'as-needed'],
    'no-const-assign': 2,
    'no-undef': 2,
    'no-unused-vars': 2,
    'object-shorthand': 2,
    'prefer-const': [
      2,
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
