module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  plugins: ['vue'],
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript', '@vue/typescript/recommended'],
  rules: {
    'vue/custom-event-name-casing': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/experimental-script-setup-vars': 'off',
    'vue/multi-word-component-names': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-shadow': 0,
    'no-plusplus': 0, // 禁止使用++，--
    'guard-for-in': 0,
    'no-extra-semi': 0, // 和prettier冲突
    'import/extensions': 0, // import不需要写文件扩展名
    semi: ['error', 'never'], // 无分号
    'import/no-unresolved': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0, // 无下划线
    'no-restricted-syntax': 0,
    'consistent-return': 'off',
    'max-len': ['error', { code: 200 }],
    'no-use-before-define': 'off',
    'no-prototype-builtins': 'off',
    'class-methods-use-this': 'off',
    'template-curly-spacing': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-param-reassign': ['error', { props: false }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['script/**/*.js'] }],
    indent: [
      'warn',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
        SwitchCase: 1,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: 'never',
      },
    ],
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  // eslint对于ts的全局类型支持并不完善，因此官方建议禁用
  // eslint-disable-next-line max-len
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
}
