module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'import', 'jest', 'prettier'],
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-no-duplicate-props': 'warn',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.js',
        '**/__tests__/**/*.js',
        '**/tests/*.js',
        'src/setupTests.js',
      ],
      env: {
        jest: true,
        browser: true,
      },
    },
  ],
};
