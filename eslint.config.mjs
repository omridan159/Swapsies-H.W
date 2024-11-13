import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
    rules: {
      // Airbnb & custom rules
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],
      // Additional rules
      'prettier/prettier': 'error',
    },
  },
];
