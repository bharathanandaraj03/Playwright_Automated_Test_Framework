// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default defineConfig(
  { ignores: ['node_modules/', 'playwright-report/', 'test-results/'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',   // missing await
      '@typescript-eslint/await-thenable': 'error',         // await on a non-promise
    },
  },
  { ...playwright.configs['flat/recommended'], 
    files: ['tests/**'] ,
    rules: {
    ...playwright.configs['flat/recommended'].rules,
    'playwright/expect-expect': ['warn', { assertFunctionPatterns: ['^verify', '^expect'] }],
  },},
);
