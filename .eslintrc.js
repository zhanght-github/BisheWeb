// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': [2, 'never'], // 函数的括号前加空格
    'comma-dangle': [2, 'only-multiline'], // 允许多行中出现逗号
    'prefer-template': 2, // 使用模板字符串
    'no-control-regex': 0,
    'no-useless-escape': 0,
    'prefer-promise-reject-errors': 0
  }
}
