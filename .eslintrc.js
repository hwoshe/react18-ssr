module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  globals: {
    // __non_webpack_require__: true,
    document: true,
    window: true
  },
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript'
      ],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './'
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      rules: {
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-shadow': [
          'error',
          { ignoreTypeValueShadow: true }
        ],
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/semi': 'off',
        'no-shadow': 'off',
        'sort-vars': 'error'
      }
    },
    {
      // excludedFiles: '.eslintrc.js',
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'sort-keys': 0,
        'sort-keys/sort-keys-fix': 1
      }
    },
    {
      excludedFiles: 'package.json',
      extends: ['plugin:jsonc/recommended-with-jsonc'],
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-array-values': [
          'error',
          { order: { type: 'asc' }, pathPattern: '.*' }
        ],
        'jsonc/sort-keys': 'error'
      }
    }
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      comments: false,
      plugins: ['@babel/plugin-syntax-jsx', '@babel/plugin-transform-runtime'],
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ]
    },
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false,
    sourceType: 'module'
  },
  plugins: [
    'html',
    'react',
    'prettier',
    'sort-keys',
    'simple-import-sort',
    'react-hooks'
  ],
  root: true,
  rules: {
    'class-methods-use-this': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true
      }
    ],
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'prettier/prettier': 'error',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' }
    ],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error'
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    },
    react: {
      version: 'detect'
    }
  }
}
